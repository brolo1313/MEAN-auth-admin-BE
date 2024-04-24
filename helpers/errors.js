const nativeError = (res, error, msg) =>
  res
    .status(500)
    .json({ message: msg, error: error?.message || "Internal server error" });

module.exports = nativeError;