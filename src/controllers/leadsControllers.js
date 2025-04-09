import multer from "multer";
import LeadsModel from "../models/leadsModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postLeads = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { leadsName, email, mobileNo, address, source, status} = req.body;
  
      if ( !leadsName || !email || !mobileNo || !address || !source || !status) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
   
      const existingLeads = await LeadsModel.findOne({
        $or: [{leadsName}, {email}, {mobileNo}]
      });
      
      if (existingLeads) {
        if (existingLeads.leadsName === leadsName) {
          return res.status(400).json({ status: "error", message: "Leads Name already exists" });
        }
         if (existingLeads.email === email) {
           return res.status(400).json({ status: "error", message: " email already exists" });
        }
       }
      
      
      const newLeads = await LeadsModel.create({ leadsName, email, mobileNo, address, source, status});

      res.status(200).json({ status: "success", message: "Leads created successfully!" });
  
    } catch (error) {
      console.error("Error creating Leads:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


   export const getLeads = async (req, res) => {
    try {
      const leads = await LeadsModel.find();
  
      if (leads.length === 0) {
        return res.status(404).json({ status: "error", message: "leads not found" });
      }
  
      res.status(200).json({ status: "success", data: leads });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


 export const getLeadsById = async (req, res) => {
    try {
      const { id } = req.params; 

      const leads = await LeadsModel.findById(id); 
  
      if (!leads) {
        return res.status(404).json({ status: "error", message: "leads not found" });
      }
  
      res.status(200).json({ status: "success", data: leads });
    } catch (error) {
      console.error("Error fetching branch:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateLeads = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedleads =  await LeadsModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedleads) {
        
        return res.status(404).json({ status: "error", message: "Leads not found" });
      }
  
      res.status(200).json({ status: "success", message: "Leads updated successfully"});

    } catch (error) {
      console.error("Error updating Leads:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteLeads = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedLeads = await LeadsModel.deleteOne({ _id: id });
       
      if (deletedLeads.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Leads not found" });
      }
  
      res.status(200).json({ status: "success", message: "Leads deleted successfully" });
    } catch (error) {
      console.error("Error deleting Leads:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };