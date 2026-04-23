import { PortfolioEditor } from "../portfolio-editor";

export const metadata = {
  title: "New UGC Portfolio piece",
};

export default function NewPortfolioPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">New UGC Portfolio piece</h1>
        <p className="mt-2 text-sm text-[var(--color-espresso)]/70">
          Save as a draft until media URLs and copy are ready, then check Published.
        </p>
      </div>
      <PortfolioEditor mode="create" />
    </div>
  );
}
