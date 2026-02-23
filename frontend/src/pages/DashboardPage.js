/*
File Name: DashboardPage.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */

// src/pages/DashboardPage.js
import React from 'react';

export function DashboardPage() {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Dashboard</h1>
                    <p className="pageSubtitle">Health and throughput across your data and AI stack.</p>
                </div>
                <button className="button secondary" type="button">Share</button>
            </div>

            <div className="grid four">
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Active jobs</h3>
                        <span className="pill">Live</span>
                    </div>
                    <div className="statValue">12</div>
                    <p className="pageSubtitle">2 delayed, 10 on schedule</p>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Ingested today</h3>
                        <span className="pill">TB</span>
                    </div>
                    <div className="statValue">4.8</div>
                    <p className="pageSubtitle">+18% vs yesterday</p>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">AI usage</h3>
                        <span className="pill">Tokens</span>
                    </div>
                    <div className="statValue">920k</div>
                    <p className="pageSubtitle">3.1k prompts served</p>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Spend</h3>
                        <span className="pill">MTD</span>
                    </div>
                    <div className="statValue">$12.4k</div>
                    <p className="pageSubtitle">Within budget target</p>
                </div>
            </div>

            <div className="grid two">
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Pipeline watchlist</h3>
                        <button className="button ghost" type="button">View all</button>
                    </div>
                    <div className="list">
                        <div className="listItem">
                            <span>Scrape: supplier-inventory</span>
                            <span className="pageSubtitle">Running</span>
                        </div>
                        <div className="listItem">
                            <span>ETL: sales-unification</span>
                            <span className="pageSubtitle">Queued</span>
                        </div>
                        <div className="listItem">
                            <span>AI: semantic-enrichment</span>
                            <span className="pageSubtitle">Completed</span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Quality signals</h3>
                        <button className="button ghost" type="button">Tune alerts</button>
                    </div>
                    <div className="list">
                        <div className="listItem">
                            <span>Freshness lag</span>
                            <span className="pageSubtitle">3 datasets</span>
                        </div>
                        <div className="listItem">
                            <span>Schema drift</span>
                            <span className="pageSubtitle">1 source</span>
                        </div>
                        <div className="listItem">
                            <span>PII anomalies</span>
                            <span className="pageSubtitle">0 issues</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
