export interface apiError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
}
class ApiError extends Error {
  constructor(message: string, statusCode = 500) {
    super(message);
    // this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
  private statusCode: number;
  private status: string;
  private isOperational: boolean;
}

export default ApiError;
