
const con = require('../config/server')

 exports.insert = (req,res)=>{ // função para cadastrar fornecedor 
    var {NOME,CNPJ,ENDERECO,CONTATO} = req.body // busca a requisão dos campos para cadastro
    let sql = "INSERT INTO fornecedor (NOME,CNPJ,ENDERECO,CONTATO) VALUES (?,?,?,?)"
    if (NOME == "" | CNPJ == "" | ENDERECO == "" | CONTATO == ""){
        res.status(400).json({"MSG":"POR FAVOR PREENCHA TODOS OS CAMPOS"})
    }
    else{
        con.query(sql,[NOME,CNPJ,ENDERECO,CONTATO],(err,row)=>{ // insere um fornecedor
            if (err){
                if (err.code == 'ER_DUP_ENTRY'){ // campo CPNJ é unique e está verificando o codigo do erro
                    res.status(400).json({"msg":"FORNECEDOR JÁ ESTÁ CADASTRADO"})
                }
                else{
                    res.status(500).json({"MSG":"ERRO DATABASE"}) // caso não seja erro de cnpj é database
                }
            }
            else{
                res.status(201).json({"MSG":"FORNECEDOR CADASTRADO COM SUCESSo"}) // caso de certo cadastrar um fornecedor 
                res.status(row)
            }
        })
    }
    
}

exports.findall = (req,res) =>{
    let sql = "SELECT * FROM fornecedor"
    con.query(sql, (err,rows)=>{
        if (err){
            res.status(500).json({"msg":"database error"})
            console.log(err)
        }
        else{
            res.json(rows)
            res.status(200)
        }
    })
}

exports.listarcodfornecedor = (req,res) => {
    let id = req.params
    let sql = "SELECT * from fornecedor WHERE NOME=?"
    con.query(sql,[id.NOME],(err,row)=>{
        if (err){
            console.log(err)
            res.status(500).json({"MSG":"DATABASE ERROR"})
        }
        else{
            if (row.length > 0){
                res.json(row)
            }
            else{
                res.status(404).json({"MSG":"Fornecedor não encontrado"})
            }
        }
    })
}
