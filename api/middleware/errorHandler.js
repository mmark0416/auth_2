const errorHandler = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong",
  };

  res.status(error.statusCode).json({ err: error.message });
};

export default errorHandler;
