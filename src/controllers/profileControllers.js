import multer from "multer";

import profileModel from "../models/profileModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

/* ---------------------------create profile-----------------------------------*/

export const postProfile = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const {name,email,contact,address,dob,gender,password} = req.body;
  
      if (!name || !email || !contact || !address || !dob || !gender || !password) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

      
      const newname = await profileModel.create({name,email,contact,address,dob,gender,password});

      res.status(200).json({ status: "success", message: "Profile created successfully!" });
  
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };

/*--------------------------------view profile---------------------------------------*/
  export const getProfile = async (req, res) => {
    try {
      const profiles = await profileModel.find();
  
      if (!profiles) {
        return res.status(404).json({ status: "error", message: "Profile not found" });
      }
  
      res.status(200).json({ status: "success", data: profiles });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };

/*-----------------------------Edit Profile------------------------------------------------------*/

export const updateProfile = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedProfile =  await profileModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedProfile) {
        return res.status(404).json({ status: "error", message: "Profile not found" });
      }
  
      res.status(200).json({ status: "success", message: "Profile updated successfully"});

    } catch (error) {
      console.error("Error updating Profile:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
};

/*-----------------------------Delete Profile---------------------------------*/

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProfile = await profileModel.deleteOne({ _id: id });
     
    if (deletedProfile.deletedCount === 0) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    res.status(200).json({ status: "success", message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting finance:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
  
};