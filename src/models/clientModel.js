import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
   
    {
        name: { 
          type: String, 
          required: true, 
          
        },

        email: { 
          type: String, 
          required: true,
           unique: true 
        },
        
        mobileNo: { 
          type: Number, 
          required: true ,
           unique: true 
        },
        
        address: { 
          type: String, 
          required: true 
        },
        
        companyName: { 
          type: String, 
          required: true 
        },

    },

    { timestamps: true }, 

);

const ClientModel = mongoose.model('Client', clientSchema);

export default ClientModel