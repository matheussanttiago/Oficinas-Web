const multer = require('multer');


const armazenamentoMemoria = multer.memoryStorage()
//adiciona este espaço ao método de upload
const upload = multer({
  storage: armazenamentoMemoria,
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  //   }
  // }
})

module.exports = upload