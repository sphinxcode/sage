-- Analytics Tables for SAGE n8n Workflows
-- Missing tables needed for the Analytics & Performance Monitor workflow

-- Analytics Events table (for wwFghD2rTEoA5l8a workflow)
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id TEXT,  -- Allow non-UUID user references for guest users
    session_id TEXT,
    human_design_type TEXT,
    event_category TEXT,
    response_time_ms INTEGER,
    satisfaction_score INTEGER,
    event_data JSONB DEFAULT '{}',
    processed_at TIMESTAMPTZ DEFAULT NOW(),
    -- Additional fields for comprehensive tracking
    message_content TEXT,
    user_message TEXT, 
    response_text TEXT,
    endpoint TEXT,
    error_message TEXT,
    error_code TEXT,
    topic TEXT,
    intent TEXT,
    user_profile JSONB DEFAULT '{}',
    satisfaction_rating INTEGER,
    feature TEXT,
    rating INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weekly Reports table (for wwFghD2rTEoA5l8a workflow)  
CREATE TABLE IF NOT EXISTS weekly_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    report_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    period TEXT NOT NULL,
    total_users INTEGER NOT NULL DEFAULT 0,
    active_users INTEGER NOT NULL DEFAULT 0,  
    messages_processed INTEGER NOT NULL DEFAULT 0,
    avg_session_duration FLOAT DEFAULT 0,
    system_health TEXT DEFAULT 'unknown',
    avg_satisfaction FLOAT DEFAULT 0,
    avg_response_time FLOAT DEFAULT 0,
    insights JSONB DEFAULT '{}',
    recommendations JSONB DEFAULT '{}',
    trending_topics TEXT,
    full_report JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_category ON analytics_events(event_category);
CREATE INDEX IF NOT EXISTS idx_analytics_events_processed_at ON analytics_events(processed_at);

CREATE INDEX IF NOT EXISTS idx_weekly_reports_report_date ON weekly_reports(report_date);
CREATE INDEX IF NOT EXISTS idx_weekly_reports_period ON weekly_reports(period);

-- Row Level Security for analytics tables
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage analytics data (needed for n8n workflows)
CREATE POLICY "Service role can manage analytics_events" ON analytics_events
    FOR ALL USING (true);

CREATE POLICY "Service role can manage weekly_reports" ON weekly_reports  
    FOR ALL USING (true);

-- Trigger for weekly_reports updated_at
CREATE TRIGGER update_weekly_reports_updated_at BEFORE UPDATE ON weekly_reports
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON analytics_events TO service_role;
GRANT ALL ON weekly_reports TO service_role;
GRANT USAGE ON SCHEMA public TO service_role;