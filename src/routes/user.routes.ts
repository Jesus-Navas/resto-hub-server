import { Router } from 'express';
const router = Router();

import * as userController from '../controllers/user.controller';

router.put('/add/:id', userController.addFavouriteRestaurant);
router.put('/remove/:id', userController.removeFavouriteRestaurant);
router.post('/check/:id', userController.checkFavourite);
router.post('/getfavourites', userController.getFavourites);

module.exports = router;