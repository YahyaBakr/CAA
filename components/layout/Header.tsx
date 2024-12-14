import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Globe, 
  LogIn,
  LogOut, 
  MessageSquare, 
  Plus, 
  LayoutDashboard,
  Heart,
  Bell,
  User,
  Wrench,
  ShieldCheck,
  ListChecks,
  Crown
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { NotificationsMenu } from './NotificationsMenu';
import { FavoritesMenu } from './FavoritesMenu';
import { LanguageSelector } from './LanguageSelector';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, isDealer, user } = useAuthStore();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [showTools, setShowTools] = React.useState(false);
  const [showAdminTools, setShowAdminTools] = React.useState(false);

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (!(event.target as Element).closest('.tools-menu')) {
      setShowTools(false);
    }
    if (!(event.target as Element).closest('.admin-tools-menu')) {
      setShowAdminTools(false);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                CarMarket
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <div className="relative admin-tools-menu">
                    <button
                      onClick={() => setShowAdminTools(!showAdminTools)}
                      className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 flex items-center"
                    >
                      <ShieldCheck className="h-5 w-5 mr-1" />
                      <span className="text-sm">Admin</span>
                    </button>

                    {showAdminTools && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1" role="menu">
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            {t('admin.dashboard')}
                          </Link>
                          <Link
                            to="/admin/listings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <ListChecks className="h-4 w-4 mr-2" />
                            {t('admin.listings')}
                          </Link>
                          <Link
                            to="/admin/featured"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <Crown className="h-4 w-4 mr-2" />
                            {t('admin.featured')}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {isDealer() && (
                  <div className="relative tools-menu">
                    <button
                      onClick={() => setShowTools(!showTools)}
                      className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 flex items-center"
                    >
                      <Wrench className="h-5 w-5 mr-1" />
                      <span className="text-sm">Tools</span>
                    </button>

                    {showTools && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1" role="menu">
                          <Link
                            to="/dealer/dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            {t('dealer.dashboard')}
                          </Link>
                          <Link
                            to="/listings/new"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            {t('cars.addListing')}
                          </Link>
                          <Link
                            to="/dealer/bulk-listing"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            {t('dealer.bulkListing')}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  {showFavorites && (
                    <FavoritesMenu onClose={() => setShowFavorites(false)} />
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Bell className="h-5 w-5" />
                  </button>
                  {showNotifications && (
                    <NotificationsMenu onClose={() => setShowNotifications(false)} />
                  )}
                </div>

                <Link
                  to="/messages"
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <MessageSquare className="h-5 w-5" />
                </Link>

                <Link
                  to="/profile"
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Link>

                <button
                  onClick={logout}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <LogIn className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};