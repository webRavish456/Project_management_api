import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { postClient, getClient, getClientById, updateClient, deleteClient } from '../controllers/clientControllers.js';


export const router = express.Router();

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

router.route('/client').post(postClient);
router.route('/client').get(getClient);
router.route('/client/:id').get(getClientById);
router.route('/client/:id').patch(updateClient);
router.route('/client/:id').delete(deleteClient);