//here we require the express router
const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item')

//@route  GET api/items
//@desc   GET All Items
//@access Public
router.get('/', (req, res) => {
  Item.find()
  .sort({ date: -1  })
  .then(items =>res.json(items))
});


//@route  POST api/items
//@desc   Create an Item
//@access usually this would be private if you have authentication
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item=>res.json(item))
});


//@route  DELETE api/items/:id
//@desc   Delete an Item
//@access usually this would be private if you have authentication
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
  .then(item => item.remove().then(()=>res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});
  

// export default router. Here we did not use the ES^ syntax, becuase if we did, we would need to use something like Babel. But want to keep this simple.
module.exports = router;