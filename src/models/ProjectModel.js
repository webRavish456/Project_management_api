import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
   
    {
        ProjectName: { 
          type: String, 
          required: true, 
        },

       
        ProjectDescription: { 
          type: String, 
          required: true 
        },

        StartDate: { 
          type: Date, 
          required: true 
        },

        EndDate: { 
          type: Date, 
          required: true 
        },

        Priority: { 
          type: String, 
          required: true 
        },

        Budget: { 
          type: Number, 
          required: true 
        },

        Status: { 
            type: String, 
          },
          
    },

    { timestamps: true }, 

);

const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel