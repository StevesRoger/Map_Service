import { Bell, Clock, AlertTriangle, CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { DropdownMenuContent } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';
import type { Notification } from '../types/notification';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onActionClick?: (notification: Notification) => void;
}

export function NotificationPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onActionClick
}: NotificationPanelProps) {
  const { t, language } = useLanguage();
  const fontClass = language === 'km' ? 'font-kh' : 'font-en';

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'error':
        return (
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          </div>
        );
      case 'success':
        return (
          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Info className="w-4 h-4 text-blue-500" />
          </div>
        );
    }
  };

  return (
    <DropdownMenuContent align="end" className="w-80 sm:w-96 bg-zinc-900 border-zinc-800 p-0">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-white ${fontClass}`}>{t.notifications.title}</h3>
            {notifications.filter(n => !n.read).length > 0 && (
              <p className="text-xs text-zinc-400 font-en mt-0.5">
                {notifications.filter(n => !n.read).length} unread
              </p>
            )}
          </div>
          {notifications.filter(n => !n.read).length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAllAsRead();
              }}
              className={`text-xs text-blue-400 hover:text-blue-300 transition-colors ${fontClass}`}
            >
              {t.notifications.markAllRead}
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[32rem] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-12 text-center text-zinc-500">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className={`text-sm ${fontClass}`}>{t.notifications.noNotifications}</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition-colors ${
                !notification.read ? 'bg-zinc-800/30' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(notification.id);
              }}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`text-sm ${!notification.read ? 'text-white font-medium' : 'text-zinc-300'} ${fontClass}`}>
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5"></div>
                    )}
                  </div>
                  <p className={`text-xs text-zinc-400 mb-2 ${fontClass}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <Clock className="w-3 h-3" />
                      <span className="font-en">{notification.time}</span>
                    </div>
                    {notification.actionLabel && onActionClick && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onActionClick(notification);
                        }}
                      >
                        {notification.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-2 border-t border-zinc-800 sticky bottom-0 bg-zinc-900">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClearAll();
            }}
            className={`w-full text-center text-sm text-zinc-400 hover:text-zinc-300 py-1 transition-colors ${fontClass}`}
          >
            {t.notifications.clearAll}
          </button>
        </div>
      )}
    </DropdownMenuContent>
  );
}
