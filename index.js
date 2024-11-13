const express = require('express');
const { pool } = require('./db/connection');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/clientes", (req, res) => {
    pool.query("SELECT * FROM Clientes;", (error, result) => {
        if (error) {
            res.status(400).send("Error");
            return;
        }
        res.json(result.rows);
    });
})

app.get("/equipamentos", (req, res) => {
    pool.query("SELECT e.*, c.nome AS cliente_nome FROM Equipamentos e JOIN Clientes c ON e.cliente_id = c.id;", (error, result) => {
        if (error) {
            res.status(400).send("Error");
            return;
        }
        
        res.json(result.rows);
    });
})

app.post("/equipamentos", async (req, res) => {
    const { nome, descricao, data_aquisicao, modelo, serial_number, cliente_id } = req.body;

    // Validação de dados recebidos
    if (!nome || !descricao || !data_aquisicao || !modelo || !serial_number || !cliente_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const query = `
            INSERT INTO equipamentos (nome, descricao, data_aquisicao, modelo, serial_number, cliente_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const values = [nome, descricao, data_aquisicao, modelo, serial_number, cliente_id];
        const { rows } = await pool.query(query, values);
        await sendEmail(cliente.nome, cliente.email, equipamento.data_aquisicao, equipamento.nome, ); // aqui vai chamar a função de enviar o email
        // será necessário substituir os parâmetros acima pelos dados desejados no envio da mensagem.

        return res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Erro ao inserir equipamento:', error);

        // Log completo do erro
        if (error instanceof Error) {
            console.error('Erro detalhado:', error.stack);
        }

        return res.status(500).json({ message: 'Erro interno ao tentar inserir o equipamento.', error: error.message });
    }
});


app.post("/clientes", async (req, res) => {
    const { nome, email, telefone, endereco } = req.body;
    const result = await pool.query(
        "INSERT INTO clientes (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING *",
        [nome, email, telefone, endereco]
    );
    res.status(201).json(result.rows[0]);
});


app.delete("/equipamentos/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM equipamentos WHERE id = $1", [id]);
    res.status(204).send();
});

app.put("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;
    const result = await pool.query(
        "UPDATE clientes SET nome = $1, email = $2, telefone = $3, endereco = $4 RETURNING *",
        [nome, email, telefone, endereco]
    );
    res.json(result.rows[0]);

});

app.put("/equipamentos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, descrição, data_aquisição, modelo, serial_number, cliente_id } = req.body;
    const result = await pool.query(
        "UPDATE equipamentos SET nome = $1, descrição = $2, data_aquisição = $3, modelo = $4, serial_number = $5, cliente_id = $6 RETURNING *",
        [nome, descrição, data_aquisição, modelo, serial_number, cliente_id]
    );
    res.json(result.rows[0]);

});


app.listen(port, () => {
    pool.connect().then(client => {
        console.log('Connected to the database');
        client.release();
    }).catch(err => {
        console.error('Error connecting to the database', err);
    });
    console.log(`Server is running on port ${port}`);

});