const express = require('express')
const router = express.Router();
var fornecedor = require("../controllers/ControlerFornecedor")
var produto = require ("../controllers/ControlerProduto")



// FORNECEDOR
router.post('/fornecedor',fornecedor.insert)
router.get('/listar',fornecedor.findall)
router.get('/listar/:NOME',fornecedor.listarcodfornecedor)



 // PRODUTO
router.post('/produto/:CODFORNECEDOR',produto.inserir)
router.get('/produto/:CODFORNECEDOR',produto.listarprodutos)
router.delete('/produto?:CODFORNECEDOR',produto.deletarproduto)

// estoque


module.exports = router