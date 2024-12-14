import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useNotificationsStore, Notification } from '../../store/useNotificationsStore';

interface NotificationsMenuProps {
  onClose: () => void;
}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotificationsStore();
  
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.data?.conversationId) {
      navigate(`/messages?conversation=${notification.data.conversationId}`);
    }
    onClose();
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.notifications-menu')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="notifications-menu absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">{t('notifications.title')}</h3>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {t('notifications.empty')}
          </div>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full p-4 hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3 flex-1 text-left">
                  <p className="text-sm text-gray-900">{notification.content}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};