"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getProductById } from "@/lib/products"
import { useCart } from "@/lib/cart"
import { ArrowLeft, ShoppingCart, Truck, Shield, Award } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/language-context"

export default function ProductDetailPage() {
  const params = useParams()
  const { language } = useLanguage()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const product = getProductById(params.id as string)
  const addItem = useCart((state) => state.addItem)
  const cartCount = useCart((state) => state.getTotalItems())

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={cartCount} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {language === "en" ? "Product Not Found" : "தயாரிப்பு கிடைக்கவில்லை"}
            </h1>
            <Link href="/products">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "en" ? "Back to Products" : "தயாரிப்புகளுக்கு திரும்பு"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    addItem(product, quantity)

    const message =
      language === "en"
        ? `${quantity} x ${product.name} added to cart!`
        : `${quantity} x ${product.nameTA} கூடையில் சேர்க்கப்பட்டது!`

    toast.success(message)
    setIsLoading(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const translations = {
    en: {
      backToProducts: "Back to Products",
      addToCart: "Add to Cart",
      quantity: "Quantity",
      specifications: "Specifications",
      woodType: "Wood Type",
      size: "Size",
      weight: "Weight",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      features: "Features",
      freeShipping: "Free Shipping",
      freeShippingDesc: "Free delivery on orders above ₹5,000",
      handcrafted: "Handcrafted",
      handcraftedDesc: "Made by skilled artisans using traditional techniques",
      quality: "Premium Quality",
      qualityDesc: "Finest wood selection with natural finish",
      warranty: "Lifetime Care",
      warrantyDesc: "Care instructions and maintenance support",
    },
    ta: {
      backToProducts: "தயாரிப்புகளுக்கு திரும்பு",
      addToCart: "கூடையில் சேர்க்கவும்",
      quantity: "அளவு",
      specifications: "விவரக்குறிப்புகள்",
      woodType: "மர வகை",
      size: "அளவு",
      weight: "எடை",
      inStock: "கையிருப்பில் உள்ளது",
      outOfStock: "கையிருப்பில் இல்லை",
      features: "அம்சங்கள்",
      freeShipping: "இலவச ஷிப்பிங்",
      freeShippingDesc: "₹5,000க்கு மேல் ஆர்டர்களுக்கு இலவச டெலிவரி",
      handcrafted: "கைவினைப்பொருள்",
      handcraftedDesc: "பாரம்பரிய நுட்பங்களைப் பயன்படுத்தி திறமையான கைவினைஞர்களால் செய்யப்பட்டது",
      quality: "பிரீமியம் தரம்",
      qualityDesc: "இயற்கை பூச்சுடன் சிறந்த மர தேர்வு",
      warranty: "வாழ்நாள் பராமரிப்பு",
      warrantyDesc: "பராமரிப்பு வழிமுறைகள் மற்றும் பராமரிப்பு ஆதரவு",
    },
  }

  const t = translations[language]

  const woodTypeLabel = {
    en: { acacia: "Acacia", mahogany: "Mahogany" },
    ta: { acacia: "அகாசியா", mahogany: "மஹோகனி" },
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} />

      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToProducts}
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary/30">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={language === "en" ? product.name : product.nameTA}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {woodTypeLabel[language][product.woodType]}
                </Badge>
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? t.inStock : t.outOfStock}
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-balance">
                {language === "en" ? product.name : product.nameTA}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {language === "en" ? product.description : product.descriptionTA}
              </p>
            </div>

            <div className="text-3xl font-bold text-primary">{formatPrice(product.basePrice)}</div>

            {/* Policy Notice */}
            <Alert className="bg-secondary/30 border-none">
              <AlertDescription className="text-sm">
                {language === "en"
                  ? "100% payment required. Delivery time: 7 days. No cancellation."
                  : "100% கட்டணம் அவசியம். டெலிவரி நேரம்: 7 நாட்கள். ரத்து செய்ய இயலாது."}
              </AlertDescription>
            </Alert>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t.specifications}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground">{t.woodType}:</span>
                    <p className="font-medium capitalize">{woodTypeLabel[language][product.woodType]}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t.size}:</span>
                    <p className="font-medium">{product.sizeInFeet} ft</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t.weight}:</span>
                    <p className="font-medium">{product.weightInKg} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{language === "en" ? "Price Breakdown" : "விலை விவரம்"}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-muted-foreground">{language === "en" ? "Item Cost" : "அடிப்படை விலை"}</div>
                  <div className="text-right font-medium">{formatPrice(product.cost)}</div>
                  <div className="text-muted-foreground">GST</div>
                  <div className="text-right font-medium">{formatPrice(product.gst)}</div>
                  <div className="text-muted-foreground">{language === "en" ? "Packing" : "பேக்கிங்"}</div>
                  <div className="text-right font-medium">{formatPrice(product.packingCost)}</div>
                  <div className="text-muted-foreground">{language === "en" ? "Freight" : "கப்பல் கட்டணம்"}</div>
                  <div className="text-right font-medium">{formatPrice(product.freightCharges)}</div>
                  <div className="text-muted-foreground font-semibold">{language === "en" ? "Total" : "மொத்தம்"}</div>
                  <div className="text-right font-bold text-primary">{formatPrice(product.basePrice)}</div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">{t.quantity}:</label>
                <div className="flex items-center border border-border rounded">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full text-lg py-6"
                onClick={handleAddToCart}
                disabled={!product.inStock || isLoading}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t.addToCart} - {formatPrice(product.basePrice * quantity)}
              </Button>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t.features}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t.handcrafted}</p>
                      <p className="text-sm text-muted-foreground">{t.handcraftedDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t.quality}</p>
                      <p className="text-sm text-muted-foreground">{t.qualityDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t.warranty}</p>
                      <p className="text-sm text-muted-foreground">{t.warrantyDesc}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
