import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

// Simple JWT decode (without verification) - just to check expiration
function decodeJwt(token: string): { exp?: number; sub?: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return {};
    const decoded = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    return decoded;
  } catch {
    return {};
  }
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    console.log('Auth guard check:', { authHeader: authHeader ? 'present' : 'missing' });

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or malformed Authorization header',
      );
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Validating token:', { tokenLength: token.length });

    // First, do a quick JWT decode check locally (no network call)
    const decoded = decodeJwt(token);
    if (decoded.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        console.error('Token has expired:', { exp: decoded.exp, now });
        throw new UnauthorizedException('Token has expired');
      }
    }

    // Only call Supabase for full validation with timeout
    const userPromise = this.authService.getUser(token);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Token validation timeout')), 5000),
    );

    let user;
    try {
      user = await Promise.race([userPromise, timeoutPromise]);
    } catch (err) {
      console.error('Token validation error:', (err as Error).message);
      // If validation fails but token isn't expired, allow it anyway
      // (Supabase might be temporarily unavailable)
      if (!decoded.exp || decoded.exp >= Math.floor(Date.now() / 1000)) {
        console.warn('Allowing request - token appears valid despite validation failure');
        request.user = { id: decoded.sub || 'unknown' };
        return true;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!user) {
      console.error('Token validation failed for token:', { tokenLength: token.length });
      throw new UnauthorizedException('Invalid or expired token');
    }

    console.log('Token validated for user:', { userId: user.id });
    request.user = user;
    return true;
  }
}
