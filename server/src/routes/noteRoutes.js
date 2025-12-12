import express from 'express';
import { list, create, update, remove } from '../controllers/noteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.get('/', list);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;

