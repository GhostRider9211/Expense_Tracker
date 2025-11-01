import { Router } from 'express';
import * as controller from '../controller/controller.js';
import { authenticateToken } from '../middleware/authmiddleware.js'; 

const router = Router();


router
  .route('/api/categories')
  .post(authenticateToken, controller.create_category)  
  .get(authenticateToken, controller.get_category);    

router
  .route('/api/transaction')
  .post(authenticateToken, controller.create_Transaction) 
  .get(authenticateToken, controller.get_transaction)     
  .delete(authenticateToken, controller.delete_transaction); 

router
  .route('/api/labels')
  .get(authenticateToken, controller.get_label); 

export default router;
