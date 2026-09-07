-- Testimonials Table Migration
-- Apply after 001_initial_schema.sql (reuses public.update_updated_at_column).

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT,
    location TEXT,
    image TEXT,
    avatar_url TEXT,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    highlight TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.testimonials IS 'Learner testimonials and reviews for ClubLiquidez';

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Anonymous + public site: read published testimonials only
DROP POLICY IF EXISTS "Public read published testimonials" ON public.testimonials;
CREATE POLICY "Public read published testimonials"
    ON public.testimonials FOR SELECT
    TO anon, authenticated
    USING (published = true);

-- Authenticated users (admins): full CRUD access
DROP POLICY IF EXISTS "Authenticated read all testimonials" ON public.testimonials;
CREATE POLICY "Authenticated read all testimonials"
    ON public.testimonials FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Authenticated insert testimonials" ON public.testimonials;
CREATE POLICY "Authenticated insert testimonials"
    ON public.testimonials FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated update testimonials" ON public.testimonials;
CREATE POLICY "Authenticated update testimonials"
    ON public.testimonials FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated delete testimonials" ON public.testimonials;
CREATE POLICY "Authenticated delete testimonials"
    ON public.testimonials FOR DELETE
    TO authenticated
    USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_published_order ON public.testimonials (published, order_index ASC, created_at DESC);

-- updated_at trigger
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
