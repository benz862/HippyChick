export default function AdminSettingsPage() {
  return (
    <div className="space-y-3">
      <h1 className="font-serif text-3xl text-[var(--color-plum)]">Site settings</h1>
      <p className="max-w-2xl text-sm text-[var(--color-espresso)]/70">
        Store hero imagery, social links, contact email, and media kit URLs in the{" "}
        <code className="rounded bg-white/70 px-1 text-xs">site_settings</code> table as
        JSON values keyed for easy retrieval on the marketing site.
      </p>
    </div>
  );
}
