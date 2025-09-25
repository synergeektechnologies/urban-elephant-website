export interface Product {
  id: string
  name: string
  nameTA: string
  description: string
  descriptionTA: string
  woodType: "mahogany" | "rosewood"
  sizeInFeet: number
  weightInKg: number
  basePrice: number
  images: string[]
  inStock: boolean
}

export const products: Product[] = [
  {
    id: "elephant-small-mahogany",
    name: "Small Mahogany Elephant",
    nameTA: "சிறிய மஹோகனி யானை",
    description:
      "Beautifully carved small elephant statue perfect for desk or shelf display. Crafted from premium mahogany wood with intricate detailing.",
    descriptionTA:
      "மேசை அல்லது அலமாரி காட்சிக்கு ஏற்ற அழகாக செதுக்கப்பட்ட சிறிய யானை சிலை. சிக்கலான விவரங்களுடன் பிரீமியம் மஹோகனி மரத்தில் செய்யப்பட்டது.",
    woodType: "mahogany",
    sizeInFeet: 0.5,
    weightInKg: 0.8,
    basePrice: 2500,
    images: ["/img1.jpeg?height=400&width=400&text=Small+Mahogany+Elephant"],
    inStock: true,
  },
  {
    id: "elephant-small-rosewood",
    name: "Small Rosewood Elephant",
    nameTA: "சிறிய ரோஸ்வுட் யானை",
    description:
      "Exquisite small elephant statue carved from premium rosewood. Rich grain patterns and smooth finish make this a treasured piece.",
    descriptionTA:
      "பிரீமியம் ரோஸ்வுட்டில் இருந்து செதுக்கப்பட்ட அழகான சிறிய யானை சிலை. வளமான தானிய வடிவங்கள் மற்றும் மென்மையான பூச்சு இதை ஒரு பொக்கிஷமான துண்டாக ஆக்குகிறது.",
    woodType: "rosewood",
    sizeInFeet: 0.5,
    weightInKg: 0.9,
    basePrice: 3500,
    images: ["/img2.jpeg?height=400&width=400&text=Small+Rosewood+Elephant"],
    inStock: true,
  },
  {
    id: "elephant-medium-mahogany",
    name: "Medium Mahogany Elephant",
    nameTA: "நடுத்தர மஹோகனி யானை",
    description:
      "Medium-sized elephant statue with raised trunk for prosperity. Hand-carved from solid mahogany with traditional motifs.",
    descriptionTA:
      "செழிப்புக்காக உயர்த்தப்பட்ட துதிக்கையுடன் நடுத்தர அளவிலான யானை சிலை. பாரம்பரிய வடிவங்களுடன் திட மஹோகனியில் இருந்து கையால் செதுக்கப்பட்டது.",
    woodType: "mahogany",
    sizeInFeet: 1.0,
    weightInKg: 2.5,
    basePrice: 5500,
    images: ["/img3.jpeg?height=400&width=400&text=Medium+Mahogany+Elephant"],
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByWoodType(woodType: "mahogany" | "rosewood"): Product[] {
  return products.filter((product) => product.woodType === woodType)
}
