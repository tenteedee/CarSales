import express from 'express';

const router = express.Router();

const initWebRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.send('<h1>Hello world</h1>');
  });

  router.get('/customer', (req, res) => {
    return res.send('<h1>This is customer page</h1>');
  });

  router.get('/admin', (req, res) => {
    return res.send('<h1>This is admin page</h1>');
  });

  return app.use('/', router);
};

export default initWebRoutes;
