const { CreateUsers, LoginUser, GetAllUsers, DeleteUser } = require("./service");

const createUser = async(req,res,next) => {
    console.log(req.body)
    console.log(req.user)
    try{
        const responce = await CreateUsers(req.body, req.user)
        res.status(201).json({
            message : "user created is successfull",
            user : responce
        })

        console.log(responce)
    }catch(error){
        next(error)
    }       
}

const loginUser = async(req,res,next) => {
   
    try{

        const responce = await LoginUser(req.body.username, req.body.password)
        res.status(201).json({
            message : "Login successfull",
            token : responce.token,
            role: responce.role,
        })
    }catch(error){
        next(error)
    }
}

const viewUsers = async (req, res, next) => {
    try {
        const users = await GetAllUsers(req.user);
        res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        console.log(req.params.username)
        const response = await DeleteUser(req.params.username, req.user)
        res.status(200).json({message : "User Deleted"})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createUser,
    loginUser,
    viewUsers,
    deleteUser,
};