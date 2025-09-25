-- Create reviews table for storing customer reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  product TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews table
-- Allow anyone to read reviews (public reviews)
CREATE POLICY "Allow public read access to reviews" 
  ON public.reviews FOR SELECT 
  USING (true);

-- Allow anyone to insert reviews (public can submit reviews)
CREATE POLICY "Allow public insert access to reviews" 
  ON public.reviews FOR INSERT 
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
