import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  useLanguage,
  translateTransactionDescription,
} from "./LanguageContext";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Badge } from "./ui/badge";
import {
  Wallet,
  Plus,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Eye,
  CheckCircle2,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";
import type { Transaction } from "../services/apiService";
import { TopUpAmountStep } from "./TopUpAmountStep";
import { TopUpScanningStep } from "./TopUpScanningStep";
import html2canvas from "html2canvas";
import { km } from "date-fns/locale";
import { apiServiceManager } from "../services/apiService";
import {
  generateInvoiceNumber,
  downloadInvoice,
} from "../services/invoiceService";
import { CustomDateRangePicker } from "./CustomDateRangePicker";

// Placeholder logo image (replace with actual logo URL)
const logoImage =
  "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=100&h=100&fit=crop";

type TopUpStep = "amount" | "scanning" | "success";

type FilterType = "all" | "top_up" | "usage";
type FilterStatus = "all" | "pending" | "completed";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

/**
 * Props for the WalletManagement component
 */
export interface WalletManagementProps {
  /** Current user's balance */
  userBalance: number;
  /** Callback when balance is updated */
  onBalanceUpdate: (newBalance: number) => void;
  /** Admin-level transactions list */
  adminTransactions?: Transaction[];
  /** Current user ID */
  currentUserId?: string;
  /** Callback when top-up is successful */
  onTopUpSuccess?: (amount: number, newBalance: number) => void;
}

// Constants
const ITEMS_PER_PAGE = 10;
const QUICK_TOP_UP_AMOUNTS = [5, 10, 50, 100, 500];
const DEFAULT_USER_ID = "admin_user";
const DEFAULT_USER_NAME = "Demo User";
const DEFAULT_USER_EMAIL = "demo@roktenhmap.com";
const MIN_TOP_UP = 5;
const MAX_TOP_UP = 10000;
const INITIAL_COUNTDOWN = 15;

/**
 * Transaction row component - extracted for better performance and readability
 */
const TransactionRow = React.memo(
  ({
    transaction,
    fontClass,
    t,
    language,
    onPreview,
    onDownload,
    onPayNow,
  }: {
    transaction: Transaction;
    fontClass: string;
    t: any;
    language: string;
    onPreview: (txn: Transaction) => void;
    onDownload: (txn: Transaction) => void;
    onPayNow: (txn: Transaction) => void;
  }) => {
    const getTransactionIcon = () => {
      if (transaction.type === "top_up") {
        return (
          <div className="rotate-[135deg]">
            <ArrowUpRight className="w-4 h-4 text-[#00C950]" />
          </div>
        );
      }
      if (transaction.type === "usage") {
        return <ArrowDownRight className="w-4 h-4 text-[#FB2C36]" />;
      }
      return <DollarSign className="w-4 h-4 text-blue-500" />;
    };

    const getIconBgColor = () => {
      if (transaction.type === "top_up") return "bg-[rgba(0,201,80,0.1)]";
      if (transaction.type === "usage") return "bg-[rgba(251,44,54,0.1)]";
      return "bg-zinc-500/10";
    };

    const getAmountColor = () => {
      if (transaction.status === "pending") return "text-yellow-400";
      return transaction.amount > 0 ? "text-[#00c950]" : "text-[#fb2c36]";
    };

    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800/30 transition-colors gap-3 sm:gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={`h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center ${getIconBgColor()}`}
          >
            {getTransactionIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-zinc-100 text-sm tracking-[-0.3125px] truncate font-en ${fontClass}`}
            >
              {translateTransactionDescription(
                transaction.description,
                language
              )}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
              <p className="font-en text-xs text-zinc-400 tracking-[-0.1504px] hidden sm:inline">
                {new Date(transaction.timestamp).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="text-xs text-zinc-400 tracking-[-0.1504px] sm:hidden">
                {new Date(transaction.timestamp).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
              <Badge
                variant="outline"
                className={`text-[10px] border-[rgba(255,255,255,0.1)] bg-transparent text-zinc-200 px-1.5 py-0 ${fontClass}`}
              >
                {transaction.type === "top_up"
                  ? t.wallet.topUp
                  : t.wallet.usage}
              </Badge>
              {transaction.status === "pending" && (
                <Badge
                  variant="outline"
                  className={`text-[10px] border-yellow-500/50 bg-yellow-500/10 text-yellow-400 px-1.5 py-0 ${fontClass}`}
                >
                  {t.wallet.pending}
                </Badge>
              )}
              {transaction.status === "completed" &&
                transaction.type === "top_up" && (
                  <Badge
                    variant="outline"
                    className={`text-[10px] border-[#00c950]/50 bg-[#00c950]/10 text-[#00c950] px-1.5 py-0 ${fontClass}`}
                  >
                    {t.wallet.completed}
                  </Badge>
                )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-2">
          <div className="text-left sm:text-right">
            <p
              className={`text-sm tracking-[-0.4395px] font-en ${getAmountColor()}`}
            >
              {transaction.status === "pending"
                ? ""
                : transaction.amount > 0
                ? "+"
                : "-"}
              ${Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
          {transaction.status === "pending" ? (
            <Button
              onClick={() => onPayNow(transaction)}
              size="sm"
              className={`bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white h-8 px-3 flex-shrink-0 ${fontClass}`}
            >
              {t.wallet.payNow}
            </Button>
          ) : (
            <div className="flex gap-1.5 flex-shrink-0">
              <button
                className="text-zinc-400 hover:text-zinc-300 p-1 cursor-pointer"
                onClick={() => onPreview(transaction)}
                aria-label="Preview invoice"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                className="text-zinc-400 hover:text-zinc-300 p-1 cursor-pointer"
                onClick={() => onDownload(transaction)}
                aria-label="Download invoice"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

TransactionRow.displayName = "TransactionRow";

/**
 * WalletManagement component - manages user wallet, top-ups, and transaction history
 */
export function WalletManagement({
  userBalance,
  onBalanceUpdate,
  adminTransactions = [],
  currentUserId,
  onTopUpSuccess,
}: WalletManagementProps) {
  const { t, language } = useLanguage();
  const fontClass = language === "km" ? "font-kh" : "font-en";

  // State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTopUpDialog, setShowTopUpDialog] = useState(false);
  const [topUpStep, setTopUpStep] = useState<TopUpStep>("amount");
  const [topUpAmount, setTopUpAmount] = useState("5");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);
  const [completedTransaction, setCompletedTransaction] =
    useState<Transaction | null>(null);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [previewTransaction, setPreviewTransaction] =
    useState<Transaction | null>(null);
  const [pendingTransactionId, setPendingTransactionId] = useState<
    string | null
  >(null);
  const [hasDownloadedQR, setHasDownloadedQR] = useState(false); // Track if user downloaded QR

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const userId = currentUserId || DEFAULT_USER_ID;

  // Load transaction data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const txns = await apiServiceManager.getTransactions(userId);

      const userAdminTransactions = currentUserId
        ? adminTransactions.filter((txn) => txn.userId === currentUserId)
        : [];

      const allTransactions = [...userAdminTransactions, ...txns].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setTransactions(allTransactions);
    } catch (error) {
      toast.error("Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  }, [userId, currentUserId, adminTransactions]);

  // Effects
  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (topUpStep === "scanning" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [topUpStep, countdown]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, filterStatus, searchQuery, dateRange]);

  // Handlers
  const handleTopUpDialogClose = useCallback(() => {
    setShowTopUpDialog(false);
    setTimeout(() => {
      setTopUpStep("amount");
      setTopUpAmount("5");
      setCountdown(INITIAL_COUNTDOWN);
      setPendingTransactionId(null);
      setHasDownloadedQR(false); // Reset QR download state
    }, 300);
  }, []);

  const handleConfirmTopUp = useCallback(async () => {
    const amount = parseFloat(topUpAmount);

    if (isNaN(amount) || amount < MIN_TOP_UP) {
      toast.error(`Minimum top-up amount is $${MIN_TOP_UP}`);
      return;
    }
    if (amount > MAX_TOP_UP) {
      toast.error(`Maximum top-up amount is $${MAX_TOP_UP.toLocaleString()}`);
      return;
    }

    try {
      const pendingTransaction = await apiServiceManager.createTopUpTransaction(
        userId,
        amount,
        "KHQR",
        "pending"
      );
      setPendingTransactionId(pendingTransaction.id);
      await loadData();
      setTopUpStep("scanning");
      setCountdown(INITIAL_COUNTDOWN);
    } catch (error: any) {
      toast.error(
        `Failed to create transaction: ${error.message || "Unknown error"}`
      );
    }
  }, [topUpAmount, userId, loadData]);

  const handlePaymentComplete = useCallback(async () => {
    const amount = parseFloat(topUpAmount);

    try {
      let newBalance = userBalance + amount;

      if (pendingTransactionId) {
        const updatedTransaction =
          await apiServiceManager.updateTransactionStatus(
            pendingTransactionId,
            "completed",
            userId
          );
        newBalance = updatedTransaction.balanceAfter;
        onBalanceUpdate(newBalance);
        setCompletedTransaction(updatedTransaction);
      }

      setPendingTransactionId(null);
      await loadData();
      setTopUpStep("success");
      toast.success(`Successfully added $${amount.toFixed(2)} to your wallet`);

      if (onTopUpSuccess) {
        onTopUpSuccess(amount, newBalance);
      }
    } catch (error) {
      toast.error("Failed to process payment");
      setTopUpStep("amount");
    }
  }, [
    topUpAmount,
    userBalance,
    pendingTransactionId,
    userId,
    onBalanceUpdate,
    loadData,
    onTopUpSuccess,
  ]);

  const handlePaymentFailed = useCallback(() => {
    // User cancelled or payment failed
    setPendingTransactionId(null);
    setTopUpStep("amount");
    toast.error("Payment cancelled");
  }, []);

  const handleSuccessClose = useCallback(() => {
    handleTopUpDialogClose();
    toast.success(
      `Successfully added $${parseFloat(topUpAmount).toFixed(2)} to your wallet`
    );
  }, [handleTopUpDialogClose, topUpAmount]);

  const handleDownloadInvoice = useCallback(() => {
    if (!completedTransaction) {
      toast.error("No transaction data available");
      return;
    }

    const invoiceData = {
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      transaction: completedTransaction,
      customerName: DEFAULT_USER_NAME,
      customerEmail: DEFAULT_USER_EMAIL,
      logoImage,
    };

    downloadInvoice(invoiceData);
    toast.success("Invoice downloaded successfully");
  }, [completedTransaction]);

  const handlePreviewInvoice = useCallback((transaction: Transaction) => {
    setPreviewTransaction(transaction);
    setShowInvoicePreview(true);
  }, []);

  const handlePayNow = useCallback((transaction: Transaction) => {
    setTopUpAmount(transaction.amount.toString());
    setPendingTransactionId(transaction.id);
    setShowTopUpDialog(true);
    setTopUpStep("scanning");
    setCountdown(INITIAL_COUNTDOWN);
  }, []);

  const handleDownloadFromPreview = useCallback(() => {
    if (!previewTransaction) return;

    const invoiceData = {
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      transaction: previewTransaction,
      customerName: DEFAULT_USER_NAME,
      customerEmail: DEFAULT_USER_EMAIL,
      logoImage,
    };

    downloadInvoice(invoiceData);
    toast.success("Invoice downloaded successfully");
    setShowInvoicePreview(false);

    if (
      completedTransaction &&
      completedTransaction.id === previewTransaction.id
    ) {
      handleSuccessClose();
    }
  }, [previewTransaction, completedTransaction, handleSuccessClose]);

  const handleDownloadQR = useCallback(async () => {
    if (!qrCodeRef.current) {
      toast.error("QR code not found");
      return;
    }

    try {
      const canvas = await html2canvas(qrCodeRef.current, {
        backgroundColor: "#000000",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const allElements = clonedDoc.querySelectorAll("*");
          allElements.forEach((el: any) => {
            if (el.style) {
              const computedStyle = window.getComputedStyle(el);
              const color = computedStyle.color;
              const bgColor = computedStyle.backgroundColor;
              const borderColor = computedStyle.borderColor;

              if (color && color !== "rgba(0, 0, 0, 0)") {
                el.style.color = color;
              }
              if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") {
                el.style.backgroundColor = bgColor;
              }
              if (borderColor && borderColor !== "rgba(0, 0, 0, 0)") {
                el.style.borderColor = borderColor;
              }
            }
          });
        },
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `KHQR-${parseFloat(topUpAmount).toFixed(
            2
          )}-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success("QR code downloaded successfully");
          setHasDownloadedQR(true);
        }
      });
    } catch (error) {
      toast.error("Failed to download QR code");
    }
  }, [topUpAmount]);

  const handleDownloadTransactionInvoice = useCallback(
    (transaction: Transaction) => {
      const invoiceData = {
        invoiceNumber: generateInvoiceNumber(),
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        transaction,
        customerName: DEFAULT_USER_NAME,
        customerEmail: DEFAULT_USER_EMAIL,
        logoImage,
      };
      downloadInvoice(invoiceData);
      toast.success("Invoice downloaded successfully");
    },
    []
  );

  const exportTransactions = useCallback(() => {
    const csvContent = [
      ["Date", "Type", "Amount", "Description", "Balance After", "Status"].join(
        ","
      ),
      ...filteredTransactions.map((txn) =>
        [
          new Date(txn.timestamp).toLocaleString(),
          txn.type,
          txn.amount,
          txn.description,
          txn.balanceAfter,
          txn.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Transaction history exported");
  }, []);

  const clearDateRangeFilter = useCallback(() => {
    setDateRange({ from: undefined, to: undefined });
  }, []);

  // Computed values
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesType = filterType === "all" || txn.type === filterType;
      const matchesStatus =
        filterStatus === "all" || txn.status === filterStatus;
      const matchesSearch =
        searchQuery === "" ||
        txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesDateRange = true;
      if (dateRange.from && dateRange.to) {
        const txnDate = new Date(txn.timestamp);
        const startDate = new Date(dateRange.from);
        const endDate = new Date(dateRange.to);
        matchesDateRange = txnDate >= startDate && txnDate <= endDate;
      }

      return matchesType && matchesStatus && matchesSearch && matchesDateRange;
    });
  }, [transactions, filterType, filterStatus, searchQuery, dateRange]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  );

  const statistics = useMemo(() => {
    const totalTopUps = transactions
      .filter((t) => t.type === "top_up")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalSpent = Math.abs(
      transactions
        .filter((t) => t.type === "usage")
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const now = new Date();
    const thisMonthTopUps = transactions
      .filter((t) => {
        const date = new Date(t.timestamp);
        return (
          t.type === "top_up" &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return { totalTopUps, totalSpent, thisMonthTopUps };
  }, [transactions]);

  const formatDateRange = useCallback(() => {
    if (!dateRange.from && !dateRange.to) return t.wallet.filterByDate;

    const formatDate = (date: Date) => {
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const monthName = t.wallet.monthsShort[monthIndex];
      return `${monthName} ${day}`;
    };

    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
    }
    if (dateRange.from) {
      return `${t.wallet.dateRangeFrom} ${formatDate(dateRange.from)}`;
    }
    return `${t.wallet.dateRangeUntil} ${
      dateRange.to ? formatDate(dateRange.to) : ""
    }`;
  }, [dateRange, t.wallet]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-100" />
          <p className={`text-zinc-400 text-sm ${fontClass}`}>
            {t.common.loading}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-zinc-100 text-base ${fontClass}`}>
            {t.wallet.title}
          </h1>
          <p className={`text-zinc-400 text-sm mt-1 ${fontClass}`}>
            {t.wallet.manageDesc}
          </p>
        </div>
        <Button
          onClick={() => setShowTopUpDialog(true)}
          className={`bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white h-10 py-2 px-5 ${fontClass} cursor-pointer`}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.wallet.topUpBalance}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-5 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between h-[108px]">
            <div className="flex flex-col justify-between h-full">
              <p className={`text-white text-sm ${fontClass}`}>
                {t.wallet.availableBalance}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-2xl font-en">
                  ${userBalance.toFixed(2)}
                </span>
                <span className="text-white text-sm font-en">USD</span>
              </div>
              <p className={`text-white text-sm ${fontClass}`}>
                {t.wallet.totalSpent}:{" "}
                <span className="font-en">
                  ${statistics.totalSpent.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="h-20 w-20 rounded-full bg-[#1B5BA5] flex items-center justify-center">
              <Wallet className="w-10 h-10 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between h-[108px]">
            <div className="flex flex-col justify-between h-full">
              <p className={`text-white text-sm ${fontClass}`}>
                {t.wallet.totalTopUps}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-2xl font-en">
                  ${statistics.totalTopUps.toFixed(2)}
                </span>
                <span className="text-white text-sm font-en">USD</span>
              </div>
              <p className={`text-white text-sm ${fontClass}`}>
                {t.wallet.thisMonth}:{" "}
                <span className="font-en">
                  ${statistics.thisMonthTopUps.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="h-20 w-20 rounded-full bg-zinc-500 flex items-center justify-center">
              <div className="text-white text-5xl font-en">$</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Card className="border border-zinc-800 bg-zinc-900 overflow-hidden">
        <Tabs defaultValue="transactions" className="w-full">
          <div className="w-full border-b border-zinc-800 px-5 py-2.5">
            <TabsList className="bg-transparent h-9 p-0">
              <TabsTrigger
                value="transactions"
                className={`text-sm sm:text-base data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-200 text-zinc-200 px-2.5 py-1.5 cursor-pointer ${fontClass}`}
              >
                {t.wallet.transactions}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="transactions"
            className="px-4 sm:px-6 py-5 space-y-4 mt-0"
          >
            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder={t.wallet.searchTransactions}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-zinc-900 border-zinc-800 text-zinc-400 h-9 ${fontClass}`}
                />
              </div>
              <div className="grid grid-cols-2 sm:flex gap-3 flex-wrap cursor-pointer">
                <Select
                  value={filterType}
                  onValueChange={(value: FilterType) => setFilterType(value)}
                >
                  <SelectTrigger
                    className={`w-full lg:w-[180px] bg-zinc-900 border-zinc-800 h-9 ${fontClass} cursor-pointer`}
                  >
                    <SelectValue placeholder={t.wallet.filterByType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className={fontClass}>
                      {t.wallet.allTypes}
                    </SelectItem>
                    <SelectItem value="top_up" className={fontClass}>
                      {t.wallet.topUp}
                    </SelectItem>
                    <SelectItem value="usage" className={fontClass}>
                      {t.wallet.usage}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterStatus}
                  onValueChange={(value: FilterStatus) =>
                    setFilterStatus(value)
                  }
                >
                  <SelectTrigger
                    className={`w-full lg:w-[180px] bg-zinc-900 border-zinc-800 h-9 ${fontClass} cursor-pointer`}
                  >
                    <SelectValue placeholder={t.wallet.filterByStatus} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className={fontClass}>
                      {t.wallet.allStatus}
                    </SelectItem>
                    <SelectItem value="pending" className={fontClass}>
                      {t.wallet.pending}
                    </SelectItem>
                    <SelectItem value="completed" className={fontClass}>
                      {t.wallet.completed}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Popover
                  open={isDatePickerOpen}
                  onOpenChange={setIsDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <button className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 flex items-center gap-2 w-full lg:w-auto hover:border-zinc-700 transition-colors h-9 cursor-pointer">
                      <CalendarIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span
                        className={`text-zinc-300 text-sm whitespace-nowrap ${fontClass}`}
                      >
                        {formatDateRange()}
                      </span>
                      {(dateRange.from || dateRange.to) && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            clearDateRangeFilter();
                          }}
                          className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 cursor-pointer"
                          aria-label="Clear date filter"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              e.stopPropagation();
                              clearDateRangeFilter();
                            }
                          }}
                        >
                          <X className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-zinc-900 border-zinc-800"
                    align="start"
                    side="bottom"
                    sideOffset={8}
                  >
                    <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[15px] pt-[16px] px-[16px] relative w-full pr-[16px] pl-[16px]">
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                        <div className="h-[20px] relative shrink-0 w-full">
                          <p
                            className={`absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#9f9fa9] text-[14px] text-nowrap top-[0.57px] whitespace-pre ${fontClass}`}
                            style={{ fontVariationSettings: "'wdth' 100" }}
                          >
                            {t.wallet.filterByDate}
                          </p>
                        </div>
                        <div className="calendar-numbers-en relative shrink-0 w-full">
                          <CustomDateRangePicker
                            selected={dateRange}
                            onSelect={(range) =>
                              setDateRange(
                                range || { from: undefined, to: undefined }
                              )
                            }
                            locale={language === "km" ? km : undefined}
                          />
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] h-[36px] items-start relative shrink-0 w-full">
                        <div
                          className="basis-0 bg-zinc-800 grow h-[36px] min-h-px min-w-px relative rounded-[10px] shrink-0 cursor-pointer hover:bg-zinc-700 transition-colors"
                          onClick={() => {
                            clearDateRangeFilter();
                            setIsDatePickerOpen(false);
                          }}
                        >
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-full">
                            <p
                              className={`absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[60.36px] text-[14px] text-center text-nowrap text-zinc-300 top-[8.57px] translate-x-[-50%] whitespace-pre ${fontClass}`}
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              {t.common.cancel}
                            </p>
                          </div>
                        </div>
                        <div
                          className="basis-0 bg-[#1b5ba5] grow h-[36px] min-h-px min-w-px relative rounded-[10px] shrink-0 cursor-pointer hover:bg-[#164a8a] transition-colors"
                          onClick={() => setIsDatePickerOpen(false)}
                        >
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-full">
                            <p
                              className={`absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[60.12px] text-[14px] text-center text-nowrap text-white top-[8.57px] translate-x-[-50%] whitespace-pre ${fontClass}`}
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              {t.common.confirm}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="ghost"
                  onClick={exportTransactions}
                  className={`border-0 text-zinc-200 hover:bg-transparent h-9 px-4 flex-shrink-0 ${fontClass} cursor-pointer`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.common.export}
                </Button>
              </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-2">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                  <p className={`text-zinc-400 ${fontClass}`}>
                    {t.wallet.noTransactions}
                  </p>
                </div>
              ) : (
                paginatedTransactions.map((txn) => (
                  <TransactionRow
                    key={txn.id}
                    transaction={txn}
                    fontClass={fontClass}
                    t={t}
                    language={language}
                    onPreview={handlePreviewInvoice}
                    onDownload={handleDownloadTransactionInvoice}
                    onPayNow={handlePayNow}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredTransactions.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-between gap-2 mt-6">
                <p className={`text-[#9f9fa9] text-sm ${fontClass}`}>
                  <span className="hidden sm:inline">{t.wallet.showing} </span>
                  {startIndex + 1} {t.users.to}{" "}
                  {Math.min(endIndex, filteredTransactions.length)} {t.users.of}{" "}
                  {filteredTransactions.length}
                  <span className="hidden sm:inline">
                    {" "}
                    {t.wallet.transactions.toLowerCase()}
                  </span>
                </p>
                <Pagination className="mx-0 justify-end">
                  <PaginationContent className="gap-1">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        className={`text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100 ${
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }`}
                      />
                    </PaginationItem>
                    {totalPages > 0 &&
                      [...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                                className={`cursor-pointer ${
                                  currentPage === page
                                    ? "!bg-[#1B5BA5] text-white !border-0 hover:!bg-[#1B5BA5] hover:text-white"
                                    : "text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
                                }`}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={`ellipsis-${page}`}>
                              <PaginationEllipsis className="text-zinc-400" />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        className={`text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100 ${
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Top Up Dialog */}
      <Dialog open={showTopUpDialog} onOpenChange={handleTopUpDialogClose}>
        <DialogContent
          className="bg-zinc-900 border-zinc-800 max-w-[402px] p-0 gap-0"
          onInteractOutside={(e) => {
            if (topUpStep === "scanning") {
              e.preventDefault();
            }
          }}
        >
          <DialogTitle className="sr-only">
            {topUpStep === "amount"
              ? "Top Up Balance"
              : topUpStep === "scanning"
              ? "Scan QR Code to Pay"
              : "Payment Successful"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {topUpStep === "amount"
              ? "Enter the amount you want to top up to your wallet"
              : topUpStep === "scanning"
              ? "Scan the QR code with your banking app to complete the payment"
              : "Your payment has been processed successfully"}
          </DialogDescription>

          {topUpStep === "amount" && (
            <TopUpAmountStep
              topUpAmount={topUpAmount}
              setTopUpAmount={setTopUpAmount}
              quickTopUpAmounts={QUICK_TOP_UP_AMOUNTS}
              onConfirm={handleConfirmTopUp}
              onCancel={handleTopUpDialogClose}
              t={t}
              fontClass={fontClass}
            />
          )}

          {topUpStep === "scanning" && (
            <TopUpScanningStep
              topUpAmount={topUpAmount}
              countdown={countdown}
              qrCodeRef={qrCodeRef}
              onDownloadQR={handleDownloadQR}
              onPaymentComplete={handlePaymentComplete}
              onPaymentFailed={handlePaymentFailed}
              transactionId={pendingTransactionId || undefined}
              hasDownloadedQR={hasDownloadedQR}
              t={t}
              fontClass={fontClass}
              variant="wallet"
              logoImage={logoImage}
            />
          )}

          {topUpStep === "success" && (
            <div className="bg-zinc-900 dark:bg-zinc-900 relative min-h-[400px] flex flex-col items-center justify-center p-5">
              <div className="flex flex-col items-center gap-6">
                <div className="w-[90px] h-[90px] rounded-full bg-[#1b5ba5] flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>

                <div className="text-center space-y-3">
                  <h3 className={`text-white text-3xl ${fontClass}`}>
                    {t.topUp.paymentCompleted}
                  </h3>
                  <p
                    className={`text-white text-sm max-w-[370px] ${fontClass}`}
                  >
                    {t.topUp.paymentSuccessMessage}
                  </p>
                </div>

                <button
                  onClick={handleDownloadInvoice}
                  className={`h-[30px] px-4 bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 rounded-md text-white text-sm transition-colors flex items-center gap-2 shadow-[0px_2px_6px_0px_rgba(115,103,240,0.3)] ${fontClass}`}
                >
                  <span>{t.topUp.getInvoice}</span>
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Invoice Preview Dialog */}
      <Dialog open={showInvoicePreview} onOpenChange={setShowInvoicePreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-white border-zinc-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 bg-white sticky top-0 z-10">
              <div>
                <DialogTitle className={`text-xl text-zinc-900 ${fontClass}`}>
                  {t.topUp.invoicePreviewTitle}
                </DialogTitle>
                <DialogDescription
                  className={`text-sm text-zinc-500 ${fontClass}`}
                >
                  {t.topUp.invoicePreviewDescription}
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleDownloadFromPreview}
                  className={`bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white cursor-pointer ${fontClass}`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.topUp.downloadInvoice}
                </Button>
                <Button
                  onClick={() => setShowInvoicePreview(false)}
                  variant="ghost"
                  size="icon"
                  className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
                  aria-label="Close invoice preview"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto bg-zinc-50 max-h-[calc(90vh-100px)]">
              {previewTransaction && (
                <div className="mx-auto p-6 max-w-[650px]">
                  <div className="bg-white border border-zinc-200 overflow-hidden shadow-lg rounded-lg w-full">
                    <div className="bg-gradient-to-br from-[#1b5ba5] to-[#0d3d6e] text-white px-7 py-5">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                          <img
                            src={logoImage}
                            alt="RokTenh Map Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-2xl font-en">
                          RokTenh Map API
                        </span>
                      </div>
                      <div>
                        <p className={`text-sm opacity-90 mb-2 ${fontClass}`}>
                          INVOICE
                        </p>
                        <p className="text-xl">#{generateInvoiceNumber()}</p>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 border-b-2 border-zinc-100 mb-5 pb-5">
                        <div>
                          <h3
                            className={`text-xs uppercase text-zinc-500 mb-3 tracking-wide ${fontClass}`}
                          >
                            Invoice To
                          </h3>
                          <p className="text-zinc-900 mb-1">
                            {DEFAULT_USER_NAME}
                          </p>
                          <p className="text-sm text-zinc-600">
                            {DEFAULT_USER_EMAIL}
                          </p>
                        </div>
                        <div>
                          <h3
                            className={`text-xs uppercase text-zinc-500 mb-3 tracking-wide ${fontClass}`}
                          >
                            Invoice Details
                          </h3>
                          <p
                            className={`text-sm text-zinc-900 mb-1 ${fontClass}`}
                          >
                            <span className="text-zinc-600">Date:</span>{" "}
                            {new Date().toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className={`text-sm text-zinc-900 ${fontClass}`}>
                            <span className="text-zinc-600">
                              Payment Method:
                            </span>{" "}
                            KHQR
                          </p>
                        </div>
                      </div>

                      <div className="bg-zinc-50 rounded-lg p-5 mb-5">
                        <div className="space-y-4">
                          <div className="flex justify-between py-3 border-b border-zinc-200">
                            <span
                              className={`text-sm text-zinc-600 ${fontClass}`}
                            >
                              Description
                            </span>
                            <span
                              className={`text-sm text-zinc-900 ${fontClass}`}
                            >
                              Account top-up via KHQR
                            </span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-zinc-200">
                            <span
                              className={`text-sm text-zinc-600 ${fontClass}`}
                            >
                              Transaction Type
                            </span>
                            <span className="text-sm text-zinc-900">
                              {previewTransaction.type
                                .replace("_", " ")
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between py-3">
                            <span
                              className={`text-sm text-zinc-600 ${fontClass}`}
                            >
                              Processing Fee
                            </span>
                            <span className="text-sm text-zinc-900">$0.00</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#1b5ba5] text-white rounded-lg p-5">
                        <div className="flex justify-between items-center">
                          <div>
                            <p
                              className={`text-base opacity-90 mb-3 ${fontClass}`}
                            >
                              Total Amount
                            </p>
                            <div
                              className={`inline-block px-4 py-1.5 bg-green-500 rounded-full text-xs uppercase tracking-wider ${fontClass}`}
                            >
                              PAID
                            </div>
                          </div>
                          <p className="text-4xl tracking-tight">
                            ${Math.abs(previewTransaction.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-50 border-t border-zinc-200 p-5">
                      <div className="text-center">
                        <h4 className="text-sm text-zinc-900 mb-2 font-en">
                          RokTenh Map API
                        </h4>
                        <p
                          className={`text-xs text-zinc-600 mb-1 ${fontClass}`}
                        >
                          Map Service Platform
                        </p>
                        <p
                          className={`text-xs text-zinc-600 mb-4 ${fontClass}`}
                        >
                          Providing geocoding, routing, and place search
                          services
                        </p>
                        <div className="pt-4 border-t border-zinc-200">
                          <p
                            className={`text-xs text-zinc-500 mb-1 ${fontClass}`}
                          >
                            This is an automated invoice. No signature required.
                          </p>
                          <p className={`text-xs text-zinc-400 ${fontClass}`}>
                            © {new Date().getFullYear()} RokTenh Map API. All
                            rights reserved.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
