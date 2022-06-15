import { Router } from 'express';
const router = Router();
import * as restaurantController from '../controllers/restaurant.controller';

router.get('/', restaurantController.getAll);
router.get('/:id', restaurantController.getOne);
router.post('/', restaurantController.createOne);
router.put('/:id', restaurantController.updateOne);
router.delete('/:id', restaurantController.deleteOne);

module.exports = router;