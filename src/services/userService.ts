import axios from "axios";
import type { APIKey, User } from "../types/api";
import { generateRequestId } from "../utils/encryption";

const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_MAP_API_BASE_URL ||
    "https://dev-map-api.roktenh.com";

interface BackendUserApiKey {
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

interface BackendUser {
  address?: string;
  api_keys?: BackendUserApiKey[];
  balance: number;
  created_by: string;
  created_date: string;
  email: string;
  full_name: string;
  id: string;
  phone?: string;
  profile_url?: string;
  status: string;
  total_api_key: number;
  total_request: number;
  total_spent: number;
  updated_by: string;
  updated_date: string;
}

interface ListUsersResponse {
  code: string;
  message: string;
  data: {
    current_page: number;
    item: BackendUser[];
    total_page: number;
    total_record: number;
  };
  request_id: string;
  trace_id: string;
}

interface SingleUserResponse {
  code: string;
  message: string;
  data: BackendUser;
  request_id: string;
  trace_id: string;
}

export interface UserStatistic {
  total: number;
  total_active: number;
  total_balance: number;
  total_revenue: number;
}

interface UserStatisticResponse {
  code: string;
  message: string;
  data: UserStatistic;
  request_id: string;
  trace_id: string;
}

interface UpdateUserRequest {
  data: {
    address?: string;
    current_password?: string;
    email?: string;
    full_name?: string;
    id: string;
    password?: string;
    phone?: string;
    profile?: string;
  };
  request_id: string;
}

interface BalanceAdjustmentRequest {
  data: {
    amount: number;
    user_id: string;
  };
  request_id: string;
}

interface BaseResponse {
  code: string;
  message: string;
  request_id: string;
  trace_id: string;
}

class UserService {
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

  async getUsers(params?: {
    page?: number;
    limit?: number;
    status?: string;
    date?: string;
    search?: string;
    sortField?: string;
    sortDirection?: "ASC" | "DESC";
  }): Promise<ListUsersResponse> {
    try {
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
      queryParams.append("sort_field", sortField);
      queryParams.append("sort_direction", sortDirection);

      const url = `${API_BASE_URL}/user?${queryParams.toString()}`;

      const response = await axios.get<ListUsersResponse>(url, {
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

  async getUserById(id: string): Promise<SingleUserResponse> {
    try {
      const response = await axios.get<SingleUserResponse>(
        `${API_BASE_URL}/user/${id}`,
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

  async updateUser(payload: UpdateUserRequest): Promise<BaseResponse> {
    try {
      const response = await axios.put<BaseResponse>(
        `${API_BASE_URL}/user`,
        payload,
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

  async adjustBalance(userId: string, amount: number): Promise<BaseResponse> {
    try {
      const payload: BalanceAdjustmentRequest = {
        data: { amount, user_id: userId },
        request_id: generateRequestId(),
      };

      const response = await axios.post<BaseResponse>(
        `${API_BASE_URL}/user/balance/adjustment`,
        payload,
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

  async disableUser(id: string): Promise<BaseResponse> {
    try {
      const response = await axios.put<BaseResponse>(
        `${API_BASE_URL}/user/disable/${id}`,
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

  async enableUser(id: string): Promise<BaseResponse> {
    try {
      const response = await axios.put<BaseResponse>(
        `${API_BASE_URL}/user/enable/${id}`,
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

  async deleteUser(id: string): Promise<BaseResponse> {
    try {
      const response = await axios.delete<BaseResponse>(
        `${API_BASE_URL}/user/${id}`,
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

  async getStatistics(): Promise<UserStatistic> {
    try {
      const response = await axios.get<UserStatisticResponse>(
        `${API_BASE_URL}/user/statistic`,
        { headers: this.getAuthHeaders() }
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleAuthError();
      }
      throw error;
    }
  }

  mapToUser(item: BackendUser): User {
    const normalizedStatus = (item.status || "").toLowerCase();
    return {
      id: item.id,
      email: item.email,
      name: item.full_name || item.email,
      company: item.address || undefined,
      createdAt: item.created_date,
      lastLogin: null,
      status: normalizedStatus === "active" ? "active" : "suspended",
      totalRequests: item.total_request || 0,
      totalBalance: item.balance || 0,
      totalSpent: item.total_spent || 0,
      apiKeysCount: item.total_api_key || item.api_keys?.length || 0,
      phoneNumber: item.phone || undefined,
    };
  }

  mapToUserApiKeys(user: BackendUser): APIKey[] {
    const statusMap = (status: string): APIKey["status"] => {
      const normalized = status.toLowerCase();
      if (normalized === "active") return "active";
      if (normalized === "suspended" || normalized === "disabled")
        return "suspended";
      return "expired";
    };

    return (user.api_keys || []).map((key) => ({
      id: key.id,
      key: key.key,
      name: key.name,
      userId: user.id,
      userEmail: user.email,
      createdAt: key.created_date,
      lastUsed: key.last_used || null,
      status: statusMap(key.status || ""),
      requestCount: key.requests || 0,
      monthlyLimit: 0,
      currentMonthCost: 0,
      totalCost: 0,
    }));
  }
}

export const userService = new UserService();
export type { BackendUser, BackendUserApiKey, ListUsersResponse, SingleUserResponse };
