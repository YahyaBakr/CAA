import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';
import { DealerRegistrationForm } from '../components/auth/DealerRegistrationForm';
import { AccountTypeSelector } from '../components/auth/AccountTypeSelector';
import { useAuthStore } from '../store/useAuthStore';
import { UserRole } from '../types/user';

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = React.useState(false);
  const [accountType, setAccountType] = React.useState<UserRole>('user');

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      const mockUser = {
        id: '1',
        email: data.email,
        name: data.name,
        role: accountType,
        ...(accountType === 'dealer' && {
          companyName: data.companyName,
          tradeLicenseNumber: data.tradeLicenseNumber,
          location: data.location,
          establishedYear: data.establishedYear,
        }),
      };
      login(mockUser);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.registerTitle')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.haveAccount')}{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t('auth.loginNow')}
            </Link>
          </p>
        </div>

        <AccountTypeSelector value={accountType} onChange={setAccountType} />

        {accountType === 'user' ? (
          <AuthForm type="register" onSubmit={handleRegister} isLoading={isLoading} />
        ) : (
          <DealerRegistrationForm onSubmit={handleRegister} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};