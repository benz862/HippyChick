import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortfolioEditor } from "../portfolio-editor";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditPortfolioPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) notFound();

  const { data: item, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !item) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">Edit piece</h1>
        <p className="mt-2 text-sm text-[var(--color-espresso)]/70">
          {item.title} — slug <code className="text-xs">{item.slug}</code>
        </p>
      </div>
      <PortfolioEditor mode="edit" item={item} />
    </div>
  );
}
