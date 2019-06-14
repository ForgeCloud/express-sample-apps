module.exports = class ErrorHTTP extends Error {
  constructor(message = '', status = 500, description) {
    super(...arguments);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHTTP);
    }
    this.status = status;
    this.reason = message;
    this.description = description;
  }
};
