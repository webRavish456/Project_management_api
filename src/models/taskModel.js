import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
   
    {
        
        taskTitle: { 
          type: String, 
          required: true, 
           
        },

        taskAssignee: { 
          type: String, 
          required: true 
        },
        taskStartDate: { 
          type: String, 
          required: true, 
           
        },

        taskEndDate: { 
          type: String, 
          required: true, 
        },
        taskPriority: { 
          type: String, 
          required: true, 
           
        },

        taskStatus: { 
          type: String, 
          default:"incomplete", 
        },
    },

    { timestamps: true }, 

);

const TaskModel = mongoose.model('Task', taskSchema);

export default TaskModel