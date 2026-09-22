const express = require('express'); // Usando o framework express
const mysql = require('mysql2'); // Usando o mysql

const app = express(); // Criar uma instância do express
const port = process.env.PORT || 3000;

//configurando o banco de dados de acordo com aquilo que estava no docker compose do serviço do node
const dbconfig={
    host: process.env.DB_HOST || 'localhost', // colocando || caso não consiga acessar
    user:process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test'
};

app.get('/',(req,res)=>{
    const connection = mysql.createConnection(dbconfig);

    connection.connect((err)=>{
        if(err){
            console.error('Erro ao conectar ao MySQL:',err.stack);
            return res.status(500).send(`<h1> Erro na conexão com o Banco de Dados</h1><p>${err.message}</p>`);
    }

    res.send(`
        <h1>Aplicação Web Rodando com Sucesso! </h1><p>Conexão com o banco de Dados <strong>MySQL</strong> estabelecida perfeitamente.</p>`);
        // ele encerra a conexão após conseguir conectar, porque o app não faz nada
        // o ideal é usar um connection pool pra gerenciar as conexões, sem precisar ficar criando e fechando toda hora
        connection.end();
    
    });
});

app.listen(port,()=>{
    console.log(`Aplicação rodando na porta ${port}`);
});
