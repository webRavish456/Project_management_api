import multer from "multer";
import ClientModel from "../models/clientModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postClient = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { name,email, mobileNo, address, companyName, status} = req.body;
   
      if (!name || !email || !mobileNo || !address || !companyName || !status ) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

         const existingData = await ClientModel.findOne({
          $or: [{ mobileNo }, { email }]
        });
        
  
        if (existingData) {
          if (existingData.email === email) {
            return res.status(400).json({ status: "error", message: " Email Id already exists" });
          }
          if (existingData.mobileNo == mobileNo) {
            return res.status(400).json({ status: "error", message: "Mobile Number already exists" });
          }
        }
  
      const newClient = await ClientModel.create({ name,email, mobileNo, address, companyName, status});

      res.status(200).json({ status: "success", message: "Client created successfully!" });
  
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };

  

  export const getClient = async (req, res) => {
    try {
      const client = await ClientModel.find();

      res.status(200).json({ status: "success", data: client });
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };



export const getClientById = async (req, res) => {
    try {
      const { id } = req.params; 

      const client = await ClientModel.findById(id); 
  
      res.status(200).json({ status: "success", data: client });
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };



  export const updateClient = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedClient =  await ClientModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedClient) {
        return res.status(404).json({ status: "error", message: "Client not found" });
      }
  
      res.status(200).json({ status: "success", message: "Client updated successfully"});

    } catch (error) {
      console.error("Error updating client:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  

  export const deleteClient = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedClient = await ClientModel.deleteOne({ _id: id });
      
      if (!deletedClient) {
        return res.status(404).json({ status: "error", message: "Client not found"    });
      }
 
      res.status(200).json({ status: "success", message: "Client deleted successfully" });
    } catch (error) {
      console.error("Error deleting Client:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };