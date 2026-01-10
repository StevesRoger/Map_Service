import axios from "axios";
import type { APIKey } from "../types/api";

// Use proxy path for development, full URL for production
const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_MAP_API_BASE_URL ||
    "https://dev-map-api.roktenh.com";

// Response interfaces based on Swagger documentation
interface APIKeyItem {
  created_by: string;
  created_date: string;
  expiry: string;
  id: string;
  key: string;
  last_used: string;
  name: string;
  requests: number;
  roles: string;
  status: string;
  updated_by: string;
  updated_date: string;
}

interface ListAPIKeysResponse {
  code: string;
  message: string;
  data: {
    current_page: number;
    item: APIKeyItem[];
    total_page: number;
    total_record: number;
  };
  request_id: string;
  trace_id: string;
}

interface SingleAPIKeyResponse {
  code: string;
  message: string;
  data: APIKeyItem;
  request_id: string;
  trace_id: string;
}

interface CreateAPIKeyRequest {
  data: string;
  request_id: string;
}

interface BaseResponse {
  code: string;
  message: string;
  request_id: string;
  trace_id: string;
}

class APIKeyService {
  private getAuthHeaders() {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  private handleAuthError() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  }

  /**
   * Get list of API keys with pagination and filters
   * @param page - Page number (default: 1)
   * @param limit - Items per page (default: 10)
   * @param status - Filter by status (e.g., 'ACTIVE')
   * @param date - Filter by date range (e.g., '2024-07-10,2024-07-30')
   * @param search - Search term
   * @param sortField - Field to sort by (e.g., 'status')
   * @param sortDirection - Sort direction ('ASC' or 'DESC')
   */
  async getAPIKeys(params?: {
    page?: number;
    limit?: number;
    status?: string;
    date?: string;
    search?: string;
    sortField?: string;
    sortDirection?: "ASC" | "DESC";
  }): Promise<ListAPIKeysResponse> {
    try {
      // Build query parameters - make page and limit optional
      const queryParams = new URLSearchParams();

      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }
      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }
      if (params?.status) queryParams.append("status", params.status);
      if (params?.date) queryParams.append("date", params.date);
      if (params?.search) queryParams.append("search", params.search);

      const sortField = params?.sortField ?? "created_date";
      const sortDirection = params?.sortDirection ?? "DESC";
      const normalizedSortField = sortField.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );

      queryParams.append("sort_field", normalizedSortField);
      queryParams.append("sort_direction", sortDirection);

      const url = queryParams.toString()
        ? `${API_BASE_URL}/api-key?${queryParams.toString()}`
        : `${API_BASE_URL}/api-key`;

      const response = await axios.get<ListAPIKeysResponse>(url, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError();
      }
      throw error;
    }
  }

  /**
   * Create a new API key
   * @param data - API key name or configuration
   * @param requestId - Unique request ID
   */
  async createAPIKey(
    data: string,
    requestId: string
  ): Promise<SingleAPIKeyResponse> {
    try {
      const response = await axios.post<SingleAPIKeyResponse>(
        `${API_BASE_URL}/api-key`,
        { data, request_id: requestId },
        { headers: this.getAuthHeaders() }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError();
      }
      throw error;
    }
  }

  /**
   * Get a single API key by ID
   * @param id - API key ID
   */
  async getAPIKeyById(id: string): Promise<SingleAPIKeyResponse> {
    try {
      const response = await axios.get<SingleAPIKeyResponse>(
        `${API_BASE_URL}/api-key/${id}`,
        { headers: this.getAuthHeaders() }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError();
      }
      throw error;
    }
  }

  /**
   * Disable an API key
   * @param id - API key ID
   */
  async disableAPIKey(id: string): Promise<BaseResponse> {
    try {
      const response = await axios.put<BaseResponse>(
        `${API_BASE_URL}/api-key/disable/${id}`,
        {},
        { headers: this.getAuthHeaders() }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError();
      }
      throw error;
    }
  }

  /**
   * Enable an API key
   * @param id - API key ID
   */
  async enableAPIKey(id: string): Promise<BaseResponse> {
    try {
      const response = await axios.put<BaseResponse>(
        `${API_BASE_URL}/api-key/enable/${id}`,
        {},
        { headers: this.getAuthHeaders() }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError();
      }
      throw error;
    }
  }

  /**
   * Delete an API key
   * @param id - API key ID
   */
  async deleteAPIKey(id: string): Promise<BaseResponse> {
    try {
      const response = await axios.delete<BaseResponse>(
        `${API_BASE_URL}/api-key/${id}`,
        { headers: this.getAuthHeaders() }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError();
      }
      throw error;
    }
  }

  /**
   * Generate a unique request ID (UUID v4 format)
   */
  generateRequestId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  /**
   * Map backend API key to frontend APIKey type
   */
  mapToAPIKey(item: APIKeyItem): APIKey {
    return {
      id: item.id,
      name: item.name,
      key: item.key,
      userId: item.created_by,
      userEmail: item.created_by || "Unknown",
      createdAt: item.created_date,
      lastUsed: item.last_used || null,
      status: (item.status.toLowerCase() === "active"
        ? "active"
        : item.status.toLowerCase() === "suspended"
        ? "suspended"
        : "expired") as "active" | "suspended" | "expired",
      requestCount: item.requests,
      monthlyLimit: 0, // Not provided by backend
      currentMonthCost: 0, // Not provided by backend
      totalCost: 0, // Not provided by backend
    };
  }
}

export const apiKeyService = new APIKeyService();
export type { APIKeyItem, ListAPIKeysResponse, SingleAPIKeyResponse };
