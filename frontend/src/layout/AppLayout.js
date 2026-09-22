import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../ui/Sidebar";
import useIdleLogout from "../hooks/useIdleLogout";

export function AppLayout() {
  useIdleLogout({ idleMs: 15 * 60 * 1000 });

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">FoxBase One</div>
        <Sidebar />
      </aside>

      <main className="main">
        <div className="mainHeader">
          <div>
            <div className="eyebrow">Workspace</div>
            <div className="mainTitle">Command Center</div>
          </div>
          <div className="headerActions">
            <div className="search">
              <input
                className="searchInput"
                placeholder="Search jobs, notebooks, or apps"
              />
            </div>
            <div className="chip">US-East</div>
            <button className="button ghost" type="button">
              New
            </button>
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
