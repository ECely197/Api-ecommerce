import multer from "multer";
import path from "path";

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'public/uploads'); // Usa process.cwd() en lugar de path.resolve()
        cb(null, uploadDir); // Ruta de almacenamiento
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix); // Nombre del archivo único
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('No es un archivo de imagen'), false);
    }
};

// Configuración de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;
