/*
File Name: ApplicationsPage.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */

// src/pages/ApplicationsPage.js
import React from 'react';

export function ApplicationsPage() {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Applications</h1>
                    <p className="pageSubtitle">Build and ship internal tools on top of your data.</p>
                </div>
                <button className="button" type="button">New application</button>
            </div>

            <div className="grid three">
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Customer health</h3>
                        <span className="pill">Prod</span>
                    </div>
                    <p className="pageSubtitle">Live dashboards for account managers.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Latency</span>
                            <span className="pageSubtitle">210ms</span>
                        </div>
                        <div className="listItem">
                            <span>Owners</span>
                            <span className="pageSubtitle">3</span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Ops control</h3>
                        <span className="pill">Staging</span>
                    </div>
                    <p className="pageSubtitle">Runbooks, alerts, and infra toggles.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Checks</span>
                            <span className="pageSubtitle">18</span>
                        </div>
                        <div className="listItem">
                            <span>Teams</span>
                            <span className="pageSubtitle">2</span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Finance lens</h3>
                        <span className="pill">Draft</span>
                    </div>
                    <p className="pageSubtitle">Scenario planning for spend and growth.</p>
                    <div className="list">
                        <div className="listItem">
                            <span>Models</span>
                            <span className="pageSubtitle">7</span>
                        </div>
                        <div className="listItem">
                            <span>Review</span>
                            <span className="pageSubtitle">Friday</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
