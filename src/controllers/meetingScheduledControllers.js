import multer from "multer";
import MeetingScheduleModel from "../models/meetingScheduledModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postMeetingSchedule = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { projectTitle, description, scheduledby, meetingDate, duration, status} = req.body;
  
      if ( !projectTitle || !description || !scheduledby|| !meetingDate || !duration || !status) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
   
      // const existingmeetingSchedule = await meetingscheduleModel.findOne({
      //   $or: [{projectTittle}, {meetingDate}]
      // });
      
      // if (existingmeetingSchedule) {
      //   if (existingmeetingSchedule.projectTittle === projectTittle) {
      //     return res.status(400).json({ status: "error", message: "Poject Tittle Name already exists" });
      //   }
      //   //  if (existingmeetingSchedule.email === email) {
      //   //    return res.status(400).json({ status: "error", message: " email already exists" });
      //   // }
      //  }
      
      
      const newMeetingSchedule = await MeetingScheduleModel.create({ projectTitle, description, scheduledby, meetingDate, duration, status});

      res.status(200).json({ status: "success", message: " Meeting is created successfully!" });
  
    } catch (error) {
      console.error("Error creating meeting:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


   export const getMeetingSchedule = async (req, res) => {
    try {
      const meetingSchedule = await MeetingScheduleModel.find();
  
      if (meetingSchedule.length === 0) {
        return res.status(404).json({ status: "error", message: "Meeting not found" });
      }
  
      res.status(200).json({ status: "success", data: meetingSchedule });
    } catch (error) {
      console.error("Error fetching Meeting:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


 export const getMeetingScheduleById = async (req, res) => {
    try {
      const { id } = req.params; 

      const meetingSchedule= await MeetingScheduleModel.findById(id); 
  
      if (!meetingSchedule) {
        return res.status(404).json({ status: "error", message: "meeting schedule not found" });
      }
  
      res.status(200).json({ status: "success", data: meetingSchedule});
    } catch (error) {
      console.error("Error fetching branch:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updatedMeetingSchedule = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedmeetingSchedule =  await MeetingScheduleModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedmeetingSchedule) {
        return res.status(404).json({ status: "error", message: "Meeting Schedule not found" });
      }
  
      res.status(200).json({ status: "success", message: " Meeting Schedule updated successfully"});

    } catch (error) {
      console.error("Error updating Meeting:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deletedMeetingSchedule = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedMeetingSchedule = await MeetingScheduleModel.deleteOne({ _id: id });
       
      if (deletedMeetingSchedule.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Meeting not found" });
      }
  
      res.status(200).json({ status: "success", message: "Meeting deleted successfully" });
    } catch (error) {
      console.error("Error deleting Meeting:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };