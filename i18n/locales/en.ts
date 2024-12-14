import { baseTranslations } from './translations';

const translations = {
  ...baseTranslations,
  landing: {
    hero: {
      title: 'Find Your Perfect Car',
      subtitle: 'Browse thousands of cars from trusted dealers and private sellers',
      sell: {
        title: 'Sell Your Car',
        description: 'List your car for free and reach thousands of buyers',
        cta: 'Start Selling'
      },
      buy: {
        title: 'Buy a Car',
        description: 'Find the perfect car that matches your needs',
        cta: 'Start Browsing'
      }
    },
    features: {
      title: 'Why Choose Us',
      subtitle: 'We make car buying and selling simple',
      search: {
        title: 'Easy Search',
        description: 'Find exactly what you\'re looking for with our advanced search'
      },
      price: {
        title: 'Best Prices',
        description: 'Compare prices from different sellers to get the best deal'
      },
      security: {
        title: 'Secure Trading',
        description: 'Your transactions are protected with our secure platform'
      },
      contact: {
        title: 'Direct Contact',
        description: 'Connect directly with sellers through chat or call'
      }
    },
    stats: {
      listings: 'Active Listings',
      dealers: 'Verified Dealers',
      users: 'Happy Users',
      satisfaction: 'Customer Satisfaction'
    },
    pagination: {
      "itemsPerPage": "{{count}} articles par page",
      "showingResults": "Showing {{from}} to {{to}} of {{total}} results"

    },
    auth: {
      "loginTitle": "Login to Your Account",
      "noAccount": "Don't have an account?",
      "registerNow": "Register now",
      "email": "Email",
      "password": "Password",
      "login": "Login",
       "signInWithGoogle": "Sign in with Google",
    "signInWithFacebook": "Sign in with Facebook",
    "user": "User",
    "dealer": "Dealer",
    "name": "Name",
    "register": "Register",
    "haveAccount": "Already have an account?",
    "loginNow": "Login now",
    "registerTitle": "Create Your Account",
    "dealerInfo": "Dealer Information",
    "companyName": "Company Name",
    "tradeLicenseNumber": "Trade License Number",
    "location": "Location",
    "establishedYear": "Year Established"
    }
  }
};

export default translations;