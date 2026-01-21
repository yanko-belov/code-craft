interface ValidationResult {
  valid: boolean;
  error?: string;
}

interface RegistrationData {
  email: string;
  username: string;
  password: string;
}

interface ProfileUpdateData {
  email?: string;
  username?: string;
  password?: string;
}

interface FormValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
}

function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { valid: false, error: 'Username is required' };
  }
  
  if (username.length < 3 || username.length > 20) {
    return { valid: false, error: 'Username must be 3-20 characters' };
  }
  
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(username)) {
    return { valid: false, error: 'Username must be alphanumeric only' };
  }
  
  return { valid: true };
}

function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain an uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain a lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain a number' };
  }
  
  return { valid: true };
}

function validateRegistrationForm(data: RegistrationData): FormValidationResult {
  const errors: Record<string, string> = {};
  
  const emailResult = validateEmail(data.email);
  if (!emailResult.valid) {
    errors.email = emailResult.error!;
  }
  
  const usernameResult = validateUsername(data.username);
  if (!usernameResult.valid) {
    errors.username = usernameResult.error!;
  }
  
  const passwordResult = validatePassword(data.password);
  if (!passwordResult.valid) {
    errors.password = passwordResult.error!;
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

function validateProfileUpdateForm(data: ProfileUpdateData): FormValidationResult {
  const errors: Record<string, string> = {};
  
  if (data.email !== undefined) {
    const emailResult = validateEmail(data.email);
    if (!emailResult.valid) {
      errors.email = emailResult.error!;
    }
  }
  
  if (data.username !== undefined) {
    const usernameResult = validateUsername(data.username);
    if (!usernameResult.valid) {
      errors.username = usernameResult.error!;
    }
  }
  
  if (data.password !== undefined) {
    const passwordResult = validatePassword(data.password);
    if (!passwordResult.valid) {
      errors.password = passwordResult.error!;
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export {
  validateEmail,
  validateUsername,
  validatePassword,
  validateRegistrationForm,
  validateProfileUpdateForm,
  ValidationResult,
  FormValidationResult,
  RegistrationData,
  ProfileUpdateData
};
