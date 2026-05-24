import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: SupabaseService) {}

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      // Supabase returns "User already registered" for duplicates
      if (error.message.toLowerCase().includes('already')) {
        throw new ConflictException(
          'An account with this email already exists',
        );
      }
      throw new BadRequestException(error.message);
    }

    if (!data.session) {
      // Supabase email confirmation is enabled — user needs to verify email first
      return {
        message:
          'Account created. Check your email to confirm your account before logging in.',
        requiresConfirmation: true,
      };
    }

    const user = data.user;
    if (!user) {
      throw new BadRequestException('User creation failed');
    }

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: { id: user.id, email: user.email },
    };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Normalize Supabase error messages
      if (
        error.message.toLowerCase().includes('invalid') ||
        error.message.toLowerCase().includes('credentials')
      ) {
        throw new UnauthorizedException('Invalid email or password');
      }
      throw new UnauthorizedException(error.message);
    }

    const user = data.user;
    if (!data.session || !user) {
      throw new UnauthorizedException('Invalid sign in response');
    }

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: { id: user.id, email: user.email },
    };
  }

  async signOut(token: string) {
    // Set the user's JWT so Supabase knows who to sign out
    const userClient = this.supabase.client;
    await userClient.auth.setSession({
      access_token: token,
      refresh_token: '',
    });
    await userClient.auth.signOut();
    return { message: 'Signed out successfully' };
  }

  async getUser(token: string) {
    const { data, error } = await this.supabase.client.auth.getUser(token);
    if (error || !data.user) return null;
    return data.user;
  }
}
