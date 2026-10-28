"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { adminEmail, auth, firebaseConfigured } from "@/lib/firebase";

export function useAdminSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    // Capture the already-checked Auth instance so TypeScript keeps it
    // narrowed to `Auth` inside the async auth-state callback.
    const currentAuth = auth;

    const unsubscribe = onAuthStateChanged(currentAuth, async (nextUser) => {
      if (
        nextUser &&
        nextUser.email?.toLowerCase() !== adminEmail.toLowerCase()
      ) {
        await signOut(currentAuth);
        setUser(null);
      } else {
        setUser(nextUser);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}
