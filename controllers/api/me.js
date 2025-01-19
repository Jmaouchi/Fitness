const router = require('express').Router();
const sequelize = require('../../config/connection');
const { myData } = require('../../models');

// get all
router.get('/', (req, res) => {
  console.log('======================');
  myData.findAll({})
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;