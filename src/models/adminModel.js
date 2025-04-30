import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
   
    {
        email: { 
          type: String, 
          required: true, 
          unique: true, 
        },

        password: { 
          type: String, 
          required: true 
        },
        userId:{
          type: String,
        }
    },

    { timestamps: true }, 

);

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel