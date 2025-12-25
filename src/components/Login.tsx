import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Eye,
  EyeOff,
  Globe,
  ArrowLeft,
  ArrowRight,
  Mail,
  Lock,
  ShieldCheck,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

// Placeholder logo image (replace with actual logo URL)
const logoImage =
  "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=100&h=100&fit=crop";

interface LoginProps {
  onSwitchToSignup: () => void;
  onBackToLanding?: () => void;
}

export function Login({
  onSwitchToSignup,
  onBackToLanding,
}: LoginProps) {
  const { login } = useAuth();
  const { language, t, toggleLanguage } = useLanguage();
  const fontClass = language === "km" ? "font-kh" : "font-en";
  const [view, setView] = useState<
    "login" | "forgotPassword" | "verifyOtp" | "resetPassword"
  >("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDemoOptions, setShowDemoOptions] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email) {
      setError(t.auth.emailRequired);
      return;
    }
    if (!password) {
      setError(t.auth.passwordRequired);
      return;
    }
    if (password.length < 6) {
      setError(t.auth.passwordMinLength);
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      toast.success(t.auth.loginSuccess);
    } catch (err) {
      setError(t.auth.loginError);
      toast.error(t.auth.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (
    role: "user" | "admin" | "lowbalance" | "zerobalance",
  ) => {
    setError("");
    let demoEmail = "";

    switch (role) {
      case "admin":
        demoEmail = "admin@roktenh.io";
        break;
      case "lowbalance":
        demoEmail = "lowbalance@roktenh.io";
        break;
      case "zerobalance":
        demoEmail = "zerobalance@roktenh.io";
        break;
      default:
        demoEmail = "demo@roktenh.io";
    }

    const demoPassword = "demo123";

    setEmail(demoEmail);
    setPassword(demoPassword);

    try {
      setIsLoading(true);
      await login(demoEmail, demoPassword);
      toast.success(`${t.auth.loginSuccess}`);
    } catch (err) {
      setError(t.auth.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!resetEmail) {
      setError(t.auth.emailRequired);
      return;
    }

    try {
      setIsLoading(true);
      // Generate a 6-digit OTP
      const otp = "123456";
      setGeneratedOtp(otp);

      // Simulate sending OTP email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show OTP in console for demo purposes
      console.log(
        "🔐 OTP sent to email:",
        resetEmail,
        "| OTP Code:",
        otp,
      );

      toast.success(
        `OTP sent to ${resetEmail}! Check console for demo.`,
      );
      setView("verifyOtp");
      setResendCountdown(60); // Start countdown for 60 seconds
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (otp === generatedOtp) {
        toast.success("OTP verified! Please set your new password.");
        setView("resetPassword");
      } else {
        setError("Invalid OTP. Please try again.");
        toast.error("Invalid OTP");
      }
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    try {
      setIsLoading(true);
      // Generate a new 6-digit OTP
      const otp = "123456";
      setGeneratedOtp(otp);

      // Simulate sending OTP email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(
        "🔐 New OTP sent to email:",
        resetEmail,
        "| OTP Code:",
        otp,
      );

      toast.success("New OTP sent! Check console for demo.");
      setResendCountdown(60); // Set countdown to 60 seconds
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      toast.error("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setView("login");
    setResetEmail("");
    setOtp("");
    setGeneratedOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      setError(t.auth.passwordMinLength);
      return;
    }
    if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate password reset
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success dialog
      setShowSuccessDialog(true);
      // Wait a moment then return to login
      setTimeout(() => {
        setShowSuccessDialog(false);
        handleBackToLogin();
        toast.success("Password reset successfully! You can now log in.");
      }, 2500);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      toast.error("Password reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center gap-4">
        {/* Back to Home Button - Left Side */}
        {onBackToLanding && (
          <Button
            type="button"
            variant="ghost"
            onClick={onBackToLanding}
            className={`fixed top-4 left-4 z-50 flex items-center gap-2 px-4 h-10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/50 dark:hover:bg-zinc-800/50 rounded-xl transition-all ${fontClass}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.auth.backToHome || "Back to Home"}</span>
          </Button>
        )}

        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden lg:block space-y-6">
            <div className="flex items-center gap-3">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                <g clipPath="url(#clip0_55_5566_login)">
                  <g filter="url(#filter0_dd_55_5566_login)">
                    <rect width="40" height="40" rx="5" fill="url(#paint0_linear_55_5566_login)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.7902 15.1211L27.8408 19.7402C27.4318 20.5285 26.8841 21.2685 26.1976 21.9225L20.0029 27.8393L13.8083 21.9225C12.4821 20.6558 11.6731 19.0777 11.3794 17.4289L9.28929 16.8937C8.95415 17.2035 8.49649 17.3945 7.99378 17.3945C6.96314 17.3945 6.12891 16.596 6.12891 15.6133C6.12891 14.6306 6.96495 13.832 7.99378 13.832C8.84604 13.832 9.56497 14.3776 9.7884 15.1228L9.7902 15.1211ZM7.99559 14.8061C8.46226 14.8061 8.84064 15.1675 8.84064 15.6133C8.84064 16.059 8.46226 16.4204 7.99559 16.4204C7.52892 16.4204 7.15053 16.059 7.15053 15.6133C7.15053 15.1675 7.52892 14.8061 7.99559 14.8061Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M26.1957 10.0914C27.9435 11.7608 28.7939 13.974 28.7489 16.1735L30.839 16.7087C31.1741 16.3989 31.6318 16.2079 32.1345 16.2079C33.1651 16.2079 33.9994 17.0064 33.9994 17.9891C33.9994 18.9718 33.1633 19.7704 32.1345 19.7704C31.2822 19.7704 30.5633 19.2248 30.3399 18.4796L11.5938 13.6815C13.4172 7.59425 21.4731 5.57896 26.1957 10.0897V10.0914ZM32.1345 17.1837C32.6012 17.1837 32.9795 17.5451 32.9795 17.9909C32.9795 18.4366 32.6012 18.798 32.1345 18.798C31.6678 18.798 31.2894 18.4366 31.2894 17.9909C31.2894 17.5451 31.6678 17.1837 32.1345 17.1837Z" fill="white"/>
                    <path d="M27.2136 29.1811C27.1614 29.0492 27.0934 28.938 27.021 28.8427C26.8753 28.6519 26.716 28.5205 26.5596 28.4094C26.4028 28.2982 26.244 28.2142 26.0867 28.1381C25.9289 28.0625 25.772 27.9993 25.6152 27.9425C25.301 27.8288 24.9874 27.7448 24.6741 27.6742C24.3609 27.604 24.0482 27.5482 23.7355 27.5032C23.4233 27.4553 23.111 27.4197 22.7993 27.3891C22.4875 27.3585 22.1762 27.3343 21.865 27.3135C21.7327 27.3051 21.6 27.2972 21.4673 27.2903C21.392 27.5116 21.3177 27.7364 21.2443 27.9647C22.0348 28.019 22.8195 28.1352 23.5806 28.3254C24.1578 28.4721 24.7267 28.6544 25.2378 28.8975C25.4912 29.0176 25.732 29.1589 25.9134 29.311C26.0042 29.3856 26.0766 29.4647 26.1132 29.5269C26.1321 29.5581 26.1408 29.5833 26.1436 29.5981C26.1461 29.6139 26.1427 29.6173 26.1403 29.6198C26.1364 29.6218 26.134 29.6233 26.1272 29.6346C26.12 29.6455 26.107 29.6658 26.0853 29.6905C26.0418 29.7414 25.9656 29.8081 25.8724 29.8698C25.6837 29.9953 25.4366 30.1025 25.1804 30.1929C24.9222 30.2833 24.6481 30.3555 24.3691 30.4167C24.0897 30.4775 23.8045 30.5274 23.5164 30.5669C23.2288 30.6099 22.9383 30.6425 22.6463 30.6697C22.3548 30.6979 22.0619 30.7201 21.768 30.7394C21.1806 30.7764 20.5904 30.7982 19.9993 30.8051C19.7039 30.8095 19.4081 30.8085 19.1127 30.8006C18.8179 30.7932 18.523 30.7828 18.2286 30.7641C17.6408 30.728 17.0549 30.6697 16.4802 30.5793C15.9073 30.4879 15.3384 30.3673 14.8215 30.185C14.5652 30.0941 14.3191 29.9859 14.1309 29.8629C14.0368 29.8021 13.9601 29.7374 13.9161 29.688C13.8939 29.6633 13.88 29.644 13.8727 29.6337C13.865 29.6228 13.8616 29.6213 13.8573 29.6193C13.8544 29.6173 13.85 29.6129 13.8524 29.5971C13.8539 29.5813 13.8626 29.5556 13.8809 29.5245C13.9171 29.4607 13.9895 29.3797 14.0793 29.3036C14.2602 29.15 14.5025 29.0087 14.7563 28.8896C15.0126 28.7695 15.2843 28.6648 15.5632 28.5744C15.8427 28.484 16.1288 28.4039 16.4194 28.3367C17.1833 28.1584 17.9685 28.0457 18.7599 27.9855C18.6823 27.7424 18.6031 27.5032 18.523 27.2676C18.3922 27.273 18.2614 27.2804 18.1306 27.2888C17.5076 27.3279 16.8841 27.3906 16.2606 27.4904C15.6361 27.5927 15.0126 27.7241 14.3862 27.9499C14.0735 28.0665 13.7583 28.2004 13.4432 28.4163C13.2864 28.5255 13.1266 28.6559 12.9804 28.8446C12.9075 28.9395 12.839 29.0507 12.7859 29.1816C12.7343 29.3125 12.6995 29.4642 12.6957 29.6193C12.6918 29.7745 12.7198 29.9291 12.7666 30.065C12.8134 30.2008 12.8776 30.3184 12.9461 30.4202C13.0846 30.6233 13.24 30.7695 13.3925 30.894C13.5465 31.019 13.7009 31.1198 13.8563 31.2112C14.0112 31.3016 14.1666 31.3807 14.3225 31.4528C14.6338 31.5956 14.9455 31.7127 15.2592 31.8125C15.5724 31.9118 15.8861 31.9987 16.2012 32.0704C17.4598 32.3599 18.73 32.4819 19.9997 32.4992C21.2694 32.5121 22.544 32.3905 23.8006 32.0827C24.1148 32.0047 24.428 31.9152 24.7403 31.812C25.0525 31.7082 25.3633 31.5892 25.6741 31.4449C25.9849 31.2991 26.2942 31.1321 26.6021 30.8881C26.7556 30.7646 26.9105 30.6198 27.05 30.4182C27.119 30.3174 27.1836 30.2003 27.2309 30.0645C27.2787 29.9296 27.3067 29.775 27.3038 29.6198C27.3009 29.4647 27.2671 29.313 27.2145 29.1816L27.2136 29.1811Z" fill="url(#paint1_linear_55_5566_login)"/>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_dd_55_5566_login" x="-12" y="-2" width="64" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_55_5566_login"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="3"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_5566_login"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_55_5566_login"/>
                    <feOffset dy="10"/>
                    <feGaussianBlur stdDeviation="7.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_55_5566_login" result="effect2_dropShadow_55_5566_login"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_55_5566_login" result="shape"/>
                  </filter>
                  <linearGradient id="paint0_linear_55_5566_login" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#51A2FF"/>
                    <stop offset="1" stopColor="#091B51"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_55_5566_login" x1="19.9993" y1="27.4118" x2="19.9993" y2="31.9612" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.6"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <clipPath id="clip0_55_5566_login">
                    <rect width="40" height="40" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div>
                <h1 className="font-en text-4xl text-zinc-900 dark:text-zinc-100 text-[24px]">
                  RokTenh Map
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1 font-en">
                  Map Service Platform
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-12">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                  >
                    {t.auth.transparentPricing}
                  </h3>
                  <p
                    className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${fontClass}`}
                  >
                    {t.auth.transparentPricingDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                  >
                    {t.auth.lightningFast}
                  </h3>
                  <p
                    className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${fontClass}`}
                  >
                    {t.auth.lightningFastDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                  >
                    {t.auth.developerFriendly}
                  </h3>
                  <p
                    className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${fontClass}`}
                  >
                    {t.auth.developerFriendlyDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900 border border-blue-300 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <p
                    className={`text-sm text-blue-700 dark:text-blue-300 ${fontClass}`}
                  >
                    {t.auth.trustedBy}
                  </p>
                  <p className="text-2xl text-blue-900 dark:text-blue-100 font-en">
                    {t.auth.apiKeysCount}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm text-blue-700 dark:text-blue-300 ${fontClass}`}
              >
                {t.auth.trustedByDesc}
              </p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <Card className="sm:p-8 lg:p-10 bg-[rgb(24,24,27)] dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl relative px-[40px] p-[30px]">
            {/* Language Switcher */}
            <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10">
              <Button
                              variant="ghost"
                              size="sm"
                              onClick={toggleLanguage}
                              className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                            >
                              {language === "en" ? (
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 512 512"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.621c0-21.178-17.167-38.345-38.345-38.345z"
                                    fill="#41479b"
                                  ></path>
                                  <path
                                    d="M511.469 120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54 107.147V88.276h-88.276v107.147L48.322 88.276h-9.977c-19.017 0-34.792 13.847-37.814 32.007l139.778 91.58H0v88.276h140.309L.531 391.717c3.022 18.159 18.797 32.007 37.814 32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54 107.147h9.977c19.017 0 34.792-13.847 37.814-32.007l-139.778-91.58H512v-88.276H371.691l139.778-91.579z"
                                    fill="#f5f5f5"
                                  ></path>
                                  <path
                                    d="M282.483 88.276h-52.966v141.241H0v52.966h229.517v141.241h52.966V282.483H512v-52.966H282.483z"
                                    fill="#ff4b55"
                                  ></path>
                                  <path
                                    d="m24.793 421.252 186.583-121.114h-32.428L9.224 410.31a38.393 38.393 0 0 0 15.569 10.942zM346.388 300.138H313.96l180.716 117.305a38.515 38.515 0 0 0 12.287-13.075l-160.575-104.23zM4.049 109.475l157.73 102.387h32.428L15.475 95.842a38.499 38.499 0 0 0-11.426 13.633zM332.566 211.862l170.035-110.375a38.4 38.4 0 0 0-15.699-10.86L300.138 211.862h32.428z"
                                    fill="#ff4b55"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 512 512"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M473.654 423.724H38.345C17.167 423.724 0 406.557 0 385.379V126.621c0-21.177 17.167-38.345 38.345-38.345h435.309c21.177 0 38.345 17.167 38.345 38.345v258.758c0 21.178-17.168 38.345-38.345 38.345z"
                                    fill="#41479b"
                                  ></path>
                                  <path d="M0 167.721h512v176.55H0z" fill="#ff4b55"></path>
                                  <path
                                    d="M372.816 322.933v-12.516h-4.172v-8.344h-4.173v-8.344h-4.172v-8.344h-12.516v-25.031h-.001l4.173-4.173v-12.516h-4.172v-8.343h-4.172v-12.517h-4.171v-8.344h-4.172v-8.344h-4.172v-4.171h-8.345v4.171h-4.172v8.344h-4.172v8.344h-4.171v12.517h-4.172v8.343h-25.033V231.15h-4.171v-12.517h-4.172v-12.516h-4.172v-8.343h-4.172v-8.344h-4.172v-4.173h-2.086v-4.172h-4.172v4.172h-2.087v4.173h-4.171v8.344h-4.172v8.343h-4.172v12.516h-4.172v12.517h-4.172v12.515h-25.032v-8.343h-4.172v-12.517h-4.172v-8.344h-4.172v-8.344h-4.172v-4.171h-8.344v4.171h-4.172v8.344h-4.172v8.344h-4.172v12.517h-4.172v8.343h-4.172v12.516l4.17 4.173h.002v25.031h-12.515v8.344h-4.172v8.344h-4.173v8.344h-4.172v12.516h-4.172v12.516h241.975v-12.516z"
                                    fill="#f5f5f5"
                                  ></path>
                                </svg>
                              )}
                              <span className="font-en">
                                {language === "en" ? "EN" : "KH"}
                              </span>
                            </Button>
            </div>

            <div
              className="lg:hidden flex items-center gap-5 sm:mb-8 cursor-pointer hover:opacity-80 transition-opacity mt-[0px] mr-[0px] mb-[10px] ml-[0px]"
              onClick={onBackToLanding}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onBackToLanding?.();
                }
              }}
            >
              <img
                src={logoImage}
                alt="RokTenh Map Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg"
              />
              <div>
                <h1 className="text-base sm:text-lg text-zinc-900 dark:text-zinc-100 font-en">
                  RokTenh Map
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs font-en">
                  Map Service Platform
                </p>
              </div>
            </div>

            {view === "login" ? (
              <>
                <div className="sm:mb-8 m-[0px]">
                  <h2
                    className={`text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                  >
                    {t.auth.welcomeBack}
                  </h2>
                  <p
                    className={`text-sm sm:text-base text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    {t.auth.signInToContinue}
                  </p>
                </div>

                {error && (
                  <Alert className="mb-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <AlertDescription
                      className={`text-red-600 dark:text-red-400 ${fontClass}`}
                    >
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="space-y-2 m-[0px] px-[0px] py-[10px]">
                    <Label
                      htmlFor="email"
                      className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.emailAddress}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.auth.emailPlaceholder}
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-en"
                        disabled={isLoading}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 m-[0px] px-[0px] py-[10px]">
                    <Label
                      htmlFor="password"
                      className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.password}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="password"
                        type={
                          showPassword ? "text" : "password"
                        }
                        placeholder={t.auth.enterPassword}
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        className={`pl-10 pr-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm ${fontClass}`}
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 p-0"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 cursor-pointer" />
                        ) : (
                          <Eye className="w-5 h-5 cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span
                        className={`text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                      >
                        {t.auth.rememberMe}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setView("forgotPassword")}
                      className={`text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline ${fontClass} p-0 cursor-pointer`}
                    >
                      {t.auth.forgotPasswordBtn}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-[#1B5BA5] hover:bg-[#164a8a] dark:bg-[#1B5BA5] dark:hover:bg-[#164a8a] text-white ${fontClass} cursor-pointer`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {t.auth.signingIn}
                      </>
                    ) : (
                      <>
                        {t.auth.signIn}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 sm:mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <button
                        type="button"
                        onClick={() =>
                          setShowDemoOptions(!showDemoOptions)
                        }
                        className={`bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-5 ${fontClass} p-0 px-2`}
                      >
                        {showDemoOptions ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            <span>{t.auth.orTryDemo}</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            <span>{t.auth.orTryDemo}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {showDemoOptions && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-2 duration-300 mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleDemoLogin("admin")}
                        disabled={isLoading}
                        className={`border-zinc-200 dark:border-zinc-800 hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-300 dark:hover:border-green-800 ${fontClass}`}
                      >
                        <span className="mr-1">👨‍💼</span>
                        <span className="hidden sm:inline">
                          Admin{" "}
                        </span>
                        <span className="font-en">$500</span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleDemoLogin("lowbalance")
                        }
                        disabled={isLoading}
                        className={`border-zinc-200 dark:border-zinc-800 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 hover:border-yellow-300 dark:hover:border-yellow-800 ${fontClass}`}
                      >
                        <span className="mr-1">⚠️</span>
                        <span className="hidden sm:inline">
                          Low{" "}
                        </span>
                        <span className="font-en">$1.55</span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleDemoLogin("zerobalance")
                        }
                        disabled={isLoading}
                        className={`border-zinc-200 dark:border-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-300 dark:hover:border-red-800 ${fontClass}`}
                      >
                        <span className="mr-1">🚨</span>
                        <span className="hidden sm:inline">
                          Zero{" "}
                        </span>
                        <span className="font-en">$0</span>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-6 sm:mt-8 text-center">
                  <p
                    className={`text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    {t.auth.dontHaveAccount}{" "}
                    <button
                      type="button"
                      onClick={onSwitchToSignup}
                      className="text-blue-600 dark:text-blue-400 hover:underline p-0 cursor-pointer"
                    >
                      {t.auth.createAccount}
                    </button>
                  </p>
                </div>

                <div className="sm:pt-6 border-t border-zinc-200 dark:border-zinc-800 sm:mt-8 pt-3.5 mt-[14px] mr-[0px] mb-[0px] ml-[0px]">
                  <p
                    className={`text-xs text-center text-zinc-500 dark:text-zinc-500 ${fontClass}`}
                  >
                    {t.auth.termsAndPrivacy}{" "}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t.auth.termsOfService}
                    </a>{" "}
                    {t.auth.and}{" "}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t.auth.privacyPolicy}
                    </a>
                  </p>
                </div>
              </>
            ) : view === "forgotPassword" ? (
              <>
                <div className="mb-6 sm:mb-8">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBackToLogin}
                    className={`mb-4 -ml-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 ${fontClass} p-0`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.auth.backToLogin}
                  </Button>
                  <h2
                    className={`text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                  >
                    {t.auth.resetPassword}
                  </h2>
                  <p
                    className={`text-sm sm:text-base text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    {t.auth.resetPasswordDesc}
                  </p>
                </div>

                {error && (
                  <Alert className="mb-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <AlertDescription
                      className={`text-red-600 dark:text-red-400 ${fontClass}`}
                    >
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form
                  onSubmit={handleForgotPassword}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="resetEmail"
                      className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.emailAddress}
                    </Label>
                    <div className="relative bg-[rgba(169,155,155,0)]">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="resetEmail"
                        type="email"
                        placeholder={t.auth.emailPlaceholder}
                        value={resetEmail}
                        onChange={(e) =>
                          setResetEmail(e.target.value)
                        }
                        className={`pl-10 font-en transition-all ${
                          resetEmail === ""
                            ? "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700"
                            : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                  resetEmail,
                                )
                              ? "bg-green-50 dark:bg-green-950/20 border-green-500 dark:border-green-600/50 focus:border-green-500 focus:ring-green-500/20"
                              : "bg-red-50 dark:bg-red-950/20 border-red-500 dark:border-red-600/50 focus:border-red-500 focus:ring-red-500/20"
                        }`}
                        disabled={isLoading}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-[#1B5BA5] hover:bg-[#164a8a] dark:bg-[#1B5BA5] dark:hover:bg-[#164a8a] text-white ${fontClass}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {t.auth.sendingOtp}
                      </>
                    ) : (
                      <>
                        {t.auth.sendVerificationCode}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="p-3 sm:p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 mt-6">
                  <p
                    className={`text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    💡 <strong>{t.auth.tip}</strong>{" "}
                    {t.auth.forgotPasswordTip}
                  </p>
                </div>
              </>
            ) : view === "verifyOtp" ? (
              <>
                <div className="mb-6 sm:mb-8">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBackToLogin}
                    className={`mb-4 -ml-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 ${fontClass} p-0`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.auth.backToLogin}
                  </Button>
                  <div className="flex items-center gap-5 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2
                        className={`text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                      >
                        {t.auth.verifyOtp}
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-en break-all">
                        {t.auth.sentTo} {resetEmail}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm sm:text-base text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    {t.auth.enterVerificationCode}
                  </p>
                </div>

                {error && (
                  <Alert className="mb-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <AlertDescription
                      className={`text-red-600 dark:text-red-400 ${fontClass}`}
                    >
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form
                  onSubmit={handleVerifyOtp}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label
                      className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.verificationCode}
                    </Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="w-10 h-12 sm:w-12 sm:h-12 text-base sm:text-lg font-en bg-zinc-900 border-zinc-700"
                          />
                          <InputOTPSlot
                            index={1}
                            className="w-10 h-12 sm:w-12 sm:h-12 text-base sm:text-lg font-en bg-zinc-900 border-zinc-700"
                          />
                          <InputOTPSlot
                            index={2}
                            className="w-10 h-12 sm:w-12 sm:h-12 text-base sm:text-lg font-en bg-zinc-900 border-zinc-700"
                          />
                          <InputOTPSlot
                            index={3}
                            className="w-10 h-12 sm:w-12 sm:h-12 text-base sm:text-lg font-en bg-zinc-900 border-zinc-700"
                          />
                          <InputOTPSlot
                            index={4}
                            className="w-10 h-12 sm:w-12 sm:h-12 text-base sm:text-lg font-en bg-zinc-900 border-zinc-700"
                          />
                          <InputOTPSlot
                            index={5}
                            className="w-10 h-12 sm:w-12 sm:h-12 text-base sm:text-lg font-en bg-zinc-900 border-zinc-700"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className={`w-full bg-[#1B5BA5] hover:bg-[#164a8a] dark:bg-[#1B5BA5] dark:hover:bg-[#164a8a] text-white ${fontClass}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {t.auth.verifying}
                      </>
                    ) : (
                      <>
                        {t.auth.verifyCode}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p
                    className={`text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    {t.auth.didntReceiveCode}{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading || resendCountdown > 0}
                      className="text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 p-0"
                    >
                      {resendCountdown > 0
                        ? `${t.auth.resendOtp} (${resendCountdown}s)`
                        : t.auth.resendOtp}
                    </button>
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 mt-6">
                  <p
                    className={`text-xs text-blue-700 dark:text-blue-300 ${fontClass}`}
                  >
                    🔒 <strong>{t.auth.demoOtpTip}</strong>{" "}
                    {t.auth.demoOtpTipDesc}
                  </p>
                </div>
              </>
            ) : view === "resetPassword" ? (
              <>
                <div className="mb-6 sm:mb-8">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBackToLogin}
                    className={`mb-4 -ml-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 ${fontClass} p-0`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.auth.backToLogin}
                  </Button>
                  <div className="flex items-center gap-5 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2
                        className={`text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                      >
                        {t.auth.resetPassword}
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-en break-all">
                        {t.auth.sentTo} {resetEmail}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm sm:text-base text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    {t.auth.enterNewPassword}
                  </p>
                </div>

                {error && (
                  <Alert className="mb-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <AlertDescription
                      className={`text-red-600 dark:text-red-400 ${fontClass}`}
                    >
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form
                  onSubmit={handleResetPassword}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label
                      className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.newPassword}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        type={
                          showNewPassword ? "text" : "password"
                        }
                        placeholder={t.auth.enterNewPassword}
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(e.target.value)
                        }
                        className={`pl-10 pr-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm ${fontClass}`}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowNewPassword(!showNewPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 p-0"
                        tabIndex={-1}
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.confirmPassword}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        placeholder={t.auth.confirmPassword}
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        className={`pl-10 pr-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm ${fontClass}`}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 p-0"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-[#1B5BA5] hover:bg-[#164a8a] dark:bg-[#1B5BA5] dark:hover:bg-[#164a8a] text-white ${fontClass}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {t.auth.resetting}
                      </>
                    ) : (
                      <>
                        {t.auth.resetPassword}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <></>
            )}
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      >
        <DialogContent
          className={`sm:max-w-[425px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 ${fontClass}`}
        >
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogHeader>
              <DialogTitle
                className={`text-xl text-zinc-900 dark:text-zinc-100 mb-2 ${fontClass}`}
              >
                {language === "en"
                  ? "Password Reset Successfully!"
                  : "កំណត់ពាក្យសម្ងាត់ឡើងវិញដោយជោគជ័យ!"}
              </DialogTitle>
              <DialogDescription
                className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
              >
                {language === "en"
                  ? "Your password has been reset. Redirecting to login..."
                  : "ពាក្យសម្ងាត់របស់អ្នកត្រូវបានកំណត់ឡើងវិញ។ កំពុងបញ្ជូនទៅទំព័រចូល..."}
              </DialogDescription>{" "}
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}