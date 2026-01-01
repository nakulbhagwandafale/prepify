"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { LayoutDashboard, LogOut, ChevronDown, MessageSquareHeart, Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  };

  const isActive = (path: string) => pathname === path;

  // Get first character of email for avatar
  const getInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        href="/"
        className={`text-sm font-medium transition-colors ${isActive("/")
          ? "text-violet-600 font-semibold"
          : "text-gray-700 hover:text-violet-600"
          } ${mobile ? "block py-2 text-base" : ""}`}
      >
        Home
      </Link>
      <button
        onClick={() => scrollToSection("features")}
        className={`text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors text-left ${mobile ? "block py-2 text-base w-full" : ""}`}
      >
        Features
      </button>
      <button
        onClick={() => scrollToSection("how-it-works")}
        className={`text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors text-left ${mobile ? "block py-2 text-base w-full" : ""}`}
      >
        How It Works
      </button>
      <Link
        href="/pricing"
        className={`text-sm font-medium transition-colors ${isActive("/pricing")
          ? "text-violet-600 font-semibold"
          : "text-gray-700 hover:text-violet-600"
          } ${mobile ? "block py-2 text-base" : ""}`}
      >
        Pricing
      </Link>
      <button
        onClick={() => scrollToSection("faq")}
        className={`text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors text-left ${mobile ? "block py-2 text-base w-full" : ""}`}
      >
        FAQ
      </button>
      <Link
        href="/feedback"
        onClick={(e) => {
          if (!user) {
            e.preventDefault();
            router.push("/login?redirect=/feedback");
          }
        }}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive("/feedback")
          ? "text-violet-600 font-semibold"
          : "text-gray-700 hover:text-violet-600"
          } ${mobile ? "block py-2 text-base" : ""}`}
      >
        <MessageSquareHeart className="w-4 h-4" />
        Feedback
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <img
              src="/preply_icon.png"
              alt="Preply"
              className="h-10 w-10 rounded-lg"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Preply
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          <div className="flex items-center space-x-3">
            {!loading && (
              <>
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    {/* Profile Avatar Button */}
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="hidden md:flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {getInitial()}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mobile Profile Icon (Just the avatar, no dropdown, opens menu presumably or separate mobile logic if needed, but for now we keep it simple or integrate into mobile menu) */}
                    {/* For mobile, we might want the menu button to handle everything. Let's hide this profile dropdown trigger on mobile and put profile actions in hamburger menu. */}


                    {/* Desktop Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="hidden md:block absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-dropdown">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                          <p className="text-xs text-gray-500">Logged in</p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-3">
                    <Link
                      href="/signup"
                      className="px-5 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 hover:shadow-md transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/login"
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg px-6 py-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 mb-6">
            <NavLinks mobile />
          </nav>

          <div className="pt-4 border-t border-gray-100">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {getInitial()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 hover:text-violet-600 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-2 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-5 py-2.5 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 hover:shadow-md transition-all duration-200"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dropdown Animation Styles */}
      <style jsx>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
}