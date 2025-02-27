import * as crypto from 'crypto';

interface ResetToken {
  email: string;
  token: string;
  expires: Date;
}

class PasswordResetTokenStore {
  private tokens: Map<string, ResetToken> = new Map();

  createToken(email: string): string {
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour expiry
    
    this.tokens.set(token, { email, token, expires });
    return token;
  }

  validateToken(token: string): string | null {
    const resetToken = this.tokens.get(token);
    
    if (!resetToken || resetToken.expires < new Date()) {
      this.tokens.delete(token);
      return null;
    }
    
    return resetToken.email;
  }

  removeToken(token: string): void {
    this.tokens.delete(token);
  }
}

export const tokenStore = new PasswordResetTokenStore();