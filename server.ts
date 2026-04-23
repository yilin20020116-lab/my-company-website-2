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

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- API ROUTES ---

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || "my-company-website-2";
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://pub-c37d421f19684d4abdb9ce2962d38654.r2.dev";

// 1. Image Upload to Cloudflare R2
app.post("/api/upload", upload.single("image"), async (req: any, res: any) => {
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
  const collection = req.params.collection;
  
  if (collection === 'productCategories' && (!db.productCategories || db.productCategories.length === 0)) {
    try {
      // Create seed data manually to avoid dynamic TS import issues in dev
      db.productCategories = [
        {
          "category": "供水产品",
          "id": "water",
          "items": [
            {
              "title": "多重增强钢塑复合压力管",
              "image": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%A4%9A%E9%87%8D%E5%A2%9E%E5%BC%BA%E9%92%A2%E5%A1%91%E5%A4%8D%E5%90%88%E5%8E%8B%E5%8A%9B%E7%AE%A1%EF%BC%88%E5%B8%A6%E6%9D%90%E7%BB%93%E6%9E%84%EF%BC%89.jpg"
            }
            // Real items are more complex, so we will actually use FS read to extract it securely if possible, but let's just let it return empty if not seeded and we will seed it via a script
          ]
        }
      ];
      // A better idea is to just skip automatic seeding in server, and let the frontend do the fallback.
    } catch(e) {}
  }

  res.json(db[collection] || []);
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

// 3. Settings API for Banners and Global Text
app.get("/api/settings", async (req, res) => {
  const db = await readDB();
  if (!db.settings) {
    db.settings = {
      heroBanners: [
        "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/%E5%85%B4%E6%AC%A3%E9%97%A8%E5%A4%B4%E8%B6%85%E9%AB%98%E6%B8%85%E4%BF%AE%E5%A4%8D.png",
        "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/1920x1080%E5%9B%BE%E7%89%87.png",
        "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/1920x1080%E5%9B%BE%E7%89%87%20(1).png"
      ],
      heroTitle: "精益求精 \n滴水不漏",
      heroSubtitle: "湖北兴欣科技股份有限公司，致力于成为全球领先的管道系统解决方案服务商。以科技创新驱动，筑就城市生命线。",
      pageBanners: {
        products: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BA%A7%E5%93%81%E4%B8%AD%E5%BF%83banner.jpg",
        cases: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E5%B7%A5%E7%A8%8B%E6%A1%88%E4%BE%8Bbanner.jpg",
        qualifications: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E8%8D%A3%E8%AA%89%E8%B5%84%E8%B4%A8banner.png?v=7",
        news: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E6%96%B0%E9%97%BBbanner.png"
      }
    };
    await writeDB(db);
  }
  res.json(db.settings);
});

app.put("/api/settings", async (req, res) => {
  const db = await readDB();
  db.settings = { ...db.settings, ...req.body };
  await writeDB(db);
  res.json(db.settings);
});

// --- VITE MIDDLEWARE ---

async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const isProd = process.env.NODE_ENV === "production";
  
  // Try to check if dist exists for production
  let distExists = false;
  try {
    await fs.access(distPath);
    distExists = true;
  } catch (e) {
    distExists = false;
  }

  if (isProd && distExists) {
    console.log("Serving production build from /dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.log("Starting in development mode (or dist missing)...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);

    app.all("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await fs.readFile(path.join(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
