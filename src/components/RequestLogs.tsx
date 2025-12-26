import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  Download,
  ChevronDown,
  Eye,
  X,
  AlertCircle,
  CheckCircle2,
  Clock,
  Copy,
  ChevronUp,
} from "lucide-react";
import type { APIRequest, APIKey } from "../types/api";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { km } from "date-fns/locale";
import { CustomDateRangePicker } from "./CustomDateRangePicker";

// Constants
const INITIAL_ROWS = 10;
const ROWS_PER_LOAD = 10;
const DATE_FORMAT_SHORT = { month: "short" as const, day: "numeric" as const };
const DATE_FORMAT_FULL = {
  month: "numeric" as const,
  day: "numeric" as const,
  year: "numeric" as const,
  hour: "numeric" as const,
  minute: "2-digit" as const,
  second: "2-digit" as const,
  hour12: true,
};

// Types
type FilterType = "all" | "success" | "error";
type DateRange = { from: Date | undefined; to: Date | undefined };
type StatusStyle = { bg: string; border: string; text: string };

interface RequestLogsProps {
  requests: APIRequest[];
  apiKeys: APIKey[];
}

// Utility functions
const getStatusBadgeStyle = (statusCode: number): StatusStyle => {
  if (statusCode >= 200 && statusCode < 300) {
    return {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
    };
  }
  if (statusCode >= 400 && statusCode < 500) {
    return {
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      text: "text-orange-400",
    };
  }
  if (statusCode >= 500) {
    return {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
    };
  }
  return {
    bg: "bg-zinc-800/50",
    border: "border-zinc-700",
    text: "text-zinc-400",
  };
};

const normalizeDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const copyToClipboard = async (
  text: string,
  successMessage: string,
  errorMessage: string
) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.className = "fixed -left-[9999px] -top-[9999px] opacity-0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      toast.success(successMessage);
    } catch (execErr) {
      toast.error(errorMessage);
    }

    document.body.removeChild(textarea);
  }
};

// Sub-components
interface CopyButtonProps {
  text: string;
  successMessage: string;
  errorMessage: string;
  size?: "sm" | "md";
}

function CopyButton({
  text,
  successMessage,
  errorMessage,
  size = "md",
}: CopyButtonProps) {
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <button
      onClick={() => copyToClipboard(text, successMessage, errorMessage)}
      className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 cursor-pointer"
      aria-label="Copy to clipboard"
    >
      <Copy className={iconSize} />
    </button>
  );
}

interface StatusBadgeProps {
  statusCode: number;
}

function StatusBadge({ statusCode }: StatusBadgeProps) {
  const style = getStatusBadgeStyle(statusCode);

  return (
    <div
      className={`inline-flex h-7 rounded-lg border items-center justify-center px-3 ${style.bg} ${style.border}`}
    >
      <span className={`${style.text} text-sm tracking-[-0.1504px] font-en`}>
        {statusCode}
      </span>
    </div>
  );
}

interface MobileRequestCardProps {
  request: APIRequest;
  isExpanded: boolean;
  onToggleExpand: () => void;
  apiKeyName: string;
  onCopy: (text: string) => void;
}

