interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
}

interface CardValidationResult {
  valid: boolean;
  error?: string;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  errorCode?: PaymentErrorCode;
}

type PaymentErrorCode =
  | 'INVALID_INPUT'
  | 'USER_NOT_FOUND'
  | 'USER_INACTIVE'
  | 'INVALID_CARD'
  | 'PAYMENT_FAILED'
  | 'INTERNAL_ERROR';

async function getUserFromDatabase(userId: string): Promise<User | null> {
  throw new Error('Database connection failed');
}

async function validateCard(cardToken: string): Promise<CardValidationResult> {
  throw new Error('Card service unavailable');
}

async function chargeCard(
  userId: string,
  amount: number,
  cardToken: string
): Promise<{ transactionId: string }> {
  throw new Error('Payment processor unavailable');
}

function validatePaymentInput(
  userId: unknown,
  amount: unknown,
  cardToken: unknown
): { valid: true } | { valid: false; error: string } {
  if (typeof userId !== 'string' || userId.trim() === '') {
    return { valid: false, error: 'userId must be a non-empty string' };
  }

  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return { valid: false, error: 'amount must be a valid number' };
  }

  if (amount <= 0) {
    return { valid: false, error: 'amount must be greater than zero' };
  }

  if (amount > 1_000_000) {
    return { valid: false, error: 'amount exceeds maximum limit' };
  }

  if (typeof cardToken !== 'string' || cardToken.trim() === '') {
    return { valid: false, error: 'cardToken must be a non-empty string' };
  }

  return { valid: true };
}

async function processPayment(
  userId: string,
  amount: number,
  cardToken: string
): Promise<PaymentResult> {
  const inputValidation = validatePaymentInput(userId, amount, cardToken);
  if (!inputValidation.valid) {
    return {
      success: false,
      error: inputValidation.error,
      errorCode: 'INVALID_INPUT',
    };
  }

  let user: User | null;
  try {
    user = await getUserFromDatabase(userId);
  } catch {
    return {
      success: false,
      error: 'Failed to retrieve user information',
      errorCode: 'INTERNAL_ERROR',
    };
  }

  if (user === null) {
    return {
      success: false,
      error: 'User not found',
      errorCode: 'USER_NOT_FOUND',
    };
  }

  if (!user.isActive) {
    return {
      success: false,
      error: 'User account is inactive',
      errorCode: 'USER_INACTIVE',
    };
  }

  let cardValidation: CardValidationResult;
  try {
    cardValidation = await validateCard(cardToken);
  } catch {
    return {
      success: false,
      error: 'Failed to validate card',
      errorCode: 'INTERNAL_ERROR',
    };
  }

  if (!cardValidation.valid) {
    return {
      success: false,
      error: cardValidation.error ?? 'Card validation failed',
      errorCode: 'INVALID_CARD',
    };
  }

  try {
    const result = await chargeCard(userId, amount, cardToken);
    return {
      success: true,
      transactionId: result.transactionId,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown payment error';

    return {
      success: false,
      error: `Payment processing failed: ${errorMessage}`,
      errorCode: 'PAYMENT_FAILED',
    };
  }
}

export {
  processPayment,
  PaymentResult,
  PaymentErrorCode,
  User,
  CardValidationResult,
};
