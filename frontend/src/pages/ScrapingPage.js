/*
File Name: ScrapingPage.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */

// src/pages/ScrapingPage.js
import React from 'react';

export function ScrapingPage() {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Scrape</h1>
                    <p className="pageSubtitle">Monitor scrapers, queues, and data freshness.</p>
                </div>
                <button className="button" type="button">New scrape job</button>
            </div>

            <div className="grid three">
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Retail pulse</h3>
                        <span className="pill">Running</span>
                    </div>
                    <p className="pageSubtitle">6 sources, refresh every 30m.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Queue depth</span>
                            <span className="pageSubtitle">112</span>
                        </div>
                        <div className="listItem">
                            <span>Success rate</span>
                            <span className="pageSubtitle">98.2%</span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Competitor watch</h3>
                        <span className="pill">Paused</span>
                    </div>
                    <p className="pageSubtitle">Awaiting proxy rotation update.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Last run</span>
                            <span className="pageSubtitle">Yesterday</span>
                        </div>
                        <div className="listItem">
                            <span>Blocked</span>
                            <span className="pageSubtitle">3 sites</span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Vendor feeds</h3>
                        <span className="pill">Queued</span>
                    </div>
                    <p className="pageSubtitle">Auto-normalize and land in staging.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Next run</span>
                            <span className="pageSubtitle">15m</span>
                        </div>
                        <div className="listItem">
                            <span>Destinations</span>
                            <span className="pageSubtitle">4 tables</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="cardHeader">
                    <h3 className="cardTitle">Scrape queue</h3>
                    <button className="button ghost" type="button">Tune throttles</button>
                </div>
                <div className="list">
                    <div className="listItem">
                        <span>scheduler/retail-refresh</span>
                        <span className="pageSubtitle">ETA 4m</span>
                    </div>
                    <div className="listItem">
                        <span>scheduler/supplier-index</span>
                        <span className="pageSubtitle">ETA 11m</span>
                    </div>
                    <div className="listItem">
                        <span>scheduler/marketplace</span>
                        <span className="pageSubtitle">ETA 22m</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
