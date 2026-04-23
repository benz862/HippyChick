export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      portfolio_items: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          description: string | null;
          category: string;
          subcategory: string | null;
          media_type: string;
          featured: boolean;
          client_name: string | null;
          platform: string | null;
          campaign_date: string | null;
          cover_image_url: string | null;
          video_url: string | null;
          thumbnail_url: string | null;
          external_link: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          description?: string | null;
          category: string;
          subcategory?: string | null;
          media_type?: string;
          featured?: boolean;
          client_name?: string | null;
          platform?: string | null;
          campaign_date?: string | null;
          cover_image_url?: string | null;
          video_url?: string | null;
          thumbnail_url?: string | null;
          external_link?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          description?: string | null;
          category?: string;
          subcategory?: string | null;
          media_type?: string;
          featured?: boolean;
          client_name?: string | null;
          platform?: string | null;
          campaign_date?: string | null;
          cover_image_url?: string | null;
          video_url?: string | null;
          thumbnail_url?: string | null;
          external_link?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      portfolio_media: {
        Row: {
          id: string;
          portfolio_item_id: string;
          url: string;
          media_type: string;
          alt_text: string | null;
          caption: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          portfolio_item_id: string;
          url: string;
          media_type?: string;
          alt_text?: string | null;
          caption?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          portfolio_item_id?: string;
          url?: string;
          media_type?: string;
          alt_text?: string | null;
          caption?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "portfolio_media_portfolio_item_id_fkey";
            columns: ["portfolio_item_id"];
            isOneToOne: false;
            referencedRelation: "portfolio_items";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string | null;
          body: string;
          featured_image_url: string | null;
          category: string | null;
          tags: string[] | null;
          meta_title: string | null;
          meta_description: string | null;
          published_at: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary?: string | null;
          body: string;
          featured_image_url?: string | null;
          category?: string | null;
          tags?: string[] | null;
          meta_title?: string | null;
          meta_description?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string | null;
          body?: string;
          featured_image_url?: string | null;
          category?: string | null;
          tags?: string[] | null;
          meta_title?: string | null;
          meta_description?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author_name: string;
          author_title: string | null;
          company: string | null;
          avatar_url: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          author_name: string;
          author_title?: string | null;
          company?: string | null;
          avatar_url?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          author_name?: string;
          author_title?: string | null;
          company?: string | null;
          avatar_url?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          project_type: string | null;
          budget_range: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          project_type?: string | null;
          budget_range?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          project_type?: string | null;
          budget_range?: string | null;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

export type PortfolioItem = Database["public"]["Tables"]["portfolio_items"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
