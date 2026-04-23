import { MediaUploadForm } from "./media-upload-form";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">Media uploads</h1>
        <p className="max-w-2xl text-sm text-[var(--color-espresso)]/75">
          Drop a file into Supabase Storage. For UGC Portfolio work, a second
          form appears after the upload — filling that in is what makes the
          piece show up on the public site.
        </p>
      </div>

      <ol className="grid gap-4 rounded-2xl border border-white/70 bg-white/80 p-6 text-sm md:grid-cols-3">
        <li className="space-y-1">
          <p className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-groovy-pink)] text-xs font-bold text-white">
            1
          </p>
          <p className="font-serif text-lg text-[var(--color-plum)]">Pick a bucket</p>
          <p className="text-[var(--color-espresso)]/70">
            <strong>UGC Portfolio videos/images</strong> for work you want on the
            public UGC Portfolio page. <strong>Blog images</strong> for journal
            posts. <strong>Testimonials</strong> for headshots.{" "}
            <strong>Brand assets</strong> for private files (e.g. your media
            kit PDF).
          </p>
        </li>
        <li className="space-y-1">
          <p className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-groovy-teal)] text-xs font-bold text-white">
            2
          </p>
          <p className="font-serif text-lg text-[var(--color-plum)]">Upload the file</p>
          <p className="text-[var(--color-espresso)]/70">
            Choose the file and press Upload. On success you get a public URL
            you can copy for the blog, the hero image in Settings, or testimonials.
          </p>
        </li>
        <li className="space-y-1">
          <p className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-groovy-plum)] text-xs font-bold text-white">
            3
          </p>
          <p className="font-serif text-lg text-[var(--color-plum)]">
            Fill the “Add to UGC Portfolio” form
          </p>
          <p className="text-[var(--color-espresso)]/70">
            This only appears when you upload to a UGC Portfolio bucket. Title,
            category, excerpt → <em>Create UGC Portfolio piece</em>. Without
            this step the file is in storage but <strong>does not</strong> show
            on the public site.
          </p>
        </li>
      </ol>

      <div className="space-y-2">
        <h2 className="font-serif text-xl text-[var(--color-plum)]">Upload</h2>
        <p className="text-xs text-[var(--color-espresso)]/60">
          You need <code className="rounded bg-white/70 px-1">is_admin = true</code>{" "}
          on your <code className="rounded bg-white/70 px-1">profiles</code> row
          in Supabase for uploads to be allowed.
        </p>
      </div>

      <MediaUploadForm />

      <details className="rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-sm">
        <summary className="cursor-pointer font-semibold text-[var(--color-plum)]">
          What goes in which bucket?
        </summary>
        <ul className="mt-3 space-y-2 text-[var(--color-espresso)]/80">
          <li>
            <strong>portfolio-videos</strong> — MP4 UGC videos. After upload,
            fill the form to publish to the UGC Portfolio.
          </li>
          <li>
            <strong>portfolio-images</strong> — JPG/PNG photos for UGC Portfolio.
            Also used as poster/cover images for video pieces.
          </li>
          <li>
            <strong>blog-images</strong> — Cover and inline images for journal
            posts. Paste the public URL into the post body or cover field.
          </li>
          <li>
            <strong>testimonials</strong> — Square headshots for testimonial
            quotes.
          </li>
          <li>
            <strong>brand-assets</strong> — Private files (media kit PDF,
            unreleased assets). Use the URL in Settings → Media kit URL.
          </li>
        </ul>
      </details>
    </div>
  );
}
