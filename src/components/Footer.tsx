import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-6 text-center text-sm text-secondary sm:px-8">
      © {new Date().getFullYear()} {site.name}
    </footer>
  );
}
