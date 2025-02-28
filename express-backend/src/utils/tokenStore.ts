import crypto from 'crypto';

interface TokenData {
  email: string;
  expires: number;
}

class TokenStore {
  private tokens: Map<string, TokenData>;

  constructor() {
    this.tokens = new Map();
  }

  createToken(email: string): string {
    // Generate a random token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Store token with email and expiration (1 hour from now)
    this.tokens.set(token, {
      email,
      expires: Date.now() + 3600000 // 1 hour in milliseconds
    });
    
    return token;
  }

  validateToken(token: string): string | null {
    const data = this.tokens.get(token);
    
    // Check if token exists and hasn't expired
    if (!data) return null;
    if (data.expires < Date.now()) {
      this.tokens.delete(token);
      return null;
    }
    
    return data.email;
  }

  removeToken(token: string): void {
    this.tokens.delete(token);
  }
}

export const tokenStore = new TokenStore();