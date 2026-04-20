const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/Produtos-controllers');

router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);
router.post('/', ProdutoController.criar);
router.put('/:id', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.deletar);
router.patch('/:id/promocao', ProdutoController.aplicarPromocao);
router.delete('/:id/promocao', ProdutoController.removerPromocao);

module.exports = router;