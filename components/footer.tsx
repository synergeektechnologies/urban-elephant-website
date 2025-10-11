"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface FooterProps {}

export function Footer({}: FooterProps) {
  const { language } = useLanguage()
  const translations = {
    en: {
      company: "The Urban Elephant",
      tagline: "Handcrafted wooden elephant statues with traditional artistry",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      followUs: "Follow Us",
      address: "MVsv Enterprises, No.1 Elite Homes, Kasinath Garden, Sundakkamuthur, Coimbatore - 641010",
      email: "mvsv2367@gmail.com",
      phone: "+91 93811 34997",
      copyright: "© 2025 The Urban Elephant. All rights reserved.",
      links: {
        home: "Home",
        products: "Products",
        about: "About Elephants",
        reviews: "Reviews",
        cart: "Cart",
      },
    },
    ta: {
      company: "தி அர்பன் எலிஃபண்ட்",
      tagline: "பாரம்பரிய கைவினைத்திறனுடன் கூடிய மர யானை சிலைகள்",
      quickLinks: "விரைவு இணைப்புகள்",
      contact: "எங்களை தொடர்பு கொள்ளுங்கள்",
      followUs: "எங்களை பின்தொடருங்கள்",
      address: "எம்.வி.எஸ்.வி என்டர்ப்ரைசஸ், நம்பர் 1 எலிட் ஹோம்ஸ், காசிநாத் கார்டன், சுந்தக்கமுத்தூர், கோயம்புத்தூர் - 641010",
      email: "mvsv2367@gmail.com",
      phone: "+91 93811 34997",
      copyright: "© 2025 தி அர்பன் எலிஃபண்ட். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      links: {
        home: "முகப்பு",
        products: "தயாரிப்புகள்",
        about: "யானைகள் பற்றி",
        reviews: "மதிப்புரைகள்",
        cart: "கூடை",
      },
    },
  }

  const t = translations[language]

  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🐘</span>
              <h3 className="text-xl font-serif font-bold">{t.company}</h3>
            </div>
            <p className="text-muted-foreground text-pretty leading-relaxed">{t.tagline}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t.quickLinks}</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                {t.links.home}
              </Link>
              <Link href="/products" className="block text-muted-foreground hover:text-primary transition-colors">
                {t.links.products}
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                {t.links.about}
              </Link>
              <Link href="/reviews" className="block text-muted-foreground hover:text-primary transition-colors">
                {t.links.reviews}
              </Link>
              <Link href="/cart" className="block text-muted-foreground hover:text-primary transition-colors">
                {t.links.cart}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground text-pretty text-sm">{t.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${t.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${t.phone}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Social section removed as requested */}
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
