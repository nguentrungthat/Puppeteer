// model.js
const Database = require("better-sqlite3");

class DataModel {
	constructor() {
		// Initialize database connection
		this.db = new Database("scraped_data.db");
		this._createTable();
	}

	// Create table if it doesn't exist
	_createTable() {
		this.db
			.prepare(
				`
      CREATE TABLE IF NOT EXISTS Data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        imageUrls TEXT NOT NULL
      )
    `
			)
			.run();
	}

	// Method to insert data
	saveData(name, imageUrls) {
		const insert = this.db.prepare(`
      INSERT INTO Data (name, imageUrls)
      VALUES (@name, @imageUrls)
    `);
		try {
			insert.run({
				name,
				imageUrls: JSON.stringify(imageUrls),
			});
			console.log(`Saved: ${name}`);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	}

	// Method to retrieve all data
	getAllData() {
		const getAll = this.db.prepare("SELECT * FROM Data");
		const rows = getAll.all();
		return rows.map((row) => ({
			...row,
			imageUrls: JSON.parse(row.imageUrls),
		}));
	}
}

module.exports = DataModel;
