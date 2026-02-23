/*
File Name: HomePage.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */



// src/pages/HomePage.js
import React from 'react';
import '../styles/theme.css';

export function HomePage() {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Home</h1>
                    <p className="pageSubtitle">Launch key workflows and keep tabs on the latest activity.</p>
                </div>
                <button className="button" type="button">Create workspace</button>
            </div>

            <div className="grid two">
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Notebook</h3>
                        <span className="pill">Spark SQL</span>
                    </div>
                    <p className="pageSubtitle">
                        Next step: wire this to an API that submits Spark queries.
                    </p>
                    <textarea
                        className="input mono"
                        style={{ height: 140, resize: 'vertical' }}
                        placeholder="SELECT 1 AS test;"
                    />
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <button className="button" type="button">Run</button>
                        <button className="button secondary" type="button">Save</button>
                    </div>
                </div>

                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">FoxBot</h3>
                        <span className="pill">AI assist</span>
                    </div>
                    <p className="pageSubtitle">
                        Next step: connect to `/api/chat` and persist threads/messages in MySQL.
                    </p>
                    <div className="list">
                        <div className="input" style={{ height: 140, overflow: 'auto', background: 'var(--surface-2)' }}>
                            Chat history will appear here.
                        </div>
                        <input className="input" placeholder="Ask FoxBot something" />
                        <button className="button" type="button">Send</button>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="cardHeader">
                    <h3 className="cardTitle">Recent activity</h3>
                    <span className="pill">Last 24 hours</span>
                </div>
                <div className="list">
                    <div className="listItem">
                        <span>Scrape pipeline: retail-price-watch</span>
                        <span className="pageSubtitle">Completed 12m ago</span>
                    </div>
                    <div className="listItem">
                        <span>AI workspace: vector-enrichment</span>
                        <span className="pageSubtitle">Queued 40m ago</span>
                    </div>
                    <div className="listItem">
                        <span>Application build: customer-portal</span>
                        <span className="pageSubtitle">Deployed 2h ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
