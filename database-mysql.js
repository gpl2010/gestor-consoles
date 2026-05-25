import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabaseMYSQL {

    async list(search) {
        let videogames;

        if (search) {
            [videogames] = await sql.execute(
                'SELECT * FROM videogames WHERE title LIKE ?', 
                [`%${search}%`]
            );
        } else {
            [videogames] = await sql.execute('SELECT * FROM videogames');
        }

        return videogames;
    }
    async create(videogame) {
        const videogameId = randomUUID();
        const { price, description, title, games } = videogame;
        await sql.execute(
            'INSERT INTO videogames (id, title, description, price, games ) VALUES (?, ?, ?, ?, ?)',
            [videogameId, title, description, price, games]
        );
    }
    async update(id, videogame) {
        const { price, description, title, games } = videogame;
        await sql.execute(
            'UPDATE videogames SET price = ?, description = ?, title = ?, games = ? WHERE id = ?',
            [price, description, title, games, id]
        );
    }
    async delete(id) {
        await sql.execute('DELETE FROM videogames WHERE id = ?', [id]);
    }
}

