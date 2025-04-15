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
  
      const { name,email, mobileNo, address, companyName} = req.body;
      // console.log(req.body)
      if (!name || !email || !mobileNo || !address || !companyName ) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
      const newClient = await ClientModel.create({ name,email, mobileNo, address, companyName});

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
  
      if (!client) {
        return res.status(404).json({ status: "error", message: "Client not found" });
      }
  
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
  
      if (! client) {
        return res.status(404).json({ status: "error", message: "Client not found" });
      }
  
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
       
      if (deletedClient.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Client not found" });
      }
  
      res.status(200).json({ status: "success", message: "Client deleted successfully" });
    } catch (error) {
      console.error("Error deleting Client:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };