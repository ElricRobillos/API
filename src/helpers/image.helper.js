exports.imageFilter = (req, file, cb) => { 
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only images type of file are allowed";
        return cb(new Error("Only images type of file are allowed"), false);
    }
    cb(null, true);
}