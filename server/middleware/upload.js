const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const uploadRoot = path.resolve(__dirname, '..', 'uploads');
const configuredLimit = Number(process.env.MAX_FILE_SIZE_MB);
const maxFileSizeMB = Number.isFinite(configuredLimit) && configuredLimit > 0 ? configuredLimit : 20;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDirectory = path.join(uploadRoot, String(req.user.id));
        fs.mkdir(userDirectory, { recursive: true }, (error) => cb(error, userDirectory));
    },
    filename: (req, file, cb) => {
        cb(null, `${crypto.randomUUID()}.pdf`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf' || path.extname(file.originalname).toLowerCase() !== '.pdf') {
        return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSizeMB * 1024 * 1024 }
});

module.exports = upload;
