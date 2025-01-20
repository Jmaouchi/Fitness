const router = require('express').Router();
const sequelize = require('../config/connection');
const {myData} = require('../models');



// GET all Pets data
router.get('/',(req,res) => {
  myData.findAll({})
  .then(dbUserData => {
    const reviewsdata = dbUserData.map(data => data.get({plain: true}));
    console.log(reviewsdata);
    res.render('me', {
      reviewsdata
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;