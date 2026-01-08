import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { authAPI } from "../services/authService";

interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  tier: "basic" | "pro" | "enterprise";
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isNewUser: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  dismissWelcome: () => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  company?: string;
  otp_refer?: string;
  agree_term?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("roktenh_user");
    const accessToken = localStorage.getItem("access_token");

    if (storedUser && accessToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("roktenh_user");
        localStorage.removeItem("access_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string, rememberMe: boolean = false) => {
      try {
        console.log("Attempting login for:", email);
        const response = await authAPI.login(email, password, rememberMe);
        console.log("Login API Response:", response);

        if (response.data && response.data.access_token) {
          // Create user object from backend response
          const userData: User = {
            id: response.data.user?.id || "user_" + Date.now(),
            email: response.data.user?.email || email,
            name: response.data.user?.full_name || email.split("@")[0],
            tier: "pro",
            role: response.data.user?.role === "admin" ? "admin" : "user",
          };

          console.log("✅ User data fetched from backend:", {
            id: userData.id,
            email: userData.email,
            fullName: userData.name,
            role: userData.role,
          });

          setUser(userData);
          localStorage.setItem("roktenh_user", JSON.stringify(userData));
          console.log("User data saved successfully");
        } else {
          console.error("Invalid response structure:", response);
          throw new Error("Invalid response from server");
        }
      } catch (error: any) {
        console.error("Login error details:", {
          error,
          response: error.response,
          message: error.message,
        });
        throw new Error(
          error.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      }
    },
    []
  );

  const signup = useCallback(
    async (data: SignupData) => {
      try {
        if (!data.otp_refer) {
          throw new Error("OTP verification required");
        }

        console.log("Calling signup API with:", {
          email: data.email,
          full_name: data.name,
          otp_refer: data.otp_refer,
          agree_term: data.agree_term,
        });

        const response = await authAPI.signUp({
          email: data.email,
          full_name: data.name,
          password: data.password,
          otp_refer: data.otp_refer,
          agree_term: data.agree_term || false,
        });

        console.log("Signup API Response:", response);

        // Check if signup was successful
        if (
          response.code === "200" ||
          response.message === "successful" ||
          response.data
        ) {
          console.log("Signup successful! Now logging in...");

          // After successful signup, log the user in
          try {
            await login(data.email, data.password);
            setIsNewUser(true);
            console.log("Auto-login successful!");
          } catch (loginError: any) {
            console.error("Auto-login failed:", loginError);
            // Signup succeeded but login failed - still consider it success
            // User can login manually
            throw new Error(
              "Account created successfully! Please login with your credentials."
            );
          }
        } else {
          throw new Error("Signup failed - unexpected response");
        }
      } catch (error: any) {
        console.error("Signup error:", error);
        throw new Error(
          error.response?.data?.message ||
            error.message ||
            "Signup failed. Please try again."
        );
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    await authAPI.logout();
    setUser(null);
    setIsNewUser(false);
  }, []);

  const dismissWelcome = useCallback(() => {
    setIsNewUser(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      isNewUser,
      login,
      signup,
      logout,
      dismissWelcome,
    }),
    [user, isLoading, isNewUser, login, signup, logout, dismissWelcome]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
