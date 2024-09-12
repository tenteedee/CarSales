import express from 'express';
import { getHomePage, getAboutPage } from '../controllers/homeController.js';

const router = express.Router();

const initWebRoutes = (app) => {
  router.get('/', getHomePage);
  router.get('/about', getAboutPage);

  router.get('/customer', (req, res) => {
    return res.send('<h1>This is customer page</h1>');
  });

  router.get('/admin', (req, res) => {
    return res.send('<h1>This is admin page</h1>');
  });

  return app.use('/', router);
};

export default initWebRoutes;
