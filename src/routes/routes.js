import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';

import { deleteProject, getProject, getProjectById, postProject, updateProject} from '../controllers/ProjectControllers.js';
import { deleteTask, getTask, getTaskById, postTask, updateTask } from '../controllers/taskControllers.js';


import { deleteFinance, getFinance, getFinanceById, postFinance, updateFinance } from '../controllers/financeControllers.js';
import { postClient, getClient, getClientById, updateClient, deleteClient } from '../controllers/clientControllers.js';
import { postLeads, getLeads, updateLeads, deleteLeads, getLeadsById } from '../controllers/leadsControllers.js';

import { deletedMeetingSchedule, getMeetingScheduleById, getMeetingSchedule, postMeetingSchedule, updatedMeetingSchedule} from '../controllers/meetingScheduledControllers.js';
import verifyToken from '../middleware/auth.js';
import { getProfile, postProfile, updateProfile } from '../controllers/profileControllers.js';
import uploadProfile from '../upload/profile.js';


export const router = express.Router();

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot); 


 router.route('/profile').post(verifyToken, uploadProfile, postProfile);
 router.route('/profile/:id').get(verifyToken, getProfile);
 router.route('/profile/:id').patch(verifyToken, uploadProfile, updateProfile );


 router.route('/task').post(verifyToken, postTask);
 router.route('/task').get(verifyToken, getTask);
 router.route('/task/:id').get(verifyToken, getTaskById);
 router.route('/task/:id').patch(verifyToken, updateTask);
 router.route('/task/:id').delete(verifyToken, deleteTask);




router.route('/project').post(verifyToken, postProject)
router.route('/project').get(verifyToken, getProject)
router.route('/project/:id').get(verifyToken, getProjectById)
router.route('/project/:id').patch(verifyToken, updateProject)
router.route('/project/:id').delete(verifyToken, deleteProject)


router.route('/finance').post(verifyToken, postFinance)
router.route('/finance').get(verifyToken, getFinance)
router.route('/finance/:id').get(verifyToken, getFinanceById)
router.route('/finance/:id').patch(verifyToken, updateFinance)
router.route('/finance/:id').delete(verifyToken, deleteFinance)

router.route('/client').post(verifyToken, postClient);
router.route('/client').get(verifyToken, getClient);
router.route('/client/:id').get(verifyToken, getClientById);
router.route('/client/:id').patch(verifyToken, updateClient);
router.route('/client/:id').delete(verifyToken, deleteClient);


router.route('/leads').post(verifyToken, postLeads);
router.route('/leads').get(verifyToken, getLeads);
 router.route('/leads/:id').get(verifyToken, getLeadsById);
 router.route('/leads/:id').patch(verifyToken, updateLeads);
router.route('/leads/:id').delete(verifyToken, deleteLeads);


router.route('/meetingSchedule').post(verifyToken, postMeetingSchedule);
router.route('/meetingSchedule').get(verifyToken, getMeetingSchedule);
router.route('/meetingSchedule/:id').get(verifyToken, getMeetingScheduleById);
router.route('/meetingSchedule/:id').patch(verifyToken, updatedMeetingSchedule);
router.route('/meetingSchedule/:id').delete(verifyToken, deletedMeetingSchedule);


