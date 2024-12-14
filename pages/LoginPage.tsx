import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuthStore } from '../store/useAuthStore';
import { UserProfile } from '../types/user';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError('');

    try {
      // Mock login logic
      let mockUser: UserProfile;
      
      if (data.email === 'admin@admin.com' && data.password === 'admin123') {
        mockUser = {
          id: '1',
          email: data.email,
          name: 'Admin User',
          role: 'admin',
        };
      } else if (data.email === 'adm@adm.com' && data.password === 'adm') {
        mockUser = {
          id: '2',
          email: data.email,
          name: 'Admin Dealer',
          role: 'dealer',
          companyName: 'Admin Motors',
          tradeLicenseNumber: 'TL123456',
        };
      } else if (data.email === 'user@user.com' && data.password === 'pass') {
        mockUser = {
          id: '3',
          email: data.email,
          name: 'Regular User',
          role: 'user',
        };
      } else {
        throw new Error('Invalid credentials');
      }

      login(mockUser);
      
      // Redirect based on role
      if (mockUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(t('auth.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.loginTitle')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t('auth.registerNow')}
            </Link>
          </p>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
};