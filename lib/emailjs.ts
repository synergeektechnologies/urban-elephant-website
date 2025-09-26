import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id'
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id'
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export interface OrderItem {
  name: string
  units: number
  price: number
  image: string
}

export interface OrderSummary {
  gst: number
  packing: number
  freight: number
  total: number
}

export interface CustomerDetails {
  name: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
}

export interface OrderData {
  orders: OrderItem[]
  gst: number
  packing: number
  freight: number
  total: number
  customer_name: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
}

/**
 * Send order notification email with both order and customer details
 */
export async function sendOrderNotification(orderData: OrderData): Promise<boolean> {
  try {
    const templateParams = {
      orders: orderData.orders,
      gst: orderData.gst,
      packing: orderData.packing,
      freight: orderData.freight,
      total: orderData.total,
      customer_name: orderData.customer_name,
      email: orderData.email,
      address: orderData.address,
      city: orderData.city,
      state: orderData.state,
      pincode: orderData.pincode,
      phone: orderData.phone,
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    console.log('Order notification email sent successfully:', response)
    return true
  } catch (error) {
    console.error('Error sending order notification email:', error)
    return false
  }
}
