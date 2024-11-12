const express = require("express");
const cors = require("cors");
const connection = require("./db_config");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3030;

app.post('/cadastro', (req, res) =>{
    const {username, phone, address} = req.body
    const query = "INSERT INTO users (username, phone, address) VALUES (?,?,?)"
    
    connection.query(query, [username, phone, address], (err, results) =>{
        if (err) {
            return res.status(500).json({success:false, message:'Erro no servidor'})
        }
        else {
            res.json({success:true, message:'Cadastro bem sucedido', 
            data:{ id: results.insertId, username, phone, address }})
        }
    })
})

//criar um produto
app.post('/products', (req, res) => {
    const {name, quantity, price} = req.body
    const query = 'INSERT INTO products(name, price, quantity) VALUES(?,?,?)'
    connection.query(query,[name, quantity, price], (err, result) =>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao inserir produto'})
        }
        res.json({success:true, massage:'Produto adicionado', id:result.insertId})
        
    })
})

//buscar os brodutos
app.get('/products', (req, res) =>{
    const query = 'SELECT * FROM products'
    connection.query(query, (err, results) =>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao buscar produto'})
        }
        res.json({success:true, products:results})
    })
})

app.put('/products/:id', (req, res) => {
    const {id} = req.params
    const {name, quantity, price} = req.body
    const query = 'UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?'
    connection.query(query,[name, quantity, price, id], (err) =>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao atualizar produto'})
        }
        res.json({success:true, massage:'Produto atualizado'})
        
    })
})

app.delete('/products/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM products WHERE id = ?'
    connection.query(query, [id], (err)=>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao deletar produto'})
        }
        res.json({success:true, massage:'Produto deletado'})
    })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
