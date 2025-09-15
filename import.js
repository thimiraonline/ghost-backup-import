import fs from "fs";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;
const API_URL = process.env.GHOST_API_URL;
const BACKUP_FILE = process.env.BACKUP_FILE;

async function importBackup() {
  try {
    if (!ADMIN_API_KEY || !API_URL || !BACKUP_FILE) {
      throw new Error("Missing required environment variables in .env file");
    }

    const [id, secret] = ADMIN_API_KEY.split(":");

    const token = jwt.sign(
      {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 300,
        aud: "/admin/",
      },
      Buffer.from(secret, "hex"),
      { keyid: id, algorithm: "HS256" }
    );

    const form = new FormData();
    form.append("importfile", fs.createReadStream(BACKUP_FILE));

    const res = await fetch(`${API_URL}/db/`, {
      method: "POST",
      headers: {
        Authorization: `Ghost ${token}`,
        ...form.getHeaders(),
      },
      body: form,
    });

    if (!res.ok) {
      throw new Error(
        `Import failed: ${res.status} ${res.statusText}\n${await res.text()}`
      );
    }

    console.log("✅ Backup imported successfully!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

importBackup();
