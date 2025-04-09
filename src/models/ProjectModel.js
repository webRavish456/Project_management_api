import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
   
    {
        ProjectName: { 
          type: String, 
          required: true, 
          //unique: true, 
        },

       
        ProjectDescription: { 
          type: String, 
          required: true 
        },

        StartDate: { 
          type: String, 
          required: true 
        },

        EndDate: { 
          type: String, 
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

        ProjectStatus: { 
          type: String, 
          required: true 
        },

        status: { 
            type: String, 
            default: "active"
          },
          
    },

    { timestamps: true }, 

);

const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel