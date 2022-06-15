"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const uploadImage = (req, res) => {
    console.log(req.file);
    if (!req.file) {
        res.status(500).json({ code: 500, message: 'Error loading file' });
        return;
    }
    else {
        res.json({ cloudinary_url: req.file.path });
    }
};
exports.uploadImage = uploadImage;
