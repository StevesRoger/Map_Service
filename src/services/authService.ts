/// <reference types="../vite-env.d.ts" />
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  RSAEncryption,
  AESDecryption,
  generateRequestId,
  createBasicAuthHeader,
  createBearerAuthHeader,
} from "../utils/encryption";

/**
 * Auth API Response types
 */
export interface AuthResponse {
  data: any;
  request_id: string;
  message?: string;
  success?: boolean;
}

export interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    user?: {
      id: string;
      email: string;
      full_name: string;
      role?: string;
    };
  };
  request_id: string;
}

export interface PreValidateRequest {
  data: {
    email: string;
  };
  request_id: string;
}

export interface SendOTPRequest {
  data: {
    username: string;
  };
  request_id: string;
}

export interface VerifyOTPResponse {
  data: {
    otp_refer: string;
    valid: boolean;
  };
  request_id: string;
}

export interface SignUpRequest {
  data: {
    agree_term: boolean;
    email: string;
    full_name: string;
    otp_refer: string;
    password: string;
  };
  request_id: string;
}

export interface ResetPasswordRequest {
  data: {
    otp_refer: string;
    password: string;
    user_id: string;
  };
  request_id: string;
}

export interface LoginRequest {
  data: {
    client_id: string;
    client_secret: string;
    password: string;
    username: string;
    remember_me: boolean;
  };
  request_id: string;
}

export interface CheckTokenResponse {
  code: string;
  message: string;
  request_id: string;
  data: any;
  trace_id: string;
}

export interface RefreshTokenRequest {
  data: {
    client_id: string;
    client_secret: string;
    refresh_token: string;
  };
  request_id: string;
}

export interface LogoutRequest {
  data: {
    client_id: string;
    client_secret: string;
    token: string;
  };
  request_id: string;
}

/**
 * Auth API Service
 */
class AuthAPIService {
  private api: AxiosInstance;
  private baseURL: string;
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.baseURL =
      import.meta.env.VITE_API_BASE_URL || "https://dev-map-api.roktenh.com";
    this.clientId = import.meta.env.VITE_CLIENT_ID || "roktenh-map-web";
    this.clientSecret = import.meta.env.VITE_CLIENT_SECRET || "";

