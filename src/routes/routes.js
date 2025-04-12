import express from 'express'
//import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteTask, getTask, getTaskById, postTask, updateTask } from '../controllers/taskControllers.js';

//import { postAdmin  } from '../controllers/authControllers.js';
import { deleteProject, getProject, getProjectById, postProject, updateProject} from '../controllers/ProjectControllers.js';

import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteFinance, getFinance, getFinanceById, postFinance, updateFinance } from '../controllers/financeControllers.js';
import { postClient, getClient, getClientById, updateClient, deleteClient } from '../controllers/clientControllers.js';
import { postLeads, getLeads, updateLeads, deleteLeads, getLeadsById } from '../controllers/leadsControllers.js';
 import { get } from 'mongoose';
import { deletedMeetingSchedule, getMeetingScheduleById, getMeetingSchedule, postMeetingSchedule, updatedMeetingSchedule} from '../controllers/meetingScheduledControllers.js';


export const router = express.Router();

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

 router.route('/task').post(postTask);
 router.route('/task').get(getTask);
 router.route('/task/:id').get(getTaskById);
 router.route('/task/:id').patch(updateTask);
 router.route('/task/:id').delete(deleteTask);
//router.route('/forgot').post(postForgot);


router.route('/project').post(postProject)
router.route('/project').get(getProject)
router.route('/project/:id').get(getProjectById)
router.route('/project/:id').patch(updateProject)
router.route('/project/:id').delete(deleteProject)
// router.route('/forgot').post(postForgot);


router.route('/finance').post(postFinance)
router.route('/finance').get(getFinance)
router.route('/finance/:id').get(getFinanceById)
router.route('/finance/:id').patch(updateFinance)
router.route('/finance/:id').delete(deleteFinance)


router.route('/client').post(postClient);
router.route('/client').get(getClient);
router.route('/client/:id').get(getClientById);
router.route('/client/:id').patch(updateClient);
router.route('/client/:id').delete(deleteClient);


router.route('/leads').post(postLeads);
router.route('/leads').get(getLeads);
 router.route('/leads/:id').get(getLeadsById);
 router.route('/leads/:id').patch(updateLeads);
router.route('/leads/:id').delete(deleteLeads);


router.route('/meetingSchedule').post(postMeetingSchedule);
router.route('/meetingSchedule').get(getMeetingSchedule);
router.route('/meetingSchedule/:id').get(getMeetingScheduleById);
router.route('/meetingSchedule/:id').patch(updatedMeetingSchedule);
router.route('/meetingSchedule/:id').delete(deletedMeetingSchedule);
