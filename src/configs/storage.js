import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Setting up __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  //Creating Destination
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  //Creating unique filename
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Export the multer
const upload = multer({ storage });

export default upload;
