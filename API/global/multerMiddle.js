import multer from "multer";

const userImageConfiguration = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/users");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

export const userImageUpload = multer({ storage: userImageConfiguration });
