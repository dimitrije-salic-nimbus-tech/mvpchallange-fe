export const baseUrl = '/mvpmatch';

export const ApiRoutes = {
  Root: '/',
  Auth: {
    root: '/auth',
    login: '/login',
    postLogin: '/post-login'
  },
  Dashboard: {
    root: '/products',
    addProduct: '/add',
    viewProducts: '/view',
    viewProduct: '/view/:id',
    addDeposit: '/add-deposit',
    resetDeposit: '/reset-deposit',
  },
};
