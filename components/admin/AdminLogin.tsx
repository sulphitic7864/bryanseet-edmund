"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LockKeyhole, Mail } from "lucide-react";
import { adminEmail, auth, firebaseConfigured } from "@/lib/firebase";
import { useAdminSession } from "@/lib/useAdminSession";

export default function AdminLogin() {
  const router = useRouter();
  const { user, loading: sessionLoading } = useAdminSession();
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionLoading && user) router.replace("/admin");
  }, [sessionLoading, user, router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!auth) {
      setError("Firebase is not configured. Add your Firebase keys to .env.local first.");
      return;
    }

    if (email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
      setError(`This dashboard only allows the configured admin: ${adminEmail}`);
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/admin");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    setError("");
    setMessage("");
    if (!auth) {
      setError("Firebase is not configured yet.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, adminEmail);
      setMessage(`Password reset email sent to ${adminEmail}.`);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Could not send reset email.");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-5 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-neutral-800 bg-neutral-900 p-7 shadow-2xl sm:p-9">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-500 font-black text-black">BS</div>
          <div className="mt-6 text-xs font-black uppercase tracking-[.22em] text-yellow-400">Admin</div>
          <h1 className="mt-2 text-3xl font-black">Website dashboard</h1>
          <p className="mt-3 text-sm leading-6 text-neutral-400">Sign in with the Bryan Seet admin account to update the public website.</p>

          {!firebaseConfigured && (
            <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
              Firebase environment variables are missing. Copy <code>.env.example</code> to <code>.env.local</code> and add your Firebase Web App configuration.
            </div>
          )}

          <form onSubmit={submit} className="mt-7 grid gap-4">
            <label className="grid gap-2 text-sm font-bold">
              Email
              <div className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-950 px-3">
                <Mail size={17} className="text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent py-3 outline-none"
                  autoComplete="email"
                  required
                />
              </div>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Password
              <div className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-950 px-3">
                <LockKeyhole size={17} className="text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent py-3 outline-none"
                  autoComplete="current-password"
                  required
                />
              </div>
            </label>

            {error && <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
            {message && <div className="rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</div>}

            <button
              type="submit"
              disabled={loading || !firebaseConfigured}
              className="mt-1 rounded-xl bg-yellow-500 px-5 py-3 font-black text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={resetPassword}
              disabled={!firebaseConfigured}
              className="text-sm font-bold text-neutral-400 hover:text-white disabled:opacity-40"
            >
              Forgot password?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
