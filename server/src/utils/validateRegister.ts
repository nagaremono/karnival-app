import { RegisterInput } from '../resolvers/RegisterInput';

export const validateRegister = (input: RegisterInput) => {
  if (input.username.length <= 4) {
    return [
      {
        field: 'username',
        message: 'Username length must be greater than 4',
      },
    ];
  }

  if (input.password.length <= 4) {
    return [
      {
        field: 'password',
        message: 'Password length must be greater than 4',
      },
    ];
  }

  if (input.password !== input.confirmpassword) {
    return [
      {
        field: 'password',
        message: 'Password does not match',
      },
    ];
  }

  if (!input.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'Email is invalid',
      },
    ];
  }

  return null;
};
