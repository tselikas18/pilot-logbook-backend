import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['pilot', 'engineer'], required: true },
  authentication: {
    password: {type: String, required: true, select: false },
    salt: {type: String, select: false },
  }
});

export const UserModel = mongoose.model('Users', userSchema);  

//controllers
export const getUsers = () => UserModel.find().exec();
export const getUserByEmail = (email: string) => UserModel.findOne({ email }).exec();
export const getUserById = (id: string) => UserModel.findById(id).exec();
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then(user => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id).exec();
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, { new: true, runValidators: true }).exec();
