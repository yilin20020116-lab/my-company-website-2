import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs/promises";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  setDoc,
  query,
  orderBy
} from "firebase/firestore";

dotenv.config();

// Load Firebase Config
const firebaseConfigFile = await fs.readFile(path.join(process.cwd(), "firebase-applet-config.json"), "utf-8");
const firebaseConfig = JSON.parse(firebaseConfigFile);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

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

// --- API ROUTES (Firebase Backed) ---

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

// 2. Firestore API Routes
app.get("/api/data/:collectionName", async (req, res) => {
  try {
    const { collectionName } = req.params;
    console.log(`[Firestore] Fetching collection: ${collectionName}`);
    const q = query(collection(db, collectionName));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error: any) {
    console.error(`[Firestore Error] Get ${req.params.collectionName}:`, error);
    res.status(500).json({ error: "Failed to fetch data", message: error.message });
  }
});

app.post("/api/data/:collectionName", async (req, res) => {
  try {
    const { collectionName } = req.params;
    console.log(`[Firestore] Adding to collection: ${collectionName}`);
    const docRef = await addDoc(collection(db, collectionName), {
      ...req.body,
      createdAt: new Date().toISOString()
    });
    res.json({ id: docRef.id, ...req.body });
  } catch (error: any) {
    console.error(`[Firestore Error] Post ${req.params.collectionName}:`, error);
    res.status(500).json({ error: "Failed to add data", message: error.message });
  }
});

app.put("/api/data/:collectionName/:id", async (req, res) => {
  try {
    const { collectionName, id } = req.params;
    console.log(`[Firestore] Updating doc: ${collectionName}/${id}`);
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...req.body,
      updatedAt: new Date().toISOString()
    });
    res.json({ id, ...req.body });
  } catch (error: any) {
    console.error(`[Firestore Error] Put ${req.params.collectionName}/${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to update data", message: error.message });
  }
});

app.delete("/api/data/:collectionName/:id", async (req, res) => {
  try {
    const { collectionName, id } = req.params;
    console.log(`[Firestore] Deleting doc: ${collectionName}/${id}`);
    await deleteDoc(doc(db, collectionName, id));
    res.status(204).send();
  } catch (error: any) {
    console.error(`[Firestore Error] Delete ${req.params.collectionName}/${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to delete data", message: error.message });
  }
});

// 3. Settings API
app.get("/api/settings", async (req, res) => {
  try {
    const docRef = doc(db, "settings", "global");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      res.json(docSnap.data());
    } else {
      // Return defaults if not set in DB
      const defaults = {
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
      res.json(defaults);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

app.put("/api/settings", async (req, res) => {
  try {
    const docRef = doc(db, "settings", "global");
    await setDoc(docRef, req.body, { merge: true });
    res.json(req.body);
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// --- VITE MIDDLEWARE / STATIC FILES ---

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
}

startServer();

// Export app for Vercel, but also listen locally
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
