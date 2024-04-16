import { MongoClient } from "mongodb";
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;

  return client;
}


export async function getUsers() {
  const client = await connectToDatabase();
  return client.db(dbName).collection("users");
}
