const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: 'login',
  LOGIN_PHONE: 'loginPhone',
  LOGIN_PHONE_SMS: 'loginphonesms',
  WISHLIST: 'wishlist',
  PRODUCT: '/product/:productName/:productId',
  SELL: '/sell',
  ATTRIBUTES: 'attributes',
  CATEGORY: '/type/:category',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  FORGETPASS: '/forgetpassword',
  VERIFICATION: '/verification',
  NEWPASSWORD: '/newpassword/:id/:token',
  MYADS: '/users/ads',
  PROFILE: '/profile/info',
  EDIT_PROFILE: '/editprofile/info',
  FIREBASE_CHAT: '/firebase/chat',
  SINGLE_CHAT: '/firebase/singlechat',
};

const WILDCARD_ROUTES = {
  PRIVATE: ROUTES.HOMEPAGE,
  PUBLIC: ROUTES.LOGIN,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Homepage',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  LOGIN_PHONE: {
    path: ROUTES.LOGIN_PHONE,
    title: 'Login Phone',
  },
  LOGIN_PHONE_SMS: {
    path: ROUTES.LOGIN_PHONE_SMS,
    title: 'Login Phone Sms',
  },
  SIGNIN: {
    path: ROUTES.SIGNIN,
    title: 'Signin',
  },
  SIGNUP: {
    path: ROUTES.SIGNUP,
    title: 'Signup',
  },
  WISHLIST: {
    path: ROUTES.WISHLIST,
    title: 'wishlist',
  },
  PRODUCT: {
    path: ROUTES.PRODUCT,
    title: 'Product',
  },
  SELL: {
    path: ROUTES.SELL,
    title: 'Sell',
  },
  ATTRIBUTES: {
    path: ROUTES.ATTRIBUTES,
    title: 'Attributes',
  },
  CATEGORY: {
    path: ROUTES.CATEGORY,
    title: 'Category',
  },
  FORGETPASS: {
    path: ROUTES.FORGETPASS,
    title: 'Forget Pass',
  },
  VERIFICATION: {
    path: ROUTES.VERIFICATION,
    title: 'Verification',
  },
  NEWPASSWORD: {
    path: ROUTES.NEWPASSWORD,
    title: 'New Password',
  },
  MYADS: {
    path: ROUTES.MYADS,
    title: 'My Ads',
  },
  PROFILE: {
    path: ROUTES.PROFILE,
    title: 'Edit Profile',
  },
  EDIT_PROFILE: {
    path: ROUTES.EDIT_PROFILE,
    title: 'Profile Edit',
  },

  FIREBASE_CHAT: {
    path: ROUTES.FIREBASE_CHAT,
    title: 'Firebase Chat',
  },
  SINGLE_CHAT: {
    path: ROUTES.SINGLE_CHAT,
    title: 'Single Chat',
  },
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
