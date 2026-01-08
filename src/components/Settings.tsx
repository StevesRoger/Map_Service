import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguageContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import {
  Eye,
  EyeOff,
  Upload,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  Bell,
  Palette,
  Globe,
  Save,
  Loader2,
} from "lucide-react";

export function Settings() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();

  // Font class based on language
  const fontClass = language === "km" ? "font-kh" : "font-en";

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Account Information State - Initialize with user data from auth context
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Track original values for change detection
  const [originalValues, setOriginalValues] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  // Load profile photo and sync with user data from auth context
  useEffect(() => {
    // Update from user context (this has priority)
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setOriginalValues((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }

    const savedPhoto = localStorage.getItem("roktenh_profile_photo");
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }

    // Load saved phone and address if available
    const savedPhone = localStorage.getItem("roktenh_phone");
    const savedAddress = localStorage.getItem("roktenh_address");

    if (savedPhone) {
      setPhone(savedPhone);
      setOriginalValues((prev) => ({ ...prev, phone: savedPhone }));
    }
    if (savedAddress) {
      setAddress(savedAddress);
      setOriginalValues((prev) => ({ ...prev, address: savedAddress }));
    }
  }, [user]);

  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP State
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(300); // 5 minutes in seconds
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);

  // OTP Countdown Timer
  useEffect(() => {
    if (showOtpDialog && otpCountdown > 0) {
      const timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showOtpDialog, otpCountdown]);

  // Format countdown timer
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send OTP
  const sendOTP = (emailAddress: string) => {
    // For demo purposes, always use "123456" as the OTP
    const otp = "123456";
    setGeneratedOtp(otp);
    // In production, this would send the OTP to the email via API
    console.log(`OTP sent to ${emailAddress}: ${otp}`);
    toast.success(
      `${
        language === "km"
          ? "លេខកូដផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើទៅ"
          : "Verification code sent to"
      } ${emailAddress}`,
      {
        description: `${
          language === "km" ? "លេខកូដសាកល្បង" : "Demo OTP"
        }: ${otp} (${
          language === "km"
            ? "ប្រើលេខកូដនេះដើម្បីផ្ទៀងផ្ទាត់"
            : "Use this code to verify"
        })`,
      }
    );
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (otpCountdown > 0) {
      toast.error(
        language === "km"
          ? "សូមរង់ចាំមុនពេលស្នើសុំលេខកូដថ្មី"
          : "Please wait before requesting a new OTP"
      );
      return;
    }
    setOtpCountdown(300);
    setOtpCode("");
    sendOTP(pendingEmail);
  };

  // Verify OTP
  const handleVerifyOTP = () => {
    if (otpCode.length !== 6) {
      toast.error(
        language === "km"
          ? "សូមបញ្ចូលលេខកូដ 6 ខ្ទង់"
          : "Please enter a 6-digit OTP code"
      );
      return;
    }

    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      if (otpCode === generatedOtp) {
        // OTP verified successfully
        toast.success(t.settings.otpVerified);

        // Save the new email
        localStorage.setItem("roktenh_email", pendingEmail);
        window.dispatchEvent(new Event("accountSettingsUpdated"));

        // Update original values
        setOriginalValues((prev) => ({ ...prev, email: pendingEmail }));

        // Close dialog and reset
        setShowOtpDialog(false);
        setOtpCode("");
        setGeneratedOtp("");
        setOtpCountdown(300);
        setPendingEmail("");
      } else {
        toast.error(t.settings.invalidOTP);
        setIsOtpInvalid(true);
      }
      setIsVerifying(false);
    }, 1000);
  };

  // Check if there are any changes to save
  const hasChanges =
    fullName !== originalValues.fullName ||
    email !== originalValues.email ||
    phone !== originalValues.phone ||
    address !== originalValues.address ||
    oldPassword.length > 0 ||
    newPassword.length > 0 ||
    confirmPassword.length > 0;

  const handlePhotoUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/jpg,image/png";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(
            language === "km"
              ? "ទំហំឯកសារត្រូវតែតិចជាង 5MB"
              : "File size must be less than 5MB"
          );
          return;
        }

        // Show loading state
        setIsUploadingPhoto(true);
        toast.info(
          language === "km" ? "កំពុងផ្ទុករូបថត..." : "Uploading photo..."
        );

        // Read and auto-save the image
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;

          // Simulate upload delay for better UX
          setTimeout(() => {
            // Auto-save to localStorage
            localStorage.setItem("roktenh_profile_photo", result);

            // Dispatch custom event to notify App.tsx
            window.dispatchEvent(new Event("profilePhotoUpdated"));

            // Update state
            setProfilePhoto(result);
            setIsUploadingPhoto(false);

            // Show success message
            toast.success(
              language === "km"
                ? "រូបថតត្រូវបានផ្ទុកឡើង និងរក្សាទុកបានជោគជ័យ!"
                : "Photo uploaded and saved successfully!"
            );
          }, 500);
        };
        reader.onerror = () => {
          setIsUploadingPhoto(false);
          toast.error(
            language === "km"
              ? "បរាជ័យក្នុងការផ្ទុករូបថត"
              : "Failed to upload photo"
          );
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleLogout = () => {
    logout();
    toast.success(
      language === "km" ? "ចាកចេញបានជោគជ័យ" : "Logged out successfully"
    );
  };

  const handleSaveChanges = () => {
    // Check if email has changed
    const emailChanged = email !== originalValues.email;

    // If email changed, trigger OTP verification
    if (emailChanged) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        toast.error(
          language === "km"
            ? "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ"
            : "Please enter a valid email address"
        );
        return;
      }

      // Set pending email and show OTP dialog
      setPendingEmail(email);
      setShowOtpDialog(true);
      setOtpCountdown(300);
      sendOTP(email);
      return; // Stop here, will continue after OTP verification
    }

    // Save non-email account information to localStorage
    localStorage.setItem("roktenh_fullname", fullName);
    localStorage.setItem("roktenh_phone", phone);
    localStorage.setItem("roktenh_address", address);

    // Dispatch custom event to notify App.tsx that account settings changed
    window.dispatchEvent(new Event("accountSettingsUpdated"));

    // If password fields are filled, validate and save password
    if (oldPassword || newPassword || confirmPassword) {
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error(
          language === "km"
            ? "សូមបំពេញក្របខណ្ឌពាក្យសម្ងាត់ទាំងអស់ ឬទុកវាឲ្យទទេ"
            : "Please fill in all password fields or leave them empty"
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error(
          language === "km"
            ? "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នា"
            : "New passwords do not match"
        );
        return;
      }

      if (newPassword.length < 8) {
        toast.error(
          language === "km"
            ? "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ"
            : "Password must be at least 8 characters"
        );
        return;
      }

      // Clear password fields after successful validation
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success(
        language === "km"
          ? "ការកំណត់ទាំងអស់ត្រូវបានរក្សាទុកបានជោគជ័យ!"
          : "All settings saved successfully!"
      );
    } else {
      // Only account info was updated
      toast.success(
        language === "km"
          ? "ព័ត៌មានគណនីត្រូវបានរក្សាទុកបានជោគជ័យ!"
          : "Account information saved successfully!"
      );
    }

    // Update original values to reflect saved state (except email which needs OTP)
    setOriginalValues({
      fullName,
      email: originalValues.email, // Keep original email until OTP verified
      phone,
      address,
    });
  };

  // Inline translations for missing keys
  const translations = {
    accountSettings: language === "km" ? "ការកំណត់គណនី" : "Account Settings",
    manageAccountSettings:
      language === "km"
        ? "គ្រប់គ្រងការកំណត់គណនីរបស់អ្នកនៅទីនេះ"
        : "Manage your account settings here",
    uploadPhoto: language === "km" ? "ផ្ទុករូបថត" : "Upload Photo",
    uploading: language === "km" ? "កំពុងផ្ទុក..." : "Uploading...",
    photoRestriction:
      language === "km"
        ? "អនុញ្ញាតតែរូបថត JPG, JPEG, ឬ PNG ប៉ុណ្ណោះ។ រក្សាទុកដោយស្វ័យប្រវត្តិនៅពេលជ្រើសរើស។"
        : "Only JPG, JPEG, or PNG photos are allowed. Auto-saves when selected.",
    accountInformation:
      language === "km" ? "ព័ត៌មានគណនី" : "Account Information",
    phoneNumber: language === "km" ? "លេខទូរស័ព្ទ" : "Phone Number",
    addressName: language === "km" ? "ឈ្មោះអាសយដ្ឋាន" : "Address Name",
    oldPassword: language === "km" ? "ពាក្យសម្ងាត់ចាស់" : "Old Password",
    pleaseEnter: language === "km" ? "សូមបញ្ចូល" : "Please enter",
    createNewPassword:
      language === "km" ? "បង្កើតពាក្យសម្ងាត់ថ្មី" : "Create New Password",
    confirmNewPassword:
      language === "km" ? "បញ្ជាក់ពាក្យសម្ងាត់ថ្មី" : "Confirm New Password",
    verifyEmailAddress:
      language === "km" ? "ផ្ទៀងផ្ទាត់អាសយដ្ឋានអ៊ីមែល" : "Verify Email Address",
    verificationCodeSent:
      language === "km"
        ? "យើងបានផ្ញើលេខកូដផ្ទៀងផ្ទាត់ 6 ខ្ទង់ទៅ"
        : "We've sent a 6-digit verification code to",
    enterSixDigitCode:
      language === "km" ? "បញ្ចូលលេខកូដ 6 ខ្ទង់" : "Enter 6-digit code",
    demoModeCode:
      language === "km" ? "ម៉ូដសាកល្បង: ប្រើលេខកូដ" : "Demo mode: Use code",
    toVerify: language === "km" ? "ដើម្បីផ្ទៀងផ្ទាត់" : "to verify",
    codeExpiresIn:
      language === "km" ? "លេខកូដផុតកំណត់ក្នុងរយៈពេល" : "Code expires in",
    codeExpired: language === "km" ? "លេខកូដផុតកំណត់" : "Code expired",
    resendCode: language === "km" ? "ផ្ញើលេខកូដឡើងវិញ" : "Resend Code",
    cancel: language === "km" ? "បោះបង់" : "Cancel",
    verifyEmail: language === "km" ? "ផ្ទៀងផ្ទាត់អ៊ីមែល" : "Verify Email",
    verifying: language === "km" ? "កំពុងផ្ទៀងផ្ទាត់..." : "Verifying...",
  };

  return (
    <div className="flex flex-col gap-6 w-full py-[0px] p-[0px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className={`text-zinc-100 tracking-[-0.3125px] ${fontClass}`}>
            {translations.accountSettings}
          </h2>
          <p
            className={`text-zinc-400 tracking-[-0.1504px] text-xs sm:text-sm ${fontClass}`}
          >
            {translations.manageAccountSettings}
          </p>
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          disabled={!hasChanges}
          className={`bg-[#1B5BA5] px-5 py-2 rounded-md text-white text-sm hover:bg-[#1a5299] transition-colors flex items-center gap-2 w-fit shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1B5BA5] ${fontClass}`}
        >
          <Save className="w-4 h-4" />
          {t.settings.saveChanges}
        </button>
      </div>

      {/* Profile Photo Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[14px] p-[20.8px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="size-[76px] shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg relative">
            {isUploadingPhoto && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-[32px] font-['Arial']">
                {fullName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Upload Section */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handlePhotoUpload}
              disabled={isUploadingPhoto}
              className={`bg-[#1b5ba5] px-5 py-2 rounded-md text-white text-sm hover:bg-[#1a5299] transition-colors inline-flex items-center gap-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed ${fontClass}`}
            >
              {isUploadingPhoto ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {translations.uploading}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  {translations.uploadPhoto}
                </>
              )}
            </button>
            <p
              className={`text-zinc-400 text-[13px] max-w-[631px] ${fontClass}`}
            >
              {translations.photoRestriction}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Account Information Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[14px] p-[20.8px] w-full lg:w-[454.4px] flex flex-col gap-5">
          {/* Card Header */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
              <path
                d="M15.8333 17.5V15.8333C15.8333 14.9493 15.4821 14.1014 14.857 13.4763C14.2319 12.8512 13.3841 12.5 12.5 12.5H7.5C6.61594 12.5 5.7681 12.8512 5.14298 13.4763C4.51786 14.1014 4.16667 14.9493 4.16667 15.8333V17.5"
                stroke="#2B7FFF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 10 2.5C8.15905 2.5 6.66667 3.99238 6.66667 5.83333C6.66667 7.67428 8.15905 9.16667 10 9.16667Z"
                stroke="#2B7FFF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className={`text-zinc-100 text-base ${fontClass}`}>
              {translations.accountInformation}
            </h3>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className={`text-zinc-300 text-sm ${fontClass}`}>
                {t.settings.fullName}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm outline-none focus:border-zinc-700 transition-colors ${fontClass}`}
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className={`text-zinc-300 text-sm ${fontClass}`}>
                {t.settings.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm outline-none focus:border-zinc-700 transition-colors font-en"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className={`text-zinc-300 text-sm ${fontClass}`}>
                {translations.phoneNumber}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm outline-none focus:border-zinc-700 transition-colors font-en"
              />
            </div>

            {/* Address Name */}
            <div className="flex flex-col gap-2">
              <label className={`text-zinc-300 text-sm ${fontClass}`}>
                {translations.addressName}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm outline-none focus:border-zinc-700 transition-colors ${fontClass}`}
              />
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="flex-1 h-fit bg-zinc-900 border border-zinc-800 rounded-[14px] p-[20.8px] flex flex-col gap-5">
          {/* Section Header */}
          <div className="pb-4 border-b border-zinc-800/50">
            <p className={`text-white text-sm ${fontClass}`}>
              {t.settings.changePassword}
            </p>
          </div>

          {/* Old Password */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-zinc-400 text-xs ${fontClass}`}>
              {translations.oldPassword}*
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder={translations.pleaseEnter}
                className={`w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm outline-none focus:border-zinc-700 transition-colors placeholder:text-zinc-600 ${fontClass}`}
              />
            </div>
          </div>

          {/* New Password Row */}
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Create New Password */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className={`text-zinc-400 text-xs ${fontClass}`}>
                {translations.createNewPassword}*
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="············"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 pr-10 text-zinc-100 text-sm outline-none focus:border-zinc-700 transition-colors placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B5BA5] hover:text-[#2d6ec1] transition-colors"
                >
                  {showNewPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className={`text-zinc-400 text-xs ${fontClass}`}>
                {translations.confirmNewPassword}*
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="············"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 pr-10 text-zinc-100 text-sm outline-none focus:border-zinc-700 transition-colors placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B5BA5] hover:text-[#2d6ec1] transition-colors"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md p-0 gap-0">
          {/* Header Section */}
          <div className="p-6 pb-4 border-b border-zinc-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <DialogTitle className={`text-zinc-100 text-lg ${fontClass}`}>
                    {translations.verifyEmailAddress}
                  </DialogTitle>
                </div>
              </div>
            </div>
            <DialogDescription
              className={`text-zinc-400 text-sm ml-[52px] ${fontClass}`}
            >
              {translations.verificationCodeSent}
            </DialogDescription>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-6">
            {/* Email Display */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              <span className="text-zinc-200 text-sm font-en flex-1">
                {pendingEmail}
              </span>
              <button
                onClick={() => {
                  setShowOtpDialog(false);
                  setOtpCode("");
                  setGeneratedOtp("");
                  setPendingEmail("");
                }}
                className={`text-blue-500 hover:text-blue-400 text-xs transition-colors ${fontClass}`}
              >
                {language === "km" ? "ផ្លាស់ប្តូរ" : "Change"}
              </button>
            </div>

            {/* OTP Input Section */}
            <div className="space-y-3">
              <label className={`text-zinc-300 text-sm block ${fontClass}`}>
                {language === "km" ? "លេខកូដផ្ទៀងផ្ទាត់" : "Verification Code"}
              </label>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otpCode[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 1) {
                        // Clear invalid state when user starts typing again
                        if (isOtpInvalid) setIsOtpInvalid(false);

                        const newOtp = otpCode.split("");
                        newOtp[index] = value;
                        const completeOtp = newOtp.join("");
                        setOtpCode(completeOtp);

                        // Auto-focus next input
                        if (value && index < 5) {
                          const nextInput = e.target.parentElement?.children[
                            index + 1
                          ] as HTMLInputElement;
                          nextInput?.focus();
                        }

                        // Auto-verify when all 6 digits are filled
                        if (completeOtp.length === 6 && value) {
                          if (completeOtp === generatedOtp) {
                            // Correct code - auto verify
                            setTimeout(() => {
                              handleVerifyOTP();
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
                        const prevInput = e.currentTarget.parentElement
                          ?.children[index - 1] as HTMLInputElement;
                        prevInput?.focus();
                      }
                    }}
                    className={`w-12 h-14 bg-zinc-950 rounded-lg text-zinc-100 text-center text-xl font-en outline-none transition-all ${
                      isOtpInvalid
                        ? "border-2 border-red-500 shake"
                        : "border-2 border-zinc-700 focus:border-blue-500"
                    }`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Demo Code Info */}
              <div
                className={`text-center p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 ${fontClass}`}
              >
                <p className="text-xs text-zinc-400">
                  {translations.demoModeCode}{" "}
                  <span className="text-blue-400 font-mono font-en text-sm">
                    123456
                  </span>
                </p>
              </div>
            </div>

            {/* Timer and Resend Section */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
              <div className={`text-sm ${fontClass}`}>
                {otpCountdown > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-zinc-400">
                      {translations.codeExpiresIn}{" "}
                      <span className="text-zinc-200 font-en font-mono">
                        {formatTime(otpCountdown)}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-red-400">
                      {translations.codeExpired}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={handleResendOTP}
                disabled={otpCountdown > 0}
                className={`text-blue-500 hover:text-blue-400 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${fontClass}`}
              >
                {translations.resendCode}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowOtpDialog(false);
                  setOtpCode("");
                  setGeneratedOtp("");
                  setPendingEmail("");
                  setEmail(originalValues.email);
                }}
                className={`flex-1 border-zinc-700 hover:bg-zinc-800 text-zinc-300 h-11 ${fontClass}`}
              >
                {translations.cancel}
              </Button>
              <Button
                onClick={handleVerifyOTP}
                disabled={
                  otpCode.length !== 6 || isVerifying || otpCountdown === 0
                }
                className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 disabled:opacity-50 ${fontClass}`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {translations.verifying}
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    {translations.verifyEmail}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
