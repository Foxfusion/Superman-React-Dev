import "dotenv/config";

import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db, testDbConnection } from "./db.js";
import { requireAuth } from "./middleware/requireAuth.js";
import scrapeRoutes from "./routes/scrape.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ ok: true, service: "Superman React Dev API" });
});

app.get("/api/health/db", async (req, res) => {
  try {
    await testDbConnection();
    return res.json({ ok: true, db: "connected" });
  } catch (error) {
    console.error("DB health error:", error);
    return res.status(500).json({ ok: false, db: "disconnected" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, emailOrUsername, username, password } = req.body || {};
    const identifier = emailOrUsername || email || username;

    if (!identifier || !password) {
      return res.status(400).json({
        ok: false,
        message: "Email/username and password are required",
      });
    }

    const [rows] = await db.query(
      `SELECT *
       FROM users
       WHERE username = ? OR email = ?
       LIMIT 1`,
      [identifier, identifier]
    );

    if (!rows.length) {
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ ok: false, message: "JWT_SECRET is not configured" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role || null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ ok: false, message: "Login failed" });
  }
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  return res.json({ ok: true, user: req.user });
});

app.get("/api/projects", requireAuth, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, description, status FROM Projects ORDER BY id DESC"
    );
    return res.json({ ok: true, projects: rows });
  } catch (error) {
    console.error("Error loading projects:", error);
    return res.status(500).json({ ok: false, message: "Failed to load projects" });
  }
});

app.post("/api/projects", requireAuth, async (req, res) => {
  try {
    const { name, description = "", status = "active" } = req.body || {};

    if (!name) {
      return res.status(400).json({ ok: false, message: "Project name is required" });
    }

    const [result] = await db.query(
      "INSERT INTO Projects (name, description, status) VALUES (?, ?, ?)",
      [name, description, status]
    );

    return res.status(201).json({
      ok: true,
      id: result.insertId,
      message: "Project created",
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ ok: false, message: "Failed to create project" });
  }
});

app.put("/api/projects/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description = "", status = "active" } = req.body || {};

    if (!name) {
      return res.status(400).json({ ok: false, message: "Project name is required" });
    }

    const [result] = await db.query(
      "UPDATE Projects SET name = ?, description = ?, status = ? WHERE id = ?",
      [name, description, status, id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ ok: false, message: "Project not found" });
    }

    return res.json({ ok: true, message: "Project updated" });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ ok: false, message: "Failed to update project" });
  }
});

app.delete("/api/projects/:id", requireAuth, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM Projects WHERE id = ?", [req.params.id]);

    if (!result.affectedRows) {
      return res.status(404).json({ ok: false, message: "Project not found" });
    }

    return res.json({ ok: true, message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ ok: false, message: "Failed to delete project" });
  }
});

app.use("/api/scrape", scrapeRoutes);

app.use((error, req, res, next) => {
  console.error("Unhandled API error:", error);
  return res.status(500).json({ ok: false, message: "Internal server error" });
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`Superman React Dev API running on port ${PORT}`);
});
