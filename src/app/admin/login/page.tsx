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

    </div>
  );
}
