import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  // Anon client — for auth operations (sign up, sign in)
  public readonly client: SupabaseClient;

  // Service role client — for DB operations (bypasses RLS)
  public readonly adminClient: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !anonKey || !serviceKey) {
      throw new Error(
        'Missing Supabase environment variables. Check your .env file.',
      );
    }

    this.client = createClient(url, anonKey, {
      auth: { persistSession: false },
    });

    this.adminClient = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
}