    // Create axios instance
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(this.handleRequest.bind(this), (error) =>
      Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleError.bind(this)
    );
  }

  /**
   * Request interceptor to add authorization
   */
  private async handleRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    // Add Basic Auth header
    const basicAuth = createBasicAuthHeader(this.clientId, this.clientSecret);
    config.headers.Authorization = basicAuth;

    // Add Bearer token if available
    const token = this.getAccessToken();
    if (token && !config.url?.includes("/auth/login")) {
      config.headers.Authorization = createBearerAuthHeader(token);
    }

    return config;
  }

  /**
   * Response interceptor to handle AES decryption
   */
  private handleResponse(response: AxiosResponse): AxiosResponse {
    // Decrypt response if needed
    if (response.data) {
      response.data = AESDecryption.decryptResponse(response.data);
    }
    return response;
  }

  /**
   * Error handler
   */
  private handleError(error: any) {
    if (error.response) {
      // Server responded with error
      console.error("API Error:", error.response.data);

      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        this.clearAuthToken();
        // Optionally redirect to login
        window.location.href = "/";
      }
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }

  /**
   * Get access token from storage
   */
  private getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  /**
   * Save access token to storage
   */
  private saveAccessToken(token: string): void {
    localStorage.setItem("access_token", token);
  }

  /**
   * Clear access token from storage
   */
  private clearAuthToken(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("roktenh_user");
  }

  /**
   * Pre-validate email before signup
   */
  async preValidate(email: string): Promise<AuthResponse> {
    const requestId = generateRequestId();
    const payload: PreValidateRequest = {
      data: { email },
      request_id: requestId,
    };

    const response = await this.api.post<AuthResponse>(
      "/client/pre-validate",
      payload
    );
    return response.data;
  }

  /**
   * Send OTP to user's email
   */
  async sendOTP(username: string): Promise<AuthResponse> {
    const requestId = generateRequestId();
    const payload: SendOTPRequest = {
      data: { username },
      request_id: requestId,
    };

    const response = await this.api.post<AuthResponse>(
      "/client/send-otp",
      payload
    );
    return response.data;
  }

  /**
   * Verify OTP code
   */
  async verifyOTP(code: string): Promise<VerifyOTPResponse> {
    // Code is sent as query parameter
    const response = await this.api.post<VerifyOTPResponse>(
      `/client/verify-otp?code=${code}`
    );
    return response.data;
  }

  /**
   * Sign up new user
   */
  async signUp(data: {
    email: string;
    full_name: string;
    password: string;
    otp_refer: string;
    agree_term: boolean;
  }): Promise<AuthResponse> {
    const requestId = generateRequestId();

    // Encrypt password before sending
    const encryptedPassword = await RSAEncryption.encryptPassword(
      data.password
    );

    const payload: SignUpRequest = {
      data: {
        agree_term: data.agree_term,
        email: data.email,
        full_name: data.full_name,
        otp_refer: data.otp_refer,
        password: encryptedPassword,
      },
      request_id: requestId,
    };

    const response = await this.api.post<AuthResponse>(
      "/client/sign-up",
      payload
    );
    return response.data;
  }

  /**
   * Login user
   */
  async login(
    username: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<LoginResponse> {
    const requestId = generateRequestId();

    // Encrypt password (client_secret is already encrypted in .env)
    const encryptedPassword = await RSAEncryption.encryptPassword(password);

    const payload: LoginRequest = {
      data: {
        client_id: this.clientId,
        client_secret: this.clientSecret, // Already encrypted, use directly
        password: encryptedPassword,
        username,
        remember_me: rememberMe,
      },
      request_id: requestId,
    };

    console.log("Login request payload:", {
      ...payload,
      data: {
        ...payload.data,
        password: "[encrypted]",
        client_secret: "[encrypted]",
      },
    });

    const response = await this.api.post<LoginResponse>("/auth/login", payload);

    console.log("Login response:", response.data);

    // Save access token and refresh token
    if (response.data.data.access_token) {
      this.saveAccessToken(response.data.data.access_token);
      if (response.data.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
      }
    }

    return response.data;
  }

  /**
   * Check if token is valid
   */
  async checkToken(token: string): Promise<CheckTokenResponse> {
    const response = await this.api.get<CheckTokenResponse>(
      `/auth/check-token?token=${encodeURIComponent(token)}`
    );
    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const requestId = generateRequestId();

    // client_secret is already encrypted in .env, use directly
    const payload: RefreshTokenRequest = {
      data: {
        client_id: this.clientId,
        client_secret: this.clientSecret, // Already encrypted
        refresh_token: refreshToken,
      },
      request_id: requestId,
    };

    const response = await this.api.post<LoginResponse>(
      "/auth/refresh-token",
      payload
    );

    // Save new access token
    if (response.data.data.access_token) {
      this.saveAccessToken(response.data.data.access_token);
      if (response.data.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
      }
    }

    return response.data;
  }

  /**
   * Forgot password - send OTP to email
   */
  async forgotPassword(email: string): Promise<AuthResponse> {
    // POST request with email as query parameter (empty body)
    const response = await this.api.post<AuthResponse>(
      `/client/forget-password?email=${encodeURIComponent(email)}`,
      {} // Empty body
    );
    return response.data;
  }

  /**
   * Reset password with OTP
   */
  async resetPassword(data: {
    user_id: string;
    otp_refer: string;
    password: string;
  }): Promise<AuthResponse> {
    const requestId = generateRequestId();

    // Encrypt password before sending
    const encryptedPassword = await RSAEncryption.encryptPassword(
      data.password
    );

    const payload: ResetPasswordRequest = {
      data: {
        otp_refer: data.otp_refer,
        password: encryptedPassword,
        user_id: data.user_id,
      },
      request_id: requestId,
    };

    const response = await this.api.put<AuthResponse>(
      "/client/reset-password",
      payload
    );
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const token = this.getAccessToken();
      if (token) {
        const requestId = generateRequestId();

        // client_secret is already encrypted in .env, use directly
        const payload: LogoutRequest = {
          data: {
            client_id: this.clientId,
            client_secret: this.clientSecret, // Already encrypted
            token,
          },
          request_id: requestId,
        };

        await this.api.post("/auth/logout", payload);
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear local storage regardless of API success
      this.clearAuthToken();
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Get current user info
   */
  getCurrentUser(): any {
    const userStr = localStorage.getItem("roktenh_user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }
}

// Export singleton instance
export const authAPI = new AuthAPIService();
