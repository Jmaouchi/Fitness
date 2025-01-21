const router = require('express').Router();
const sequelize = require('../config/connection');
const {myData} = require('../models');



// GET all Pets data
router.get('/client',(req,res) => {
  myData.findAll({})
  .then(dbUserData => {
    const reviewsdata = dbUserData.map(data => data.get({plain: true}));
    console.log(reviewsdata);
    res.render('homepage', {
      reviewsdata
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;