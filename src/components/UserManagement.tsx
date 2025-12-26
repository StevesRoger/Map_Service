import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";
import type { User, APIKey } from "../types/api";
import { formatNumber } from "../utils/formatNumber";
import { formatCurrency } from "../utils/formatNumber";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Mail,
  Calendar,
  DollarSign,
  Key,
  Ban,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Download,
  Menu,
  Phone,
  MoreVertical,
  Users,
  BarChart3,
  Eye,
} from "lucide-react";

interface UserManagementProps {
  users: User[];
  apiKeys: APIKey[];
  onSuspendUser: (userId: string) => void;
  onActivateUser: (userId: string) => void;
  onAdjustBalance: (userId: string, amount: number) => void;
}

export function UserManagement({
  users,
  apiKeys,
  onSuspendUser,
  onActivateUser,
  onAdjustBalance,
}: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const getStatusBadgeClasses = (status: User["status"]) => {
    if (status === "active") {
      return "bg-[rgba(3,46,21,0.5)] border-[rgba(13,84,43,0.5)] text-[#05df72]";
    }
    // suspended
    return "bg-[rgba(82,12,14,0.5)] border-[rgba(130,24,26,0.5)] text-[#ff6467]";
  };

  const getBalanceColor = (balance: number) => {
    if (balance === 0) return "text-[#ff6467]";
    if (balance < 50) return "text-orange-400";
    if (balance < 200) return "text-yellow-400";
    return "text-[#05df72]";
  };

  const getStatusText = (status: User["status"]) => {
    switch (status) {
      case "active":
        return t.common.active;
      case "suspended":
        return t.common.suspended;
      case "inactive":
        return t.common.inactive;
      default:
        return status;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const getUserKeys = (userId: string) => {
    return apiKeys.filter((key) => key.userId === userId);
  };

  const handleSuspendUser = (userId: string) => {
    onSuspendUser(userId);
    toast.success("User suspended successfully");
    setIsUserDialogOpen(false);
  };

  const handleActivateUser = (userId: string) => {
    onActivateUser(userId);
    toast.success("User activated successfully");
    setIsUserDialogOpen(false);
  };

  const handleAdjustBalance = () => {
    if (!selectedUser) return;
    const amount = parseFloat(balanceAmount);
    if (isNaN(amount) || amount === 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Check if the absolute adjustment amount exceeds the current balance
    const absAmount = Math.abs(amount);
    if (absAmount > selectedUser.totalBalance) {
      toast.error(
        `Cannot adjust by $${absAmount.toFixed(
          2
        )}. Current balance is only $${selectedUser.totalBalance.toFixed(2)}`
      );
      return;
    }

    // For negative adjustments, also check if it would result in negative balance
    if (amount < 0) {
      const newBalance = selectedUser.totalBalance + amount;
      if (newBalance < 0) {
        toast.error(
          `Cannot decrease balance by $${absAmount.toFixed(
            2
          )}. Current balance is only $${selectedUser.totalBalance.toFixed(2)}`
        );
        return;
      }
    }

    onAdjustBalance(selectedUser.id, amount);
    toast.success(
      `Balance adjusted by ${amount > 0 ? "+" : ""}$${amount.toFixed(2)}`
    );
    setIsBalanceDialogOpen(false);
    setBalanceAmount("");
  };

  const handleExportUsers = () => {
    const csv = [
      [
        "Email",
        "Name",
        "Company",
        "Status",
        "Balance",
        "Spent",
        "Requests",
        "Keys",
        "Created",
      ].join(","),
      ...filteredUsers.map((user) =>
        [
          user.email,
          user.name,
          user.company || "",
          user.status,
          user.totalBalance.toFixed(2),
          user.totalSpent.toFixed(2),
          user.totalRequests,
          user.apiKeysCount,
          new Date(user.createdAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Users exported successfully");
  };

  // Calculate totals
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const totalBalance = users.reduce((sum, u) => sum + u.totalBalance, 0);
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);

  const { t, language } = useLanguage();

  // Font class based on language
  const fontClass = language === "km" ? "font-kh" : "font-en";

  return (
    <div className="flex flex-col gap-3 sm:gap-5">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-3">
        <div>
          <h2
            className={`text-zinc-100 text-base tracking-[-0.3125px] ${fontClass}`}
          >
            {t.users.title}
          </h2>
          <p
            className={`text-[#9f9fa9] text-sm tracking-[-0.1504px] mt-1 hidden sm:block ${fontClass}`}
          >
            {t.users.monitorSubtitle}
          </p>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {/* Search Input */}
          <div className="relative">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 w-[240px] xl:w-[321px] py-[10px]">
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-zinc-500" />
                <Input
                  type="text"
                  placeholder={language === "km" ? "ស្វែងរក" : "Search"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="font-en bg-transparent border-0 p-0 h-auto text-sm text-zinc-400 placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 w-[140px] xl:w-[188px] px-[12px] py-[0px]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-zinc-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-0 p-0 h-auto text-sm text-zinc-200 focus:ring-0 focus:ring-offset-0 cursor-pointer">
                  <SelectValue placeholder={t.users.all} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.users.all}</SelectItem>
                  <SelectItem value="active">{t.users.active}</SelectItem>
                  <SelectItem value="suspended">{t.users.suspended}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleExportUsers}
            variant="ghost"
            title={t.users.exportUsers}
            className="gap-2 px-3 py-2 text-zinc-200 hover:bg-transparent h-auto cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span className="xl:hidden">{t.users.export}</span>
            <span className="hidden xl:inline">{t.users.exportUsers}</span>
          </Button>
        </div>

        {/* Mobile/Tablet Filter Toggle */}
        <Button
          variant="outline"
          className={`lg:hidden w-auto border-zinc-800 px-[0px] py-[8px] cursor-pointer ${fontClass}`}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Menu className="w-4 h-4 mr-2" />
          {t.users.filtersAndSearch}
        </Button>
      </div>

      {/* Mobile/Tablet Filters Panel */}
      {showMobileFilters && (
        <div className="lg:hidden flex flex-col gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
          {/* Search Input */}
          <div className="relative">
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-[10px]">
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-0 p-0 h-auto text-sm text-zinc-400 placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Filter Dropdown */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 px-[12px] py-[0px]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-zinc-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-0 p-0 h-auto text-sm text-zinc-200 focus:ring-0 focus:ring-offset-0 cursor-pointer">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Export Button */}
            <Button
              onClick={handleExportUsers}
              variant="outline"
              className="gap-2 border-zinc-700 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Users */}
        <Card className="p-3 sm:p-[17px] bg-zinc-900 border-[rgba(255,255,255,0.1)] rounded-[14px]">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p
                className={`text-[#9f9fa9] text-xs sm:text-sm tracking-[-0.1504px] ${fontClass}`}
              >
                {t.users.totalUsers}
              </p>
              <p className="text-zinc-100 text-xl sm:text-2xl tracking-[0.0703px]">
                {totalUsers}
              </p>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#1B5BA5]" />
          </div>
        </Card>

        {/* Active Users */}
        <Card className="p-3 sm:p-[17px] bg-zinc-900 border-[rgba(255,255,255,0.1)] rounded-[14px]">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p
                className={`text-[#9f9fa9] text-xs sm:text-sm tracking-[-0.1504px] ${fontClass}`}
              >
                {t.users.activeUsers}
              </p>
              <p className="text-zinc-100 text-xl sm:text-2xl tracking-[0.0703px]">
                {activeUsers}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#05df72]" />
          </div>
        </Card>

        {/* Total Balance */}
        <Card className="p-3 sm:p-[17px] bg-zinc-900 border-[rgba(255,255,255,0.1)] rounded-[14px]">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p
                className={`text-[#9f9fa9] text-xs sm:text-sm tracking-[-0.1504px] ${fontClass}`}
              >
                {t.users.totalBalance}
              </p>
              <p className="text-zinc-100 text-xl sm:text-2xl tracking-[0.0703px] font-en">
                {formatCurrency(totalBalance, {
                  locale: "en",
                  decimals: 2,
                })}
              </p>
            </div>
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-[#05df72]" />
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="p-3 sm:p-[17px] bg-zinc-900 border-[rgba(255,255,255,0.1)] rounded-[14px]">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p
                className={`text-[#9f9fa9] text-xs sm:text-sm tracking-[-0.1504px] ${fontClass}`}
              >
                {t.users.totalRevenue}
              </p>
              <p className="text-zinc-100 text-xl sm:text-2xl tracking-[0.0703px] font-en">
                {formatCurrency(totalRevenue, {
                  locale: "en",
                  decimals: 2,
                })}
              </p>
            </div>
            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-[#c27aff]" />
          </div>
        </Card>
      </div>

      {/* User List Results Heading */}
      <div className="flex items-center gap-3">
        <p
          className={`text-zinc-100 text-sm sm:text-base tracking-[-0.3125px] ${fontClass}`}
        >
          {t.users.userListResults}
        </p>
        <div className="flex-1 h-px bg-[#9f9fa9] opacity-60" />
      </div>

      {/* Users List */}
      <div className="space-y-3 sm:space-y-4">
        {paginatedUsers.length === 0 ? (
          <Card className="p-8 sm:p-12 bg-zinc-900 border-[rgba(255,255,255,0.1)] rounded-[14px]">
            <div className="text-center">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-600 mx-auto mb-3 sm:mb-4" />
              <p className="text-zinc-400 text-sm sm:text-base">
                No users found
              </p>
            </div>
          </Card>
        ) : (
          paginatedUsers.map((user) => {
            const userKeys = getUserKeys(user.id);
            return (
              <Card
                key={user.id}
                className="p-4 sm:p-[21px] bg-zinc-900 border-[rgba(255,255,255,0.1)] rounded-[14px]"
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* User Header */}
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-en text-zinc-100 text-sm tracking-[-0.3125px] truncate">
                          {user.name}
                        </h3>
                        <Badge
                          className={`rounded-lg border px-[9px] py-[3px] text-xs font-medium flex-shrink-0 ${getStatusBadgeClasses(
                            user.status
                          )}`}
                        >
                          {getStatusText(user.status)}
                        </Badge>
                      </div>
                      <div className="flex flex-row items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1 min-w-0">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#9f9fa9] flex-shrink-0" />
                          <span className="font-en text-[#9f9fa9] text-xs sm:text-sm tracking-[-0.1504px] truncate">
                            {user.email}
                          </span>
                        </div>
                        {user.phoneNumber && (
                          <div className="flex items-center gap-1 hidden sm:flex">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#9f9fa9] flex-shrink-0" />
                            <span className="text-[#9f9fa9] text-xs sm:text-sm tracking-[-0.1504px]">
                              {user.phoneNumber}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsUserDialogOpen(true);
                        }}
                        className={`gap-2 px-3 py-2 h-8 text-zinc-200 hover:bg-transparent text-xs sm:text-sm flex-1 sm:flex-none cursor-pointer ${fontClass}`}
                      >
                        <Eye className="w-4 h-4" />
                        {t.users.viewDetails}
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-zinc-200 hover:bg-zinc-800 cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-zinc-900 border-zinc-800"
                        >
                          {user.status === "suspended" ? (
                            <DropdownMenuItem
                              onClick={() => handleActivateUser(user.id)}
                              className="text-green-400 focus:text-green-300 focus:bg-zinc-800 cursor-pointer"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {t.users.activateUser}
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleSuspendUser(user.id)}
                              className="text-red-400 focus:text-red-300 focus:bg-zinc-800 cursor-pointer"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              {t.users.suspendUser}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setIsBalanceDialogOpen(true);
                            }}
                            className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-800 cursor-pointer"
                          >
                            <DollarSign className="w-4 h-4 mr-2" />
                            {t.users.adjustBalance}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* User Stats Grid - Responsive */}
                  <div className="grid grid-cols-4 gap-3 sm:gap-4">
                    <div className="space-y-0.5 sm:space-y-1">
                      <p
                        className={`text-[#9f9fa9] text-xs sm:text-base tracking-[-0.3125px] ${fontClass}`}
                      >
                        {t.users.balance}
                      </p>
                      <p
                        className={`text-sm sm:text-base tracking-[-0.3125px] font-en ${getBalanceColor(
                          user.totalBalance
                        )}`}
                      >
                        {formatCurrency(user.totalBalance, {
                          locale: "en",
                          decimals: 2,
                        })}
                      </p>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <p
                        className={`text-[#9f9fa9] text-xs sm:text-base tracking-[-0.3125px] ${fontClass}`}
                      >
                        {t.users.totalSpent}
                      </p>
                      <p className="text-zinc-100 text-sm sm:text-base tracking-[-0.3125px] font-en">
                        {formatCurrency(user.totalSpent, {
                          locale: "en",
                          decimals: 2,
                        })}
                      </p>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <p
                        className={`text-[#9f9fa9] text-xs sm:text-base tracking-[-0.3125px] ${fontClass}`}
                      >
                        {t.users.requests}
                      </p>
                      <p className="text-zinc-100 text-sm sm:text-base tracking-[-0.3125px]">
                        {formatNumber(user.totalRequests, {
                          locale: "en",
                        })}
                      </p>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <p
                        className={`text-[#9f9fa9] text-xs sm:text-base tracking-[-0.3125px] ${fontClass}`}
                      >
                        {t.users.apiKeys}
                      </p>
                      <p className="text-zinc-100 text-sm sm:text-base tracking-[-0.3125px]">
                        {user.apiKeysCount}
                      </p>
                    </div>
                    <div className="hidden">
                      <p
                        className={`text-[#9f9fa9] text-xs sm:text-base tracking-[-0.3125px] ${fontClass}`}
                      >
                        {t.users.registered}
                      </p>
                      <p className="text-zinc-100 text-sm sm:text-base tracking-[-0.3125px]">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && totalPages > 1 && (
        <div className="box-border flex items-center justify-between pb-[0px] pt-[10px] px-0 relative border-t border-zinc-800 pr-[0px] pl-[0px]">
          <p className="leading-[20px] relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap tracking-[-0.1504px]">
            {t.users.showingUsers} {startIndex + 1} {t.users.to}{" "}
            {Math.min(endIndex, filteredUsers.length)} {t.users.of}{" "}
            {filteredUsers.length} {t.users.usersText}
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

      {/* Balance Adjustment Dialog - Single instance outside the map */}
      <Dialog open={isBalanceDialogOpen} onOpenChange={setIsBalanceDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-zinc-100 text-base sm:text-lg">
              {t.users.adjustUserBalance}
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs sm:text-sm">
              {t.users.enterAmount}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label className="text-zinc-400 text-xs sm:text-sm">
                {t.users.amountUSD}
              </Label>
              <Input
                type="number"
                placeholder="50.00"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 mt-1.5"
              />
            </div>
            {selectedUser && (
              <p className="text-xs sm:text-sm text-zinc-500">
                {t.users.currentBalance} ${selectedUser.totalBalance.toFixed(2)}
              </p>
            )}
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsBalanceDialogOpen(false)}
              className="w-full sm:w-auto cursor-pointer"
              size="sm"
            >
              {t.common.cancel}
            </Button>
            <Button
              onClick={handleAdjustBalance}
              className="w-full sm:w-auto cursor-pointer"
              size="sm"
            >
              {t.users.apply}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog - Single instance outside the map */}
      {selectedUser && (
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-zinc-100 text-base sm:text-lg">
                {t.users.userDetails} - {selectedUser.name}
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-xs sm:text-sm">
                {t.users.completeInformation}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
                <TabsTrigger
                  value="overview"
                  className="text-xs sm:text-sm cursor-pointer"
                >
                  {t.users.overview}
                </TabsTrigger>
                <TabsTrigger
                  value="api-keys"
                  className="text-xs sm:text-sm cursor-pointer"
                >
                  {t.users.apiKeysTab}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-zinc-400 text-xs sm:text-sm">
                      {t.users.email}
                    </Label>
                    <p className="text-zinc-100 text-sm sm:text-base break-all">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-zinc-400 text-xs sm:text-sm">
                      {t.users.status}
                    </Label>
                    <Badge
                      className={getStatusBadgeClasses(selectedUser.status)}
                    >
                      {getStatusText(selectedUser.status)}
                    </Badge>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-zinc-400 text-xs sm:text-sm">
                      {t.users.phone}
                    </Label>
                    <p className="text-zinc-100 text-sm sm:text-base">
                      {selectedUser.phoneNumber || t.users.notAvailable}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-zinc-400 text-xs sm:text-sm">
                      {t.users.memberSince}
                    </Label>
                    <p className="text-zinc-100 text-sm sm:text-base">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-zinc-800">
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-zinc-400 text-xs">
                      {t.users.totalBalance}
                    </Label>
                    <p
                      className={`text-base sm:text-lg font-en ${getBalanceColor(
                        selectedUser.totalBalance
                      )}`}
                    >
                      {formatCurrency(selectedUser.totalBalance, {
                        locale: "en",
                        decimals: 2,
                      })}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-zinc-400 text-xs">
                      {t.users.totalSpent}
                    </Label>
                    <p className="text-base sm:text-lg text-zinc-100 font-en">
                      {formatCurrency(selectedUser.totalSpent, {
                        locale: "en",
                        decimals: 2,
                      })}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-zinc-400 text-xs">
                      {t.users.totalRequests}
                    </Label>
                    <p className="text-base sm:text-lg text-zinc-100 font-en">
                      {formatNumber(selectedUser.totalRequests, {
                        locale: "en",
                      })}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-zinc-400 text-xs">
                      {t.users.apiKeys}
                    </Label>
                    <p className="text-base sm:text-lg text-zinc-100 font-en">
                      {selectedUser.apiKeysCount}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="api-keys" className="space-y-3 sm:space-y-4">
                {getUserKeys(selectedUser.id).length === 0 ? (
                  <p className="text-center text-zinc-400 py-6 sm:py-8 text-sm sm:text-base">
                    {t.users.noApiKeys}
                  </p>
                ) : (
                  getUserKeys(selectedUser.id).map((key) => (
                    <Card
                      key={key.id}
                      className="p-3 sm:p-4 bg-zinc-800 border-zinc-700"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-zinc-100 text-sm sm:text-base truncate">
                            {key.name}
                          </h4>
                          <Badge
                            className={`flex-shrink-0 ${getStatusBadgeClasses(
                              key.status as any
                            )}`}
                          >
                            {getStatusText(key.status as any)}
                          </Badge>
                        </div>
                        <code className="text-xs text-zinc-300 block bg-zinc-900 p-2 rounded break-all">
                          {key.key}
                        </code>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                          <div>
                            <p className="text-zinc-400">{t.users.requests}</p>
                            <p className="text-zinc-100">
                              {formatNumber(key.requestCount, {
                                locale: "en",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-zinc-400">{t.users.status}</p>
                            <p className="text-zinc-100">
                              {getStatusText(key.status as any)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
