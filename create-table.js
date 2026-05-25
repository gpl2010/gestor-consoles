import { sql } from "./db.js";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS videogames (
    id VARCHAR(255) PRIMARY KEY,
    price INT,
    description TEXT,
    title VARCHAR(255),
    games VARCHAR(255)
);
`;
sql.query(createTableQuery)
    .then(() => {
        console.log("Tabela 'videogames' criada ou já existente com sucesso no MySQL");
    })
    .catch((err) => {
        console.error("Erro ao criar a tabela no MySQL:");
        console.error(err.message);
    });
