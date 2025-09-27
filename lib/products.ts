export interface Product {
  id: string
  name: string
  nameTA: string
  description: string
  descriptionTA: string
  woodType: "acacia" | "mahogany"
  sizeInFeet: number
  weightInKg: number
  // basePrice remains the primary price used across the app. We'll set this to Total
  basePrice: number
  // New price breakdown fields
  cost: number
  gst: number
  packingCost: number
  freightCharges: number
  images: string[]
  inStock: boolean
}

export const products: Product[] = [
  // Acacia wood
  {
    id: "elephant-1-5ft-acacia",
    name: "Elephant - 1.5 ft (Acacia)",
    nameTA: "யானை - 1.5 அடி (அகாசியா)",
    description:
      "Handcrafted wooden elephant statue made from Acacia wood. Balanced size suitable for homes and offices.",
    descriptionTA:
      "அகாசியா மரத்தில் செய்யப்பட்ட கைவினை யானை சிலை. வீடும் அலுவலகமும் பொருந்தும் அளவு.",
    woodType: "acacia",
    sizeInFeet: 1.5,
    weightInKg: 25,
    cost: 13000,
    gst: 1560,
    packingCost: 1000,
    freightCharges: 500,
    basePrice: 16060,
    images: ["/1.5 Feet 25 kg.png"],
    inStock: true,
  },
  {
    id: "elephant-2ft-acacia",
    name: "Elephant - 2 ft (Acacia)",
    nameTA: "யானை - 2 அடி (அகாசியா)",
    description:
      "Acacia wood elephant statue with detailed craftsmanship. Ideal medium display size.",
    descriptionTA:
      "விவரமான செதுக்கலுடன் அகாசியா மர யானை சிலை. நடுத்தர காட்சிக்குப் பொருத்தம்.",
    woodType: "acacia",
    sizeInFeet: 2,
    weightInKg: 50,
    cost: 26000,
    gst: 3120,
    packingCost: 1000,
    freightCharges: 500,
    basePrice: 30620,
    images: ["/2 Feet 50 kg.png"],
    inStock: true,
  },
  {
    id: "elephant-2-5ft-acacia",
    name: "Elephant - 2.5 ft (Acacia)",
    nameTA: "யானை - 2.5 அடி (அகாசியா)",
    description:
      "Large Acacia wood elephant statue with traditional motifs and natural finish.",
    descriptionTA:
      "பாரம்பரிய வடிவங்களுடன் இயற்கை பூச்சு கொண்ட பெரிய அகாசியா மர யானை சிலை.",
    woodType: "acacia",
    sizeInFeet: 2.5,
    weightInKg: 100,
    cost: 54600,
    gst: 6552,
    packingCost: 1000,
    freightCharges: 500,
    basePrice: 62652,
    images: ["/2.5 Feet 100 Kg.png"],
    inStock: true,
  },
  {
    id: "elephant-3ft-acacia",
    name: "Elephant - 3 ft (Acacia)",
    nameTA: "யானை - 3 அடி (அகாசியா)",
    description:
      "Majestic 3 ft Acacia wood elephant statue, ideal for grand interiors and halls.",
    descriptionTA:
      "கம்பீரமான 3 அடி அகாசியா மர யானை சிலை, பெரிய உள்ளகங்களுக்கு ஏற்றது.",
    woodType: "acacia",
    sizeInFeet: 3,
    weightInKg: 180,
    cost: 110500,
    gst: 13260,
    packingCost: 1000,
    freightCharges: 500,
    basePrice: 125260,
    images: ["/3 Feet 180 Kg.png"],
    inStock: true,
  },
  // Mahogany wood
  {
    id: "elephant-1-5ft-mahogany",
    name: "Elephant - 1.5 ft (Mahogany)",
    nameTA: "யானை - 1.5 அடி (மஹோகனி)",
    description:
      "Handcrafted elephant statue in premium Mahogany wood with smooth finish.",
    descriptionTA:
      "பிரீமியம் மஹோகனி மரத்தில் கையால் செதுக்கப்பட்ட மென்மையான பூச்சுடன் யானை சிலை.",
    woodType: "mahogany",
    sizeInFeet: 1.5,
    weightInKg: 25,
    cost: 15600,
    gst: 1872,
    packingCost: 1000,
    freightCharges: 500,
    basePrice: 18972,
    images: ["/1.5 Feet 25 kg.png"],
    inStock: true,
  },
  {
    id: "elephant-2ft-mahogany",
    name: "Elephant - 2 ft (Mahogany)",
    nameTA: "யானை - 2 அடி (மஹோகனி)",
    description:
      "Mahogany wood elephant statue featuring detailed carving and rich grain.",
    descriptionTA:
      "விவரமான செதுக்கலும் வளமான தானிய வடிவமும் கொண்ட மஹோகனி மர யானை சிலை.",
    woodType: "mahogany",
    sizeInFeet: 2,
    weightInKg: 50,
    cost: 31200,
    gst: 3744,
    packingCost: 1000,
    freightCharges: 500,
    basePrice: 36444,
    images: ["/2 Feet 50 kg.png"],
    inStock: true,
  },
  {
    id: "elephant-2-5ft-mahogany",
    name: "Elephant - 2.5 ft (Mahogany)",
    nameTA: "யானை - 2.5 அடி (மஹோகனி)",
    description:
      "Large mahogany elephant statue with natural finish and premium craftsmanship.",
    descriptionTA:
      "இயற்கை பூச்சுடன் பிரீமியம் கைவினைத் திறன் கொண்ட பெரிய மஹோகனி யானை சிலை.",
    woodType: "mahogany",
    sizeInFeet: 2.5,
    weightInKg: 100,
    cost: 59800,
    gst: 7176,
    packingCost: 1000,
    freightCharges: 500,
    basePrice: 68476,
    images: ["/2.5 Feet 100 Kg.png"],
    inStock: true,
  },
  {
    id: "elephant-3ft-mahogany",
    name: "Elephant - 3 ft (Mahogany)",
    nameTA: "யானை - 3 அடி (மஹோகனி)",
    description:
      "Grand 3 ft mahogany elephant statue suitable for showrooms and large spaces.",
    descriptionTA:
      "காட்சி அறைகள் மற்றும் பெரிய இடங்களுக்கு ஏற்ற கம்பீரமான 3 அடி மஹோகனி யானை சிலை.",
    woodType: "mahogany",
    sizeInFeet: 3,
    weightInKg: 180,
    cost: 118300,
    gst: 14196,
    packingCost: 1000,
    freightCharges: 500,
    basePrice: 133996,
    images: ["/3 Feet 180 Kg.png"],
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByWoodType(woodType: "acacia" | "mahogany"): Product[] {
  return products.filter((product) => product.woodType === woodType)
}
