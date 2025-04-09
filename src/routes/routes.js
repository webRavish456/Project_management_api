import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteTask, getTask, getTaskById, postTask, updateTask } from '../controllers/taskControllers.js';



export const router = express.Router();

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

 router.route('/task').post(postTask);
 router.route('/task').get(getTask);
 router.route('/task/:id').get(getTaskById);
 router.route('/task/:id').patch(updateTask);
 router.route('/task/:id').delete(deleteTask);