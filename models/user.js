import mongoose from 'mongoose'
import userSchema from '../schemas/user'


module.exports = mongoose.model("User",userSchema);
