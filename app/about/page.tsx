"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: "About Elephants",
      subtitle: "Understanding the Magnificent Creatures",
      sections: [
        {
          title: "Cultural Significance",
          content:
            "Elephants hold profound cultural significance across many civilizations. In Hindu tradition, Lord Ganesha, the elephant-headed deity, is revered as the remover of obstacles and the patron of arts and sciences. Elephants symbolize wisdom, strength, and good fortune, making them powerful spiritual guardians for homes and sacred spaces.",
        },
        {
          title: "Intelligence & Memory",
          content:
            "Elephants are among the most intelligent animals on Earth. They possess exceptional memory capabilities, can recognize themselves in mirrors, and show complex emotions including grief, joy, and empathy. Their ability to remember locations, individuals, and experiences for decades has made them symbols of wisdom and knowledge.",
        },
        {
          title: "Social Structure",
          content:
            "Elephants live in matriarchal societies led by the oldest female. They form strong family bonds and demonstrate remarkable cooperation and care for their young and elderly. This social structure represents the importance of family, community, and respect for elders in many cultures.",
        },
        {
          title: "Conservation Status",
          content:
            "Both African and Asian elephants face threats from habitat loss and poaching. By choosing handcrafted wooden elephant statues, you honor these magnificent creatures while supporting sustainable art forms that don't harm wildlife. Each statue serves as a reminder of our responsibility to protect these gentle giants.",
        },
      ],
      facts: {
        title: "Amazing Elephant Facts",
        items: [
          "Elephants can live up to 70 years in the wild",
          "They have excellent memory and can remember other elephants for decades",
          "Baby elephants are called calves and weigh around 250 pounds at birth",
          "Elephants are highly intelligent and show empathy towards others",
          "They can communicate through infrasonic sounds over long distances",
          "An elephant's trunk contains over 40,000 muscles",
          "They are one of the few animals that can recognize themselves in a mirror",
          "Elephants mourn their dead and have been observed holding 'funerals'",
        ],
      },
      names: {
        title: "The 60 Names of Elephants",
        intro: "Not one or two — altogether, there are 60 names. All of them are pure Tamil names.",
        maleTitle: "Names of the Male Elephant",
        femaleTitle: "Names of the Female Elephant",
        male: [
          "Yaanai (black one)", "Vezham (white elephant)", "Kaliru", "Kalabam", "Maathangam", "Kaimma (animal with tusks)",
          "Umbar", "Umbal (lofty one)", "Anjanaavathi", "Arasuvaa", "Alliyan", "Arupadai", "Aambal", "Aanai", "Ipham",
          "Irathi", "Kunjchram", "Irul", "Thumbu", "Valvilangu", "Thoongal", "Thol", "Karaiyadi (one with pestle-like legs)",
          "Erumbi", "Perumaa (big animal)", "Vaaranam (one with conch-like head)", "Pootkai (one with hollow trunk)",
          "Oruthal", "Ongal (mountain-like)", "Naaga", "Pongadi (one with big feet)", "Kumbi", "Thumbi",
          "Naalvaai (one with a dangling mouth)", "Kunjchram (gathered/assembled one)", "Kareṇu", "Uvaa (collected one)",
          "Kari (black one)", "Kalvan (dark one)", "Kayam", "Chinduram", "Vayamaa", "Pugarmugam (one with marks on its face)",
          "Thandhi", "Madaavalam", "Thandaavalam", "Kaimmalai (mountain-like with trunk)", "Vazhuwai (rounded, compact one)",
          "Mandhamaa", "Marunmaa", "Mathagayam", "Bodhagam", "Viramali", "Madhoṛkadham (another name of Mathagayam)",
          "Kadagam (a herd or group of elephants)"
        ],
        female: ["Pidi", "Athavai", "Vadavai", "Kariṇi", "Aththini"],
        footer: "Together, these make a total of 60 names for the elephant."
      }
    },
    ta: {
      title: "யானைகள் பற்றி",
      subtitle: "அற்புதமான உயிரினங்களைப் புரிந்துகொள்ளுதல்",
      sections: [
        {
          title: "கலாச்சார முக்கியத்துவம்",
          content:
            "யானைகள் பல நாகரிகங்களில் ஆழமான கலாச்சார முக்கியத்துவத்தைக் கொண்டுள்ளன. இந்து பாரம்பரியத்தில், யானை தலையுடைய தெய்வமான கணேச பகவான், தடைகளை நீக்குபவராகவும் கலை மற்றும் அறிவியலின் பாதுகாவலராகவும் மதிக்கப்படுகிறார். யானைகள் ஞானம், வலிமை மற்றும் நல்ல அதிர்ஷ்டத்தை குறிக்கின்றன, இது அவர்களை வீடுகள் மற்றும் புனித இடங்களுக்கு சக்திவாய்ந்த ஆன்மீக பாதுகாவலர்களாக ஆக்குகிறது.",
        },
        {
          title: "புத்திசாலித்தனம் மற்றும் நினைவாற்றல்",
          content:
            "யானைகள் பூமியில் மிகவும் புத்திசாலித்தனமான விலங்குகளில் ஒன்றாகும். அவர்களுக்கு விதிவிலக்கான நினைவாற்றல் திறன்கள் உள்ளன, கண்ணாடியில் தங்களை அடையாளம் காண முடியும், மேலும் துக்கம், மகிழ்ச்சி மற்றும் அனுதாபம் உள்ளிட்ட சிக்கலான உணர்ச்சிகளைக் காட்டுகின்றன. இடங்கள், தனிநபர்கள் மற்றும் அனுபவங்களை பல தசாப்தங்களாக நினைவில் வைத்திருக்கும் அவர்களின் திறன் அவர்களை ஞானம் மற்றும் அறிவின் சின்னங்களாக ஆக்கியுள்ளது.",
        },
        {
          title: "சமூக அமைப்பு",
          content:
            "யானைகள் மூத்த பெண்ணால் வழிநடத்தப்படும் தாய்வழி சமூகங்களில் வாழ்கின்றன. அவர்கள் வலுவான குடும்ப பிணைப்புகளை உருவாக்குகின்றன மற்றும் தங்கள் இளம் மற்றும் வயதானவர்களுக்கு குறிப்பிடத்தக்க ஒத்துழைப்பு மற்றும் கவனிப்பை வெளிப்படுத்துகின்றன. இந்த சமூக அமைப்பு பல கலாச்சாரங்களில் குடும்பம், சமூகம் மற்றும் பெரியவர்களுக்கான மரியாதையின் முக்கியத்துவத்தை பிரதிநிதித்துவப்படுத்துகிறது.",
        },
        {
          title: "பாதுகாப்பு நிலை",
          content:
            "ஆப்பிரிக்க மற்றும் ஆசிய யானைகள் இரண்டும் வாழ்விட இழப்பு மற்றும் வேட்டையாடுதலால் அச்சுறுத்தல்களை எதிர்கொள்கின்றன. கைவினைப்பொருள் மர யானை சிலைகளைத் தேர்ந்தெடுப்பதன் மூலம், நீங்கள் இந்த அற்புதமான உயிரினங்களை மதிக்கிறீர்கள், அதே நேரத்தில் வனவிலங்குகளுக்கு தீங்கு விளைவிக்காத நிலையான கலை வடிவங்களை ஆதரிக்கிறீர்கள். ஒவ்வொரு சிலையும் இந்த மென்மையான ராட்சதர்களைப் பாதுகாக்கும் நமது பொறுப்பை நினைவூட்டுகிறது.",
        },
      ],
      facts: {
        title: "அற்புதமான யானை உண்மைகள்",
        items: [
          "யானைகள் காட்டில் 70 ஆண்டுகள் வரை வாழ முடியும்",
          "அவர்களுக்கு சிறந்த நினைவாற்றல் உள்ளது மற்றும் பல தசாப்தங்களாக மற்ற யானைகளை நினைவில் வைத்திருக்க முடியும்",
          "குட்டி யானைகள் கன்றுகள் என்று அழைக்கப்படுகின்றன மற்றும் பிறக்கும் போது சுமார் 250 பவுண்டுகள் எடை இருக்கும்",
          "யானைகள் மிகவும் புத்திசாலித்தனமானவை மற்றும் மற்றவர்களிடம் அனுதாபம் காட்டுகின்றன",
          "அவர்கள் நீண்ட தூரத்தில் இன்ஃப்ராசோனிக் ஒலிகள் மூலம் தொடர்பு கொள்ள முடியும்",
          "ஒரு யானையின் துதிக்கையில் 40,000க்கும் மேற்பட்ட தசைகள் உள்ளன",
          "கண்ணாடியில் தங்களை அடையாளம் காணக்கூடிய சில விலங்குகளில் அவையும் ஒன்று",
          "யானைகள் தங்கள் இறந்தவர்களுக்காக துக்கம் அனுஷ்டிக்கின்றன மற்றும் 'இறுதிச் சடங்குகள்' நடத்துவது கவனிக்கப்பட்டுள்ளது",
        ],
      },
      names: {
        title: "யானையின் 60 தமிழ்ப் பெயர்கள்",
        intro: "ஒன்று, இரண்டல்ல — மொத்தம் 60 பெயர்கள் உள்ளன. இவை எல்லாமே தூய தமிழ்ப் பெயர்கள்.",
        maleTitle: "ஆண் யானையின் பெயர்கள்",
        femaleTitle: "பெண் யானையின் பெயர்கள்",
        male: [
          "யானை (கரியது)", "வேழம் (வெள்ளை யானை)", "களிறு", "களபம்", "மாதங்கம்", "கைம்மா (துதிக்கையுடைய விலங்கு)",
          "உம்பர்", "உம்பல் (உயர்ந்தது)", "அஞ்சனாவதி", "அரசுவா", "அல்லியன்", "அறுபடை", "ஆம்பல்", "ஆனை", "இபம்",
          "இரதி", "குஞ்சரம்", "இருள்", "தும்பு", "வல்விலங்கு", "தூங்கல்", "தோல்", "கறையடி (உரல் போன்ற பாதத்தை உடையது)",
          "எறும்பி", "பெருமா (பெரிய விலங்கு)", "வாரணம் (சங்கு போன்ற தலையை உடையது)", "பூட்கை (துளையுள்ள கையை உடையது)",
          "ஒருத்தல்", "ஓங்கல் (மலைபோன்றது)", "நாக", "பொங்கடி (பெரிய பாதத்தை உடையது)", "கும்பி", "தும்பி",
          "நால்வாய் (தொங்குகின்ற வாயை உடையது)", "குஞ்சரம் (திரண்டது)", "கரேணு", "உவா (திரண்டது)", "கரி (கரியது)",
          "கள்வன் (கரியது)", "கயம்", "சிந்துரம்", "வயமா", "புகர்முகம் (முகத்தில் புள்ளியுள்ளது)", "தந்தி",
          "மதாவளம்", "தந்தாவளம்", "கைம்மலை (கையை உடைய மலை போன்றது)", "வழுவை (உருண்டு திரண்டது)", "மந்தமா",
          "மருண்மா", "மதகயம்", "போதகம்", "விரமலி", "மதோற்கடம் (மதகயத்தின் பெயர்)", "கடகம் (யானைத்திரளின் பெயர்)"
        ],
        female: ["பிடி", "அதவை", "வடவை", "கரிணி", "அத்தினி"],
        footer: "இவை இரண்டும் சேர்த்து மொத்தம் 60 பெயர்கள்."
      }
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <img
              src="/majestic-elephant-in-natural-habitat-traditional-a.jpg"
              alt="Majestic elephant in natural habitat"
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Content Sections */}
          <div className="space-y-8 mb-12">
            {t.sections.map((section, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Facts Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">{t.facts.title}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {t.facts.items.map((fact, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1 flex-shrink-0">
                      {index + 1}
                    </Badge>
                    <p className="text-pretty">{fact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Elephant Names Section */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">{t.names.title}</h2>
              <p className="mb-6 text-muted-foreground">{t.names.intro}</p>

              <h3 className="text-xl font-semibold mb-3">{t.names.maleTitle}</h3>
              <ul className="list-disc list-inside space-y-1 mb-6">
                {t.names.male.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3">{t.names.femaleTitle}</h3>
              <ul className="list-disc list-inside space-y-1 mb-6">
                {t.names.female.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>

              <p className="text-muted-foreground">{t.names.footer}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
