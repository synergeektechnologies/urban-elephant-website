"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

export default function CartPage() {
  const [language, setLanguage] = useState<"en" | "ta">("en")
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, clearCart } = useCart()

  const translations = {
    en: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      emptyDesc: "Add some beautiful elephant statues to your cart to get started.",
      continueShopping: "Continue Shopping",
      item: "Item",
      quantity: "Quantity",
      price: "Price",
      total: "Total",
      subtotal: "Subtotal",
      shipping: "Shipping",
      freeShipping: "Free",
      grandTotal: "Grand Total",
      proceedToCheckout: "Proceed to Checkout",
      clearCart: "Clear Cart",
      remove: "Remove",
      woodType: "Wood Type",
      size: "Size",
      weight: "Weight",
    },
    ta: {
      title: "ஷாப்பிங் கார்ட்",
      empty: "உங்கள் கூடை காலியாக உள்ளது",
      emptyDesc: "தொடங்குவதற்கு உங்கள் கூடையில் சில அழகான யானை சிலைகளைச் சேர்க்கவும்.",
      continueShopping: "ஷாப்பிங் தொடரவும்",
      item: "பொருள்",
      quantity: "அளவு",
      price: "விலை",
      total: "மொத்தம்",
      subtotal: "துணை மொத்தம்",
      shipping: "ஷிப்பிங்",
      freeShipping: "இலவசம்",
      grandTotal: "மொத்த தொகை",
      proceedToCheckout: "செக்அவுட்டுக்கு செல்லவும்",
      clearCart: "கூடையை அழிக்கவும்",
      remove: "அகற்று",
      woodType: "மர வகை",
      size: "அளவு",
      weight: "எடை",
    },
  }

  const t = translations[language]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId)
    toast.success(language === "en" ? `${productName} removed from cart` : `${productName} கூடையிலிருந்து அகற்றப்பட்டது`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success(language === "en" ? "Cart cleared successfully" : "கூடை வெற்றிகரமாக அழிக்கப்பட்டது")
  }

  const subtotal = getTotalPrice()
  // Aggregate price breakdown across cart
  const totals = items.reduce(
    (acc, item) => {
      acc.cost += item.product.cost * item.quantity
      acc.gst += item.product.gst * item.quantity
      acc.packing += item.product.packingCost * item.quantity
      acc.freight += item.product.freightCharges * item.quantity
      return acc
    },
    { cost: 0, gst: 0, packing: 0, freight: 0 },
  )
  const shipping = subtotal >= 5000 ? 0 : 500
  const grandTotal = subtotal + shipping

  const woodTypeLabel = {
    en: { aakeshya: "Aakeshya", mahogany: "Mahogany" },
    ta: { aakeshya: "ஆகேஷ்யா", mahogany: "மஹோகனி" },
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={getTotalItems()} language={language} onLanguageChange={setLanguage} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">{t.title}</h1>
            <p className="text-muted-foreground">
              {getTotalItems()} {language === "en" ? "items in your cart" : "பொருட்கள் உங்கள் கூடையில்"}
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.continueShopping}
            </Button>
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-semibold mb-4">{t.empty}</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t.emptyDesc}</p>
            <Link href="/products">
              <Button size="lg">{t.continueShopping}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{t.item}s</h2>
                <Button variant="outline" size="sm" onClick={handleClearCart}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t.clearCart}
                </Button>
              </div>

              {items.map((item) => (
                <Card key={item.product.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="w-full md:w-36 lg:w-40 h-36 lg:h-40 flex-shrink-0">
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={language === "en" ? item.product.name : item.product.nameTA}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {language === "en" ? item.product.name : item.product.nameTA}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" className="capitalize">
                              {woodTypeLabel[language][item.product.woodType]}
                            </Badge>
                            <Badge variant="outline">{item.product.sizeInFeet} ft</Badge>
                            <Badge variant="outline">{item.product.weightInKg} kg</Badge>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{t.quantity}:</span>
                            <div className="flex items-center border border-border rounded">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                {formatPrice(item.product.basePrice)} each
                              </p>
                              <p className="text-lg font-semibold">
                                {formatPrice(item.product.basePrice * item.quantity)}
                              </p>
                              {/* Per-item price breakdown */}
                              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground bg-secondary/30 p-3 rounded-md">
                                <span>{language === "en" ? "Item Cost" : "அடிப்படை"}</span>
                                <span className="text-right text-foreground">{formatPrice(item.product.cost * item.quantity)}</span>
                                <span>GST</span>
                                <span className="text-right text-foreground">{formatPrice(item.product.gst * item.quantity)}</span>
                                <span>{language === "en" ? "Packing" : "பேக்கிங்"}</span>
                                <span className="text-right text-foreground">{formatPrice(item.product.packingCost * item.quantity)}</span>
                                <span>{language === "en" ? "Freight" : "கப்பல்"}</span>
                                <span className="text-right text-foreground">{formatPrice(item.product.freightCharges * item.quantity)}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleRemoveItem(
                                  item.product.id,
                                  language === "en" ? item.product.name : item.product.nameTA,
                                )
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-md">
                <CardHeader className="p-4 sm:p-6 pb-0">
                  <CardTitle className="text-lg sm:text-xl">{language === "en" ? "Order Summary" : "ஆர்டர் சுருக்கம்"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6">
                  {/* Policy Notice */}
                  <Alert className="bg-secondary/30 border-none">
                    <AlertDescription className="text-sm">
                      {language === "en"
                        ? "100% payment required. Delivery time: 7 days. No cancellation."
                        : "100% கட்டணம் அவசியம். டெலிவரி நேரம்: 7 நாட்கள். ரத்து செய்ய இயலாது."}
                    </AlertDescription>
                  </Alert>
                  {/* Aggregated Price Breakdown */}
                  <div className="space-y-2 text-sm bg-secondary/30 p-3 rounded-md">
                    <div className="flex justify-between">
                      <span>{language === "en" ? "Items Cost" : "அடிப்படை"}</span>
                      <span>{formatPrice(totals.cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST</span>
                      <span>{formatPrice(totals.gst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === "en" ? "Packing" : "பேக்கிங்"}</span>
                      <span>{formatPrice(totals.packing)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === "en" ? "Freight" : "கப்பல்"}</span>
                      <span>{formatPrice(totals.freight)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span>{t.subtotal}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>{t.grandTotal}</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button size="lg" className="w-full">
                      {t.proceedToCheckout}
                    </Button>
                  </Link>

                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      {t.continueShopping}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer language={language} />
    </div>
  )
}
