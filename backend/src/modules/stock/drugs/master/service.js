const AppError = require("../../../../utils/AppError")

const AddDrugs = async(data, user) => {

    if(user.role != "docter"){
        throw new AppError("place login as docter account", 403)
    }

    




}