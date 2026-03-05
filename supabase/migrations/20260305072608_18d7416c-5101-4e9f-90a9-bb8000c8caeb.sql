
CREATE TABLE public.workshop_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  participant_type text NOT NULL DEFAULT 'individual',
  experience_level text,
  music_genres text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.workshop_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit workshop form" ON public.workshop_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Block all selects on workshop submissions" ON public.workshop_submissions
  FOR SELECT USING (false);

CREATE POLICY "Block all updates on workshop submissions" ON public.workshop_submissions
  FOR UPDATE USING (false);

CREATE POLICY "Block all deletes on workshop submissions" ON public.workshop_submissions
  FOR DELETE USING (false);
