
/*
File Name: scrape.routes.js
Date Created: 02/18/2026
Date Modified: 02/18/2026
Author: William Fox
Description: For scraping web site

 */



import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { db } from "../db.js"; // your mysql2/promise pool/connection helper

const router = express.Router();

/**
 * Helpers
 */
const JOB_TYPES = new Set(["retail_pulse", "competitor_watch", "vendor_feeds"]);
const STATUSES = new Set(["queued", "running", "succeeded", "failed", "canceled"]);

/**
 * POST /api/scrape/jobs
 * body: { job_type, target?, priority?, max_attempts?, scheduled_at?, notes? }
 */
router.post("/jobs", requireAuth, async (req, res) => {
    const { job_type, target = null, priority = 5, max_attempts = 3, scheduled_at = null } = req.body;

    if (!JOB_TYPES.has(job_type)) return res.status(400).json({ error: "Invalid job_type" });

    const created_by = req.user?.email || req.user?.id || null;

    const [result] = await db.execute(
        `INSERT INTO scrape_jobs (job_type, target, priority, max_attempts, scheduled_at, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [job_type, target, Number(priority), Number(max_attempts), scheduled_at, created_by]
    );

    const [rows] = await db.execute(`SELECT * FROM scrape_jobs WHERE id = ?`, [result.insertId]);
    res.json(rows[0]);
});

/**
 * GET /api/scrape/jobs?status=queued&limit=50&offset=0&job_type=retail_pulse
 */
router.get("/jobs", requireAuth, async (req, res) => {
    const { status, job_type, limit = 50, offset = 0 } = req.query;

    const where = [];
    const params = [];

    if (status) {
        if (!STATUSES.has(status)) return res.status(400).json({ error: "Invalid status" });
        where.push("status = ?");
        params.push(status);
    }
    if (job_type) {
        if (!JOB_TYPES.has(job_type)) return res.status(400).json({ error: "Invalid job_type" });
        where.push("job_type = ?");
        params.push(job_type);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    params.push(Number(limit), Number(offset));

    const [rows] = await db.execute(
        `SELECT * FROM scrape_jobs
     ${whereSql}
     ORDER BY
       CASE status
         WHEN 'running' THEN 0
         WHEN 'queued' THEN 1
         WHEN 'failed' THEN 2
         WHEN 'succeeded' THEN 3
         WHEN 'canceled' THEN 4
         ELSE 9
       END,
       created_at DESC
     LIMIT ? OFFSET ?`,
        params
    );

    res.json(rows);
});

/**
 * PATCH /api/scrape/jobs/:id
 * body: { status?, last_error?, started_at?, finished_at? }
 * (Keep it simple; later your worker can own status transitions)
 */
router.patch("/jobs/:id", requireAuth, async (req, res) => {
    const id = req.params.id;
    const { status, last_error = null } = req.body;

    const updates = [];
    const params = [];

    if (status) {
        if (!STATUSES.has(status)) return res.status(400).json({ error: "Invalid status" });
        updates.push("status = ?");
        params.push(status);

        if (status === "running") updates.push("started_at = COALESCE(started_at, NOW())");
        if (["succeeded", "failed", "canceled"].includes(status)) updates.push("finished_at = NOW()");
    }

    if (req.body.last_error !== undefined) {
        updates.push("last_error = ?");
        params.push(last_error);
    }

    if (!updates.length) return res.status(400).json({ error: "No updates provided" });

    params.push(id);

    await db.execute(
        `UPDATE scrape_jobs SET ${updates.join(", ")} WHERE id = ?`,
        params
    );

    const [rows] = await db.execute(`SELECT * FROM scrape_jobs WHERE id = ?`, [id]);
    res.json(rows[0]);
});

/**
 * POST /api/scrape/jobs/:id/cancel
 */
router.post("/jobs/:id/cancel", requireAuth, async (req, res) => {
    const id = req.params.id;
    await db.execute(
        `UPDATE scrape_jobs SET status='canceled', finished_at=NOW() WHERE id=? AND status IN ('queued','running')`,
        [id]
    );
    const [rows] = await db.execute(`SELECT * FROM scrape_jobs WHERE id = ?`, [id]);
    res.json(rows[0]);
});

/**
 * POST /api/scrape/jobs/:id/requeue
 */
router.post("/jobs/:id/requeue", requireAuth, async (req, res) => {
    const id = req.params.id;
    await db.execute(
        `UPDATE scrape_jobs
     SET status='queued', last_error=NULL, finished_at=NULL, started_at=NULL
     WHERE id=? AND status IN ('failed','canceled','succeeded')`,
        [id]
    );
    const [rows] = await db.execute(`SELECT * FROM scrape_jobs WHERE id = ?`, [id]);
    res.json(rows[0]);
});

/**
 * GET /api/scrape/throttles
 */
router.get("/throttles", requireAuth, async (req, res) => {
    const [rows] = await db.execute(`SELECT * FROM scrape_throttles WHERE id=1`);
    res.json(rows[0]);
});

/**
 * PUT /api/scrape/throttles
 * body: { global_rpm, global_concurrency, per_domain_delay_ms, user_agent, respect_robots }
 */
router.put("/throttles", requireAuth, async (req, res) => {
    const {
        global_rpm,
        global_concurrency,
        per_domain_delay_ms,
        user_agent,
        respect_robots,
    } = req.body;

    await db.execute(
        `UPDATE scrape_throttles
     SET global_rpm=?, global_concurrency=?, per_domain_delay_ms=?, user_agent=?, respect_robots=?
     WHERE id=1`,
        [
            Number(global_rpm),
            Number(global_concurrency),
            Number(per_domain_delay_ms),
            String(user_agent || ""),
            respect_robots ? 1 : 0,
        ]
    );

    const [rows] = await db.execute(`SELECT * FROM scrape_throttles WHERE id=1`);
    res.json(rows[0]);
});

export default router;
