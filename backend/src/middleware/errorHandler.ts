import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  return res.status(500).send('internal server error');
};

export default errorHandler;
