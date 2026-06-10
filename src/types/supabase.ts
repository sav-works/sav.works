export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          message: string
          read: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          message: string
          read?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          message?: string
          read?: boolean
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          status: 'planned' | 'active' | 'paused' | 'completed'
          tags: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          status?: 'planned' | 'active' | 'paused' | 'completed'
          tags?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          status?: 'planned' | 'active' | 'paused' | 'completed'
          tags?: string[]
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
