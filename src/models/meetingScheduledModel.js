import mongoose from "mongoose";

const meetingScheduleSchema = new mongoose.Schema(
   
    {
      projectTitle: {

          type: String, 
          required: true,
          
        },

        description: { 
          type: String, 
          required: true,
        },

        scheduledby: { 
          type: String, 
          
        },

        meetingDate: { 
          type: String, 
          
        },

        duration: { 
          type: String, 
           
        },

        status: { 
          type: String, 
          
          
        },

    },

    { timestamps: true }, 

);

const MeetingScheduleModel = mongoose.model('meetingschedule', meetingScheduleSchema);

export default MeetingScheduleModel