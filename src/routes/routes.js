import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteFinance, getFinance, getFinanceById, postFinance, updateFinance } from '../controllers/financeControllers.js';
import { postLeads, getLeads, updateLeads, deleteLeads, getLeadsById } from '../controllers/leadsControllers.js';
import { get } from 'mongoose';
import { deletedMeetingSchedule, getMeetingScheduleById, getMeetingSchedule, postMeetingSchedule, updatedMeetingSchedule} from '../controllers/meetingScheduledControllers.js';


export const router = express.Router();

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

router.route('/finance').post(postFinance)
router.route('/finance').get(getFinance)
router.route('/finance/:id').get(getFinanceById)
router.route('/finance/:id').patch(updateFinance)
router.route('/finance/:id').delete(deleteFinance)

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
