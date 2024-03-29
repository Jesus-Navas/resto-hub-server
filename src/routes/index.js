"use strict";
const router = require('express').Router();
const restaurantRouter = require('./restaurant.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const uploadRouter = require('./uploads.routes');
router.use('/restaurants', restaurantRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/uploads', uploadRouter);
module.exports = router;
