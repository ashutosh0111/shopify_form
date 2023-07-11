import sqlite3 from "sqlite3";
import path from "path";

const DEFAULT_DB_FILE = path.join(process.cwd(), "form_db.sqlite");

export const formDB = {
  formTableName: "form",
  db: null,
  ready: null,
  init: function () {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DEFAULT_DB_FILE, (err) => {
        if (err) {
          console.error("Failed to connect to database:", err);
          reject(err);
        } else {
          console.log("Connected to SQLite database");
          this.ready = Promise.resolve();
          resolve();
        }
      });
    });
  },
  create: async function ({ email }) {
    await this.ready;
    const query = `
      INSERT INTO ${this.formTableName} (email)
      VALUES (?)`;

    return new Promise((resolve, reject) => {
      this.db.run(query, [email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  },
};

// Initialize formDB
formDB.init().then(() => {
  // Create the 'form' table in the database if it doesn't exist
  formDB.db.run(
    `CREATE TABLE IF NOT EXISTS ${formDB.formTableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT
    )`,
    (err) => {
      if (err) {
        console.error("Failed to create table:", err);
      } else {
        console.log("Table 'form' created");
      }
    }
  );
});

export default formDB;
