import { Router } from 'express';
import * as uploadController from '../controllers/uploads.controller';
const router = Router();
const uploader = require('../config/cloudinary');

router.post('/', uploader.single('imageData'), uploadController.uploadImage);

module.exports = router;