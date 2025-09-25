"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "ta">("en")

  const translations = {
    en: {
      hero: {
        title: "Sacred Elephant Statues",
        subtitle: "Handcrafted with devotion",
        description:
          "Transform your home into a sanctuary of wisdom and prosperity with our exquisite wooden elephant statues, carved by master artisans using traditional techniques passed down through generations.",
        cta: "Explore Collection",
      },
      benefits: {
        title: "Why Keep Elephant Statues at Home?",
        items: [
          {
            icon: "🏠",
            title: "Vastu Harmony",
            description:
              "According to Vastu Shastra, elephant statues bring positive energy and remove obstacles from your living space.",
          },
          {
            icon: "💰",
            title: "Prosperity & Wealth",
            description:
              "Elephants with raised trunks are believed to attract good fortune, success, and financial abundance.",
          },
          {
            icon: "🛡️",
            title: "Protection & Strength",
            description:
              "These majestic creatures symbolize protection, wisdom, and the strength to overcome life's challenges.",
          },
          {
            icon: "🧘",
            title: "Spiritual Growth",
            description:
              "Elephant statues enhance meditation practices and create a peaceful, spiritually enriching environment.",
          },
        ],
      },
      about: {
        title: "The Magnificent Elephant",
        description:
          "Elephants are the largest land animals and can live up to about 70 years. There are three major elephant species in the world: the African Savanna (Bush) Elephant, the African Forest Elephant, and the Asian Elephant. The male is called 'Kaliru' (bull), the female is 'Pidi' (cow), and the young one is 'Kanru' (calf). The elephant has a very long trunk, which contains about 40,000 muscles. They are very strong; even lions and tigers usually do not attack them directly. Elephants have excellent memory and live socially in families. Research shows that elephants also possess self-awareness.",
        facts: [
          "Elephants can live up to 70 years and are the largest land animals",
          "The elephant trunk contains about 40,000 muscles making it incredibly versatile",
          "The gestation period of an elephant is 22 months, the longest among mammals",
          "A newborn calf weighs about 90-115 kg and is protected immediately by the herd",
        ],
      },
    },
    ta: {
      hero: {
        title: "புனித யானை சிலைகள்",
        subtitle: "பக்தியுடன் கைவினைப்பொருள்",
        description:
          "தலைமுறைகளாக கடத்தப்பட்ட பாரம்பரிய நுட்பங்களைப் பயன்படுத்தி மாஸ்டர் கைவினைஞர்களால் செதுக்கப்பட்ட எங்கள் அழகிய மர யானை சிலைகளுடன் உங்கள் வீட்டை ஞானம் மற்றும் செழிப்பின் சரணாலயமாக மாற்றுங்கள்.",
        cta: "தொகுப்பை ஆராயுங்கள்",
      },
      benefits: {
        title: "வீட்டில் யானை சிலைகளை ஏன் வைக்க வேண்டும்?",
        items: [
          {
            icon: "🏠",
            title: "வாஸ்து இணக்கம்",
            description:
              "வாஸ்து சாஸ்திரத்தின் படி, யானை சிலைகள் நேர்மறை ஆற்றலைக் கொண்டு வந்து உங்கள் வாழ்க்கை இடத்திலிருந்து தடைகளை நீக்குகின்றன.",
          },
          {
            icon: "💰",
            title: "செழிப்பு மற்றும் செல்வம்",
            description:
              "உயர்த்தப்பட்ட துதிக்கைகளுடன் கூடிய யானைகள் நல்ல அதிர்ஷ்டம், வெற்றி மற்றும் நிதி செழிப்பை ஈர்க்கும் என்று நம்பப்படுகிறது.",
          },
          {
            icon: "🛡️",
            title: "பாதுகாப்பு மற்றும் வலிமை",
            description: "இந்த கம்பீரமான உயிரினங்கள் பாதுகாப்பு, ஞானம் மற்றும் வாழ்க்கையின் சவால்களை வெல்லும் வலிமையை குறிக்கின்றன.",
          },
          {
            icon: "🧘",
            title: "ஆன்மீக வளர்ச்சி",
            description:
              "யானை சிலைகள் தியான நடைமுறைகளை மேம்படுத்துகின்றன மற்றும் அமைதியான, ஆன்மீக ரீதியாக வளப்படுத்தும் சூழலை உருவாக்குகின்றன.",
          },
        ],
      },
      about: {
        title: "அற்புதமான யானை",
        description:
          "யானைகள் மிகப்பெரிய நில விலங்குகள் மற்றும் சுமார் 70 ஆண்டுகள் வரை வாழ முடியும். உலகில் மூன்று முக்கிய யானை இனங்கள் உள்ளன: ஆப்பிரிக்க சவன்னா யானை, ஆப்பிரிக்க வன யானை மற்றும் ஆசிய யானை. ஆண் 'களிறு', பெண் 'பிடி', குட்டி 'கன்று' என்று அழைக்கப்படுகிறது. யானையின் துதிக்கையில் சுமார் 40,000 தசைகள் உள்ளன. அவை மிகவும் வலிமையானவை; சிங்கங்கள் மற்றும் புலிகள் கூட பொதுவாக அவற்றை நேரடியாக தாக்குவதில்லை.",
        facts: [
          "யானைகள் 70 ஆண்டுகள் வரை வாழும் மிகப்பெரிய நில விலங்குகள்",
          "யானையின் துதிக்கையில் சுமார் 40,000 தசைகள் உள்ளன",
          "யானையின் கர்ப்ப காலம் 22 மாதங்கள், பாலூட்டிகளில் மிக நீண்டது",
          "புதிதாக பிறந்த கன்று சுமார் 90-115 கிலோ எடை இருக்கும்",
          "ஆசிய பெண் யானைகளுக்கு பொதுவாக தந்தங்கள் இருக்காது",
          "யானைகள் அவற்றின் சமூக அமைப்பு, புத்திசாலித்தனம் மற்றும் நீண்ட ஆயுளுக்கு தனித்துவமானவை",
          "யானைகளில் இரட்டைப் பிறப்பு மிகவும் அரிது - பொதுவாக ஒரே கன்று பிறக்கும்",
          "ஆயிரக்கணக்கான ஆண்டுகளாக யானைகள் ஞானம் மற்றும் வலிமையின் சின்னங்களாக உள்ளன",
        ],
      },
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-balance leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-serif italic">{t.hero.subtitle}</p>
              </div>
              <p className="text-base sm:text-lg text-pretty leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.hero.description}
              </p>
              <Link href="/products">
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative order-first lg:order-last">
              <img
                src="/elegant-wooden-elephant-statue-mahogany-traditiona.jpg"
                alt="Handcrafted wooden elephant statue"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-balance px-4">
            {t.benefits.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.benefits.items.map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                  <div className="text-3xl sm:text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty text-sm sm:text-base flex-1">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Elephants Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-last lg:order-first">
              <img
                src="/majestic-elephant-in-natural-habitat-traditional-a.jpg"
                alt="Majestic elephant"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-balance text-center lg:text-left">
                {t.about.title}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-pretty">{t.about.description}</p>
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold">Fascinating Facts:</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {t.about.facts.map((fact, index) => (
                    <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-pretty text-sm sm:text-base">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-balance">
            {language === "en" ? "Bring Home the Wisdom of Elephants" : "யானைகளின் ஞானத்தை வீட்டிற்கு கொண்டு வாருங்கள்"}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-pretty max-w-3xl mx-auto">
            {language === "en"
              ? "Each statue is a masterpiece, carved with love and blessed with tradition. Start your spiritual journey today."
              : "ஒவ்வொரு சிலையும் ஒரு தலைசிறந்த படைப்பு, அன்புடன் செதுக்கப்பட்டு பாரம்பரியத்துடன் ஆசீர்வதிக்கப்பட்டது. இன்றே உங்கள் ஆன்மீக பயணத்தைத் தொடங்குங்கள்."}
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
              {language === "en" ? "Shop Now" : "இப்போது வாங்குங்கள்"}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
