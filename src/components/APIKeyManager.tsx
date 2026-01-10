import { useState, useEffect } from "react";
import {
  Ban,
  Check,
  CheckCircle,
  Copy,
  Key,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./ui/pagination";
import { toast } from "sonner";
import type { APIKey } from "../types/api";
import { useLanguage } from "./LanguageContext";
import { formatNumber } from "../utils/formatNumber";
import { apiKeyService } from "../services/apiKeyService";

export function APIKeyManager() {
  const { t, language } = useLanguage();
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allApiKeys, setAllApiKeys] = useState<APIKey[]>([]);
  const [useServerPaging, setUseServerPaging] = useState(false);
  const itemsPerPage = 10;

  // Font class based on language
  const fontClass = language === "km" ? "font-kh" : "font-en";

  // Fetch API keys from backend
  const fetchAPIKeys = async () => {
    setIsLoading(true);
    try {
      const response = useServerPaging
        ? await apiKeyService.getAPIKeys({
            page: currentPage,
            limit: itemsPerPage,
          })
        : await apiKeyService.getAPIKeys();

      console.log("API Keys response:", response);

      if (response.code === "success") {
        const mappedKeys = response.data.item.map((item) =>
          apiKeyService.mapToAPIKey(item)
        );
        if (useServerPaging) {
          setApiKeys(mappedKeys);
          setTotalPages(response.data.total_page || 1);
          setTotalRecords(response.data.total_record || mappedKeys.length);
        } else {
          setAllApiKeys(mappedKeys);
          const total = mappedKeys.length;
          setTotalRecords(total);
          setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));
          setApiKeys(mappedKeys.slice(startIndex, endIndex));
        }
      }
    } catch (error: any) {
      if (useServerPaging && error.response?.status === 400) {
        setUseServerPaging(false);
        try {
          const fallbackResponse = await apiKeyService.getAPIKeys();
          if (fallbackResponse.code === "success") {
            const mappedKeys = fallbackResponse.data.item.map((item) =>
              apiKeyService.mapToAPIKey(item)
            );
            setAllApiKeys(mappedKeys);
            const total = mappedKeys.length;
            setTotalRecords(total);
            setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));
            setApiKeys(mappedKeys.slice(startIndex, endIndex));
            return;
          }
        } catch (fallbackError: any) {
          console.error("Failed to fetch API keys fallback:", fallbackError);
        }
      }

      console.error("Failed to fetch API keys:", error);
      console.error("Error response:", error.response?.data);

      // Show more detailed error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load API keys";
      toast.error(errorMessage);

      // If it's a backend error, still show empty state rather than crashing
      setApiKeys([]);
      setTotalPages(1);
      setTotalRecords(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch API keys on mount and when page changes
  useEffect(() => {
    if (!useServerPaging && allApiKeys.length > 0) {
      setApiKeys(allApiKeys.slice(startIndex, endIndex));
      return;
    }
    fetchAPIKeys();
  }, [currentPage, useServerPaging, allApiKeys.length]);

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const copyToClipboard = async (key: string, id: string) => {
    try {
      // Try using the Clipboard API first
      await navigator.clipboard.writeText(key);
      setCopiedKey(id);
      setTimeout(() => setCopiedKey(null), 2000);
      toast.success("API key copied to clipboard!");
    } catch (err) {
      // Fallback method using a temporary textarea
      const textarea = document.createElement("textarea");
      textarea.value = key;
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 2000);
        toast.success("API key copied to clipboard!");
      } catch (execErr) {
        console.error("Failed to copy text:", execErr);
        toast.error("Failed to copy API key");
      }
      document.body.removeChild(textarea);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name");
      return;
    }

    try {
      const requestId = apiKeyService.generateRequestId();
      const response = await apiKeyService.createAPIKey(newKeyName, requestId);

      if (response.code === "success") {
        toast.success("API key created successfully!");
        setNewKeyName("");
        setIsDialogOpen(false);
        // Refresh the list
        fetchAPIKeys();
      }
    } catch (error: any) {
      console.error("Failed to create API key:", error);
      toast.error(error.response?.data?.message || "Failed to create API key");
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const response = await apiKeyService.deleteAPIKey(id);

      if (response.code === "success") {
        toast.success("API key deleted successfully!");
        // Refresh the list
        fetchAPIKeys();
      }
    } catch (error: any) {
      console.error("Failed to delete API key:", error);
      toast.error(error.response?.data?.message || "Failed to delete API key");
    }
  };

  const handleToggleStatus = async (
    id: string,
    currentStatus: APIKey["status"]
  ) => {
    try {
      if (currentStatus === "expired") {
        return;
      }
      let response;
      if (currentStatus === "active") {
        response = await apiKeyService.disableAPIKey(id);
      } else {
        response = await apiKeyService.enableAPIKey(id);
      }

      if (response.code === "success") {
        toast.success(
          `API key ${
            currentStatus === "active" ? "disabled" : "enabled"
          } successfully!`
        );
        // Refresh the list
        fetchAPIKeys();
      }
    } catch (error: any) {
      console.error("Failed to toggle API key status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update API key status"
      );
    }
  };

  const getStatusColor = (status: APIKey["status"]) => {
    const colors = {
      active:
        "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-900/50",
      suspended:
        "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-900/50",
      expired:
        "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50",
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className={`text-zinc-900 dark:text-zinc-100 mb-1 ${fontClass}`}>
            {t.apiKeys.title}
          </h2>
          <p
            className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
          >
            {t.apiKeys.manageBalances}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAPIKeys}
            disabled={isLoading}
            className="cursor-pointer"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className={`w-full sm:w-auto ${fontClass} cursor-pointer`}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.apiKeys.createAPIKey}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={fontClass}>
                  {t.apiKeys.dialogTitle}
                </DialogTitle>
                <DialogDescription className={fontClass}>
                  {t.apiKeys.dialogDescription}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName" className={fontClass}>
                    {t.apiKeys.keyName}
                  </Label>
                  <Input
                    id="keyName"
                    placeholder={t.apiKeys.keyNamePlaceholder}
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className={fontClass}
                  />
                </div>
                <Button
                  onClick={handleCreateKey}
                  className={`w-full cursor-pointer ${fontClass}`}
                >
                  {t.apiKeys.createButton}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      ) : apiKeys.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Key className="w-12 h-12 text-zinc-400 mb-4" />
          <h3
            className={`text-zinc-900 dark:text-zinc-100 text-lg mb-2 ${fontClass}`}
          >
            No API Keys
          </h3>
          <p className={`text-zinc-600 dark:text-zinc-400 ${fontClass}`}>
            Create your first API key to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card
              key={apiKey.id}
              className="p-6 bg-white dark:bg-card border-zinc-200 dark:border-zinc-800"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="w-4 h-4 text-zinc-500 dark:text-zinc-500" />
                      <h3 className="font-en text-zinc-900 dark:text-zinc-100">
                        {apiKey.name}
                      </h3>
                      <Badge className={getStatusColor(apiKey.status)}>
                        <span className={fontClass}>
                          {t.apiKeys[apiKey.status as keyof typeof t.apiKeys]}
                        </span>
                      </Badge>
                    </div>
                    <p className="font-en text-sm text-zinc-600 dark:text-zinc-400">
                      {apiKey.userEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {(apiKey.status === "active" ||
                      apiKey.status === "suspended") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleToggleStatus(apiKey.id, apiKey.status)
                        }
                        className="cursor-pointer"
                        title={
                          apiKey.status === "active"
                            ? t.apiKeys.disable
                            : t.apiKeys.enable
                        }
                        aria-label={
                          apiKey.status === "active"
                            ? t.apiKeys.disable
                            : t.apiKeys.enable
                        }
                      >
                        {apiKey.status === "active" ? (
                          <Ban className="w-4 h-4 text-red-400" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </Button>
                    )}
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle
                          className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}
                        >
                          {language === "en" ? "Delete API Key" : "លុបសោ API"}
                        </AlertDialogTitle>
                        <AlertDialogDescription
                          className={`text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                        >
                          {language === "en"
                            ? "Are you sure you want to delete this API key? This action cannot be undone and the key will be permanently removed."
                            : "តើអ្នកប្រាកដថាចង់លុបសោ API នេះទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ ហើយសោនឹងត្រូវលុបចេញជាស្ថាពរ។"}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          className={`bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ${fontClass}`}
                        >
                          {language === "en" ? "Cancel" : "បោះបង់"}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteKey(apiKey.id)}
                          className={`bg-red-600 hover:bg-red-700 text-white cursor-pointer ${fontClass}`}
                        >
                          {language === "en" ? "Delete" : "លុប"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                  <code className="flex-1 text-sm text-zinc-700 dark:text-zinc-300 truncate">
                    {apiKey.key}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                    className="cursor-pointer"
                  >
                    {copiedKey === apiKey.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 sm:gap-6 text-sm">
                  <div className="space-y-1">
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                      {t.apiKeys.totalRequests}
                    </p>
                    <p className="text-zinc-900 dark:text-zinc-100 wrap-break-word font-en">
                      {formatNumber(apiKey.requestCount, { locale: "en" })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                      {t.apiKeys.created}
                    </p>
                    <p className="text-zinc-900 dark:text-zinc-100 wrap-break-word font-en">
                      {new Date(apiKey.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                      {t.apiKeys.lastUsed}
                    </p>
                    <p className="text-zinc-900 dark:text-zinc-100 wrap-break-word font-en">
                      {apiKey.lastUsed
                        ? new Date(apiKey.lastUsed).toLocaleDateString()
                        : t.apiKeys.never}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalRecords > 0 && totalPages > 1 && (
        <div className="box-border flex items-center justify-between pb-[0px] pt-[10px] px-0 relative border-t border-zinc-800 dark:border-zinc-800 pr-[0px] pl-[0px]">
          <p className="leading-[20px] relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap tracking-[-0.1504px]">
            <span className="sm:inline hidden">
              <span className={fontClass}>{t.apiKeys.showingPagination}</span>{" "}
              <span className="font-en">{startIndex + 1}</span>{" "}
              <span className={fontClass}>{t.apiKeys.toPagination}</span>{" "}
              <span className="font-en">
                {Math.min(endIndex, totalRecords)}
              </span>{" "}
              <span className={fontClass}>{t.apiKeys.ofPagination}</span>{" "}
              <span className="font-en">{totalRecords}</span>{" "}
              <span className={fontClass}>{t.apiKeys.apiKeysText}</span>
            </span>
            <span className="sm:hidden inline font-en">
              {startIndex + 1} to {Math.min(endIndex, totalRecords)} of{" "}
              {totalRecords}
            </span>
          </p>
          <Pagination className="mx-0 justify-end">
            <PaginationContent className="gap-[4px]">
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
              {[...Array(totalPages)].map((_, i) => {
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
                            ? "bg-[#1B5BA5]! text-white border-0! hover:bg-[#1B5BA5]! hover:text-white"
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
                    <PaginationItem key={page}>
                      <PaginationEllipsis className="text-zinc-400" />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
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
    </div>
  );
}
