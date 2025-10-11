"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, User, Calendar } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/language-context"

interface Review {
  id: string
  name: string
  email: string
  rating: number
  created_at: string
  comment: string
  product: string | null
  verified: boolean
}

export default function ReviewsPage() {
  const { language } = useLanguage()
  const [showForm, setShowForm] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    product: "",
  })

  const translations = {
    en: {
      title: "Customer Reviews & Feedback",
      subtitle: "What our customers say about our handcrafted elephant statues",
      writeReview: "Write a Review",
      yourName: "Your Name",
      yourEmail: "Your Email",
      rating: "Rating",
      selectProduct: "Select Product",
      yourReview: "Your Review",
      submitReview: "Submit Review",
      cancel: "Cancel",
      verified: "Verified Purchase",
      helpful: "Helpful",
      showMore: "Show More Reviews",
      noReviews: "No reviews yet",
      noReviewsDesc: "Be the first to share your experience with our elephant statues!",
      allProducts: "All Products",
      reviewSubmitted: "Review submitted successfully!",
      thankYou: "Thank you for your feedback!",
      submitting: "Submitting...",
      loadingReviews: "Loading reviews...",
    },
    ta: {
      title: "வாடிக்கையாளர் மதிப்புரைகள் மற்றும் கருத்துக்கள்",
      subtitle: "எங்கள் கைவினைப்பொருள் யானை சிலைகள் பற்றி எங்கள் வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்",
      writeReview: "மதிப்புரை எழுதுங்கள்",
      yourName: "உங்கள் பெயர்",
      yourEmail: "உங்கள் மின்னஞ்சல்",
      rating: "மதிப்பீடு",
      selectProduct: "தயாரிப்பைத் தேர்ந்தெடுக்கவும்",
      yourReview: "உங்கள் மதிப்புரை",
      submitReview: "மதிப்புரையை சமர்ப்பிக்கவும்",
      cancel: "ரத்து செய்",
      verified: "சரிபார்க்கப்பட்ட வாங்குதல்",
      helpful: "உதவிகரமானது",
      showMore: "மேலும் மதிப்புரைகளைக் காட்டு",
      noReviews: "இன்னும் மதிப்புரைகள் இல்லை",
      noReviewsDesc: "எங்கள் யானை சிலைகளுடனான உங்கள் அனுபவத்தைப் பகிர்ந்து கொள்ளும் முதல் நபராக இருங்கள்!",
      allProducts: "அனைத்து தயாரிப்புகள்",
      reviewSubmitted: "மதிப்புரை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
      thankYou: "உங்கள் கருத்துக்கு நன்றி!",
      submitting: "சமர்ப்பிக்கிறது...",
      loadingReviews: "மதிப்புரைகளை ஏற்றுகிறது...",
    },
  }

  const t = translations[language]

  const productOptions = [
    "Majestic Mahogany Elephant - 2ft",
    "Royal Rosewood Elephant - 1.5ft",
    "Sacred Mahogany Elephant - 3ft",
    "Divine Rosewood Elephant - 2.5ft",
    "Blessed Mahogany Elephant - 1ft",
    "Graceful Rosewood Elephant - 4ft",
  ]

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/reviews")
      const data = await response.json()

      if (response.ok) {
        setReviews(data.reviews || [])
      } else {
        console.error("Failed to fetch reviews:", data.error)
        toast.error("Failed to load reviews")
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
      toast.error("Failed to load reviews")
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.comment) {
      toast.error(
        language === "en" ? "Please fill in all required fields" : "தயவுசெய்து அனைத்து தேவையான புலங்களையும் நிரப்பவும்",
      )
      return
    }

    try {
      setSubmitting(true)

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(t.reviewSubmitted)
        toast.success(t.thankYou)

        // Reset form
        setFormData({
          name: "",
          email: "",
          rating: 5,
          comment: "",
          product: "",
        })
        setShowForm(false)

        // Refresh reviews list
        await fetchReviews()
      } else {
        toast.error(data.error || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review")
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">{t.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.subtitle}</p>
          </div>

          {/* Write Review Button */}
          <div className="flex justify-center mb-8">
            <Button onClick={() => setShowForm(!showForm)} size="lg">
              <MessageSquare className="w-5 h-5 mr-2" />
              {t.writeReview}
            </Button>
          </div>

          {/* Review Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t.writeReview}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t.yourName} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder={language === "en" ? "Enter your name" : "உங்கள் பெயரை உள்ளிடவும்"}
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t.yourEmail} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder={language === "en" ? "Enter your email" : "உங்கள் மின்னஞ்சலை உள்ளிடவும்"}
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rating">{t.rating}</Label>
                      <select
                        id="rating"
                        value={formData.rating}
                        onChange={(e) => handleInputChange("rating", Number.parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                        disabled={submitting}
                      >
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating} {rating === 1 ? "Star" : "Stars"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="product">{t.selectProduct}</Label>
                      <select
                        id="product"
                        value={formData.product}
                        onChange={(e) => handleInputChange("product", e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                        disabled={submitting}
                      >
                        <option value="">{t.allProducts}</option>
                        {productOptions.map((product) => (
                          <option key={product} value={product}>
                            {product}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comment">{t.yourReview} *</Label>
                    <Textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => handleInputChange("comment", e.target.value)}
                      placeholder={
                        language === "en"
                          ? "Share your experience with our elephant statues..."
                          : "எங்கள் யானை சிலைகளுடனான உங்கள் அனுபவத்தைப் பகிர்ந்து கொள்ளுங்கள்..."
                      }
                      rows={4}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1" disabled={submitting}>
                      {submitting ? t.submitting : t.submitReview}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                      disabled={submitting}
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {loading ? (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">{t.loadingReviews}</p>
                </CardContent>
              </Card>
            ) : reviews.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.noReviews}</h3>
                  <p className="text-muted-foreground">{t.noReviewsDesc}</p>
                </CardContent>
              </Card>
            ) : (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{review.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(review.created_at).toLocaleDateString(language === "en" ? "en-US" : "ta-IN")}
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                {t.verified}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                    </div>

                    {review.product && (
                      <div className="mb-3">
                        <Badge variant="outline">{review.product}</Badge>
                      </div>
                    )}

                    <p className="text-muted-foreground leading-relaxed text-pretty mb-4">{review.comment}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4 mr-1" />
                        {t.helpful}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
