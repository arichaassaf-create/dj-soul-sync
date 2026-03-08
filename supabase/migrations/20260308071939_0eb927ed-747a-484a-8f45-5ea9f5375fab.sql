CREATE TABLE public.whatsapp_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'unknown',
  url text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert whatsapp clicks"
ON public.whatsapp_clicks
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Block all selects on whatsapp clicks"
ON public.whatsapp_clicks
FOR SELECT
USING (false);

CREATE POLICY "Block all updates on whatsapp clicks"
ON public.whatsapp_clicks
FOR UPDATE
USING (false);

CREATE POLICY "Block all deletes on whatsapp clicks"
ON public.whatsapp_clicks
FOR DELETE
USING (false);