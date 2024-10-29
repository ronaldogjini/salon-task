class DatabaseError extends Error {
    constructor(message, originalError = null) {
      super(message);
      this.name = "DatabaseError";
      this.status = 500;
      this.originalError = originalError;
    }
  }
  
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
      this.status = 400;
    }
  }

  module.exports = { DatabaseError, ValidationError }