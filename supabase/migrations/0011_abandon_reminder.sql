-- Track when a draft_email was first saved so the abandon-reminder cron
-- can target invites that were left unfinished for ~30 minutes.
ALTER TABLE invites
  ADD COLUMN IF NOT EXISTS draft_email_saved_at timestamptz,
  ADD COLUMN IF NOT EXISTS abandon_reminder_sent boolean NOT NULL DEFAULT false;

-- Speed up the cron query: only unpaid drafts with an email set
CREATE INDEX IF NOT EXISTS idx_invites_abandon_cron
  ON invites (draft_email_saved_at)
  WHERE status = 'draft'
    AND draft_email IS NOT NULL
    AND abandon_reminder_sent = false;
