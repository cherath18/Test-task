import Database from "better-sqlite3";
// import path from "path";

// Create a connection to the SQLite database file
// const db = new Database(path.resolve(process.cwd(), "database/jobs.db"));
// Open SQLite database (or create it if it doesn't exist)
const db = new Database("jobs.sqlite");

// Create a table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL
  )
`);

export default db;
