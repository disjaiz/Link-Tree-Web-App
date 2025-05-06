import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/profileImages'); // This folder must exist
  },
  filename: function (_req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;
