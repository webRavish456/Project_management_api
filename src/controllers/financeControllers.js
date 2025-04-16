import multer from "multer";
// import BranchModel from "../models/branchModel.js";
import financeModel from "../models/financeModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postFinance = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const {name,amount,TransactionType,Category,PaymentMode,TransactionDate,Status} = req.body;
  
      if (!name || !amount || !TransactionType || !Category || !PaymentMode || !TransactionDate || !Status) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

      
      const newname = await financeModel.create({name,amount,TransactionType,Category,PaymentMode,TransactionDate,Status});

      res.status(200).json({ status: "success", message: "Finance created successfully!" });
  
    } catch (error) {
      console.error("Error creating finance:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getFinance = async (req, res) => {
    try {
      const finances = await financeModel.find();
  
      if (!finances) {
        return res.status(404).json({ status: "error", message: "Finance Name not found" });
      }
  
      res.status(200).json({ status: "success", data: finances });
    } catch (error) {
      console.error("Error fetching finance:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getFinanceById = async (req, res) => {
    try {
      const { id } = req.params; 

      const finance = await financeModel.findById(id); 
         console.log(id);
         console.log(finance)
      if (!finance) {
        return res.status(404).json({ status: "error", message: "Finance not found" });
      }
  
      res.status(200).json({ status: "success", data: finance });
    } catch (error) {
      console.error("Error fetching finance:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateFinance = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedFinance =  await financeModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedFinance) {
        return res.status(404).json({ status: "error", message: "finance not found" });
      }
  
      res.status(200).json({ status: "success", message: "Finance updated successfully"});

    } catch (error) {
      console.error("Error updating finance:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteFinance = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedFinance = await financeModel.deleteOne({ _id: id });
       
      if (deletedFinance.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Finance not found" });
      }
  
      res.status(200).json({ status: "success", message: "finance deleted successfully" });
    } catch (error) {
      console.error("Error deleting finance:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };