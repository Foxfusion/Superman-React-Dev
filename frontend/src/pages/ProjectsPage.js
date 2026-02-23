/*
File Name: ProjectsPage.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */

// src/pages/ProjectsPage.js
import React from 'react';

export function ProjectsPage() {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Project</h1>
                    <p className="pageSubtitle">Track milestones, owners, and release readiness.</p>
                </div>
                <button className="button" type="button">New project</button>
            </div>

            <div className="grid two">
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Customer intelligence</h3>
                        <span className="pill">Q2</span>
                    </div>
                    <p className="pageSubtitle">Unify profile, usage, and sentiment signals.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Status</span>
                            <span className="pageSubtitle">On track</span>
                        </div>
                        <div className="listItem">
                            <span>Owner</span>
                            <span className="pageSubtitle">Analytics</span>
                        </div>
                        <div className="listItem">
                            <span>Next milestone</span>
                            <span className="pageSubtitle">Data contracts</span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Agentic support</h3>
                        <span className="pill">Q3</span>
                    </div>
                    <p className="pageSubtitle">Automate triage and draft responses.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Status</span>
                            <span className="pageSubtitle">Pilot</span>
                        </div>
                        <div className="listItem">
                            <span>Owner</span>
                            <span className="pageSubtitle">AI</span>
                        </div>
                        <div className="listItem">
                            <span>Next milestone</span>
                            <span className="pageSubtitle">Agent guardrails</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="cardHeader">
                    <h3 className="cardTitle">Timeline</h3>
                    <button className="button ghost" type="button">Export</button>
                </div>
                <div className="list">
                    <div className="listItem">
                        <span>Data quality baseline</span>
                        <span className="pageSubtitle">Mar 12</span>
                    </div>
                    <div className="listItem">
                        <span>AI evaluation harness</span>
                        <span className="pageSubtitle">Mar 18</span>
                    </div>
                    <div className="listItem">
                        <span>Production readiness review</span>
                        <span className="pageSubtitle">Mar 28</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
