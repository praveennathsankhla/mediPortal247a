"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p>Access the mediportal247 management system</p>

        <form action={dispatch} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="admin@mediportal247.online"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              minLength={6}
            />
          </div>

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          background: var(--accent);
        }
        .login-card {
          background: white;
          padding: 2.5rem;
          border-radius: 8px;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 400px;
        }
        .login-card h1 {
          margin-bottom: 0.5rem;
          font-size: 1.75rem;
          text-align: center;
        }
        .login-card p {
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group input {
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          outline: none;
        }
        .form-group input:focus {
          border-color: var(--primary);
        }
        .error-message {
          background: #fff5f5;
          color: var(--error);
          padding: 0.75rem;
          border-radius: 4px;
          font-size: 0.85rem;
          border: 1px solid #feb2b2;
        }
        .btn-block {
          width: 100%;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
