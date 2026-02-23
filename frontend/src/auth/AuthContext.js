/*
File Name: AuthContext.js
Date Created: 02/05/2026
Date Modified: 02/12/2026
Author: William Fox
Description:
Auth context for Project Nuclear.
- JWT login via backend API
- Stores token in localStorage
- Provides authFetch helper for authenticated API calls
*/

// src/auth/AuthContext.js
import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// Change this to whatever you want.
// With CRA, REACT_APP_* vars are injected at build time.
const API_BASE_URL =
    (typeof process !== 'undefined' &&
        process.env &&
        process.env.REACT_APP_API_BASE_URL) ||
    'http://10.2.2.30:4000';

export function AuthProvider({ children }) {
    const existingToken = (() => {
        try {
            return localStorage.getItem('token') || '';
        } catch (e) {
            return '';
        }
    })();

    const [token, setToken] = useState(existingToken);
    const [user, setUser] = useState(null);
    const [busy, setBusy] = useState(false);

    const isAuthenticated = !!token;

    // Helper: save/remove token safely
    function persistToken(nextToken) {
        try {
            if (nextToken) localStorage.setItem('token', nextToken);
            else localStorage.removeItem('token');
        } catch (e) {}
    }

    // Helper: authenticated fetch
    const authFetch = useCallback(
        async (path, options) => {
            const opts = options || {};
            const headers = opts.headers ? { ...opts.headers } : {};

            if (token) headers.Authorization = 'Bearer ' + token;
            if (!headers['Content-Type'] && opts.body) headers['Content-Type'] = 'application/json';

            const res = await fetch(API_BASE_URL + path, {
                ...opts,
                headers,
            });

            // If token expired/invalid, force logout
            if (res.status === 401) {
                logout();
            }

            return res;
        },
        [token]
    );

    // Optional: load current user if token exists
    const fetchMe = useCallback(async () => {
        if (!token) return;
        try {
            const res = await authFetch('/api/auth/me', { method: 'GET' });
            if (!res.ok) return;
            const data = await res.json(); // expected: { user: {...} } or {...}
            // support either shape
            setUser(data.user ? data.user : data);
        } catch (e) {
            // ignore
        }
    }, [token, authFetch]);

    useEffect(() => {
        // When token changes (e.g., on refresh), try to load user
        if (token) fetchMe();
        else setUser(null);
    }, [token, fetchMe]);

    async function login({ email, password }) {
        if (!email || !password) throw new Error('Email and password are required.');

        setBusy(true);
        try {
            const res = await fetch(API_BASE_URL + '/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                // Try to get backend message
                let msg = 'Login failed.';
                try {
                    const errData = await res.json();
                    if (errData && errData.message) msg = errData.message;
                } catch (e) {}
                throw new Error(msg);
            }

            const data = await res.json(); // expected: { token, user? }
            if (!data || !data.token) throw new Error('Login failed: token missing from server response.');

            setToken(data.token);
            persistToken(data.token);

            // If backend returns user, set it immediately; otherwise call /me
            if (data.user) setUser(data.user);
            else await fetchMe();
        } finally {
            setBusy(false);
        }
    }

    function logout() {
        setToken('');
        setUser(null);
        persistToken('');
    }

    const value = useMemo(
        () => ({
            token,
            user,
            busy,
            isAuthenticated,
            login,
            logout,
            setUser,
            fetchMe,
            authFetch,
            API_BASE_URL,
        }),
        [token, user, busy, isAuthenticated, authFetch, fetchMe]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}

