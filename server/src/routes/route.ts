import {Router } from 'express';

import * as controller from '../controller/controller.js'

const router = Router();

router 
.route('/api/categoories')
.post(controller.create_category)
.get(controller.get_category);

router
.route('/api/transaction')
.post(controller.create_Transaction)
.get(controller.get_transaction)
.delete(controller.delete_transaction);

router
.route('/api/labels')
.get(controller.get_label);

export default router;
