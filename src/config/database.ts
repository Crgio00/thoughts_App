import fs from 'fs';
import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('thoughts.db');

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

export default db;