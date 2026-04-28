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
      const defaultDb = { 
        news: [], 
        products: [], 
        cases: [], 
        qualifications: [
          {
            id: "1776848160252",
            imageUrl: "https://pub-c37d421f19684d4abdb9ce2962d38654.r2.dev/1776848136326-blob",
            title: "高新技术企业证书",
            year: "2021",
            category: "honors",
            orientation: "landscape"
          },
          {
            id: "1776910564625-3hv9z",
            imageUrl: "https://pub-c37d421f19684d4abdb9ce2962d38654.r2.dev/1776910514377-blob",
            orientation: "landscape",
            title: "管道联盟-鄂州研发培训中心",
            category: "honors"
          },
          {
            id: "1776910798598-5mk7z",
            imageUrl: "https://pub-c37d421f19684d4abdb9ce2962d38654.r2.dev/1776910754130-blob",
            orientation: "landscape",
            title: "国家知识产权优势企业202311-202610",
            category: "honors"
          }
        ],
        partners: [
          { id: "p1", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-11-19.png", order: 1 },
          { id: "p2", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-11-35.png", order: 2 },
          { id: "p3", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-11-42.png", order: 3 },
          { id: "p4", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-11-55.png", order: 4 },
          { id: "p5", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-12-12.png", order: 5 },
          { id: "p6", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-12-17.png", order: 6 },
          { id: "p7", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-12-22.png", order: 7 },
          { id: "p8", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-12-37.png", order: 8 },
          { id: "p9", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-12-43.png", order: 9 },
          { id: "p10", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-12-49.png", order: 10 },
          { id: "p11", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-13-01.png", order: 11 },
          { id: "p12", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-13-10.png", order: 12 },
          { id: "p13", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-00.png", order: 13 },
          { id: "p14", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-07.png", order: 14 },
          { id: "p15", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-18.png", order: 15 },
          { id: "p16", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-24.png", order: 16 },
          { id: "p17", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-29.png", order: 17 },
          { id: "p18", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-35.png", order: 18 },
          { id: "p19", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-43.png", order: 19 },
          { id: "p20", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-48.png", order: 20 },
          { id: "p21", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-14-53.png", order: 21 },
          { id: "p22", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-15-00.png", order: 22 },
          { id: "p23", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-15-07.png", order: 23 },
          { id: "p24", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-15-12.png", order: 24 },
          { id: "p25", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-15-21.png", order: 25 },
          { id: "p26", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-15-26.png", order: 26 },
          { id: "p27", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-15-32.png", order: 27 },
          { id: "p28", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-15-38.png", order: 28 },
          { id: "p29", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-15-51.png", order: 29 },
          { id: "p30", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-16-03.png", order: 30 },
          { id: "p31", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/Snipaste_2026-04-24_11-17-00.png", order: 31 },
          { id: "p32", logo: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%A4%A9%E5%81%A5%E6%A0%87.png", order: 32 }
        ],
        messages: [], 
        settings: {
          "heroBanners": [
            "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/%E5%85%B4%E6%AC%A3%E9%97%A8%E5%A4%B4%E8%B6%85%E9%AB%98%E6%B8%85%E4%BF%AE%E5%A4%8D.png",
            "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/1920x1080%E5%9B%BE%E7%89%87%20(1).png",
            "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/1920x1080%E5%9B%BE%E7%89%87.png"
          ],
          "pageBanners": {
            "qualifications": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E8%8D%A3%E8%AA%89%E8%B5%84%E8%B4%A8banner.jpg",
            "news": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E6%96%B0%E9%97%BB%E5%8A%A8%E6%80%81banner.jpg",
            "products": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BA%A7%E5%93%81%E4%B8%AD%E5%BF%83banner.jpg",
            "cases": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%B7%A5%E7%A8%8B%E6%A1%88%E4%BE%8Bbanner.jpg"
          },
          "global": {
            "logo": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%85%B4%E6%AC%A3logo%E6%A0%87.png",
            "phone": "027-53018822",
            "address": "湖北省鄂州市鄂城区四海大道58号",
            "email": "ezxxjc@163.com",
            "qrCode1": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7.jpg",
            "qrCode2": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E6%8A%96%E9%9F%B3.png",
            "icp": "鄂ICP备XXXXXXXX号"
          },
          "about": {
            "title": "立足湖北鄂州，<br />打造全球领先的管道系统。",
            "content1": "湖北兴欣科技股份有限公司（股票代码：839675）是一家专注于高端复合管道研发、制造、安装设计、销售的高新技术企业。",
            "content2": "作为国家级高新技术企业，我们不仅提供高品质的管材及管件，更致力于为市政给排水、石油、化工等领域提供“产品+服务”的全生命周期解决方案。",
            "image": "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%85%B4%E6%AC%A3%E9%97%A8%E5%A4%B4%E8%B6%85%E9%AB%98%E6%B8%85%E4%BF%AE%E5%A4%8D.png"
          }
        } 
      };
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
