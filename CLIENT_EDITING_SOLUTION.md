# Client Editing Solution — Firebase Admin

The client can edit the website after delivery through the included `/admin` dashboard.

## Production stack

- Next.js + Tailwind CSS
- Firebase Authentication for the admin login
- Cloud Firestore for website content
- Cloud Storage for uploaded photos/videos

## Admin route

- Login: `/admin/login`
- Dashboard: `/admin`

The configured admin email defaults to `admin@gmail.com`. The password must be created and stored in Firebase Authentication, never in source code.

## Editable content

- Profile / hero
- About paragraphs
- Stats
- Credentials
- Photos and videos
- Testimonials
- WhatsApp, Instagram and email

## Firestore structure

All editable website data is stored in:

`site/content`

The local `data/siteContent.ts` object is only the initial seed/fallback. After Firebase is configured, the first admin save creates the Firestore document and public pages subscribe to it.

## Media

The admin may paste a remote URL or upload directly to Firebase Storage. Direct upload uses `site-media/*`.

Uploaded MP4/video files render with the browser video player. YouTube/Vimeo should use embed URLs.

See `FIREBASE_SETUP.md` for configuration and security rules.
