const router = require('express').Router();

//get all the routes from the api folder
const apiRoutes = require('./api');
// const htmlRoutes = require('./homepageRoutes');
const clientRoute = require('./clientRoute');


router.use('/api', apiRoutes);
// router.use('/', htmlRoutes);
router.use('/client', clientRoute);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;