const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/Clientes-controllers');

router.get('/', ClienteController.listar);
router.get('/:id', ClienteController.buscarPorId);
router.post('/', ClienteController.criar);
router.put('/:id', ClienteController.atualizar);
router.delete('/:id', ClienteController.deletar);

module.exports = router;