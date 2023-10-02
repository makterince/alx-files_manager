import { MongoClient } from 'mongodb';

class DBClient{
	constructor() {
		const host = process.env.DB_HOST || 'localhost';
		const port = process.env.DB_PORT || 27017;
		const database = process.env.DB_DATABASE || 'files_manager';

		this.client = new MongoClient(`mongodb://${host}:${port}`, { userUnifiedTopology: true });
		this.client.connect((err) => {
			if (err) {
				console.error(`DB connection error: ${err.message}`);
			} else {
				console.log('DB connected successfully');
			}
		});
	}

	isAlive() {
		return this.client.isConnected();
	}


	async nbUsers() {
		const usersCollection = this.client.db().collection('users');
		return usersCollection.countDocuments();
	}

	async nbFiles() {
		const filesCollection = this.client.db().collection('files');
		return filesCollection.countDocuments();
	}
}

const dbClient = new DBClient();
export default dbClient;


