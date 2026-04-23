import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">Contact leads</h1>
        <p className="mt-4 text-sm text-[var(--color-espresso)]/70">
          Configure Supabase to view inquiries.
        </p>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p className="text-sm text-red-700">
        Unable to load leads. Confirm your profile is marked{" "}
        <code className="rounded bg-white/70 px-1 text-xs">is_admin = true</code>.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">Contact leads</h1>
        <p className="mt-2 text-sm text-[var(--color-espresso)]/70">
          Inquiries submitted from the public contact form.
        </p>
      </div>
      {data.length === 0 ? (
        <p className="text-sm text-[var(--color-espresso)]/60">No inquiries yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--color-sand)]/60 text-xs uppercase tracking-wide text-[var(--color-plum)]/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Budget</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-t border-white/60 align-top">
                  <td className="px-4 py-3 font-medium text-[var(--color-plum)]">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-espresso)]/80">{row.email}</td>
                  <td className="px-4 py-3 text-[var(--color-espresso)]/70">
                    {row.project_type ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-espresso)]/70">
                    {row.budget_range ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--color-espresso)]/55">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
