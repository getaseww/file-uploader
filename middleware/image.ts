import multer from 'multer';

const maxFileSize:number=10*1024*1024;

const storage = multer.diskStorage({
    destination: 'uploads',
    
    filename: (req, file, cb) => {
        cb(null,Date.now()+'_'+file.originalname)
    }
});

export default multer({storage,  limits: { fileSize: maxFileSize }}).single("file");