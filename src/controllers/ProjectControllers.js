import multer from "multer";
import ProjectModel from "../models/ProjectModel.js";



const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postProject = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const {ProjectName,ProjectDescription,StartDate,EndDate,Priority,Budget,Status}= req.body;
  console.log("requestbody",req.body)
      if (! ProjectName || !ProjectDescription || !StartDate || !EndDate || !Priority || !Budget || !Status ) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
   
      const existingProject = await ProjectModel.findOne({
        $or: [{ ProjectName }, { ProjectDescription}]
      });
      
      if (existingProject) {
        if (existingProject.ProjectName === ProjectName) {
          return res.status(400).json({ status: "error", message: "Project Name already exists" });
        }
        if (existingProject.ProjectDescription === ProjectDescription) {
          return res.status(400).json({ status: "error", message: "ProjectDescription already exists" });
        }
      }

      

     
     const newProject = await ProjectModel.create({ProjectName,ProjectDescription,StartDate,EndDate,Priority,Budget,Status});

      res.status(200).json({ status: "success", message: "Project created successfully!" });
  
    } 
    catch (error) {
      console.error("Error creating Project:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


export const getProject = async (req, res) => {
      try {
        const Project = await ProjectModel.find();
    
        if (Project.length === 0) {
          return res.status(404).json({ status: "error", message: "Project not found" });
        }
    console.log("project",Project)
        res.status(200).json({ status: "success", data: Project });
      } catch (error) {
        console.error("Error fetching Project:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
    };
  
  
   export const getProjectById = async (req, res) => {
      try {
        const { id } = req.params; 
  
        const Project = await ProjectModel.findById(id); 
    
        if (!Project) {
          return res.status(404).json({ status: "error", message: "Project not found" });
        }
    
        res.status(200).json({ status: "success", data: Project });
      } catch (error) {
        console.error("Error fetching branch:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
    };
  
  
    export const updateProject = async (req, res) => {
  
      const ContentType = req.headers["content-type"];
    
      if (ContentType && ContentType.includes("multipart/form-data")) {
    
        upload.none()(req, res, async (err) => {
          if (err) {
            return res.status(500).json({ status: "error", msg: "Error handling form data" });
          }
      try {
        const { id } = req.params;
        const updateData = req.body; 
        const updatedProject =  await ProjectModel.updateOne({ _id: id }, { $set: updateData });
    
        if (!updatedProject) {
          return res.status(404).json({ status: "error", message: "Project not found" });
        }
    
        res.status(200).json({ status: "success", message: "Project updated successfully"});
  
      } catch (error) {
        console.error("Error updating Project:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
  })
      }
    };
  
    
    export const deleteProject = async (req, res) => {
      try {
        const { id } = req.params;
    
        const deletedProject = await ProjectModel.deleteOne({ _id: id });

        if (!deletedProject) {
          return res.status(404).json({ status: "error", message: "Project not found"   });
        }
        
        res.status(200).json({ status: "success", message: "Project deleted successfully" });
      } catch (error) {
        console.error("Error deleting Project:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
      
    };