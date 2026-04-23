import { MediaUploadForm } from "./media-upload-form";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">Media uploads</h1>
        <p className="max-w-2xl text-sm text-[var(--color-espresso)]/75">
          Upload sends files to <strong>Supabase Storage</strong> only. For work to appear on the
          public site, use buckets <code className="rounded bg-white/70 px-1 text-xs">portfolio-videos</code>{" "}
          or <code className="rounded bg-white/70 px-1 text-xs">portfolio-images</code>, then complete
          the <strong>Add to UGC Portfolio</strong> form that appears after a successful upload—that
          creates the <code className="rounded bg-white/70 px-1 text-xs">portfolio_items</code> row.
          You need <code className="rounded bg-white/70 px-1 text-xs">is_admin = true</code> on your{" "}
          <code className="rounded bg-white/70 px-1 text-xs">profiles</code> row.
        </p>
      </div>
      <MediaUploadForm />
    </div>
  );
}
