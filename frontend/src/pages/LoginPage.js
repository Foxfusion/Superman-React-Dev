/*
File Name: LoginPage.js
Date Created: 02/05/2026
Date Modified: 02/13/2026
Author: William Fox
Description: Login page with JWT authentication support.
Compatible with older React/Babel builds (no optional chaining).
*/

// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/theme.css'

export function LoginPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Safe access (no optional chaining)
    const from =
        location &&
        location.state &&
        location.state.from
            ? location.state.from
            : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setError('');
        setBusy(true);

        try {
            await auth.login({ email, password });

            navigate(from, { replace: true });
        } catch (err) {
            setError(
                err && err.message
                    ? err.message
                    : 'Login failed.'
            );
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="authShell">
            <div className="card authCard">
                <h2 style={{ marginTop: 0 }}>Sign in</h2>

                <form onSubmit={onSubmit}>
                    <div style={{ marginBottom: 10 }}>
                        <label style={{ display: 'block', marginBottom: 6 }}>
                            Email
                        </label>
                        <input
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <label style={{ display: 'block', marginBottom: 6 }}>
                            Password
                        </label>
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Your password"
                        />
                    </div>

                    {error ? (
                        <div
                            style={{
                                marginBottom: 12,
                                color: '#b91c1c'
                            }}
                        >
                            {error}
                        </div>
                    ) : null}

                    <button
                        className="button"
                        type="submit"
                        disabled={busy}
                        style={{ width: '100%' }}
                    >
                        {busy ? 'Signing in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
