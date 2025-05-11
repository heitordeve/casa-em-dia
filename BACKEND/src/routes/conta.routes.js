const express = require('express');
const router = express.Router();
const ContaController = require('../controllers/conta.controller');
const auth = require('../middleware/Auth');
const upload = require('../middleware/Upload');

router.use(auth);

router.post('/', ContaController.criar);
router.get('/', ContaController.listar);
router.get('/:id', ContaController.obter);
router.put('/:id', ContaController.atualizar);
router.delete('/:id', ContaController.deletar);
router.post('/:id/comprovante', upload.single('arquivo'), ContaController.uploadComprovante);

module.exports = router;
