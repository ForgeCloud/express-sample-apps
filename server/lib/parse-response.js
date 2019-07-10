const ErrorHTTP = require('./error-http');

module.exports = function errorParse(res) {
  if (!res.ok || res.status >= 400) {
    throw new ErrorHTTP(res.statusText, res.status);
  }
  try {
    return res.json().then((payload) => {
      if (payload.error) {
        throw new ErrorHTTP(payload.error, 400, payload.error_description);
      }
      return {
        payload,
        res,
      };
    });
  } catch (err) {
    throw new ErrorHTTP(err.toString(), 500);
  }
};
