const bcrypt = require('bcrypt');
const AppError = require('../../utils/AppError');
const User = require('./model');
const jwt = require('jsonwebtoken')

const CreateUsers = async (userData, currentUser) => {

    const userName = userData.userName
    const password = userData.password
    const role = userData.role
    

    if (currentUser.role != "Doctor" && currentUser.role != "Docter") {
        throw new AppError("Only doctors can create accounts", 403)
    }

    const findUser = await User.findOne({ userName: userName })
    if (findUser) {
        throw new AppError("User Name already Registered", 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        userName : userName,
        role : role,
        password: hashedPassword
    })
    
    return await newUser.save()
}

const LoginUser = async (username , password) => {

    const user = await User.findOne({userName: username})
    if(user == null) {
        throw new AppError("Invalid Username", 401)
    }

    const passwordCheck = bcrypt.compareSync(password , user.password)
    if(!passwordCheck) {
        throw new AppError("Invalid password", 401)
    }

    const token = jwt.sign({
        userName : user.userName,
        role : user.role
    }, process.env.JWT_KEY)

    return {token, role: user.role}
}

const GetAllUsers = async (currentUser) => {

    if(currentUser.role !== "Doctor" && currentUser.role !== "Docter"){
        throw new AppError("only doctors can view users", 403)  
    }

    const users = await User.find({})
    
    return users
}

const DeleteUser = async (userName, currentUser) => {
    if(currentUser.role !== "Doctor" && currentUser.role !== "Docter"){
        throw new AppError("Only doctors can delete users", 403)  
    }

    const user = await User.findOneAndDelete({ userName: userName })
    if(!user) {
        throw new AppError("User not found", 404)
    }
    
    return user
}

module.exports = { 
    CreateUsers,
    LoginUser,
    GetAllUsers,
    DeleteUser,
  }