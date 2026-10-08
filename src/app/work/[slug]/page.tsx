import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectPage } from "@/components/ProjectPage";
import { getApps } from "@/lib/i18n/projects";
import { getLocale } from "@/lib/i18n/server";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getApps("en").map((app) => ({ slug: app.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const app = getApps(await getLocale()).find((item) => item.slug === slug);
  if (!app) return {};
  const title = `${app.name} — ${site.name}`;
  return { title, description: app.description, openGraph: { title, description: app.description, type: "article" } };
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  if (!getApps("en").some((app) => app.slug === slug)) notFound();
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ProjectPage slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
