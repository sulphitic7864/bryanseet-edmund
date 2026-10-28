import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
}

export async function uploadSiteMedia(file: File, folder = "site-media") {
  if (!storage) {
    throw new Error(
      "Firebase Storage is not configured. Add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET to .env.local.",
    );
  }

  const path = `${folder}/${Date.now()}-${safeFileName(file.name)}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return getDownloadURL(fileRef);
}
