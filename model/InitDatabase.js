const Database = require("better-sqlite3");

class DatabaseInitializer {
	constructor() {
		this.db = new Database("scraped_data.db");
		this._initializeTable();
	}

	_initializeTable() {
		try {
			const tableExists = this.db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='Data';`).get();

			// Check exist table
			if (!tableExists) {
				this._createTable();
			}
		} catch (error) {
			console.error("Error initializing table:", error);
		}
	}

	// Create table
	_createTable() {
		this.db
			.prepare(
				`
            CREATE TABLE Data (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              imageUrls TEXT NOT NULL
            )
          `
			)
			.run();
	}

	getDb() {
		return this.db;
	}
}

module.exports = DatabaseInitializer;
