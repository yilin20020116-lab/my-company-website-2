import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const app = express();
const PORT = 3000;

// Setup Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Cloudflare R2 Client (S3 Compatible)
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || "https://788e4a5662f133de6df2ddddfa3c13fe.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "b5839c93c5e0f1df0f5b7c8de50b472c",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "4a8eeac21672864e7f7d7cb2e75241b20a05847a7ab243ffdfde92445ef85a1e",
  },
});

app.use(express.json());

// --- API ROUTES ---

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || "my-company-website-2";
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://pub-c37d421f19684d4abdb9ce2962d38654.r2.dev";

// 1. Image Upload to Cloudflare R2
app.post("/api/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await s3.send(command);

    const imageUrl = `${PUBLIC_URL}/${fileName}`;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error("R2 Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// 2. Simple Mock Database (Using local file for persistence within session)
const DB_PATH = path.join(process.cwd(), "db.json");

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { news: [], products: [], cases: [] };
  }
}

async function writeDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

app.get("/api/data/:collection", async (req, res) => {
  const db = await readDB();
  res.json(db[req.params.collection] || []);
});

app.post("/api/data/:collection", async (req, res) => {
  const db = await readDB();
  const collection = req.params.collection;
  if (!db[collection]) db[collection] = [];
  
  // Use timestamp + random suffix to prevent duplicate keys
  const newItem = { 
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, 
    ...req.body 
  };
  db[collection].push(newItem);
  await writeDB(db);
  res.json(newItem);
});

app.put("/api/data/:collection/:id", async (req, res) => {
  const db = await readDB();
  const { collection, id } = req.params;
  if (!db[collection]) return res.status(404).json({ error: "Collection not found" });
  
  const index = db[collection].findIndex((item: any) => item.id === id);
  if (index === -1) return res.status(404).json({ error: "Item not found" });
  
  db[collection][index] = { ...db[collection][index], ...req.body, id }; // Keep original ID
  await writeDB(db);
  res.json(db[collection][index]);
});

app.delete("/api/data/:collection/:id", async (req, res) => {
  const db = await readDB();
  const { collection, id } = req.params;
  if (!db[collection]) return res.status(404).json({ error: "Collection not found" });
  
  db[collection] = db[collection].filter((item: any) => item.id !== id);
  await writeDB(db);
  res.status(204).send();
});

// --- VITE MIDDLEWARE ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
