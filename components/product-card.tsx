"use client"

import { useState } from "react"
import Link from "next/link"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
  language?: "en" | "ta"
}

export function ProductCard({ product, language = "en" }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = async () => {
    setIsLoading(true)
    addItem(product)

    const message = language === "en" ? `${product.name} added to cart!` : `${product.nameTA} கூடையில் சேர்க்கப்பட்டது!`

    toast.success(message)
    setIsLoading(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const woodTypeLabel = {
    en: {
      mahogany: "Mahogany",
      rosewood: "Rosewood",
    },
    ta: {
      mahogany: "மஹோகனி",
      rosewood: "ரோஸ்வுட்",
    },
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={language === "en" ? product.name : product.nameTA}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm font-medium">
              {language === "en" ? "Out of Stock" : "கையிருப்பில் இல்லை"}
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="capitalize text-xs sm:text-sm font-medium">
            {woodTypeLabel[language][product.woodType]}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4 space-y-3 flex-1">
        <div className="space-y-2">
          <h3 className="font-semibold text-base sm:text-lg line-clamp-2 leading-tight">
            {language === "en" ? product.name : product.nameTA}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {language === "en" ? product.description : product.descriptionTA}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
          <div className="space-y-1">
            <span className="text-muted-foreground text-xs">{language === "en" ? "Size:" : "அளவு:"}</span>
            <p className="font-medium text-sm">{product.sizeInFeet} ft</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground text-xs">{language === "en" ? "Weight:" : "எடை:"}</span>
            <p className="font-medium text-sm">{product.weightInKg} kg</p>
          </div>
        </div>

        <div className="pt-1">
          <p className="text-lg sm:text-xl font-bold text-primary">{formatPrice(product.basePrice)}</p>
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
        <div className="flex flex-col gap-2 w-full">
          <Link href={`/products/${product.id}`} className="w-full">
            <Button variant="outline" className="w-full bg-transparent text-xs sm:text-sm py-2 h-auto min-h-[36px]">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate text-xs sm:text-sm">{language === "en" ? "View Details" : "விவரங்களைப் பார்க்கவும்"}</span>
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="w-full text-xs sm:text-sm py-2 h-auto min-h-[36px]"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate text-xs sm:text-sm">{language === "en" ? "Add to Cart" : "கூடையில் சேர்க்கவும்"}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
