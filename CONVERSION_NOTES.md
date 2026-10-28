# Bryan Seet Portfolio — Current Implementation Notes

## Current architecture

The project is now a focused Next.js + Tailwind CSS portfolio for Bryan Seet with Firebase-backed content management.

## Removed from the earlier template

- Products navigation and routes
- Product data/code
- French/language routes and selector
- Generic hardware/construction pages
- Old blog/documentation/template code that was unrelated to the client brief

## Added

- Firebase Authentication admin login
- Protected `/admin` dashboard
- Firestore-backed public content
- CRUD-style UI for profile, about, stats, credentials, media, testimonials and contact details
- Firebase Storage uploads for photos/videos
- Public site subscription to Firestore changes
- Firestore and Storage security rules

## Security decision

The originally suggested `admin: [{ email }, { password }]` structure is intentionally not used. A client bundle is not a secure place for a password. The account is created in Firebase Authentication and Firestore/Storage rules restrict writes to the configured admin email.

## Build note

The source was syntax-validated locally. This environment could not reach the npm registry reliably enough to install dependencies and run a full Next.js production build, so the stale lockfile was removed. Run `npm install` once in a normal development environment to generate a fresh lockfile, then run `npm run build`.
