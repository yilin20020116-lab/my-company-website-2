import express from "express";
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
  query
} from "firebase/firestore";

dotenv.config();

// Load Firebase Config (Vercel functions run in project root)
const firebaseConfigFile = await fs.readFile(path.join(process.cwd(), "firebase-applet-config.json"), "utf-8");
const firebaseConfig = JSON.parse(firebaseConfigFile);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const app = express();

// Setup Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Cloudflare R2 Client (S3 Compatible)
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
  },
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- API ROUTES ---

app.get("/api/debug-r2", (req, res) => {
  const secret = req.query.secret;
  if (secret !== process.env.ADMIN_SECRET && secret !== 'xingxin123') {
    return res.status(401).send("Unauthorized");
  }

  const mask = (val: string | undefined) => {
    if (!val) return "❌ MISSING";
    return `${val.substring(0, 4)}...${val.substring(val.length - 4)} (Length: ${val.length})`;
  };

  res.json({
    ENDPOINT: mask(process.env.CLOUDFLARE_R2_ENDPOINT),
    ACCESS_KEY_ID: mask(process.env.CLOUDFLARE_R2_ACCESS_KEY_ID),
    SECRET_ACCESS_KEY: mask(process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY),
    BUCKET_NAME: mask(process.env.CLOUDFLARE_R2_BUCKET_NAME),
    tips: "Vercel API Mode"
  });
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL;

app.post("/api/upload", upload.single("image"), async (req: any, res: any) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  if (!BUCKET_NAME) return res.status(500).json({ error: "R2 Bucket not configured" });

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
  } catch (error: any) {
    console.error("R2 Upload Error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

app.get("/api/data/:collectionName", async (req, res) => {
  try {
    const { collectionName } = req.params;
    const q = query(collection(db, collectionName));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    res.json(data);
  } catch (error: any) {
    res.json([]);
  }
});

app.post("/api/data/:collectionName", async (req, res) => {
  try {
    const { collectionName } = req.params;
    const docRef = await addDoc(collection(db, collectionName), {
      ...req.body,
      createdAt: new Date().toISOString()
    });
    res.json({ id: docRef.id, ...req.body });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add data" });
  }
});

app.put("/api/data/:collectionName/:id", async (req, res) => {
  try {
    const { collectionName, id } = req.params;
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { ...req.body, updatedAt: new Date().toISOString() });
    res.json({ id, ...req.body });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

app.delete("/api/data/:collectionName/:id", async (req, res) => {
  try {
    const { collectionName, id } = req.params;
    await deleteDoc(doc(db, collectionName, id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

app.get("/api/settings", async (req, res) => {
  const defaults = {
    heroBanners: [
      "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/%E5%85%B4%E6%AC%A3%E9%97%A8%E5%A4%B4%E8%B6%85%E9%AB%98%E6%B8%85%E4%BF%AE%E5%A4%8D.png",
      "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/1920x1080%E5%9B%BE%E7%89%87.png",
      "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E9%A6%96%E9%A1%B5%E5%9B%BE/1920x1080%E5%9B%BE%E7%89%87%20(1).png"
    ],
    heroTitle: "精益求精 \n滴水不漏",
    heroSubtitle: "湖北兴欣科技股份有限公司，致力于成为全球领先的管道系统解决方案服务商。以科技创新驱动，筑就城市生命线。",
    pageBanners: {
      products: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E4%BA%A7%E5%93%81%E4%B8%AD%E5%BF%83banner.jpg",
      cases: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%B7%A5%E7%A8%8B%E6%A1%88%E4%BE%8Bbanner.jpg",
      qualifications: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E8%8D%A3%E8%AA%89%E8%B5%84%E8%B4%A8banner.png?v=7",
      news: "https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E6%96%B0%E9%97%BBbanner.png"
    }
  };
  try {
    const docRef = doc(db, "settings", "global");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.json({ ...defaults, ...docSnap.data() });
    } else {
      res.json(defaults);
    }
  } catch (error) {
    res.json(defaults);
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

export default app;
