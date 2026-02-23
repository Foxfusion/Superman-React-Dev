/*
File Name: AIPage.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */

// src/pages/AIPage.js
import React from 'react';

export function AIPage() {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">AI Studio</h1>
                    <p className="pageSubtitle">Deploy models, agents, and vector search in one place.</p>
                </div>
                <button className="button" type="button">Launch workflow</button>
            </div>

            <div className="grid two">
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Model catalog</h3>
                        <span className="pill">6 active</span>
                    </div>
                    <div className="list">
                        <div className="listItem">
                            <span>Summarizer v4</span>
                            <span className="pageSubtitle">Production</span>
                        </div>
                        <div className="listItem">
                            <span>Support copilot</span>
                            <span className="pageSubtitle">Canary</span>
                        </div>
                        <div className="listItem">
                            <span>Pricing analyst</span>
                            <span className="pageSubtitle">Staging</span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Vector search</h3>
                        <span className="pill">Ready</span>
                    </div>
                    <p className="pageSubtitle">3 indexes synced to Snowflake tables.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Knowledge-base</span>
                            <span className="pageSubtitle">2.1m embeddings</span>
                        </div>
                        <div className="listItem">
                            <span>Product-catalog</span>
                            <span className="pageSubtitle">540k embeddings</span>
                        </div>
                        <div className="listItem">
                            <span>Tickets</span>
                            <span className="pageSubtitle">Auto-refresh</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="cardHeader">
                    <h3 className="cardTitle">Agent control room</h3>
                    <button className="button ghost" type="button">Manage policies</button>
                </div>
                <div className="grid three">
                    <div className="listItem">
                        <span>Runbooks agent</span>
                        <span className="pageSubtitle">On-call ready</span>
                    </div>
                    <div className="listItem">
                        <span>Forecasting agent</span>
                        <span className="pageSubtitle">Batch nightly</span>
                    </div>
                    <div className="listItem">
                        <span>QA assistant</span>
                        <span className="pageSubtitle">Pilot</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
