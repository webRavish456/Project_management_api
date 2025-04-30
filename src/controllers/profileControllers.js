import multer from "multer";
import bcrypt from "bcryptjs";
import profileModel from "../models/profileModel.js";
import AdminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

/* ---------------------------create profile-----------------------------------*/

export const postProfile = async (req, res) => {
     
  const ContentType = req.headers["content-type"];
     
  if (ContentType && ContentType.includes("multipart/form-data"))  {

      try {
  
      const {name, email, mobileNo, address, dob, gender, password} = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (!name || !email || !mobileNo || !address || !dob || !gender || !password || !req.imageUrls?.image) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
    
        const profilePhoto = req.imageUrls?.image;

        const existingData = await profileModel.findOne({
          $or: [{ mobileNo }, { email }]
        });
        
  
        if (existingData) {
          if (existingData.email === email) {
            return res.status(400).json({ status: "error", message: " Email Id already exists" });
          }
          if (existingData.mobileNo == mobileNo) {
            return res.status(400).json({ status: "error", message: "Mobile Number already exists" });
          }
        }

        const user = await AdminModel.create({email, password:hashedPassword});

        const profile = await profileModel.create({name,email,mobileNo,address,dob,gender,password:hashedPassword, profilePhoto});

      res.status(200).json({ 
        status: "success", 
        message: "Profile created successfully!", 
        id: profile._id 
      });
  
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }  
  }
  };

/*--------------------------------view profile---------------------------------------*/
  export const getProfile = async (req, res) => {

    try {
 
      const id = req.params.id;
      const token = req.headers.authorization?.split(" ")[1];
      
      const profile = id 
        ? await profileModel.findById(id) 
        : await profileModel.findOne({ email: jwt.verify(token, process.env.JWT_SECRET).email });
      
      if (!profile) {
        return res.status(404).json({ status: "error", message: "Profile not found" });
      }
      
      res.status(200).json({ status: "success", data: profile });
      
    } 

    catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }

  };

/*-----------------------------Edit Profile------------------------------------------------------*/

export const updateProfile = async (req, res) => {
    
    const ContentType = req.headers["content-type"];
     
    if (ContentType && ContentType.includes("multipart/form-data"))  {

    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const currentAdmin = await AdminModel.findOne({ email: updateData.email });

      console.log(currentAdmin)
      
        const updateUser = await AdminModel.updateOne(
        { email: currentAdmin.email },
        {
          $set: {
            ...(updateData.email && { email: updateData.email }),
            ...(updateData.password && { password: updateData.password }),
          },
        }
      );
    

      console.log(updateUser)

      if (req.imageUrls?.image) {
        updateData.profilePhoto = req.imageUrls.image;
      }

      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      const updatedProfile =  await profileModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedProfile) {
        return res.status(404).json({ status: "error", message: "Profile not found" });
      }
  
      res.status(200).json({ status: "success", message: "Profile updated successfully"});

    } catch (error) {
      console.error("Error updating Profile:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }

};

