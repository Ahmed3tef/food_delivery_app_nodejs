class ApiError extends Error {
  constructor(message: string, statusCode = 500) {
    super(message);
    // this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
  statusCode: number;
  status: string;
  isOperational: boolean;
}

export default ApiError;
