import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
   
    {
        name: { 
          type: String, 
          required: true, 
          // unique: true, 
        },

        amount: { 
          type: Number, 
          required: true 
        },

        TransactionType: { 
          type: String, 
          required: true 
        },

        Category: { 
          type: String, 
          required: true 
        },

        PaymentMode: { 
          type: String, 
          required: true 
        },

        TransactionDate: { 
          type: Date, 
          required: true 
        },

        Status: { 
            type: String, 
            default: "Pending"
          },
          
    },

    { timestamps: true }, 

);

const financeModel = mongoose.model('Finance', financeSchema);

export default financeModel