# Dynamic About section

The About section is now stored inside the existing Firestore document:

`site/content`

New shape:

```json
{
  "aboutSection": {
    "eyebrow": "About Bryan",
    "title": "Advice built around people, not pressure.",
    "features": [
      {
        "icon": "users",
        "title": "Relationship-first",
        "text": "Understand the person, goals, priorities and budget before discussing solutions."
      },
      {
        "icon": "shield",
        "title": "Long-term reviews",
        "text": "Planning is reviewed as circumstances change so recommendations remain relevant."
      }
    ]
  },
  "about": []
}
```

Supported feature icons: `users`, `shield`, `award`, `sparkles`, `badge`.

## Existing Firestore document

If `site/content` already exists from an older deployment, it will not have the new `aboutSection` field. This project does not silently merge local seed data into an existing Firestore document.

Open `/admin`, select **About**, click **Load current design defaults**, then click **Save changes**. This writes the new fields into Firestore. After that all edits come from Firestore.

The optional `about` paragraph array remains dynamic as before. Delete all paragraphs in the admin UI if you want the compact two-card layout shown in the reference screenshot.
