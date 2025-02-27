const express = require("express");
const cors = require("cors");
const connection = require("./db_config");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3030;

app.post('/cadastro', (req, res) =>{
    const {username, password, address} = req.body
    const query = "INSERT INTO users (username, password, address) VALUES (?,?,?)"
    
    connection.query(query, [username, password, address], (err, results) =>{
        if (err) {
            return res.status(500).json({success:false, message:'Erro no servidor'})
        }
        else {
            res.json({success:true, message:'Cadastro bem sucedido', 
            data:{ id: results.insertId, username, password, address }})
        }
    })
})

//criar um produto
app.post('/cars', (req, res) => {
    const {name} = req.body
    const query = 'INSERT INTO cars(name) VALUES(?)'
    connection.query(query,[name], (err, result) =>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao inserir produto'})
        }
        res.json({success:true, massage:'Produto adicionado', id:result.insertId})
        
    })
})

//buscar os brodutos
app.get('/cars', (req, res) =>{
    const query = 'SELECT * FROM cars'
    connection.query(query, (err, results) =>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao buscar produto'})
        }
        res.json({success:true, cars:results})
    })
})

app.put('/cars/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body
    const query = 'UPDATE cars SET name = ? WHERE id = ?'
    connection.query(query,[name, id], (err) =>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao atualizar produto'})
        }
        res.json({success:true, massage:'Produto atualizado'})
        
    })
})

app.delete('/cars/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM cars WHERE id = ?'
    connection.query(query, [id], (err)=>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao deletar produto'})
        }
        res.json({success:true, massage:'Produto deletado'})
    })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
