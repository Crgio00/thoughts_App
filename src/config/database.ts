import fs from 'fs';
import Database from 'better-sqlite3';

const db = new Database('thoughts.db');

const schema = fs.readFileSync('schema.sql', 'utf8');
db.exec(schema);

export default db;