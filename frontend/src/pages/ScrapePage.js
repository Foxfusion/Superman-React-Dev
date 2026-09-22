/*
File Name: ScrapePage.js
Date Created: 02/18/2026
Date Modified: 02/18/2026
Author: William Fox
Description: For scraping web site

 */



import React, { useEffect, useMemo, useState } from "react";
import api from "../utils/api"; // axios instance with Authorization header (JWT)

const JOB_TYPE_OPTIONS = [
    { label: "Retail Pulse", value: "retail_pulse" },
    { label: "Competitor Watch", value: "competitor_watch" },
    { label: "Vendor Feeds", value: "vendor_feeds" },
];

const StatusPill = ({ status }) => {
    const cls = useMemo(() => {
        switch (status) {
            case "running": return "pill pill-running";
            case "queued": return "pill pill-queued";
            case "succeeded": return "pill pill-ok";
            case "failed": return "pill pill-bad";
            case "canceled": return "pill pill-muted";
            default: return "pill";
        }
    }, [status]);

    return <span className={cls}>{status}</span>;
};

export default function ScrapePage() {
    // New job form
    const [jobType, setJobType] = useState("retail_pulse");
    const [target, setTarget] = useState("");
    const [priority, setPriority] = useState(5);
    const [maxAttempts, setMaxAttempts] = useState(3);

    // Queue
    const [jobs, setJobs] = useState([]);
    const [statusFilter, setStatusFilter] = useState(""); // "", queued, running, etc.
    const [typeFilter, setTypeFilter] = useState("");
    const [loadingJobs, setLoadingJobs] = useState(false);

    // Throttles
    const [showThrottles, setShowThrottles] = useState(false);
    const [throttles, setThrottles] = useState(null);
    const [savingThrottles, setSavingThrottles] = useState(false);

    // UX
    const [toast, setToast] = useState(null);

    const notify = (msg, kind = "info") => {
        setToast({ msg, kind });
        setTimeout(() => setToast(null), 2500);
    };

    const fetchJobs = async () => {
        setLoadingJobs(true);
        try {
            const params = {};
            if (statusFilter) params.status = statusFilter;
            if (typeFilter) params.job_type = typeFilter;
            params.limit = 100;

            const { data } = await api.get("/scrape/jobs", { params });
            setJobs(data);
        } catch (e) {
            notify((e && e.response && e.response.data && e.response.data.error) || "Failed to load jobs", "bad");
        } finally {
            setLoadingJobs(false);
        }
    };

    const createJob = async () => {
        try {
            const payload = {
                job_type: jobType,
                target: target.trim() ? target.trim() : null,
                priority,
                max_attempts: maxAttempts,
            };
            await api.post("/scrape/jobs", payload);
            notify("Job queued ✅", "ok");
            setTarget("");
            fetchJobs();
        } catch (e) {
            notify((e && e.response && e.response.data && e.response.data.error) || "Failed to create job", "bad");
        }
    };

    const cancelJob = async (id) => {
        try {
            await api.post(`/scrape/jobs/${id}/cancel`);
            notify("Job canceled", "info");
            fetchJobs();
        } catch (e) {
            notify("Cancel failed", "bad");
        }
    };

    const requeueJob = async (id) => {
        try {
            await api.post(`/scrape/jobs/${id}/requeue`);
            notify("Job re-queued", "ok");
            fetchJobs();
        } catch (e) {
            notify("Requeue failed", "bad");
        }
    };

    const loadThrottles = async () => {
        try {
            const { data } = await api.get("/scrape/throttles");
            setThrottles(data);
        } catch (e) {
            notify("Failed to load throttles", "bad");
        }
    };

    const saveThrottles = async () => {
        if (!throttles) return;
        setSavingThrottles(true);
        try {
            const payload = {
                global_rpm: Number(throttles.global_rpm),
                global_concurrency: Number(throttles.global_concurrency),
                per_domain_delay_ms: Number(throttles.per_domain_delay_ms),
                user_agent: throttles.user_agent,
                respect_robots: !!throttles.respect_robots,
            };
            const { data } = await api.put("/scrape/throttles", payload);
            setThrottles(data);
            notify("Throttles updated ✅", "ok");
            setShowThrottles(false);
        } catch (e) {
            notify((e && e.response && e.response.data && e.response.data.error) || "Failed to save throttles", "bad");
        } finally {
            setSavingThrottles(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        // optional: auto refresh queue every 5s
        const t = setInterval(fetchJobs, 5000);
        return () => clearInterval(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter, typeFilter]);

    useEffect(() => {
        if (showThrottles) loadThrottles();
    }, [showThrottles]);

    return (
        <div className="page">
            <div className="page-header">
                <h1>Scrape</h1>
                <button className="btn" onClick={() => setShowThrottles(true)}>
                    Tune Throttles
                </button>
            </div>

            {toast && (
                <div className={`toast toast-${toast.kind}`}>{toast.msg}</div>
            )}

            {/* New Scrape Job */}
            <section className="card">
                <h2>New Scrape Job</h2>

                <div className="row">
                    <label>
                        Job Type
                        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                            {JOB_TYPE_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Target (optional)
                        <input
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            placeholder="domain, url, vendor id, competitor name..."
                        />
                    </label>
                </div>

                <div className="row">
                    <label>
                        Priority
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={priority}
                            onChange={(e) => setPriority(Number(e.target.value))}
                        />
                    </label>

                    <label>
                        Max Attempts
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={maxAttempts}
                            onChange={(e) => setMaxAttempts(Number(e.target.value))}
                        />
                    </label>

                    <div className="actions">
                        <button className="btn btn-primary" onClick={createJob}>
                            Queue Job
                        </button>
                    </div>
                </div>

                <div className="quick-buttons">
                    <button className="btn btn-ghost" onClick={() => setJobType("retail_pulse")}>
                        Retail Pulse
                    </button>
                    <button className="btn btn-ghost" onClick={() => setJobType("competitor_watch")}>
                        Competitor Watch
                    </button>
                    <button className="btn btn-ghost" onClick={() => setJobType("vendor_feeds")}>
                        Vendor Feeds
                    </button>
                </div>
            </section>

            {/* Scrape Queue */}
            <section className="card">
                <div className="card-header">
                    <h2>Scrape Queue</h2>

                    <div className="filters">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">All statuses</option>
                            <option value="queued">queued</option>
                            <option value="running">running</option>
                            <option value="succeeded">succeeded</option>
                            <option value="failed">failed</option>
                            <option value="canceled">canceled</option>
                        </select>

                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                            <option value="">All job types</option>
                            {JOB_TYPE_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.value}</option>
                            ))}
                        </select>

                        <button className="btn" onClick={fetchJobs} disabled={loadingJobs}>
                            {loadingJobs ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                </div>

                <div className="table">
                    <div className="thead">
                        <div>ID</div>
                        <div>Type</div>
                        <div>Target</div>
                        <div>Status</div>
                        <div>Attempts</div>
                        <div>Created</div>
                        <div>Actions</div>
                    </div>

                    {jobs.map((j) => (
                        <div className="trow" key={j.id}>
                            <div>{j.id}</div>
                            <div>{j.job_type}</div>
                            <div className="mono">{j.target || "-"}</div>
                            <div><StatusPill status={j.status} /></div>
                            <div>{j.attempts}/{j.max_attempts}</div>
                            <div className="mono">{new Date(j.created_at).toLocaleString()}</div>
                            <div className="row-actions">
                                {(j.status === "queued" || j.status === "running") && (
                                    <button className="btn btn-ghost" onClick={() => cancelJob(j.id)}>Cancel</button>
                                )}
                                {["failed", "canceled", "succeeded"].includes(j.status) && (
                                    <button className="btn btn-ghost" onClick={() => requeueJob(j.id)}>Requeue</button>
                                )}
                            </div>

                            {j.last_error && (
                                <div className="error-line">
                                    <span className="mono">Error:</span> {j.last_error}
                                </div>
                            )}
                        </div>
                    ))}

                    {!jobs.length && (
                        <div className="empty">
                            No jobs found.
                        </div>
                    )}
                </div>
            </section>

            {/* Throttles Modal */}
            {showThrottles && (
                <div className="modal-backdrop" onClick={() => setShowThrottles(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Tune Throttles</h2>

                        {!throttles ? (
                            <div className="muted">Loading…</div>
                        ) : (
                            <>
                                <div className="row">
                                    <label>
                                        Global RPM
                                        <input
                                            type="number"
                                            min="1"
                                            value={throttles.global_rpm}
                                            onChange={(e) => setThrottles({ ...throttles, global_rpm: e.target.value })}
                                        />
                                    </label>

                                    <label>
                                        Global Concurrency
                                        <input
                                            type="number"
                                            min="1"
                                            value={throttles.global_concurrency}
                                            onChange={(e) => setThrottles({ ...throttles, global_concurrency: e.target.value })}
                                        />
                                    </label>
                                </div>

                                <div className="row">
                                    <label>
                                        Per-domain delay (ms)
                                        <input
                                            type="number"
                                            min="0"
                                            value={throttles.per_domain_delay_ms}
                                            onChange={(e) => setThrottles({ ...throttles, per_domain_delay_ms: e.target.value })}
                                        />
                                    </label>

                                    <label>
                                        User-Agent
                                        <input
                                            value={throttles.user_agent}
                                            onChange={(e) => setThrottles({ ...throttles, user_agent: e.target.value })}
                                        />
                                    </label>
                                </div>

                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        checked={!!throttles.respect_robots}
                                        onChange={(e) => setThrottles({ ...throttles, respect_robots: e.target.checked })}
                                    />
                                    Respect robots.txt
                                </label>

                                <div className="modal-actions">
                                    <button className="btn" onClick={() => setShowThrottles(false)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={saveThrottles} disabled={savingThrottles}>
                                        {savingThrottles ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
