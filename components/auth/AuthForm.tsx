import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  isLoading = false,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    try {
      if (provider === 'google') {
        // Example: Redirect to Google OAuth
        window.location.href = 'https://your-backend-url.com/auth/google';
      } else if (provider === 'facebook') {
        // Example: Redirect to Facebook OAuth
        window.location.href = 'https://your-backend-url.com/auth/facebook';
      }
    } catch (error) {
      console.error(`Failed to sign in with ${provider}:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {type === 'register' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('auth.name')}
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div
              className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center`}
            >
              <User className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('auth.email')}
        </label>
        <div className="mt-1 relative">
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div
            className={`absolute inset-y-0 ${isRTL ? 'left-0 mr-1' : 'right-0 ml-1'}  flex items-center`}
          >
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('auth.password')}
        </label>
        <div className="mt-1 relative">
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div
            className={`absolute inset-y-0 ${isRTL ? 'left-0 mr-1' : 'right-0 ml-1'} flex items-center`}
          >
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? t('common.loading') : t(`auth.${type}`)}
      </button>

      <div className="space-y-4 mt-6">
        <button
          type="button"
          onClick={() => handleSocialSignIn('google')}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {t('auth.signInWithGoogle')}
        </button>
        <button
          type="button"
          onClick={() => handleSocialSignIn('facebook')}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          {t('auth.signInWithFacebook')}
        </button>
      </div>
    </form>
  );
};
