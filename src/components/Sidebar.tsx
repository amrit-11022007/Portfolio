import { useEffect, useState } from "react";
import { navItems } from "../data/data";

interface SidebarProps {
  activeSection: string;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  activeSection,
  mobileOpen,
  onClose,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const check = () =>
      setCollapsed(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTo = (id: string, external?: string) => {
    if (external) {
      window.open(external, "_blank");
      return;
    }

    const el = document.getElementById(id);

    if (el) el.scrollIntoView({ behavior: "smooth" });

    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? "active" : ""}`}
        onClick={onClose}
      />

      <aside
        className={`sidebar ${
          collapsed ? "sidebar-collapsed" : ""
        } ${mobileOpen ? "mobile-open" : ""}`}
      >
        {/* Logo / Brand */}
        <div className="mb-10 overflow-hidden">
          {collapsed ? (
            <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] bg-[var(--blue)] font-['Syne'] text-[1rem] font-extrabold text-white">
              A
            </div>
          ) : (
            <div className="flex items-center gap-[10px]">
              <div className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[var(--blue)] font-['Syne'] text-[1rem] font-extrabold text-white">
                A
              </div>

              <div>
                <div className="whitespace-nowrap font-['Syne'] text-[0.875rem] font-bold leading-[1.2] text-[var(--text-primary)]">
                  Amrit Raj Yadav
                </div>

                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-[var(--blue)]">
                  Portfolio
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id, item.external)}
              title={collapsed ? item.label : undefined}
              className={`sidebar-nav-item w-full border-none bg-transparent ${
                activeSection === item.id ? "active" : ""
              } ${collapsed ? "justify-center" : "justify-start"}`}
            >
              {!collapsed && (
                <span className="transition-opacity duration-300">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Status */}
        {!collapsed && (
          <div className="mt-auto flex items-center gap-2 rounded-xl border border-[rgba(41,121,255,0.12)] bg-[rgba(41,121,255,0.06)] px-3 py-3">
            <div className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />

            <span className="text-[0.75rem] font-medium text-[var(--text-muted)]">
              Open to internships
            </span>
          </div>
        )}
      </aside>
    </>
  );
}
