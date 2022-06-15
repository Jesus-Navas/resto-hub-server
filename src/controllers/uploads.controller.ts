import { RequestHandler } from 'express';

export const uploadImage: RequestHandler = (req, res) => {
    console.log(req.file);
    if (!req.file) {
        res.status(500).json({ code: 500, message: 'Error loading file' });
        return;
    } else {
        res.json({ cloudinary_url: req.file.path });
    }
};