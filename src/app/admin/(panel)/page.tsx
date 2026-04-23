import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">Dashboard</h1>
        <p className="mt-4 text-sm text-[var(--color-espresso)]/70">
          Configure Supabase environment variables to load live stats.
        </p>
      </div>
    );
  }

  const [portfolio, posts, testimonials, leads] = await Promise.all([
    supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("contact_inquiries").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "UGC Portfolio items", value: portfolio.count ?? 0 },
    { label: "Blog posts", value: posts.count ?? 0 },
    { label: "Testimonials", value: testimonials.count ?? 0 },
    { label: "Contact leads", value: leads.count ?? 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">Overview</h1>
        <p className="mt-2 text-sm text-[var(--color-espresso)]/70">
          Snapshot of content and inquiries stored in Supabase.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-plum)]/55">
              {s.label}
            </p>
            <p className="mt-3 font-serif text-3xl text-[var(--color-plum)]">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
