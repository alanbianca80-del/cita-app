import { MongoClient } from "mongodb";

const uri = "mongodb+srv://alanbianca80_db_user:xYkLyR0EzAs6JV5Q@cluster0.foh3bq0.mongodb.net/?appName=Cluster0";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("cita");
    await db.collection("respuestas").insertOne({
      ...req.body,
      fecha: new Date()
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
} 
