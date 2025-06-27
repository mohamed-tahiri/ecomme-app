import multer from 'multer';
import path from 'path';
import fs from 'fs';

const FILE_TYPES = {
    images: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    videos: ['video/mp4', 'video/avi', 'video/mkv', 'video/webm'],
    documents: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
    ],
};

const getUploadFolder = (mimetype) => {
    const type = Object.entries(FILE_TYPES).find(([_, types]) =>
        types.includes(mimetype)
    );
    return type ? type[0] : 'others';
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = getUploadFolder(file.mimetype);
        const uploadPath = path.resolve('uploads', folder);

        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${timestamp}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
});

export default multer({
    storage,
    fileFilter: (req, file, cb) => cb(null, true),
});
