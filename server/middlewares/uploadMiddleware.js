import multer from 'multer';
import path from 'path';
import fs from 'fs';

const getUploadPath = (file) => {
    const mime = file.mimetype;

    if (mime.startsWith('image/')) return 'uploads/images';
    if (mime.startsWith('video/')) return 'uploads/videos';
    if (mime === 'application/pdf' || mime.includes('msword'))
        return 'uploads/documents';

    return 'uploads/others';
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = getUploadPath(file);
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|pdf|docx|mp4/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowed.test(ext) && allowed.test(mime)) {
        cb(null, true);
    } else {
        cb(new Error('Fichier non autorisé'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default upload;
