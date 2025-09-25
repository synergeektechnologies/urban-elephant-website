"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Globe } from "lucide-react"

interface HeaderProps {
  cartCount?: number
  language?: "en" | "ta"
  onLanguageChange?: (lang: "en" | "ta") => void
}

export function Header({ cartCount = 0, language = "en", onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const translations = {
    en: {
      home: "Home",
      products: "Products",
      cart: "Cart",
      about: "Elephants",
      reviews: "Reviews",
    },
    ta: {
      home: "முகப்பு",
      products: "தயாரிப்புகள்",
      cart: "கூடை",
      about: "யானைகள் பற்றி",
      reviews: "விமர்சனங்கள்",
    },
  }

  const t = translations[language]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-serif font-bold text-primary">🐘 The Urban Elephant</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t.home}
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            {t.products}
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            {t.about}
          </Link>
          <Link href="/reviews" className="text-sm font-medium hover:text-primary transition-colors">
            {t.reviews}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLanguageChange?.(language === "en" ? "ta" : "en")}
            className="hidden md:flex items-center space-x-1"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs">{language === "en" ? "தமிழ்" : "ENG"}</span>
          </Button>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/" className="block text-sm font-medium hover:text-primary transition-colors">
              {t.home}
            </Link>
            <Link href="/products" className="block text-sm font-medium hover:text-primary transition-colors">
              {t.products}
            </Link>
            <Link href="/about" className="block text-sm font-medium hover:text-primary transition-colors">
              {t.about}
            </Link>
            <Link href="/reviews" className="block text-sm font-medium hover:text-primary transition-colors">
              {t.reviews}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLanguageChange?.(language === "en" ? "ta" : "en")}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs">{language === "en" ? "தமிழ்" : "ENG"}</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
