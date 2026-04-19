-- V1__init_schema.sql
-- RoleRadar initial database schema

-- Enable pgvector extension for embedding similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════
-- Users
-- ══════════════════════════════════════════════
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255),
    full_name       VARCHAR(255) NOT NULL,
    avatar_url      VARCHAR(512),
    oauth_provider  VARCHAR(50),
    oauth_id        VARCHAR(255),
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- ══════════════════════════════════════════════
-- User Preferences
-- ══════════════════════════════════════════════
CREATE TABLE user_preferences (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    preferred_roles     JSONB DEFAULT '[]',
    preferred_locations JSONB DEFAULT '[]',
    preferred_skills    JSONB DEFAULT '[]',
    min_salary          INTEGER,
    job_type            VARCHAR(50),
    remote_only         BOOLEAN DEFAULT FALSE,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- ══════════════════════════════════════════════
-- Resumes
-- ══════════════════════════════════════════════
CREATE TABLE resumes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    file_url        VARCHAR(512),
    file_type       VARCHAR(20),
    parsed_data     JSONB DEFAULT '{}',
    is_primary      BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_resumes_user_id ON resumes(user_id);

-- ══════════════════════════════════════════════
-- Resume Versions (tailored per job)
-- ══════════════════════════════════════════════
CREATE TABLE resume_versions (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id           UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    version_number      INTEGER NOT NULL,
    file_url            VARCHAR(512),
    parsed_data         JSONB DEFAULT '{}',
    tailored_for_job_id UUID,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_resume_versions_resume_id ON resume_versions(resume_id);

-- ══════════════════════════════════════════════
-- Job Listings
-- ══════════════════════════════════════════════
CREATE TABLE job_listings (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id     VARCHAR(255),
    source          VARCHAR(100) NOT NULL,
    title           VARCHAR(500) NOT NULL,
    company         VARCHAR(255),
    location        VARCHAR(255),
    job_type        VARCHAR(50),
    salary_min      INTEGER,
    salary_max      INTEGER,
    description     TEXT,
    required_skills JSONB DEFAULT '[]',
    apply_url       VARCHAR(1024),
    posted_at       TIMESTAMP WITH TIME ZONE,
    scraped_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at      TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(external_id, source)
);

CREATE INDEX idx_job_listings_source ON job_listings(source);
CREATE INDEX idx_job_listings_posted_at ON job_listings(posted_at DESC);
CREATE INDEX idx_job_listings_company ON job_listings(company);

-- Full-text search index on title + description
ALTER TABLE job_listings ADD COLUMN search_vector tsvector;

CREATE INDEX idx_job_listings_search ON job_listings USING gin(search_vector);

-- Trigger to auto-update search_vector
CREATE OR REPLACE FUNCTION update_job_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.company, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_job_search_vector
    BEFORE INSERT OR UPDATE ON job_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_job_search_vector();

-- ══════════════════════════════════════════════
-- Job Matches (AI-generated relevancy)
-- ══════════════════════════════════════════════
CREATE TABLE job_matches (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_listing_id  UUID NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
    relevancy_score INTEGER NOT NULL CHECK (relevancy_score BETWEEN 0 AND 100),
    match_reasons   JSONB DEFAULT '[]',
    missing_skills  JSONB DEFAULT '[]',
    is_dismissed    BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, job_listing_id)
);

CREATE INDEX idx_job_matches_user_id ON job_matches(user_id);
CREATE INDEX idx_job_matches_score ON job_matches(relevancy_score DESC);

-- ══════════════════════════════════════════════
-- Job Applications (Kanban tracker)
-- ══════════════════════════════════════════════
CREATE TYPE application_status AS ENUM (
    'SAVED', 'APPLIED', 'INTERVIEW', 'OFFERED', 'REJECTED', 'WITHDRAWN'
);

CREATE TABLE job_applications (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_listing_id      UUID NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
    resume_version_id   UUID REFERENCES resume_versions(id),
    status              application_status DEFAULT 'SAVED',
    cover_letter        TEXT,
    notes               TEXT,
    applied_at          TIMESTAMP WITH TIME ZONE,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, job_listing_id)
);

CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
