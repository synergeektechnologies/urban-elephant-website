"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart"
import { Filter, SortAsc } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ProductsPage() {
  const { language } = useLanguage()
  const [filter, setFilter] = useState<"all" | "acacia" | "mahogany">("all")
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "size">("price-low")
  const cartCount = useCart((state) => state.getTotalItems())

  const translations = {
    en: {
      title: "Our Elephant Collection",
      subtitle: "Handcrafted wooden elephant statues in premium Mahogany and Rosewood",
      filters: "Filters",
      all: "All Products",
      acacia: "Acacia",
      mahogany: "Mahogany",
      sortBy: "Sort by",
      priceLow: "Price: Low to High",
      priceHigh: "Price: High to Low",
      size: "Size",
      showing: "Showing",
      products: "products",
    },
    ta: {
      title: "எங்கள் யானை தொகுப்பு",
      subtitle: "பிரீமியம் மஹோகனி மற்றும் ரோஸ்வுட்டில் கைவினைப்பொருள் மர யானை சிலைகள்",
      filters: "வடிகட்டிகள்",
      all: "அனைத்து தயாரிப்புகள்",
      acacia: "அகாசியா",
      mahogany: "மஹோகனி",
      sortBy: "வரிசைப்படுத்து",
      priceLow: "விலை: குறைவு முதல் அதிகம்",
      priceHigh: "விலை: அதிகம் முதல் குறைவு",
      size: "அளவு",
      showing: "காட்டுகிறது",
      products: "தயாரிப்புகள்",
    },
  }

  const t = translations[language]

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true
    return product.woodType === filter
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.basePrice - b.basePrice
      case "price-high":
        return b.basePrice - a.basePrice
      case "size":
        return a.sizeInFeet - b.sizeInFeet
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">{t.title}</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-4">{t.subtitle}</p>
        </div>

        <div className="flex flex-col gap-4 mb-6 sm:mb-8 p-4 sm:p-6 bg-secondary/30 rounded-lg">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Filter className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">{t.filters}:</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs sm:text-sm"
              >
                {t.all}
              </Button>
              <Button
                variant={filter === "acacia" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("acacia")}
                className="text-xs sm:text-sm"
              >
                {t.acacia}
              </Button>
              <Button
                variant={filter === "mahogany" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("mahogany")}
                className="text-xs sm:text-sm"
              >
                {t.mahogany}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 sm:ml-auto">
            <SortAsc className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">{t.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded border border-border bg-background text-sm min-w-0 flex-1 sm:flex-initial"
            >
              <option value="price-low">{t.priceLow}</option>
              <option value="price-high">{t.priceHigh}</option>
              <option value="size">{t.size}</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {t.showing} {sortedProducts.length} {t.products}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              {language === "en"
                ? "No products found matching your criteria."
                : "உங்கள் அளவுகோல்களுக்கு பொருந்தும் தயாரிப்புகள் எதுவும் கிடைக்கவில்லை."}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
