const con = require('../config/server')

exports.inserir = (req,res) => {
    let findcodfornecedor = "SELECT * FROM fornecedor WHERE CODFORNECEDOR = ?"
    let findproduto = "SELECT * FROM produto p, fornecedor f WHERE f.CODFORNECEDOR = p.CODFORNECEDOR AND f.CODFORNECEDOR = ? AND P.NOME = ?"
    let sql = "INSERT INTO produto(NOME,PRECO,CODFORNECEDOR) VALUES (?,?,?)"
    let nome = req.body.NOME
    let preco = req.body.PRECO
    let codfornecedor = req.params.CODFORNECEDOR

    con.query(findcodfornecedor,[codfornecedor],(err,row)=>{ // buscar fornecedor pelo codigo pk
        if (err){
            console.log(err)
            res.status(500).json({"ERRO":"DATABASE"}) // erro no banco 
        }
        else{ // se encontrou fornecedor ....
            if (row.length > 0){
                con.query(findproduto,[codfornecedor,nome],(err,rows)=>{ // procura se o fornecedor já tem o produto cadastrado
                    if(err){
                        console.log(err) // *********
                    }
                    else{
                        if (rows.length > 0){ // verifica se o fornecedor já cadastrou o produto
                            res.status(400).json({"MSG":"PRODUTO JÁ CADASTRADO"})}
                        else{
                            if (nome == "" | preco == ""){
                                res.status(400).json({"MSG":"POR FAVOR PREENCHA TODOS OS CAMPOS"})}
                            else{
                                con.query(sql,[nome,preco,codfornecedor])
                                res.status(201).json({"MSG":"PRODUTO CADASTRADO COM SUCESSO"})}
                        } 
                    }
    
                })
            }
            else{
                res.status(404).json({"MSG":"FORNECEDOR NÃO CADASTRADO"}) // se não encontrou fornecedor ...
            }   
        }
    }) 
}

exports.listarprodutos = (req,res)=>{
    let sql = "SELECT  p.CODFORNECEDOR, f.nome as NOME_FORNECEDOR, p.NOME AS NOME_PRODUTO, preco FROM fornecedor f , produto p WHERE f.CODFORNECEDOR = p.CODFORNECEDOR AND f.CODFORNECEDOR = ?"
    let fornecedor = req.params.CODFORNECEDOR
    con.query(sql,[fornecedor],(err,row)=>{
        if (err){
            console.log(err).json({"MSG":"DATABASE ERRO"})
        }
        else{
            if (row.length > 0){
                res.status(200).json(row)
            }
            else{
                res.status(404).json({"MSG":"FORNECEDOR NÃO ENCONTRADO"})
            }
        }
    })
}

exports.deletarproduto = (req,res) =>{
    let sql = " DELETE FROM produto  WHERE produto.CODFORNECEDOR = ? AND produto.NOME = ? "
    let codfornecedor = req.query.CODFORNECEDOR
    let nome = req.query.NOME
    con.query(sql,[codfornecedor,nome],(err,row)=>{
        if (err){
            console.log(err)
        }
        else{
            res.status(200)
            res.send(row)
        }
    })

   
}
    