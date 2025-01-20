const router = require('express').Router();

//get all the routes from the api folder
const apiRoutes = require('./api');
// const htmlRoutes = require('./homepageRoutes');
const clientRoute = require('./myRoute');


router.use('/api', apiRoutes);
// router.use('/', htmlRoutes);
router.use('/', clientRoute);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;