function MobileRequestCard({
  request,
  isExpanded,
  onToggleExpand,
  apiKeyName,
  onCopy,
}: MobileRequestCardProps) {
  const statusStyle = getStatusBadgeStyle(request.statusCode);

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-200">
      {/* Card Header */}
      <button
        onClick={onToggleExpand}
        className="w-full p-4 flex items-start justify-between gap-3 text-left cursor-pointer"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} request details`}
      >
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg border ${statusStyle.bg} ${statusStyle.border}`}
            >
              <span className={`${statusStyle.text} text-sm font-en`}>
                {request.statusCode}
              </span>
            </div>
            <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg border border-zinc-700/50 bg-zinc-800/30">
              <span className="text-zinc-300 text-sm font-en">
                {request.method}
              </span>
            </div>
          </div>
          <p className="text-zinc-300 text-sm truncate font-en">
            {request.endpoint}
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-en">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <time dateTime={request.timestamp}>
              {new Date(request.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </time>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp
            className="w-5 h-5 text-zinc-500 shrink-0"
            aria-hidden="true"
          />
        ) : (
          <ChevronDown
            className="w-5 h-5 text-zinc-500 shrink-0"
            aria-hidden="true"
          />
        )}
      </button>

      {/* Card Details - Expandable */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-zinc-800/80">
          <div className="pt-3 grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                Response Time
              </p>
              <p className="text-sm text-rose-400 font-en">
                {request.responseTime}ms
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                Cost
              </p>
              <p className="text-sm text-rose-400 font-en">
                - ${request.cost.toFixed(4)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                IP Address
              </p>
              <p className="text-sm text-zinc-400 font-en">
                {request.ipAddress}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                API Key
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-zinc-400 truncate font-en">
                  {apiKeyName}
                </p>
                <button
                  onClick={() => onCopy(apiKeyName)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 cursor-pointer"
                  aria-label="Copy API key"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface DesktopRequestRowProps {
  request: APIRequest;
  apiKeyName: string;
  onCopy: (text: string) => void;
}

function DesktopRequestRow({
  request,
  apiKeyName,
  onCopy,
}: DesktopRequestRowProps) {
  const statusStyle = getStatusBadgeStyle(request.statusCode);

  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors duration-150">
      {/* Timestamp */}
      <td className="h-16 px-6 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Clock
            className="w-4 h-4 text-zinc-500 shrink-0"
            aria-hidden="true"
          />
          <time
            dateTime={request.timestamp}
            className="text-zinc-100 text-sm tracking-[-0.3008px] font-en"
          >
            {new Date(request.timestamp).toLocaleString(
              "en-US",
              DATE_FORMAT_FULL
            )}
          </time>
        </div>
      </td>

      {/* API Key */}
      <td className="h-16 px-6">
        <div className="relative bg-zinc-950/50 rounded-lg h-8 border border-zinc-800 w-48">
          <div className="flex items-center gap-2 h-full px-3">
            <div className="flex-1 min-w-0">
              <p className="text-zinc-300 text-sm tracking-[-0.1504px] truncate font-en">
                {apiKeyName}
              </p>
            </div>
            <button
              onClick={() => onCopy(apiKeyName)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 cursor-pointer"
              aria-label="Copy API key"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </td>

      {/* Endpoint */}
      <td className="h-16 px-6">
        <p className="text-zinc-100 text-sm tracking-[-0.3008px] truncate max-w-xs font-en">
          {request.endpoint}
        </p>
      </td>

      {/* Method */}
      <td className="h-16 px-6">
        <div className="inline-flex h-7 rounded-lg border border-white/10 items-center justify-center px-3">
          <p className="text-zinc-200 text-sm tracking-[-0.1504px] font-en">
            {request.method}
          </p>
        </div>
      </td>

      {/* Status */}
      <td className="h-16 px-6">
        <StatusBadge statusCode={request.statusCode} />
      </td>

      {/* Response Time */}
      <td className="h-16 px-6 whitespace-nowrap">
        <p className="text-rose-400 text-sm tracking-[-0.3008px] font-en">
          {request.responseTime}ms
        </p>
      </td>

      {/* IP Address */}
      <td className="h-16 px-6 whitespace-nowrap">
        <p className="text-zinc-400 text-sm tracking-[-0.3008px] font-en">
          {request.ipAddress}
        </p>
      </td>

      {/* Cost */}
      <td className="h-16 px-6 whitespace-nowrap">
        <p className="text-rose-400 text-sm tracking-[-0.3008px] font-en">
          - ${request.cost.toFixed(4)}
        </p>
      </td>
    </tr>
  );
}

/**
 * RequestLogs - Displays API request logs with filtering, search, and date range capabilities
 * Supports both mobile card view and desktop table view with bilingual support (English/Khmer)
 */
export function RequestLogs({ requests, apiKeys }: RequestLogsProps) {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<FilterType>("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS);

  const fontClass = language === "km" ? "font-kh" : "font-en";

  // Memoized API key lookup
  const apiKeyMap = useMemo(() => {
    return new Map(apiKeys.map((key) => [key.id, key.key]));
  }, [apiKeys]);

  const getAPIKeyName = useCallback(
    (apiKeyId: string): string => {
      return apiKeyMap.get(apiKeyId) || t.logs.unknown;
    },
    [apiKeyMap, t.logs.unknown]
  );

  // Copy handler
  const handleCopy = useCallback(
    (text: string) => {
      copyToClipboard(text, t.logs.copiedToClipboard, t.logs.failedToCopy);
    },
    [t.logs.copiedToClipboard, t.logs.failedToCopy]
  );

  // Date range formatting
  const formatDateRange = useCallback((): string => {
    if (!dateRange.from && !dateRange.to) return t.logs.selectDates;

    if (dateRange.from && dateRange.to) {
      const fromStr = dateRange.from.toLocaleDateString(
        "en-US",
        DATE_FORMAT_SHORT
      );
      const toStr = dateRange.to.toLocaleDateString("en-US", DATE_FORMAT_SHORT);
      return `${fromStr} - ${toStr}`;
    }

    if (dateRange.from) {
      return `From ${dateRange.from.toLocaleDateString(
        "en-US",
        DATE_FORMAT_SHORT
      )}`;
    }

    return `Until ${dateRange.to?.toLocaleDateString(
      "en-US",
      DATE_FORMAT_SHORT
    )}`;
  }, [dateRange, t.logs.selectDates]);

  const clearDateRange = useCallback(() => {
    setDateRange({ from: undefined, to: undefined });
  }, []);

  // Filtered requests with memoization
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Status filter
      if (
        filter === "success" &&
        (req.statusCode < 200 || req.statusCode >= 300)
      )
        return false;
      if (filter === "error" && req.statusCode < 400) return false;

      // Date range filter
      if (dateRange.from || dateRange.to) {
        const requestDateOnly = normalizeDate(new Date(req.timestamp));

        if (dateRange.from && requestDateOnly < normalizeDate(dateRange.from))
          return false;
        if (dateRange.to && requestDateOnly > normalizeDate(dateRange.to))
          return false;
      }

      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const apiKeyName = getAPIKeyName(req.apiKeyId).toLowerCase();
        const matchFound =
          req.endpoint.toLowerCase().includes(search) ||
          req.method.toLowerCase().includes(search) ||
          req.ipAddress.toLowerCase().includes(search) ||
          req.statusCode.toString().includes(search) ||
          apiKeyName.includes(search);

        if (!matchFound) return false;
      }

      return true;
    });
  }, [requests, filter, dateRange, searchTerm, getAPIKeyName]);

  const displayedRequests = useMemo(() => {
    return filteredRequests.slice(0, visibleRows);
  }, [filteredRequests, visibleRows]);

  const handleToggleExpand = useCallback((requestId: string) => {
    setExpandedRow((prev) => (prev === requestId ? null : requestId));
  }, []);

  const loadMoreRows = useCallback(() => {
    setVisibleRows((prev) => prev + ROWS_PER_LOAD);
  }, []);

  const tableRef = useRef<HTMLTableElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Reset visible rows when filters change
  useEffect(() => {
    setVisibleRows(INITIAL_ROWS);
  }, [filter, dateRange, searchTerm]);

  // Infinite scroll for desktop table
  useEffect(() => {
    const currentRef = tableRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && visibleRows < filteredRequests.length) {
            loadMoreRows();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const lastRow = currentRef.querySelector("tbody tr:last-child");
    if (lastRow && visibleRows < filteredRequests.length) {
      observer.observe(lastRow);
    }

    return () => {
      if (lastRow) {
        observer.unobserve(lastRow);
      }
    };
  }, [displayedRequests, visibleRows, filteredRequests.length, loadMoreRows]);

  // Infinite scroll for mobile cards
  useEffect(() => {
    const currentRef = mobileContainerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && visibleRows < filteredRequests.length) {
            loadMoreRows();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const lastCard = currentRef.querySelector("div:last-child");
    if (lastCard && visibleRows < filteredRequests.length) {
      observer.observe(lastCard);
    }

    return () => {
      if (lastCard) {
        observer.unobserve(lastCard);
      }
    };
  }, [displayedRequests, visibleRows, filteredRequests.length, loadMoreRows]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-1">
          <h2 className={`text-zinc-100 tracking-[-0.3125px] ${fontClass}`}>
            {t.logs.title}
          </h2>
          <p
            className={`text-zinc-400 text-sm tracking-[-0.1504px] ${fontClass}`}
          >
            {t.logs.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-lg px-3 py-2 flex items-center gap-2.5 w-full sm:w-64 hover:border-zinc-700 transition-colors">
            <Search
              className="w-4 h-4 text-zinc-500 shrink-0"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder={t.logs.searchLogs}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 bg-transparent border-0 outline-none text-zinc-300 text-sm tracking-[-0.1504px] placeholder:text-zinc-500 ${fontClass}`}
              aria-label="Search logs"
            />
          </div>

          {/* Date Range Picker */}
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <button
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-lg px-3 py-2 flex items-center gap-2 w-full sm:w-auto hover:border-zinc-700 transition-colors cursor-pointer"
                aria-label="Select date range"
              >
                <CalendarIcon
                  className="w-4 h-4 text-zinc-500 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-zinc-300 text-sm tracking-[-0.1504px] whitespace-nowrap">
                  {formatDateRange()}
                </span>
                {(dateRange.from || dateRange.to) && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      clearDateRange();
                    }}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 cursor-pointer"
                    aria-label="Clear date range"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        clearDateRange();
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
                  <p className={`text-sm text-[#9f9fa9] ${fontClass}`}>
                    {t.logs.selectDateRange}
                  </p>
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
                    className="basis-0 bg-zinc-800 grow h-[36px] min-h-px min-w-px relative rounded-[10px] shrink-0 cursor-pointer"
                    onClick={() => {
                      clearDateRange();
                      setIsDatePickerOpen(false);
                    }}
                  >
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-full">
                      <p
                        className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[60.36px] text-[14px] text-center text-nowrap text-zinc-300 top-[8.57px] translate-x-[-50%] whitespace-pre"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {t.common.cancel}
                      </p>
                    </div>
                  </div>
                  <div
                    className="basis-0 bg-[#1b5ba5] grow h-[36px] min-h-px min-w-px relative rounded-[10px] shrink-0 cursor-pointer"
                    onClick={() => setIsDatePickerOpen(false)}
                  >
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-full">
                      <p
                        className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[60.12px] text-[14px] text-center text-nowrap text-white top-[8.57px] translate-x-[-50%] whitespace-pre"
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

          {/* Status Filter */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-lg px-3 py-2 flex items-center gap-2 w-full sm:w-[152px] hover:border-zinc-700 transition-colors px-[12px] py-[0px]">
            <Filter
              className="w-4 h-4 text-zinc-500 shrink-0"
              aria-hidden="true"
            />
            <Select
              value={filter}
              onValueChange={(value) => setFilter(value as FilterType)}
            >
              <SelectTrigger
                className={`flex-1 h-auto bg-transparent border-0 text-zinc-300 text-sm p-0 cursor-pointer ${fontClass}`}
                aria-label="Filter by status"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  className={`cursor-pointer ${fontClass}`}
                >
                  {t.logs.all}
                </SelectItem>
                <SelectItem
                  value="success"
                  className={`cursor-pointer ${fontClass}`}
                >
                  {t.logs.success}
                </SelectItem>
                <SelectItem
                  value="error"
                  className={`cursor-pointer ${fontClass}`}
                >
                  {t.logs.error}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden flex flex-col gap-3" ref={mobileContainerRef}>
        {displayedRequests.length === 0 ? (
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-xl p-8 text-center">
            <p className={`text-zinc-500 ${fontClass}`}>{t.logs.noLogs}</p>
          </div>
        ) : (
          displayedRequests.map((request) => (
            <MobileRequestCard
              key={request.id}
              request={request}
              isExpanded={expandedRow === request.id}
              onToggleExpand={() => handleToggleExpand(request.id)}
              apiKeyName={getAPIKeyName(request.apiKeyId)}
              onCopy={handleCopy}
            />
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="min-w-full w-full border-collapse" ref={tableRef}>
              <thead className="sticky top-0 z-10 bg-zinc-900">
                <tr className="border-b border-zinc-800">
                  <th className="h-12 px-6 text-left">
                    <p
                      className={`text-zinc-500 text-xs tracking-wider uppercase ${fontClass}`}
                    >
                      {t.logs.timestamp}
                    </p>
                  </th>
                  <th className="h-12 px-6 text-left">
                    <p
                      className={`text-zinc-500 text-xs tracking-wider uppercase ${fontClass}`}
                    >
                      {t.logs.apiKey}
                    </p>
                  </th>
                  <th className="h-12 px-6 text-left">
                    <p
                      className={`text-zinc-500 text-xs tracking-wider uppercase ${fontClass}`}
                    >
                      {t.logs.endpoint}
                    </p>
                  </th>
                  <th className="h-12 px-6 text-left">
                    <p
                      className={`text-zinc-500 text-xs tracking-wider uppercase ${fontClass}`}
                    >
                      {t.logs.method}
                    </p>
                  </th>
                  <th className="h-12 px-6 text-left">
                    <p
                      className={`text-zinc-500 text-xs tracking-wider uppercase ${fontClass}`}
                    >
                      {t.logs.status}
                    </p>
                  </th>
                  <th className="h-12 px-6 text-left">
                    <p
                      className={`text-zinc-500 text-xs tracking-wider uppercase ${fontClass}`}
                    >
                      {t.logs.response}
                    </p>
                  </th>
                  <th className="h-12 px-6 text-left">
                    <p
                      className={`text-zinc-500 text-xs tracking-wider uppercase ${fontClass}`}
                    >
                      {t.logs.ipAddress}
                    </p>
                  </th>
                  <th className="h-12 px-6 text-left">
                    <p
                      className={`text-zinc-500 text-xs tracking-wider uppercase ${fontClass}`}
                    >
                      {t.logs.cost}
                    </p>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-zinc-950">
                {displayedRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <p className={`text-zinc-500 ${fontClass}`}>
                        {t.logs.noLogs}
                      </p>
                    </td>
                  </tr>
                ) : (
                  displayedRequests.map((request) => (
                    <DesktopRequestRow
                      key={request.id}
                      request={request}
                      apiKeyName={getAPIKeyName(request.apiKeyId)}
                      onCopy={handleCopy}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
