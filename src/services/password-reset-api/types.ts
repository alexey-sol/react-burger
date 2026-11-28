export type RestorePasswordByEmailRequest = {
  email: string;
};

export type RestorePasswordByEmailResponse = {
  message: string;
  success: boolean;
};

export type ResetPasswordRequest = {
  password: string;
  token: string;
};

export type ResetPasswordResponse = {
  message: string;
  success: boolean;
};
