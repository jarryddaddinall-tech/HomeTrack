"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { mockLogout } from "@/app/actions/auth";

function getInitials(email: string): string {
  if (!email) return "?";
  const part = email.split("@")[0];
  if (!part) return "?";
  if (part.length >= 2) return part.slice(0, 2).toUpperCase();
  return part[0].toUpperCase();
}

interface UserMenuProps {
  user: string;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuId = "user-menu-list";

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-medium text-accent transition-colors hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label="User menu"
      >
        {getInitials(user)}
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/60 bg-white/95 py-1 shadow-card backdrop-blur-sm"
          role="menu"
        >
          <div className="border-b border-slate-100 px-4 py-2">
            <p className="truncate text-sm font-medium text-slate-900">{user}</p>
          </div>
          <Link
            href="/settings"
            className="block px-4 py-2.5 text-sm text-slate-900 transition-colors hover:bg-accent/5"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          <form action={mockLogout}>
            <button
              type="submit"
              className="block w-full px-4 py-2.5 text-left text-sm text-slate-900 transition-colors hover:bg-accent/5"
              role="menuitem"
            >
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
