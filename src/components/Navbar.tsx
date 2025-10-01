"use client";

import { useState } from "react";
import Link from "next/link";

type UserRole = "Customer" | "Organizer" | "Staff" | "Admin";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "My Tickets", href: "/tickets" },
  { label: "Organizer Request", href: "/organizer-request" },
  { label: "Profile", href: "/profile" },
];

const userRoles: { role: UserRole; icon: string; url?: string }[] = [
  { role: "Customer", icon: "👤", url: "/" },
  { role: "Organizer", icon: "👥", url: "/organizer" },
  { role: "Admin", icon: "🔧", url: "/admin" },
];

export default function Navbar() {
  const [activeRole, setActiveRole] = useState<UserRole>("Customer");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
            <span className="text-white text-xl font-bold">D</span>
          </div>
          <span className="text-2xl font-bold text-purple-600">Tick</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/* Customer Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors font-medium"
            >
              <span className="text-purple-600">👤</span>
              <span>{activeRole}</span>
              <span className="text-sm">▼</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px] z-50">
                {userRoles.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setActiveRole(item.role);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                      activeRole === item.role ? "bg-purple-50" : ""
                    }`}
                  >
                    <span>{item.icon}</span>
                    <Link href={item.url || "#"} className="font-medium text-gray-700">
                      {item.role}
                    </Link>
                    {activeRole === item.role && item.url && (
                      <Link href={item.url} className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        ACTIVE
                      </Link>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect Wallet Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
            <span>💳</span>
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
