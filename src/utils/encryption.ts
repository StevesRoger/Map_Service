/// <reference types="../vite-env.d.ts" />
import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";

/**
 * RSA Encryption utility for sensitive data
 */
export class RSAEncryption {
  private static publicKey: string | null = null;

  // Hardcoded public key from backend team
  private static readonly FALLBACK_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlecCLb6m4wSgwrL0Hk0i
ZaRtg/jIPcLNxOv5tdSuu7Z+0+ng2ZmvECMumFr+oiUHYNbfCuWJsCUEdyVrlGNn
jkdfgoIH2y96ysf1/NfjKnnNT2zM/FW3UsxOAeV4mrAyZINfu1T7GaUtC6cY1JnY
xB3pi3EWQfln9T5HhLjj9iNG0Kw7EBZgCXpHTieSeL/GmyHgOjQrmKgWCMIFNq8B
1hf39fzc/hVEfqq2TvSjsD+I3DbPwlT4fe71eRagawwOtt5HhngIsEbpC1VKu9FP
JUSuZSdrA6VQ8pA2yfnb4zQROLKJWf+qheeHZHnHlho9mD6zJkGMZVqD6eiIXFa4
RwIDAQAB
-----END PUBLIC KEY-----`;

  /**
   * Fetch the public key from the server
   */
  static async fetchPublicKey(): Promise<string> {
    try {
      // Try different possible endpoints for public key (working endpoint first)
      const endpoints = [
        `${import.meta.env.VITE_API_BASE_URL}/auth/public-key`, // Working endpoint first
        `${import.meta.env.VITE_API_BASE_URL}/public-key`,
        `${import.meta.env.VITE_API_BASE_URL}/client/public-key`,
      ];

      let lastError: Error | null = null;

      for (const endpoint of endpoints) {
        try {
          console.log(`Trying to fetch public key from: ${endpoint}`);
          const response = await fetch(endpoint);
          if (response.ok) {
            const publicKey = await response.text();
            this.publicKey = publicKey;
            console.log("Public key fetched successfully from:", endpoint);
            return publicKey;
          }
        } catch (err) {
          lastError = err as Error;
        }
      }

      // If all endpoints fail, use fallback public key
      console.warn(
        "Public key endpoint not available, using hardcoded fallback key"
      );
      this.publicKey = this.FALLBACK_PUBLIC_KEY;
      return this.FALLBACK_PUBLIC_KEY;
    } catch (error) {
      console.error("Error fetching public key, using fallback:", error);
      this.publicKey = this.FALLBACK_PUBLIC_KEY;
      return this.FALLBACK_PUBLIC_KEY;
    }
  }

  /**
   * Encrypt data using RSA public key
   */
  static async encrypt(data: string): Promise<string> {
    try {
      // Fetch public key if not already cached
      if (!this.publicKey) {
        await this.fetchPublicKey();
      }

      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.publicKey!);

      // Encrypt the data as a single string
      // Backend expects single encrypted string, not chunks
      const encrypted = encrypt.encrypt(data);
      if (!encrypted) {
        throw new Error("RSA encryption failed");
      }

      return encrypted;
    } catch (error) {
      console.error("RSA encryption error:", error);
      throw error;
    }
  }

  /**
   * Encrypt password before sending to server
   */
  static async encryptPassword(password: string): Promise<string> {
    console.log("Encrypting password, length:", password.length);
    const encrypted = await this.encrypt(password);
    console.log("Encrypted password length:", encrypted.length);
    return encrypted;
  }

  /**
   * Encrypt client secret before sending to server
   */
  static async encryptClientSecret(clientSecret: string): Promise<string> {
    return this.encrypt(clientSecret);
  }
}

/**
 * AES Decryption utility for server responses
 */
export class AESDecryption {
  /**
   * Decrypt AES encrypted data from server
   * @param encryptedData - The encrypted data from server
   * @param key - The AES key (should be provided by server or configured)
   * @param iv - The initialization vector (should be provided by server or configured)
   */
  static decrypt(encryptedData: string, key: string, iv?: string): string {
    try {
      const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        CryptoJS.enc.Utf8.parse(key),
        iv ? { iv: CryptoJS.enc.Utf8.parse(iv) } : undefined
      );

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("AES decryption error:", error);
      throw error;
    }
  }

  /**
   * Decrypt response data if it's encrypted
   * This will check if the response contains encrypted data and decrypt it
   */
  static decryptResponse(response: any): any {
    // If response has encrypted data field, decrypt it
    if (response.encrypted_data) {
      const decrypted = this.decrypt(
        response.encrypted_data,
        response.encryption_key || "default-key",
        response.encryption_iv
      );
      return JSON.parse(decrypted);
    }

    // Return as-is if not encrypted
    return response;
  }
}

/**
 * Generate a unique request ID for tracking
 */
export function generateRequestId(): string {
  return crypto.randomUUID();
}

/**
 * Create Basic Authorization header
 */
export function createBasicAuthHeader(
  username: string,
  password: string
): string {
  const credentials = btoa(`${username}:${password}`);
  return `Basic ${credentials}`;
}

/**
 * Create Bearer Authorization header
 */
export function createBearerAuthHeader(token: string): string {
  return `Bearer ${token}`;
}
