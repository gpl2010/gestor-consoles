import { fastify } from 'fastify';
import { DatabaseMYSQL } from './database-mysql.js';
import 'dotenv/config';
const { PORT } = process.env;

console.log('Variáveis de ambiente carregadas:', { PORT });

const server = fastify();

server.get('/', async (request, reply) => {
  return { message: 'API server - Gestor de Loja de Consoles' };
});
const database = new DatabaseMYSQL();
server.post("/videogames", async (request, reply) => {
    const { title, description, price, games } = request.body;
    await database.create({
        title,
        description,
        price,
        games,
    });
    console.log(await database.list());
    return reply.status(201).send();
})
server.get("/videogames", async (request) => {
    const search = request.query.search;
    console.log(search);
    const videogames = await database.list(search);
    return videogames
})
server.put("/videogames/:id", async (request,reply) => {

    const videogamesId = request.params.id;
    const { title, description, price, games } = request.body;

    const videogames = await database.update(videogamesId, {
        title,
        description,
        price,
        games,
    });

    return reply.status(204).send();
})
server.delete("/videogames/:id", async (request, reply) => {
    const videogamesId = request.params.id;
    await database.delete(videogamesId);
    return reply.status(204).send();
})

server.listen({port:PORT}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});






