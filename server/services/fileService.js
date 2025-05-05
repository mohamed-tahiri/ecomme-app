import fs from 'fs';
import path from 'path';

// Supprime physiquement un fichier à partir de son chemin
const deletePhysicalFile = (filePath) => {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

// Gère l'upload d'un nouveau fichier et retourne les infos nécessaires
const getFileMetadata = (file) => {
    if (!file) throw new Error('Aucun fichier fourni');

    return {
        filename: file.filename,
        mimetype: file.mimetype,
        path: file.path.replace(/\\/g, '/'), // Chemin utilisable sous Windows/Linux
        size: file.size,
        originalname: file.originalname,
        type: getFileType(file.mimetype),
    };
};

// Déduit le type (image, video, document, autre) à partir du mimetype
const getFileType = (mimetype) => {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (
        mimetype === 'application/pdf' ||
        mimetype.includes('msword') ||
        mimetype.includes('officedocument')
    ) {
        return 'document';
    }
    return 'other';
};

// Met à jour un fichier : supprime l'ancien fichier physique et retourne les données du nouveau
const updateFile = (existingFilePath, newFile) => {
    deletePhysicalFile(existingFilePath);
    return getFileMetadata(newFile);
};

export { deletePhysicalFile, getFileMetadata, updateFile, getFileType };
