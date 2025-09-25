"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, ShoppingBag, Mail, Phone } from "lucide-react"

export default function ThankYouPage() {
  const [language, setLanguage] = useState<"en" | "ta">("en")
  const [orderNumber] = useState(() => `ORD-${Date.now().toString().slice(-8)}`)
  const router = useRouter()

  // Redirect to home if accessed directly without completing a purchase
  useEffect(() => {
    // Check if user came from checkout (you could also use session storage or other methods)
    const referrer = document.referrer
    if (!referrer.includes('/checkout')) {
      // Optional: redirect to home if accessed directly
      // router.push('/')
    }
  }, [router])

  const translations = {
    en: {
      title: "Thank You for Your Order!",
      subtitle: "Your order has been received",
      mainMessage: "Your payment has been received and your order is being processed.",
      orderNumber: "Order Number",
      whatNext: "What happens next?",
      steps: [
        {
          title: "Payment Verification",
          description: "We will verify your payment within 2-4 hours during business hours.",
        },
        {
          title: "Order Processing",
          description: "Once verified, your handcrafted elephant statues will be carefully prepared for shipping.",
        },
        {
          title: "Shipping & Delivery",
          description: "Your order will be shipped within 3-5 business days with tracking information.",
        },
      ],
      contact: "Need Help?",
      contactDesc: "If you have any questions about your order, feel free to contact us:",
      email: "Email: support@theurbanelephant.com",
      phone: "Phone: +91 98765 43210",
      continueShopping: "Continue Shopping",
      backHome: "Back to Home",
      thankYouNote:
        "Thank you for choosing our handcrafted elephant statues. Each piece is made with love and traditional craftsmanship.",
    },
    ta: {
      title: "உங்கள் ஆர்டருக்கு நன்றி!",
      subtitle: "உங்கள் ஆர்டர் பெறப்பட்டது",
      mainMessage: "உங்கள் பேமெண்ட் பெறப்பட்டது மற்றும் உங்கள் ஆர்டர் செயலாக்கப்படுகிறது.",
      orderNumber: "ஆர்டர் எண்",
      whatNext: "அடுத்து என்ன நடக்கும்?",
      steps: [
        {
          title: "பேமெண்ட் சரிபார்ப்பு",
          description: "வணிக நேரங்களில் 2-4 மணி நேரத்திற்குள் உங்கள் பேமெண்ட்டை நாங்கள் சரிபார்ப்போம்.",
        },
        {
          title: "ஆர்டர் செயலாக்கம்",
          description: "சரிபார்க்கப்பட்டவுடன், உங்கள் கைவினைப்பொருள் யானை சிலைகள் ஷிப்பிங்கிற்காக கவனமாக தயாரிக்கப்படும்.",
        },
        {
          title: "ஷிப்பிங் மற்றும் டெலிவரி",
          description: "உங்கள் ஆர்டர் 3-5 வணிக நாட்களுக்குள் ட்ராக்கிங் தகவலுடன் அனுப்பப்படும்.",
        },
      ],
      contact: "உதவி தேவையா?",
      contactDesc: "உங்கள் ஆர்டர் பற்றி ஏதேனும் கேள்விகள் இருந்தால், எங்களை தொடர்பு கொள்ள தயங்க வேண்டாம்:",
      email: "மின்னஞ்சல்: support@theurbanelephant.com",
      phone: "தொலைபேசி: +91 98765 43210",
      continueShopping: "ஷாப்பிங் தொடரவும்",
      backHome: "முகப்புக்கு திரும்பு",
      thankYouNote:
        "எங்கள் கைவினைப்பொருள் யானை சிலைகளை தேர்ந்தெடுத்ததற்கு நன்றி. ஒவ்வொரு துண்டும் அன்பு மற்றும் பாரம்பரிய கைவினைத்திறனுடன் செய்யப்படுகிறது.",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-600 animate-pulse" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{t.subtitle}</p>

            {/* Order Number */}
            <Card className="inline-block">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{t.orderNumber}</p>
                <p className="text-lg font-mono font-semibold">{orderNumber}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Message */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-balance">{t.mainMessage}</h2>
              <p className="text-muted-foreground text-pretty">{t.thankYouNote}</p>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">{t.whatNext}</h3>
              <div className="space-y-6">
                {t.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground text-pretty">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">{t.contact}</h3>
              <p className="text-muted-foreground mb-4">{t.contactDesc}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>{t.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{t.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <Home className="w-5 h-5 mr-2" />
                {t.backHome}
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                <ShoppingBag className="w-5 h-5 mr-2" />
                {t.continueShopping}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
