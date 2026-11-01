# Edmund Chong Portfolio — Next.js + Tailwind + Firebase Admin

This project is a Next.js 16 + Tailwind CSS portfolio with a Firebase-powered admin dashboard.

## What is editable from `/admin`

- Main profile: name, role, MAS number, hero text, portrait
- About paragraphs
- Statistics
- Credentials / awards
- Event photos and videos
- Testimonials and client photos
- WhatsApp, Instagram and email contact details

All public website content is stored in one Firestore document:

`site/content`

Images and videos are stored through public URLs entered in the admin dashboard. The project does not perform direct file uploads.

The local `data/siteContent.ts` object is only a safe fallback and initial seed. It contains no admin password. Firestore is authoritative whenever `site/content` exists and contains data; local values are not merged into an existing Firestore document.

## 1. Install

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Create/configure Firebase

1. Create a Firebase project and register a Web App.
2. Enable **Authentication > Sign-in method > Email/Password**.
3. In **Authentication > Users**, create the admin user:
   - Email: `admin@gmail.com`
   - Password: choose a private password in Firebase. Do not add it to source code.
4. Create a Cloud Firestore database.
5. Copy `.env.example` to `.env.local` and paste the Web App config values.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_ADMIN_EMAIL=admin@gmail.com
```

## 3. Security rules

Deploy/paste the included `firestore.rules` into Firestore Rules.

The included rules:

- allow anyone to read the public `edmund/content` document;
- allow only the authenticated `edmund.chong1909@gmail.com` user to create/update/delete it.

If you change `NEXT_PUBLIC_ADMIN_EMAIL`, also change the email in the rule file. Environment variables are not available inside Firebase Security Rules.

With Firebase CLI installed, rules can be deployed with:

```bash
firebase deploy --only firestore:rules
```

## 4. Image and video URLs

Enter public image or video URLs directly in the admin dashboard. The public site supports YouTube and Vimeo embed URLs such as:

```text
https://www.youtube.com/embed/VIDEO_ID
```

## 5. Admin usage

Go to:

`/admin/login`

Sign in with the Firebase admin account. The dashboard provides tabs for each content area. Add/edit/delete items, then click **Save changes**.

If Firestore is empty, the dashboard loads the local seed content. You can click **Create Firestore content** immediately, even before editing anything. After `site/content` exists, the dashboard and public website use that Firestore document only. If a Firestore field is intentionally blank or an array is intentionally empty, the local file will not refill it.

## Important security point

Never store an admin password in `data/siteContent.ts`, a `NEXT_PUBLIC_*` environment variable, or any client-side component. `NEXT_PUBLIC_*` values are intentionally visible to browsers. Firebase Authentication should own the password.
