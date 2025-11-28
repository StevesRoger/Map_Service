import { useState } from 'react';
import { Key, Copy, Trash2, Check, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from './ui/pagination';
import { toast } from 'sonner';
import type { APIKey } from '../types/api';
import { useLanguage } from './LanguageContext';
import { formatNumber } from '../utils/formatNumber';

interface APIKeyManagerProps {
  apiKeys: APIKey[];
  onCreateKey: (data: { name: string }) => void;
  onDeleteKey: (id: string) => void;
  onToggleStatus: (id: string, status: APIKey['status']) => void;
}

export function APIKeyManager({ apiKeys, onCreateKey, onDeleteKey, onToggleStatus }: APIKeyManagerProps) {
  const { t, language } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Font class based on language
  const fontClass = language === 'km' ? 'font-kh' : 'font-en';

  // Pagination calculations
  const totalPages = Math.ceil(apiKeys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedKeys = apiKeys.slice(startIndex, endIndex);

  const copyToClipboard = async (key: string, id: string) => {
    try {
      // Try using the Clipboard API first
      await navigator.clipboard.writeText(key);
      setCopiedKey(id);
      setTimeout(() => setCopiedKey(null), 2000);
      toast.success('API key copied to clipboard!');
    } catch (err) {
      // Fallback method using a temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = key;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 2000);
        toast.success('API key copied to clipboard!');
      } catch (execErr) {
        console.error('Failed to copy text:', execErr);
        toast.error('Failed to copy API key');
      }
      document.body.removeChild(textarea);
    }
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    onCreateKey({ name: newKeyName });
    setNewKeyName('');
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: APIKey['status']) => {
    const colors = {
      active: 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-900/50',
      suspended: 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-900/50',
      expired: 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50'
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className={`text-zinc-900 dark:text-zinc-100 mb-1 ${fontClass}`}>{t.apiKeys.title}</h2>
          <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}>{t.apiKeys.manageBalances}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className={`w-full sm:w-auto ${fontClass}`}>
              <Plus className="w-4 h-4 mr-2" />
              {t.apiKeys.createAPIKey}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={fontClass}>{t.apiKeys.dialogTitle}</DialogTitle>
              <DialogDescription className={fontClass}>
                {t.apiKeys.dialogDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="keyName" className={fontClass}>{t.apiKeys.keyName}</Label>
                <Input
                  id="keyName"
                  placeholder={t.apiKeys.keyNamePlaceholder}
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className={fontClass}
                />
              </div>
              <Button onClick={handleCreateKey} className={`w-full ${fontClass}`}>
                {t.apiKeys.createButton}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {paginatedKeys.map((apiKey) => (
          <Card key={apiKey.id} className="p-6 bg-white dark:bg-card border-zinc-200 dark:border-zinc-800">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-4 h-4 text-zinc-500 dark:text-zinc-500" />
                    <h3 className="font-en text-zinc-900 dark:text-zinc-100">{apiKey.name}</h3>
                    <Badge className={getStatusColor(apiKey.status)}>
                      <span className={fontClass}>{t.apiKeys[apiKey.status as keyof typeof t.apiKeys]}</span>
                    </Badge>
                  </div>
                  <p className="font-en text-sm text-zinc-600 dark:text-zinc-400">{apiKey.userEmail}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                        {language === 'en' ? 'Delete API Key' : 'លុបសោ API'}
                      </AlertDialogTitle>
                      <AlertDialogDescription className={`text-zinc-600 dark:text-zinc-400 ${fontClass}`}>
                        {language === 'en' 
                          ? 'Are you sure you want to delete this API key? This action cannot be undone and the key will be permanently removed.'
                          : 'តើអ្នកប្រាកដថាចង់លុបសោ API នេះទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ ហើយសោនឹងត្រូវលុបចេញជាស្ថាពរ។'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className={`bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${fontClass}`}>
                        {language === 'en' ? 'Cancel' : 'បោះបង់'}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeleteKey(apiKey.id)}
                        className={`bg-red-600 hover:bg-red-700 text-white ${fontClass}`}
                      >
                        {language === 'en' ? 'Delete' : 'លុប'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <code className="flex-1 text-sm text-zinc-700 dark:text-zinc-300 truncate">
                  {apiKey.key}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
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
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">{t.apiKeys.totalRequests}</p>
                  <p className="text-zinc-900 dark:text-zinc-100 break-words font-en">{formatNumber(apiKey.requestCount, { locale: 'en' })}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">{t.apiKeys.thisMonthCost}</p>
                  <p className="text-zinc-900 dark:text-zinc-100 break-words font-en">${apiKey.currentMonthCost.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">{t.apiKeys.allTimeSpent}</p>
                  <p className="text-zinc-900 dark:text-zinc-100 break-words font-en">${apiKey.totalCost.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">{t.apiKeys.created}</p>
                  <p className="text-zinc-900 dark:text-zinc-100 break-words font-en">{new Date(apiKey.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">{t.apiKeys.lastUsed}</p>
                  <p className="text-zinc-900 dark:text-zinc-100 break-words font-en">
                    {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : t.apiKeys.never}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {apiKeys.length > 0 && totalPages > 1 && (
        <div className="box-border flex items-center justify-between pb-[0px] pt-[10px] px-0 relative border-t border-zinc-800 dark:border-zinc-800 pr-[0px] pl-[0px]">
          <p className="leading-[20px] relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap tracking-[-0.1504px]">
            <span className="sm:inline hidden"><span className={fontClass}>{t.apiKeys.showingPagination}</span> <span className="font-en">{startIndex + 1}</span> <span className={fontClass}>{t.apiKeys.toPagination}</span> <span className="font-en">{Math.min(endIndex, apiKeys.length)}</span> <span className={fontClass}>{t.apiKeys.ofPagination}</span> <span className="font-en">{apiKeys.length}</span> <span className={fontClass}>{t.apiKeys.apiKeysText}</span></span>
            <span className="sm:hidden inline font-en">{startIndex + 1} to {Math.min(endIndex, apiKeys.length)} of {apiKeys.length}</span>
          </p>
          <Pagination className="mx-0 justify-end">
            <PaginationContent className="gap-[4px]">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                  className={`text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100 ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`} 
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(page)} 
                        isActive={currentPage === page} 
                        className={`cursor-pointer ${currentPage === page ? '!bg-[#1B5BA5] text-white !border-0 hover:!bg-[#1B5BA5] hover:text-white' : 'text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100'}`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
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
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                  className={`text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}