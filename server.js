//mlab database username: nasrul
//mlab database pword: nasrul123

//core node js module to deal with paths
const path = require('path')

const express = require('express');
//Mongoose is our ORm to interact with MongoDB database, makes everythign a lot easier. You could use a mongoDb driver if you want, but Mogoose is a little bit more intuitive and easier to use aand just better all around.
const mongoose = require('mongoose');
//body parser will allow us to take request and get data from the body, so for instance when we send a post request we want to be able to ge tthe name of that post from the request.
const bodyParser = require('body-parser');

//We could do all the routes in this file but we want to keep this file clean. For instance, we could have app.get api/items, app/post api/items here, but we do not want them here. Instead we mhave all the routes in a separate folder ./routes/api/items.
const items = require('./routes/api/items')

//initialize express into a variable called app
const app = express();

//BodyParser Middleware. BodyParser has a piece of middleware that we need to add. 
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//Use Routes
//anything that goes into api/items, should refer to the items variable, which is defined above.
app.use('/api/items', items);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'))
  
  app.get('*', (req,res)=> {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))