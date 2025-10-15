class ApiResponse {
  constructor(statusCode, message = "Success",data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data,
    this.success = statusCode > 199 && statusCode < 300 ? true : false;
  }
}

export default ApiResponse;