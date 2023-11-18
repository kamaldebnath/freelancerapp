const express = require("express");
const cors = require('cors');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const bodyParser = require('body-parser');


//app initialization
const app = express();


//middlewares
app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));

app.use(express.json({ limit: '50mb' }));


//firebase 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


//mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kamaldebnath:9NomQt71UL80XNZO@cluster0.7dejz55.mongodb.net/');

//Schema
const UserSchema = mongoose.Schema({
  name: String,
  picture: String,
  email: String,
  email_verified: Boolean,
  uid: String,
  about: String
})

const GigSchema = mongoose.Schema({
  seller_uid: String,
  title: String,
  description: String,
  deadline: Number,
  price: Number,
  gigcategory: String,
  thumbnail: String
})

const CategoryScema = mongoose.Schema({
  value: String,
  label: String
})

const OrderSchema = mongoose.Schema({
  gigid: String,
  seller: String,
  buyer: String,
  date: Date,
  description: String,
})

const ChatSchema = mongoose.Schema({
  orderid: String,
  sender: String,
  date: Date,
  message: String
})


//Model
const UserModel = mongoose.model('User', UserSchema);
const GigModel = mongoose.model('Gigs', GigSchema);
const CategoryModel = mongoose.model('Category', CategoryScema);
const OrderModel = mongoose.model('Orders', OrderSchema);
const ChatModel = mongoose.model('Chats', ChatSchema);


//routes
app.post('/user_update/:token', (req, res) => {
  try {
    admin.auth().verifyIdToken(req.params.token).then((response) => {
      if (response.name === req.body.name && response.email === req.body.email && response.uid === req.body.uid) {
        UserModel.find({ uid: response.uid }).then(async (data) => {
          data[0] ? console.log(data) : new UserModel(req.body).save().then((e) => { console.log(e) });
        })
      }
    })
  } catch (error) {
    console.log(error);
  }

})

app.patch('/update_userdata/:token/:uid', (req, res) => {
  try {
    admin.auth().verifyIdToken(req.params.token).then((response) => {
      if (response.uid == req.params.uid) {
        UserModel.find({ uid: response.uid }).then(async (data) => {
          data[0] ?
            UserModel.findByIdAndUpdate(data[0]._id,req.body, { new: true }, function (err, docs) {
              if (err) {
                res.json(err);
              }
              if (docs) {
                res.json(docs);
              }
            })

            :

            console.log('');
        })
      }

    })
  } catch (error) {
    res.json(error);
  }
})

app.get('/userdata/:id', (req, res) => {
  UserModel.findOne({ uid: req.params.id }).then((userdata) => { res.json(userdata) });
})

app.post('/createcategory', (req, res) => {
  new CategoryModel(req.body).save().then((e) => res.json(e));
})

app.get('/categories', (req, res) => {
  CategoryModel.find().then((e) => res.json(e));
})

app.post('/creategig/:token', (req, res) => {
  admin.auth().verifyIdToken(req.params.token).then((response) => {
    if (response.uid) {
      new GigModel({
        'seller_uid': response.uid,
        'title': req.body.title,
        'description': req.body.description,
        'deadline': req.body.deadline,
        'price': req.body.price,
        'gigcategory': req.body.gigcategory,
        'thumbnail': req.body.thumbnail
      }).save().then((e) => {
        res.json('success');
      })
    }
  })
})

app.get('/allgigs', (req, res) => {
  GigModel.find().then((e) => { res.json(e) });
})

app.get('/gigsbyid/:id', (req, res) => {
  GigModel.find({ _id: req.params.id }).then((e) => { res.json(e) });
})


app.get('/mygigs/:uid', (req, res) => {
  GigModel.find({ seller_uid: req.params.uid }).then((e) => { res.json(e) });
})

app.post('/createorder/:token', (req, res) => {
  admin.auth().verifyIdToken(req.params.token).then((response) => {
    if (response.uid) {
      new OrderModel({
        gigid: req.body.gigid,
        seller: req.body.seller,
        buyer: response.uid,
        date: req.body.date,
        description: req.body.description
      }).save().then((e) => {
        res.json(e)
      });
    }
  })
})

app.get('/myorders/:token', (req, res) => {
  admin.auth().verifyIdToken(req.params.token).then((response) => {
    if (response.uid) {
      OrderModel.find({ buyer: response.uid }).then((e) => { res.json(e) });
    }
  })
})

app.get('/receivedorders/:token', (req, res) => {
  admin.auth().verifyIdToken(req.params.token).then((response) => {
    if (response.uid) {
      OrderModel.find({ seller: response.uid }).then((e) => { res.json(e) });
    }
  })
})

app.post('/chat/:token', (req, res) => {
  admin.auth().verifyIdToken(req.params.token).then((response) => {
    if (response.uid) {
      new ChatModel({
        'orderid': req.body.orderid,
        'sender': response.uid,
        'date': req.body.date,
        'message': req.body.message
      }).save().then((e) => { res.json(e) });
    }
  })
})

app.get('/chatdata/:token/:orderid', (req, res) => {
  admin.auth().verifyIdToken(req.params.token).then((response) => {
    if (response.uid) {
      ChatModel.find({ orderid: req.params.orderid }).then((e) => res.json(e));
    }
  })
})



//server listener port
app.listen(5000, () => console.log(`Running on http://192.168.0.103:5000/ `))