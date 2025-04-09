import multer from "multer";
import TaskModel from "../models/taskModel.js";


const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postTask = async (req, res) => {

  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {

    upload.none()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ status: "error", msg: "Error handling form data" });
      }

      // const { taskTitle, taskAssignee,taskStartDate,taskEndDate,taskPriority,taskStatus } = req.body;

      // if ( !taskTitle || !taskAssignee || !taskStartDate || !taskEndDate || !taskPriority || !taskStatus) {
      //   return res.status(400).json({ status: "error", message: "All fields are required" });
      // }

      try {
        const { taskTitle, taskAssignee,taskStartDate,taskEndDate,taskPriority,taskStatus } = req.body;

      if ( !taskTitle || !taskAssignee || !taskStartDate || !taskEndDate || !taskPriority || !taskStatus) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
        // const existingAdmin = await AdminModel.findOne({ email });

        // if (!existingAdmin) {
        //   return res.status(401).json({ status: "error", message: "Invalid credentials" });
        // }

        // if (!existingAdmin.password) {
        //   return res.status(500).json({ status: "error", message: "Password field missing in DB" });
        // }

        // const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);

        // if (!isPasswordValid) {
        //   return res.status(401).json({ status: "error", message: "Invalid credentials" });
        // }
          const newTask =await TaskModel.create({taskTitle,taskAssignee,taskStartDate,taskEndDate,taskPriority,taskStatus});
          res.status(200).json({ status:"success",message:"task created successfully" });
        
      } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
    });

  } 
};

export const getTask = async (req, res) => {
  try {
    const tasks = await TaskModel.find();

    if (tasks.length === 0) {
      return res.status(404).json({ status: "error", message: "Task not found" });
    }

    res.status(200).json({ status: "success", data: tasks });
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params; 

    const task = await TaskModel.findById(id); 

    if (!task) {
      return res.status(404).json({ status: "error", message: "Task not found" });
    }

    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


export const updateTask = async (req, res) => {

  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {

    upload.none()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ status: "error", msg: "Error handling form data" });
      }
  try {
    const { id } = req.params;
    const updateData = req.body; 
    const updatedTask =  await TaskModel.updateOne({ _id: id }, { $set: updateData });

    if (!updatedTask) {
      return res.status(404).json({ status: "error", message: "Task not found" });
    }

    res.status(200).json({ status: "success", message: "Task updated successfully"});

  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
})
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await TaskModel.deleteOne({ _id: id });
     
    if (deletedTask.deletedCount === 0) {
      return res.status(404).json({ status: "error", message: "Task not found" });
    }

    res.status(200).json({ status: "success", message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting Task:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
  
}