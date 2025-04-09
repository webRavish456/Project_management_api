import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteFinance, getFinance, getFinanceById, postFinance, updateFinance } from '../controllers/financeControllers.js';


export const router = express.Router();

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

router.route('/finance').post(postFinance)
router.route('/finance').get(getFinance)
router.route('/finance/:id').get(getFinanceById)
router.route('/finance/:id').patch(updateFinance)
router.route('/finance/:id').delete(deleteFinance)