'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { ThemeToggle } from '../shared/theme-toggle';
import { LanguageSwitcher } from '../shared/language-switcher';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          GiftShop
        </Link>

        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link href="/products" className="hover:text-primary transition">المنتجات</Link>
          <Link href="/dashboard" className="hover:text-primary transition">لوحتي</Link>
          <Link href="/deposit" className="hover:text-primary transition">شحن الرصيد</Link>
        </nav>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link href="/cart" className="p-2 relative">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link href="/auth/login" className="hidden md:block btn btn-sm btn-primary">
            <User className="h-4 w-4 inline ml-1" /> دخول
          </Link>
          {isMobile && (
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-64 bg-background p-6 shadow-lg rtl:left-0 rtl:right-auto" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col space-y-4">
              <Link href="/products" onClick={() => setIsMenuOpen(false)}>المنتجات</Link>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>لوحتي</Link>
              <Link href="/deposit" onClick={() => setIsMenuOpen(false)}>شحن الرصيد</Link>
              <hr />
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>دخول</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}