import { useState, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguageContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, Globe, ArrowLeft, ArrowRight, Mail, Lock, User, Building, Check, ShieldCheck, AlertCircle } from "lucide-react";

// Placeholder logo image (replace with actual logo URL)
const logoImage = "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=100&h=100&fit=crop";

interface SignUpProps {
  onSwitchToLogin: () => void;
  onBackToLanding?: () => void;
}

// Field validation errors state
interface FieldErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

export function SignUp({
  onSwitchToLogin,
  onBackToLanding,
}: SignUpProps) {
  const { signup } = useAuth();
  const { language, t, toggleLanguage } = useLanguage();
  const fontClass = language === "km" ? "font-kh" : "font-en";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Field-level validation errors
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });
  
  // Track which fields have been touched (blurred)
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // OTP states
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);

  // Real-time field validation
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) {
          return t.auth.fullNameRequired;
        }
        if (value.trim().length < 2) {
          return t.auth.validation?.nameTooShort || "Name must be at least 2 characters";
        }
        return "";
      
      case "email":
        if (!value.trim()) {
          return t.auth.emailRequired;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return t.auth.invalidEmailFormat;
        }
        return "";
      
      case "password":
        if (!value) {
          return t.auth.passwordRequired;
        }
        if (value.length < 8) {
          return t.auth.passwordMinLength8;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return t.auth.passwordComplexity;
        }
        return "";
      
      case "confirmPassword":
        if (!value) {
          return t.auth.validation?.confirmPasswordRequired || "Please confirm your password";
        }
        if (value !== formData.password) {
          return t.auth.passwordsDoNotMatch;
        }
        return "";
      
      default:
        return "";
    }
  };

  // Validate all fields and update errors
  const validateAllFields = (): boolean => {
    const errors: FieldErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
      terms: !acceptedTerms ? t.auth.acceptTermsRequired : "",
    };
    
    setFieldErrors(errors);
    setTouchedFields(new Set(["name", "email", "password", "confirmPassword", "terms"]));
    
    return !Object.values(errors).some(error => error !== "");
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError("");
      
      // Validate field if it has been touched
      if (touchedFields.has(field)) {
        setFieldErrors(prev => ({
          ...prev,
          [field]: validateField(field, value),
        }));
      }
      
      // Also re-validate confirmPassword when password changes
      if (field === "password" && touchedFields.has("confirmPassword")) {
        setFieldErrors(prev => ({
          ...prev,
          confirmPassword: validateField("confirmPassword", formData.confirmPassword),
        }));
      }
    };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
    setFieldErrors(prev => ({
      ...prev,
      [field]: validateField(field, formData[field as keyof typeof formData] as string),
    }));
  };

  const handleTermsChange = (checked: boolean) => {
    setAcceptedTerms(checked);
    if (touchedFields.has("terms")) {
      setFieldErrors(prev => ({
        ...prev,
        terms: !checked ? t.auth.acceptTermsRequired : "",
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError(t.auth.fullNameRequired);
      return false;
    }
    if (!formData.email.trim()) {
      setError(t.auth.emailRequired);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t.auth.invalidEmailFormat);
      return false;
    }
    if (!formData.password) {
      setError(t.auth.passwordRequired);
      return false;
    }
    if (formData.password.length < 8) {
      setError(t.auth.passwordMinLength8);
      return false;
    }
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
    ) {
      setError(t.auth.passwordComplexity);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t.auth.passwordsDoNotMatch);
      return false;
    }
    if (!acceptedTerms) {
      setError(t.auth.acceptTermsRequired);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all fields with inline errors
    if (!validateAllFields()) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      // Use default OTP for testing
      const otp = "123456";
      setGeneratedOtp(otp);

      // Simulate sending OTP (in real app, this would call API)
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("🔐 Test OTP Code: 123456"); // Default for testing
      toast.success(t.auth.otpResent);

      // Show OTP screen
      setShowOtpStep(true);
    } catch (err) {
      setError(t.auth.signupFailed);
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otpCode || otpCode.length !== 6) {
      setError(t.auth.invalidOtp);
      return;
    }

    if (otpCode !== generatedOtp) {
      setError(t.auth.invalidOtp);
      setIsOtpInvalid(true);
      return;
    }

    try {
      setOtpLoading(true);
      // Create account after OTP verification
      await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        company: formData.company || undefined,
      });
      toast.success(t.auth.accountCreatedSuccess);
    } catch (err) {
      setError(t.auth.signupFailed);
      toast.error("Signup failed");
      setShowOtpStep(false); // Go back to form
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setError("");
      // Use default OTP for testing
      const otp = "123456";
      setGeneratedOtp(otp);
      setOtpCode("");
      setIsOtpInvalid(false);

      // Simulate sending OTP
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("🔐 Test OTP Code: 123456"); // Default for testing
      toast.success(t.auth.otpResent);
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleChangeEmail = () => {
    setShowOtpStep(false);
    setOtpCode("");
    setGeneratedOtp("");
    setError("");
    setIsOtpInvalid(false);
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0)
      return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return {
        strength: 1,
        label: t.auth.passwordStrengthWeak,
        color: "text-red-600 dark:text-red-500",
      };
    if (
      password.length < 8 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    ) {
      return {
        strength: 2,
        label: t.auth.passwordStrengthFair,
        color: "text-orange-600 dark:text-orange-500",
      };
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      return {
        strength: 3,
        label: t.auth.passwordStrengthGood,
        color: "text-blue-600 dark:text-blue-500",
      };
    }
    return {
        strength: 4,
        label: t.auth.passwordStrengthStrong,
        color: "text-green-600 dark:text-green-500",
    };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-6xl flex items-center gap-4">
        {/* Back to Home Button - Left Side */}
        {onBackToLanding && (
          <Button
            type="button"
            variant="ghost"
            onClick={onBackToLanding}
            className={`fixed top-4 left-4 z-50 flex items-center gap-2 p-5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/50 dark:hover:bg-zinc-800/50 rounded-xl transition-all ${fontClass}`}
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
                <g clipPath="url(#clip0_55_5566_signup)">
                  <g filter="url(#filter0_dd_55_5566_signup)">
                    <rect width="40" height="40" rx="5" fill="url(#paint0_linear_55_5566_signup)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.7902 15.1211L27.8408 19.7402C27.4318 20.5285 26.8841 21.2685 26.1976 21.9225L20.0029 27.8393L13.8083 21.9225C12.4821 20.6558 11.6731 19.0777 11.3794 17.4289L9.28929 16.8937C8.95415 17.2035 8.49649 17.3945 7.99378 17.3945C6.96314 17.3945 6.12891 16.596 6.12891 15.6133C6.12891 14.6306 6.96495 13.832 7.99378 13.832C8.84604 13.832 9.56497 14.3776 9.7884 15.1228L9.7902 15.1211ZM7.99559 14.8061C8.46226 14.8061 8.84064 15.1675 8.84064 15.6133C8.84064 16.059 8.46226 16.4204 7.99559 16.4204C7.52892 16.4204 7.15053 16.059 7.15053 15.6133C7.15053 15.1675 7.52892 14.8061 7.99559 14.8061Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M26.1957 10.0914C27.9435 11.7608 28.7939 13.974 28.7489 16.1735L30.839 16.7087C31.1741 16.3989 31.6318 16.2079 32.1345 16.2079C33.1651 16.2079 33.9994 17.0064 33.9994 17.9891C33.9994 18.9718 33.1633 19.7704 32.1345 19.7704C31.2822 19.7704 30.5633 19.2248 30.3399 18.4796L11.5938 13.6815C13.4172 7.59425 21.4731 5.57896 26.1957 10.0897V10.0914ZM32.1345 17.1837C32.6012 17.1837 32.9795 17.5451 32.9795 17.9909C32.9795 18.4366 32.6012 18.798 32.1345 18.798C31.6678 18.798 31.2894 18.4366 31.2894 17.9909C31.2894 17.5451 31.6678 17.1837 32.1345 17.1837Z" fill="white"/>
                    <path d="M27.2136 29.1811C27.1614 29.0492 27.0934 28.938 27.021 28.8427C26.8753 28.6519 26.716 28.5205 26.5596 28.4094C26.4028 28.2982 26.244 28.2142 26.0867 28.1381C25.9289 28.0625 25.772 27.9993 25.6152 27.9425C25.301 27.8288 24.9874 27.7448 24.6741 27.6742C24.3609 27.604 24.0482 27.5482 23.7355 27.5032C23.4233 27.4553 23.111 27.4197 22.7993 27.3891C22.4875 27.3585 22.1762 27.3343 21.865 27.3135C21.7327 27.3051 21.6 27.2972 21.4673 27.2903C21.392 27.5116 21.3177 27.7364 21.2443 27.9647C22.0348 28.019 22.8195 28.1352 23.5806 28.3254C24.1578 28.4721 24.7267 28.6544 25.2378 28.8975C25.4912 29.0176 25.732 29.1589 25.9134 29.311C26.0042 29.3856 26.0766 29.4647 26.1132 29.5269C26.1321 29.5581 26.1408 29.5833 26.1436 29.5981C26.1461 29.6139 26.1427 29.6173 26.1403 29.6198C26.1364 29.6218 26.134 29.6233 26.1272 29.6346C26.12 29.6455 26.107 29.6658 26.0853 29.6905C26.0418 29.7414 25.9656 29.8081 25.8724 29.8698C25.6837 29.9953 25.4366 30.1025 25.1804 30.1929C24.9222 30.2833 24.6481 30.3555 24.3691 30.4167C24.0897 30.4775 23.8045 30.5274 23.5164 30.5669C23.2288 30.6099 22.9383 30.6425 22.6463 30.6697C22.3548 30.6979 22.0619 30.7201 21.768 30.7394C21.1806 30.7764 20.5904 30.7982 19.9993 30.8051C19.7039 30.8095 19.4081 30.8085 19.1127 30.8006C18.8179 30.7932 18.523 30.7828 18.2286 30.7641C17.6408 30.728 17.0549 30.6697 16.4802 30.5793C15.9073 30.4879 15.3384 30.3673 14.8215 30.185C14.5652 30.0941 14.3191 29.9859 14.1309 29.8629C14.0368 29.8021 13.9601 29.7374 13.9161 29.688C13.8939 29.6633 13.88 29.644 13.8727 29.6337C13.865 29.6228 13.8616 29.6213 13.8573 29.6193C13.8544 29.6173 13.85 29.6129 13.8524 29.5971C13.8539 29.5813 13.8626 29.5556 13.8809 29.5245C13.9171 29.4607 13.9895 29.3797 14.0793 29.3036C14.2602 29.15 14.5025 29.0087 14.7563 28.8896C15.0126 28.7695 15.2843 28.6648 15.5632 28.5744C15.8427 28.484 16.1288 28.4039 16.4194 28.3367C17.1833 28.1584 17.9685 28.0457 18.7599 27.9855C18.6823 27.7424 18.6031 27.5032 18.523 27.2676C18.3922 27.273 18.2614 27.2804 18.1306 27.2888C17.5076 27.3279 16.8841 27.3906 16.2606 27.4904C15.6361 27.5927 15.0126 27.7241 14.3862 27.9499C14.0735 28.0665 13.7583 28.2004 13.4432 28.4163C13.2864 28.5255 13.1266 28.6559 12.9804 28.8446C12.9075 28.9395 12.839 29.0507 12.7859 29.1816C12.7343 29.3125 12.6995 29.4642 12.6957 29.6193C12.6918 29.7745 12.7198 29.9291 12.7666 30.065C12.8134 30.2008 12.8776 30.3184 12.9461 30.4202C13.0846 30.6233 13.24 30.7695 13.3925 30.894C13.5465 31.019 13.7009 31.1198 13.8563 31.2112C14.0112 31.3016 14.1666 31.3807 14.3225 31.4528C14.6338 31.5956 14.9455 31.7127 15.2592 31.8125C15.5724 31.9118 15.8861 31.9987 16.2012 32.0704C17.4598 32.3599 18.73 32.4819 19.9997 32.4992C21.2694 32.5121 22.544 32.3905 23.8006 32.0827C24.1148 32.0047 24.428 31.9152 24.7403 31.812C25.0525 31.7082 25.3633 31.5892 25.6741 31.4449C25.9849 31.2991 26.2942 31.1321 26.6021 30.8881C26.7556 30.7646 26.9105 30.6198 27.05 30.4182C27.119 30.3174 27.1836 30.2003 27.2309 30.0645C27.2787 29.9296 27.3067 29.775 27.3038 29.6198C27.3009 29.4647 27.2671 29.313 27.2145 29.1816L27.2136 29.1811Z" fill="url(#paint1_linear_55_5566_signup)"/>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_dd_55_5566_signup" x="-12" y="-2" width="64" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_55_5566_signup"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="3"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_5566_signup"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_55_5566_signup"/>
                    <feOffset dy="10"/>
                    <feGaussianBlur stdDeviation="7.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_55_5566_signup" result="effect2_dropShadow_55_5566_signup"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_55_5566_signup" result="shape"/>
                  </filter>
                  <linearGradient id="paint0_linear_55_5566_signup" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#51A2FF"/>
                    <stop offset="1" stopColor="#091B51"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_55_5566_signup" x1="19.9993" y1="27.4118" x2="19.9993" y2="31.9612" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.6"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <clipPath id="clip0_55_5566_signup">
                    <rect width="40" height="40" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div>
                <h1 className="font-en text-2xl text-zinc-900 dark:text-zinc-100">
                  RokTenh Map
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1 font-en">
                  Map Service Platform
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-12">
              <h2
                className={`text-2xl text-zinc-900 dark:text-zinc-100 ${fontClass}`}
              >
                {t.auth.startBuildingWithMaps}
              </h2>
              <p
                className={`text-zinc-600 dark:text-zinc-400 ${fontClass}`}
              >
                {t.auth.joinThousands}
              </p>

              <div className="space-y-3 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p
                    className={`text-zinc-700 dark:text-zinc-300 ${fontClass}`}
                  >
                    {t.auth.freeCredit}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p
                    className={`text-zinc-700 dark:text-zinc-300 ${fontClass}`}
                  >
                    {t.auth.noCreditCard}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p
                    className={`text-zinc-700 dark:text-zinc-300 ${fontClass}`}
                  >
                    {t.auth.cancelAnytime}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p
                    className={`text-zinc-700 dark:text-zinc-300 ${fontClass}`}
                  >
                    {t.auth.apiServicesIncluded}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p
                    className={`text-zinc-700 dark:text-zinc-300 ${fontClass}`}
                  >
                    {t.auth.support247}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur">
                <p className="font-en text-2xl text-zinc-900 dark:text-zinc-100">
                  99.9%
                </p>
                <p
                  className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${fontClass}`}
                >
                  {t.auth.uptimeSLA}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur">
                <p className="font-en text-2xl text-zinc-900 dark:text-zinc-100">
                  {"<"}200ms
                </p>
                <p
                  className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${fontClass}`}
                >
                  {t.auth.response}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur">
                <p className="font-en text-2xl text-zinc-900 dark:text-zinc-100">
                  1000+
                </p>
                <p
                  className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${fontClass}`}
                >
                  {t.auth.developers}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form / OTP Verification */}
          <Card className="p-5 sm:p-8 lg:p-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="hidden lg:flex justify-end mb-[-28px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <Globe className="w-4 h-4" />
                <span className="font-en">
                  {language === "en" ? "KH" : "EN"}
                </span>
              </Button>
            </div>

            <div className="lg:hidden flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={logoImage}
                  alt="RokTenh Map Logo"
                  className="w-10 h-10 rounded-xl shadow-lg"
                />
                <div>
                  <h1 className="font-en text-base text-zinc-900 dark:text-zinc-100">
                    RokTenh Map
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs font-en">
                    Map Service Platform
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 h-8 px-2"
              >
                <Globe className="w-4 h-4" />
                <span className="font-en">
                  {language === "en" ? "KH" : "EN"}
                </span>
              </Button>
            </div>

            {!showOtpStep ? (
              <>
                {/* Signup Form */}
                <div className="mb-4 sm:mb-6">
                  <h2
                    className={`text-lg sm:text-xl lg:text-2xl text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                  >
                    {t.auth.createYourAccount}
                  </h2>
                  <p
                    className={`text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 sm:mt-2 ${fontClass}`}
                  >
                    {t.auth.getStartedFree}
                  </p>
                </div>

                {error && (
                  <Alert className="mb-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <AlertDescription className="text-red-600 dark:text-red-400 text-xs sm:text-sm">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="name"
                      className={`text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.fullNameLabel}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="name"
                        type="text"
                        placeholder={t.auth.fullNamePlaceholder}
                        value={formData.name}
                        onChange={handleChange("name")}
                        onBlur={() => handleBlur("name")}
                        className="pl-10 h-9 sm:h-10 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                        disabled={isLoading}
                        autoComplete="name"
                      />
                      {fieldErrors.name && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="email"
                      className={`text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.emailAddressLabel}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.auth.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange("email")}
                        onBlur={() => handleBlur("email")}
                        className="pl-10 h-9 sm:h-10 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-en"
                        disabled={isLoading}
                        autoComplete="email"
                      />
                      {fieldErrors.email && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="password"
                      className={`text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.passwordLabel}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="password"
                        type={
                          showPassword ? "text" : "password"
                        }
                        placeholder={
                          t.auth.createStrongPasswordPlaceholder
                        }
                        value={formData.password}
                        onChange={handleChange("password")}
                        onBlur={() => handleBlur("password")}
                        className="pl-10 pr-10 h-9 sm:h-10 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="space-y-1.5 sm:space-y-2 mt-1.5 sm:mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                strength.strength === 1
                                  ? "w-1/4 bg-red-500"
                                  : strength.strength === 2
                                    ? "w-1/2 bg-orange-500"
                                    : strength.strength === 3
                                      ? "w-3/4 bg-blue-500"
                                      : strength.strength === 4
                                        ? "w-full bg-green-500"
                                        : "w-0"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs ${strength.color} ${fontClass} whitespace-nowrap`}
                          >
                            {strength.label}
                          </span>
                        </div>
                        <p
                          className={`text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-500 ${fontClass}`}
                        >
                          {t.auth.passwordRequirement}
                        </p>
                      </div>
                    )}
                    {fieldErrors.password && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className={`text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                    >
                      {t.auth.confirmPasswordLabel}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder={t.auth.reenterPassword}
                        value={formData.confirmPassword}
                        onChange={handleChange(
                          "confirmPassword",
                        )}
                        onBlur={() => handleBlur("confirmPassword")}
                        className="pl-10 pr-10 h-9 sm:h-10 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword,
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                        {fieldErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5 py-2 sm:py-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) =>
                        handleTermsChange(e.target.checked)
                      }
                      className="w-4 h-4 mt-0.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                    />
                    <Label
                      htmlFor="terms"
                      className={`text-[10px] sm:text-xs leading-4 sm:leading-5 text-zinc-600 dark:text-zinc-400 cursor-pointer ${fontClass}`}
                    >
                      <span className="block sm:inline">
                        {t.auth.agreeToTerms}
                      </span>{" "}
                      <span className="block sm:inline">
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
                      </span>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !acceptedTerms}
                    className="w-full h-9 sm:h-10 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        <span className={fontClass}>
                          {t.auth.creatingAccount}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={fontClass}>
                          {t.auth.createAccountButton}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-4 sm:mt-6 text-center">
                  <p
                    className={`text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    {t.auth.alreadyHaveAccountSignup}{" "}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t.auth.signInLink}
                    </button>
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <p
                    className={`text-[10px] sm:text-xs text-center text-zinc-500 dark:text-zinc-500 ${fontClass}`}
                  >
                    {t.auth.questionsContact}{" "}
                    <a
                      href="mailto:sales@roktenh.io"
                      className="font-en text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      sales@roktenh.io
                    </a>{" "}
                    {t.auth.orViaTelegram}{" "}
                    <a
                      href="https://t.me/RokTenh_Sales"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-en text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      @RokTenh_Sales
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* OTP Verification Form */}
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2
                    className={`text-lg sm:text-xl lg:text-2xl text-zinc-900 dark:text-zinc-100 text-center ${fontClass}`}
                  >
                    {t.auth.verifyYourEmail}
                  </h2>
                  <p
                    className={`text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 sm:mt-2 text-center ${fontClass}`}
                  >
                    {t.auth.otpSentTo}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mt-1 text-center font-en break-all px-2 sm:px-4">
                    {formData.email}
                  </p>
                </div>

                {error && (
                  <Alert className="mb-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <AlertDescription className="text-red-600 dark:text-red-400 text-xs sm:text-sm">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Alert className="mb-4 sm:mb-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50">
                  <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                  <AlertDescription className="text-blue-600 dark:text-blue-400 font-en text-[10px] sm:text-xs">
                    {t.auth.otpDemoNote}
                  </AlertDescription>
                </Alert>

                <form
                  onSubmit={handleOtpVerification}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* OTP Input Section */}
                  <div className="space-y-2 sm:space-y-3">
                    <Label
                      className={`text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 block ${fontClass}`}
                    >
                      {t.auth.otpCodeLabel}
                    </Label>
                    <div className="flex gap-1.5 sm:gap-2 justify-center">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={otpCode[index] || ""}
                          onChange={(e) => {
                            const value =
                              e.target.value.replace(/\D/g, "");
                            if (value.length <= 1) {
                              // Clear invalid state when user starts typing again
                              if (isOtpInvalid)
                                setIsOtpInvalid(false);

                              const newOtp = otpCode.split("");
                              newOtp[index] = value;
                              const completeOtp =
                                newOtp.join("");
                              setOtpCode(completeOtp);

                              // Auto-focus next input
                              if (value && index < 5) {
                                const nextInput = e.target
                                  .parentElement?.children[
                                  index + 1
                                ] as HTMLInputElement;
                                nextInput?.focus();
                              }

                              // Auto-verify when all 6 digits are filled
                              if (
                                completeOtp.length === 6 &&
                                value
                              ) {
                                if (
                                  completeOtp === generatedOtp
                                ) {
                                  // Correct code - auto verify
                                  setTimeout(() => {
                                    handleOtpVerification(
                                      new Event(
                                        "submit",
                                      ) as any,
                                    );
                                  }, 200);
                                } else {
                                  // Wrong code - show red border
                                  setTimeout(() => {
                                    setIsOtpInvalid(true);
                                  }, 100);
                                }
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            // Handle backspace
                            if (
                              e.key === "Backspace" &&
                              !otpCode[index] &&
                              index > 0
                            ) {
                              const prevInput = e.currentTarget
                                .parentElement?.children[
                                index - 1
                              ] as HTMLInputElement;
                              prevInput?.focus();
                            }
                          }}
                          className={`w-9 h-11 sm:w-10 sm:h-12 lg:w-12 lg:h-14 bg-white dark:bg-zinc-900 rounded-lg text-zinc-900 dark:text-zinc-100 text-center text-lg sm:text-xl font-en outline-none transition-all ${
                            isOtpInvalid
                              ? "border-2 border-red-500 shake"
                              : "border-2 border-zinc-200 dark:border-zinc-800 focus:border-blue-500"
                          }`}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>

                    {/* Demo Code Info */}
                    <div
                      className={`text-center p-2 sm:p-2.5 lg:p-3 rounded-lg bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 ${fontClass}`}
                    >
                      <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400">
                        {language === "km"
                          ? "លេខកូដសាកល្បង"
                          : "Demo Code"}
                        :{" "}
                        <span className="text-blue-600 dark:text-blue-400 font-mono font-en text-xs sm:text-sm">
                          123456
                        </span>
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      otpLoading || otpCode.length !== 6
                    }
                    className="w-full h-9 sm:h-10 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm"
                  >
                    {otpLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        <span className={fontClass}>
                          {t.auth.verifyingOtp}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={fontClass}>
                          {t.auth.verifyAndCreateAccount}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-4 sm:mt-6 text-center space-y-2 sm:space-y-3">
                  <p
                    className={`text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                  >
                    {t.auth.didntReceiveCode}{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-en"
                    >
                      {t.auth.resendOtpButton}
                    </button>
                  </p>
                  <button
                    type="button"
                    onClick={handleChangeEmail}
                    className={`text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 ${fontClass}`}
                  >
                    {t.auth.changeEmail}
                  </button>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <p
                    className={`text-[10px] sm:text-xs text-center text-zinc-500 dark:text-zinc-500 ${fontClass}`}
                  >
                    {t.auth.questionsContact}{" "}
                    <a
                      href="mailto:sales@roktenh.io"
                      className="font-en text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      sales@roktenh.io
                    </a>{" "}
                    {t.auth.orViaTelegram}{" "}
                    <a
                      href="https://t.me/RokTenh_Sales"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-en text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      @RokTenh_Sales
                    </a>
                  </p>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}