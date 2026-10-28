import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <div className="text-8xl font-black text-yellow-500">404</div>
      <h1 className="mt-5 text-3xl font-black">Page not found</h1>
      <p className="mt-3 text-neutral-500">
        The requested page does not exist in this converted project.
      </p>
      <Link
        href="/"
        className="mt-7 inline-block rounded-xl bg-yellow-500 px-5 py-3 font-black text-black"
      >
        Back home
      </Link>
    </div>
  );
}
