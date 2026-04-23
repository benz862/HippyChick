import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-cream)]">
      <AdminSidebar />
      <div className="flex-1 overflow-auto px-5 py-10 md:px-10">{children}</div>
    </div>
  );
}
