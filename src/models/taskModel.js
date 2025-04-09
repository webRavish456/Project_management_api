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
          type: Date, 
          required: true, 
           
        },

        taskEndDate: { 
          type: Date, 
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