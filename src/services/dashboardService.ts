import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export interface DashboardStatistic {
  active_key: number;
  balance: number;
  error: number;
  requests: Array<{
    date: string;
    day: number;
    request: number;
  }>;
  spent_today: number;
  success: number;
  total_spent: number;
}

export interface DashboardResponse {
  code: string;
  message: string;
  request_id: string;
  data: DashboardStatistic;
  trace_id: string;
}

class DashboardService {
  /**
   * Fetch dashboard statistics
   */
  async getStatistics(): Promise<DashboardStatistic> {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.get<DashboardResponse>(
        `${API_BASE_URL}/dashboard/statistic`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (
        response.data.code === "success" ||
        response.data.message === "successful"
      ) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch dashboard statistics"
        );
      }
    } catch (error: any) {
      console.error("Dashboard API Error:", error);
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("access_token");
        window.location.href = "/";
      }
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
