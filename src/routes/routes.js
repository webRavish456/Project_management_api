import express from 'express'
import { postAdmin  } from '../controllers/authControllers.js';
import { deleteProject, getProject, getProjectById, postProject, updateProject} from '../controllers/ProjectControllers.js';


export const router = express.Router();

router.route('/login').post(postAdmin);
//router.route('/forgot').post(postForgot);


router.route('/project').post(postProject)
router.route('/project').get(getProject)
router.route('/project/:id').get(getProjectById)
router.route('/project/:id').patch(updateProject)
router.route('/project/:id').delete(deleteProject)