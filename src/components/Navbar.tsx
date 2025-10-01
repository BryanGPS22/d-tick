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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-purple-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
            <span className="text-white text-xl font-bold">D</span>
          </div>
          <span className="text-xl md:text-2xl font-bold text-purple-600">Tick</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
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
        <div className="flex items-center gap-2 md:gap-4">
          {/* User Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors font-medium"
            >
              <span className="text-purple-600">👤</span>
              <span className="hidden sm:inline">{activeRole}</span>
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
                      <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        ACTIVE
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect Wallet Button */}
          <button className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm md:text-base">
            <span>💳</span>
            <span className="hidden sm:inline">Connect Wallet</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors font-medium px-4 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}