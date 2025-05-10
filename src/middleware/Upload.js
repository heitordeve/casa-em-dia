const multer = require('multer');
const path = require('path');
const fs = require('fs');

const pasta = path.join(__dirname, './uploads');
if (!fs.existsSync(pasta)) fs.mkdirSync(pasta, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pasta),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nome = `${req.params.id}-${Date.now()}${ext}`;
    cb(null, nome);
  }
});

module.exports = multer({ storage });
