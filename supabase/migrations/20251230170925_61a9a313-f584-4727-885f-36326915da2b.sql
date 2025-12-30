-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  event_type TEXT,
  event_date DATE,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for wedding form submissions
CREATE TABLE public.wedding_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_date DATE,
  venue TEXT,
  music_genres TEXT[],
  favorite_songs TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for inserting (public can insert)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit wedding form" 
ON public.wedding_submissions 
FOR INSERT 
WITH CHECK (true);