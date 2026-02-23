/*
File Name: KnowledgePage.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */

// src/pages/KnowledgePage.js
import React from 'react';

export function KnowledgePage() {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Knowledge</h1>
                    <p className="pageSubtitle">Centralize documentation, policies, and datasets.</p>
                </div>
                <button className="button" type="button">Add asset</button>
            </div>

            <div className="grid three">
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Data contracts</h3>
                        <span className="pill">Updated</span>
                    </div>
                    <p className="pageSubtitle">Versioned schemas and SLA agreements.</p>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Playbooks</h3>
                        <span className="pill">Teams</span>
                    </div>
                    <p className="pageSubtitle">Ops and incident response guides.</p>
                </div>
                <div className="card">
                    <div className="cardHeader">
                        <h3 className="cardTitle">Data glossary</h3>
                        <span className="pill">Live</span>
                    </div>
                    <p className="pageSubtitle">Shared definitions across products.</p>
                </div>
            </div>
        </div>
    );
}
