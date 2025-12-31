-- Add restrictive UPDATE and DELETE policies for defense-in-depth
-- These prevent any updates or deletes on form submission tables

-- Contact submissions: Block all updates
CREATE POLICY "Block all updates on contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (false);

-- Contact submissions: Block all deletes
CREATE POLICY "Block all deletes on contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (false);

-- Wedding submissions: Block all updates
CREATE POLICY "Block all updates on wedding submissions" 
ON public.wedding_submissions 
FOR UPDATE 
USING (false);

-- Wedding submissions: Block all deletes
CREATE POLICY "Block all deletes on wedding submissions" 
ON public.wedding_submissions 
FOR DELETE 
USING (false);