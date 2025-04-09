import mongoose from "mongoose";

const leadsSchema = new mongoose.Schema(
   
    {
        leadsName: { 
          type: String, 
          required: true, 
          unique: true, 
        },

        email: { 
          type: String, 
          required: true 
        },

        mobileNo: { 
          type: String, 
          required: true,
        },

        address: { 
          type: String, 
          required: true, 
        },

        source: { 
          type: String, 
          required: true, 
        },

        status: { 
          type: String, 
          required: true,
          default:"View",
        },

    },

    { timestamps: true }, 

);

const LeadsModel = mongoose.model('Leads', leadsSchema);

export default LeadsModel