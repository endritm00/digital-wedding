// Database types for the typed Supabase client.
//
// These mirror the schema in supabase/migrations/*.sql. Ideally regenerated with
// `npm run db:types` (needs a local Supabase) or
// `supabase gen types typescript --linked` (needs SUPABASE_ACCESS_TOKEN) after a
// schema change — but kept hand-accurate here so the build is self-contained.
// Shape matches the Supabase generator so the query builder infers Row/Insert/
// Update (and embedded selects) correctly instead of falling back to `never`.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: Database['public']['Enums']['user_role']
          display_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: Database['public']['Enums']['user_role']
          display_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: Database['public']['Enums']['user_role']
          display_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      themes: {
        Row: {
          id: string
          slug: string
          name: string
          category: Database['public']['Enums']['theme_category']
          status: Database['public']['Enums']['theme_status']
          config: Json
          preview_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          category: Database['public']['Enums']['theme_category']
          status?: Database['public']['Enums']['theme_status']
          config?: Json
          preview_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          category?: Database['public']['Enums']['theme_category']
          status?: Database['public']['Enums']['theme_status']
          config?: Json
          preview_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          id: string
          code: Database['public']['Enums']['plan_code']
          name: string
          base_price_cents: number
          included_sections: number | null
          sort_order: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: Database['public']['Enums']['plan_code']
          name: string
          base_price_cents: number
          included_sections?: number | null
          sort_order?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: Database['public']['Enums']['plan_code']
          name?: string
          base_price_cents?: number
          included_sections?: number | null
          sort_order?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      extras: {
        Row: {
          id: string
          code: string
          name: string
          price_cents: number
          pricing: Database['public']['Enums']['extra_pricing']
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          price_cents: number
          pricing?: Database['public']['Enums']['extra_pricing']
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          price_cents?: number
          pricing?: Database['public']['Enums']['extra_pricing']
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      invites: {
        Row: {
          id: string
          slug: string
          owner_id: string | null
          claim_token: string | null
          draft_email: string | null
          theme_id: string | null
          plan_id: string | null
          status: Database['public']['Enums']['invite_status']
          display_title: string | null
          event_date: string | null
          venue_name: string | null
          venue_address: string | null
          additional_notes: string | null
          needs_review: boolean
          published_snapshot_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug?: string
          owner_id?: string | null
          claim_token?: string | null
          draft_email?: string | null
          theme_id?: string | null
          plan_id?: string | null
          status?: Database['public']['Enums']['invite_status']
          display_title?: string | null
          event_date?: string | null
          venue_name?: string | null
          venue_address?: string | null
          additional_notes?: string | null
          needs_review?: boolean
          published_snapshot_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          owner_id?: string | null
          claim_token?: string | null
          draft_email?: string | null
          theme_id?: string | null
          plan_id?: string | null
          status?: Database['public']['Enums']['invite_status']
          display_title?: string | null
          event_date?: string | null
          venue_name?: string | null
          venue_address?: string | null
          additional_notes?: string | null
          needs_review?: boolean
          published_snapshot_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invites_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invites_theme_id_fkey'
            columns: ['theme_id']
            isOneToOne: false
            referencedRelation: 'themes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invites_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'plans'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invites_published_snapshot_fk'
            columns: ['published_snapshot_id']
            isOneToOne: false
            referencedRelation: 'published_snapshots'
            referencedColumns: ['id']
          },
        ]
      }
      invite_contact: {
        Row: {
          id: string
          invite_id: string
          email_enc: string | null
          phone_enc: string | null
          iban_enc: string | null
          key_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invite_id: string
          email_enc?: string | null
          phone_enc?: string | null
          iban_enc?: string | null
          key_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invite_id?: string
          email_enc?: string | null
          phone_enc?: string | null
          iban_enc?: string | null
          key_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invite_contact_invite_id_fkey'
            columns: ['invite_id']
            isOneToOne: true
            referencedRelation: 'invites'
            referencedColumns: ['id']
          },
        ]
      }
      invite_sections: {
        Row: {
          id: string
          invite_id: string
          type: Database['public']['Enums']['section_type']
          position: number
          config: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invite_id: string
          type: Database['public']['Enums']['section_type']
          position: number
          config?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invite_id?: string
          type?: Database['public']['Enums']['section_type']
          position?: number
          config?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invite_sections_invite_id_fkey'
            columns: ['invite_id']
            isOneToOne: false
            referencedRelation: 'invites'
            referencedColumns: ['id']
          },
        ]
      }
      invite_extras: {
        Row: {
          id: string
          invite_id: string
          extra_id: string
          quantity: number
          unit_price_cents: number
          created_at: string
        }
        Insert: {
          id?: string
          invite_id: string
          extra_id: string
          quantity?: number
          unit_price_cents: number
          created_at?: string
        }
        Update: {
          id?: string
          invite_id?: string
          extra_id?: string
          quantity?: number
          unit_price_cents?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invite_extras_invite_id_fkey'
            columns: ['invite_id']
            isOneToOne: false
            referencedRelation: 'invites'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invite_extras_extra_id_fkey'
            columns: ['extra_id']
            isOneToOne: false
            referencedRelation: 'extras'
            referencedColumns: ['id']
          },
        ]
      }
      media_assets: {
        Row: {
          id: string
          invite_id: string
          kind: Database['public']['Enums']['media_kind']
          status: Database['public']['Enums']['media_status']
          storage_key: string
          variants: Json
          bytes: number | null
          duration_ms: number | null
          mime: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invite_id: string
          kind: Database['public']['Enums']['media_kind']
          status?: Database['public']['Enums']['media_status']
          storage_key: string
          variants?: Json
          bytes?: number | null
          duration_ms?: number | null
          mime?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invite_id?: string
          kind?: Database['public']['Enums']['media_kind']
          status?: Database['public']['Enums']['media_status']
          storage_key?: string
          variants?: Json
          bytes?: number | null
          duration_ms?: number | null
          mime?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'media_assets_invite_id_fkey'
            columns: ['invite_id']
            isOneToOne: false
            referencedRelation: 'invites'
            referencedColumns: ['id']
          },
        ]
      }
      orders: {
        Row: {
          id: string
          invite_id: string
          buyer_email: string
          amount_cents: number
          currency: string
          plan_code: string
          line_items: Json
          status: Database['public']['Enums']['order_status']
          stripe_session_id: string | null
          stripe_payment_intent: string | null
          paid_at: string | null
          checkout_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invite_id: string
          buyer_email: string
          amount_cents: number
          currency?: string
          plan_code: string
          line_items?: Json
          status?: Database['public']['Enums']['order_status']
          stripe_session_id?: string | null
          stripe_payment_intent?: string | null
          paid_at?: string | null
          checkout_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invite_id?: string
          buyer_email?: string
          amount_cents?: number
          currency?: string
          plan_code?: string
          line_items?: Json
          status?: Database['public']['Enums']['order_status']
          stripe_session_id?: string | null
          stripe_payment_intent?: string | null
          paid_at?: string | null
          checkout_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_invite_id_fkey'
            columns: ['invite_id']
            isOneToOne: false
            referencedRelation: 'invites'
            referencedColumns: ['id']
          },
        ]
      }
      processed_webhook_events: {
        Row: {
          event_id: string
          processed_at: string
        }
        Insert: {
          event_id: string
          processed_at?: string
        }
        Update: {
          event_id?: string
          processed_at?: string
        }
        Relationships: []
      }
      published_snapshots: {
        Row: {
          id: string
          invite_id: string
          version: number
          content: Json
          published_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          invite_id: string
          version: number
          content: Json
          published_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          invite_id?: string
          version?: number
          content?: Json
          published_by?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'published_snapshots_invite_id_fkey'
            columns: ['invite_id']
            isOneToOne: false
            referencedRelation: 'invites'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'published_snapshots_published_by_fkey'
            columns: ['published_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      rsvps: {
        Row: {
          id: string
          invite_id: string
          name: string
          attending: boolean
          guest_count: number
          email_enc: string | null
          dietary_notes_enc: string | null
          key_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          invite_id: string
          name: string
          attending: boolean
          guest_count?: number
          email_enc?: string | null
          dietary_notes_enc?: string | null
          key_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          invite_id?: string
          name?: string
          attending?: boolean
          guest_count?: number
          email_enc?: string | null
          dietary_notes_enc?: string | null
          key_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'rsvps_invite_id_fkey'
            columns: ['invite_id']
            isOneToOne: false
            referencedRelation: 'invites'
            referencedColumns: ['id']
          },
        ]
      }
      audit_log: {
        Row: {
          id: string
          actor_id: string | null
          action: string
          entity: string
          entity_id: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          action: string
          entity: string
          entity_id?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string | null
          action?: string
          entity?: string
          entity_id?: string | null
          metadata?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'audit_log_actor_id_fkey'
            columns: ['actor_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_invite_draft: {
        Args: { p_claim_token: string; p_owner_id: string }
        Returns: string
      }
      submit_rsvp: {
        Args: {
          p_slug: string
          p_name: string
          p_attending: boolean
          p_guest_count?: number
          p_email_enc?: string | null
          p_dietary_notes_enc?: string | null
          p_key_id?: string | null
        }
        Returns: string
      }
      reorder_sections: {
        Args: { p_invite_id: string; p_section_ids: string[] }
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_staff: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: 'buyer' | 'designer' | 'admin'
      invite_status: 'draft' | 'paid' | 'published' | 'archived'
      section_type:
        | 'opening' | 'story' | 'schedule' | 'venue' | 'rsvp'
        | 'gallery' | 'travel' | 'gifts' | 'countdown' | 'dress_code' | 'faq' | 'custom'
      media_kind: 'opening_video' | 'hero_video' | 'background_music' | 'gallery_image' | 'illustration'
      media_status: 'uploading' | 'processing' | 'ready' | 'failed'
      order_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'expired'
      extra_pricing: 'per_invite' | 'per_unit'
      theme_status: 'active' | 'coming_soon' | 'retired'
      theme_category: 'wedding' | 'save_the_date' | 'birthday'
      plan_code: 'save_the_date' | 'experience' | 'premium'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
