const DatabaseInitializer = require("./InitDatabase");

class DataModel {
	constructor() {
		this.databaseInitializer = new DatabaseInitializer();
		this.db = this.databaseInitializer.getDb();
	}

	// Method to insert data
	saveData(name, imageUrls) {
		const insert = this.db.prepare(`INSERT INTO Data (name, imageUrls)VALUES (@name, @imageUrls)`);
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
