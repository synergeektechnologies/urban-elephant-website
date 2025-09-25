"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QRCode } from "@/components/qr-code"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart"
import { ArrowLeft, CreditCard, User } from "lucide-react"
import { toast } from "sonner"

interface CustomerDetails {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export default function CheckoutPage() {
  const [language, setLanguage] = useState<"en" | "ta">("en")
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [showPayment, setShowPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()

  useEffect(() => {
    // Only redirect to cart if cart is empty AND we're not processing payment
    if (items.length === 0 && !isProcessing && !paymentCompleted) {
      router.push("/cart")
    }
  }, [items, router, isProcessing, paymentCompleted])

  const translations = {
    en: {
      title: "Checkout",
      customerDetails: "Customer Details",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      address: "Street Address",
      city: "City",
      state: "State",
      pincode: "PIN Code",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      freeShipping: "Free",
      total: "Total",
      proceedToPayment: "Proceed to Payment",
      paymentDetails: "Payment Details",
      scanQR: "Scan QR Code to Pay",
      paymentInstructions:
        "Scan the QR code with your UPI app to complete the payment. Your order will be processed once payment is verified.",
      backToCart: "Back to Cart",
      processing: "Processing...",
      completePayment: "I have completed the payment",
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      invalidPhone: "Please enter a valid phone number",
      invalidPincode: "Please enter a valid PIN code",
    },
    ta: {
      title: "செக்அவுட்",
      customerDetails: "வாடிக்கையாளர் விவரங்கள்",
      name: "முழு பெயர்",
      email: "மின்னஞ்சல் முகவரி",
      phone: "தொலைபேசி எண்",
      address: "தெரு முகவரி",
      city: "நகரம்",
      state: "மாநிலம்",
      pincode: "பின் கோட்",
      orderSummary: "ஆர்டர் சுருக்கம்",
      subtotal: "துணை மொத்தம்",
      shipping: "ஷிப்பிங்",
      freeShipping: "இலவசம்",
      total: "மொத்தம்",
      proceedToPayment: "பேமெண்ட்டுக்கு செல்லவும்",
      paymentDetails: "பேமெண்ட் விவரங்கள்",
      scanQR: "பணம் செலுத்த QR கோட்டை ஸ்கேன் செய்யவும்",
      paymentInstructions:
        "பேமெண்ட்டை முடிக்க உங்கள் UPI ஆப்புடன் QR கோட்டை ஸ்கேன் செய்யவும். பேமெண்ட் சரிபார்க்கப்பட்டவுடன் உங்கள் ஆர்டர் செயலாக்கப்படும்.",
      backToCart: "கார்ட்டுக்கு திரும்பு",
      processing: "செயலாக்கம்...",
      completePayment: "நான் பேமெண்ட்டை முடித்துவிட்டேன்",
      required: "இந்த புலம் தேவை",
      invalidEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்",
      invalidPhone: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்",
      invalidPincode: "சரியான பின் கோட்டை உள்ளிடவும்",
    },
  }

  const t = translations[language]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 5000 ? 0 : 500
  const total = subtotal + shipping

  const validateForm = () => {
    const errors: string[] = []

    if (!customerDetails.name.trim()) errors.push(t.required + ": " + t.name)
    if (!customerDetails.email.trim()) errors.push(t.required + ": " + t.email)
    if (!customerDetails.phone.trim()) errors.push(t.required + ": " + t.phone)
    if (!customerDetails.address.trim()) errors.push(t.required + ": " + t.address)
    if (!customerDetails.city.trim()) errors.push(t.required + ": " + t.city)
    if (!customerDetails.state.trim()) errors.push(t.required + ": " + t.state)
    if (!customerDetails.pincode.trim()) errors.push(t.required + ": " + t.pincode)

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (customerDetails.email && !emailRegex.test(customerDetails.email)) {
      errors.push(t.invalidEmail)
    }

    // Phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/
    if (customerDetails.phone && !phoneRegex.test(customerDetails.phone.replace(/\D/g, ""))) {
      errors.push(t.invalidPhone)
    }

    // PIN code validation
    const pincodeRegex = /^\d{6}$/
    if (customerDetails.pincode && !pincodeRegex.test(customerDetails.pincode)) {
      errors.push(t.invalidPincode)
    }

    return errors
  }

  const handleProceedToPayment = () => {
    const errors = validateForm()
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error))
      return
    }
    setShowPayment(true)
  }

  const handleCompletePayment = async () => {
    setIsProcessing(true)
    setPaymentCompleted(true) // Set this flag to prevent cart redirect

    try {
      // Show success message
      toast.success(
        language === "en" 
          ? "Payment completed successfully! Redirecting..." 
          : "பேமெண்ட் வெற்றிகரமாக முடிந்தது! திருப்பி அனுப்புகிறது..."
      )

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and redirect to thank you page
      clearCart()
      router.push("/thank-you")
    } catch (error) {
      console.error("Payment processing error:", error)
      toast.error(
        language === "en" 
          ? "There was an error processing your payment. Please try again." 
          : "உங்கள் பேமெண்ட்டை செயலாக்குவதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
      )
      setIsProcessing(false)
      setPaymentCompleted(false) // Reset flag on error
    }
  }

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const paymentData = `upi://pay?pa=merchant@upi&pn=The Urban Elephant&am=${total}&cu=INR&tn=Order Payment - ${items.length} items`

  if (items.length === 0 && !isProcessing && !paymentCompleted) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={getTotalItems()} language={language} onLanguageChange={setLanguage} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">{t.title}</h1>
          <Link href="/cart">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToCart}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Customer Details Form */}
          <div className="lg:col-span-2 space-y-6">
            {!showPayment ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {t.customerDetails}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">{t.name} *</Label>
                      <Input
                        id="name"
                        value={customerDetails.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder={language === "en" ? "Enter your full name" : "உங்கள் முழு பெயரை உள்ளிடவும்"}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">{t.email} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder={language === "en" ? "Enter your email" : "உங்கள் மின்னஞ்சலை உள்ளிடவும்"}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">{t.phone} *</Label>
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder={language === "en" ? "Enter your phone number" : "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்"}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">{t.address} *</Label>
                    <Textarea
                      id="address"
                      value={customerDetails.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder={language === "en" ? "Enter your complete address" : "உங்கள் முழு முகவரியை உள்ளிடவும்"}
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium">{t.city} *</Label>
                      <Input
                        id="city"
                        value={customerDetails.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder={language === "en" ? "City" : "நகரம்"}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-sm font-medium">{t.state} *</Label>
                      <Input
                        id="state"
                        value={customerDetails.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder={language === "en" ? "State" : "மாநிலம்"}
                        className="mt-1"
                      />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <Label htmlFor="pincode" className="text-sm font-medium">{t.pincode} *</Label>
                      <Input
                        id="pincode"
                        value={customerDetails.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder={language === "en" ? "PIN Code" : "பின் கோட்"}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Payment Section */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    {t.paymentDetails}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-4 sm:p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold">{t.scanQR}</h3>
                    <div className="flex justify-center">
                      <div className="w-48 h-48 sm:w-60 sm:h-60">
                        <QRCode value={paymentData} size={200} className="w-full h-full" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto text-pretty px-2">
                      {t.paymentInstructions}
                    </p>
                    <div className="bg-secondary/30 p-4 rounded-lg mx-2">
                      <p className="font-semibold text-lg sm:text-xl">
                        {language === "en" ? "Amount to Pay:" : "செலுத்த வேண்டிய தொகை:"} {formatPrice(total)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button variant="outline" onClick={() => setShowPayment(false)} className="flex-1 order-2 sm:order-1">
                      {language === "en" ? "Back to Details" : "விவரங்களுக்கு திரும்பு"}
                    </Button>
                    <Button onClick={handleCompletePayment} disabled={isProcessing} className="flex-1 order-1 sm:order-2">
                      {isProcessing ? t.processing : t.completePayment}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <Card className="sticky top-4">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">{t.orderSummary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={language === "en" ? item.product.name : item.product.nameTA}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium line-clamp-2">
                          {language === "en" ? item.product.name : item.product.nameTA}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {language === "en" ? "Qty:" : "அளவு:"} {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm sm:text-base font-medium flex-shrink-0">{formatPrice(item.product.basePrice * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>{t.subtotal}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>{t.shipping}</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? t.freeShipping : formatPrice(shipping)}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg sm:text-xl font-semibold">
                    <span>{t.total}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {!showPayment && (
                  <Button size="lg" className="w-full text-sm sm:text-base py-3" onClick={handleProceedToPayment}>
                    {t.proceedToPayment}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}
