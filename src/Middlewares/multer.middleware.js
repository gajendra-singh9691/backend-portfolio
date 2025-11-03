import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
         const uploadPath = path.join(__dirname, "../../public/temp");
            cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const ext = file.originalname.split(".").pop();
        const baseName = file.originalname.split(".").slice(0, -1).join(".");
        console.log(`${baseName}_${timestamp}.${ext}`);
        cb(null, `${baseName}_${timestamp}.${ext}`);
    }
})

export const upload = multer({ storage })