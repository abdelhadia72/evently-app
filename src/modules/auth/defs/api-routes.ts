const prefix = '/auth';
const ApiRoutes = {
  Login: prefix + '/login',
  Register: prefix + '/register',
  Logout: prefix + '/logout',
  RequestPasswordReset: prefix + '/request-password-reset',
  ResetPassword: prefix + '/reset-password',
  Me: prefix + '/me',
  VerifyOtp: prefix + '/verify-otp',
  ResendOtp: prefix + '/resend-otp',
};

export default ApiRoutes;
