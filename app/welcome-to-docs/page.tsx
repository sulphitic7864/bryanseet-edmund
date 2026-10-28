import { Container } from "@/components/Marketing";
export const metadata = { title: "Documentation" };
export default function Docs() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-xs font-black uppercase tracking-widest text-yellow-600">
          Documentation
        </div>
        <h1 className="mt-3 text-5xl font-black">Welcome to ScrewFast Docs</h1>
        <p className="mt-5 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          The original Astro project used Starlight for its documentation
          section. This Next.js conversion keeps the main documentation entry
          route and the original MDX source files inside the{" "}
          <code>content/docs</code> directory, ready to connect to an MDX
          documentation renderer if the full docs portal is required.
        </p>
        <div className="mt-8 rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900">
          <h2 className="font-black">Content preserved</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Guides, construction documentation, technical specifications, and
            translations remain in the project content folder.
          </p>
        </div>
      </div>
    </Container>
  );
}
