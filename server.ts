import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const DB_FILE = path.join(__dirname, "db.json");

// Helper to read DB
async function readDB() {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if ((error as any).code === "ENOENT") {
      const defaultDb = { news: [], products: [], cases: [], qualifications: [], messages: [], settings: {} };
      await fs.writeFile(DB_FILE, JSON.stringify(defaultDb, null, 2));
      return defaultDb;
    }
    throw error;
  }
}

// Helper to write DB
async function writeDB(data: any) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Cloudflare R2 Credentials
const r2Endpoint = "https://788e4a5662f133de6df2ddddfa3c13fe.r2.cloudflarestorage.com";
const r2AccessKeyId = "040e2659e96e3dae6af5739881ef6c17";
const r2SecretAccessKey = "15128166e4cb56b83ddc37e50c26b2847d6e61f788733f85929931f7d18b0c35";
const r2BucketName = "my-company-website-2";
const r2PublicUrl = "https://pub-c37d421f19684d4abdb9ce2962d38654.r2.dev";

// Ensure R2 variables exist
const s3 = new S3Client({
  region: "us-east-1",
  endpoint: r2Endpoint,
  credentials: {
    accessKeyId: r2AccessKeyId,
    secretAccessKey: r2SecretAccessKey,
  },
  forcePathStyle: true,
});

const upload = multer({ storage: multer.memoryStorage() });

// File Upload endpoint
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    const bucket = r2BucketName;
    const publicUrl = r2PublicUrl;
    
    if (!bucket || !publicUrl) {
      return res.status(500).json({ error: "R2 bucket or public URL not configured" });
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const key = `uploads/${uniqueSuffix}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const fileUrl = `${publicUrl}/${key}`;
    res.json({ url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed: " + error.message });
  }
});

// Generic API routes for collections
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (password === (process.env.ADMIN_SECRET || "xingxin123")) {
    res.json({ success: true, token: "admin-token-xyz" });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

app.get("/api/:collection", async (req, res) => {
  const { collection } = req.params;
  try {
    const db = await readDB();
    if (collection === "settings") {
       res.json(db[collection] || {});
    } else {
       res.json(db[collection] || []);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/:collection", async (req, res) => {
  const { collection } = req.params;
  try {
    const db = await readDB();
    if (!db[collection]) db[collection] = [];
    
    if (collection === "settings") {
      db.settings = { ...db.settings, ...req.body };
      await writeDB(db);
      return res.json(db.settings);
    }

    const newItem = {
      ...req.body,
      id: req.body.id || Date.now().toString() + "-" + Math.random().toString(36).substr(2, 9),
      date: req.body.date || new Date().toISOString().split("T")[0]
    };
    
    db[collection].push(newItem);
    await writeDB(db);
    res.json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/:collection/:id", async (req, res) => {
  const { collection, id } = req.params;
  try {
    const db = await readDB();
    if (!db[collection]) return res.status(404).json({ error: "Collection not found" });

    const index = db[collection].findIndex((item: any) => item.id === id);
    if (index === -1) return res.status(404).json({ error: "Item not found" });

    db[collection][index] = { ...db[collection][index], ...req.body, id };
    await writeDB(db);
    res.json(db[collection][index]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/:collection/:id", async (req, res) => {
  const { collection, id } = req.params;
  try {
    const db = await readDB();
    if (!db[collection]) return res.status(404).json({ error: "Collection not found" });

    const index = db[collection].findIndex((item: any) => item.id === id);
    if (index === -1) return res.status(404).json({ error: "Item not found" });

    db[collection].splice(index, 1);
    await writeDB(db);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Vite Integration
import { createServer as createViteServer } from "vite";

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
