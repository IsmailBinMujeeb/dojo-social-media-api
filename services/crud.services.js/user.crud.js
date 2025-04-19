import userModel from "../../models/user.model.js";

const userCreate = async (data) => {

        const newUser = await userModel.create(data);
        
        return newUser;
}

const userFindById = async (id) => {

    const user = await userModel.findById(id);
    return user;
}

const userFindByUserhandle = async (userhandle) => {
    const user = await userModel.findOne({ userhandle });
    return user;
}

const userUpdate = async (id, data) => {
    const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
}

const userDelete = async (id) => {
    const deletedUser = await userModel.deleteOne({ _id: id });
    return deletedUser;
}

const userFindAll = async () => {
    const users = await userModel.find();
    return users;
}

export default {
    userCreate,
    userFindById,
    userFindByUserhandle,
    userUpdate,
    userDelete,
    userFindAll,
}