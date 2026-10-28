# Firebase setup checklist

1. Firebase Console → Project Settings → Add Web App.
2. Copy Web App config values into `.env.local` using `.env.example`.
3. Authentication → Sign-in method → enable Email/Password.
4. Authentication → Users → add `admin@gmail.com` and choose a secure password.
5. Firestore → Create database.
6. Firestore → Rules → paste/publish `firestore.rules`.
7. Optional direct uploads: upgrade/enable Cloud Storage, then Storage → Rules → paste/publish `storage.rules`.
8. Start the app and open `/admin/login`.
9. Save once to seed the initial `site/content` Firestore document.

If the admin email changes, update it in:

- `.env.local` (`NEXT_PUBLIC_ADMIN_EMAIL`)
- `firestore.rules`
- `storage.rules`

## Content source behavior

The application now follows this order strictly:

1. Read `site/content` from Firestore.
2. If that document exists and contains fields, use Firestore only.
3. Do **not** merge missing Firestore fields with `data/siteContent.ts`.
4. If `site/content` does not exist (or is a completely empty document), use `data/siteContent.ts` as the fallback/seed.
5. If Firestore returns a permissions/network/configuration error, show the error instead of silently falling back to local data.

The admin header also shows whether the current source is **Firestore** or **local seed fallback**.
