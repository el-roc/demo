module.exports = function(app, passport, db, multer, ObjectId) {

// normal routes ===============================================================
    
// Image Upload Code =========================================================================

var storage = multer.diskStorage({

  destination: (req, file, cb) => {   
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + ".png")  
  }
});
var upload = multer({storage: storage}); //upload img to destination 'storage'


    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // USER SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        let uId = ObjectId(req.user._id)  
        db.collection('messages').find({'userId': uId}).toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result
          })
        })
    });


  // INDIVIDUAL PARKS SECTION =========================
  
  app.get('/individualpark', isLoggedIn, function(req, res) {
    // console.log(req.query.id)
    let parkId = ObjectId(req.query.id)
    console.log(parkId)
    db.collection('messages').find({'parkId': parkId}).toArray((err, result) => {
      if (err) return console.log(err)
      // console.log(result)
      db.collection('parks').find({'_id': parkId}).toArray((err, parkResult)=>{
        console.error("this is park result", parkResult)
        console.log(parkResult[0].name)
      if (err) return console.log(err)
      res.render('individualpark.ejs', {
        user : req.user,
        messages: result,
        parks: parkResult
      })
    })
    })
});
  // ADMIN SECTION =========================
  app.get('/admin', isLoggedIn, function(req, res) {
    db.collection('parks').find({approved: false}).toArray((err, result) => {
      if (err) return console.log(err)
      console.log("the parks result", result)
      res.render('admin.ejs', {
        result: result
        // name: result.name,

      })
    })
});
  // FAVORITES SECTION =========================

  app.get('/favorites', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('favorites.ejs', {
        user : req.user,
        messages: result
      })
    })
});

  // MAP SECTION =========================
  const fs = require('fs');

  app.get('/map', isLoggedIn, function(req, res) {

      // query db to get the park information
      let locationsInParks; 
       
      db.collection('parks').find().toArray((err,result) => {
        console.log("/map : parks",result)
        if (err) return console.log(err)
        locationsInParks = result
        console.log(locationsInParks)
        // res.json(locationsInParks)
        let data = JSON.stringify(locationsInParks);
        fs.writeFileSync('student-2.json', data);
        res.render('map.ejs', {
          locations: locationsInParks,
          user: req.user
      })
      
    })
  })
  // =========================
  app.get('/mark', isLoggedIn, function(req, res) {

    // query db to get the park information
    let locationsInParks; 
     
    db.collection('parks').find({approved: true}).toArray((err,result) => {
      if (err) return console.log(err)
      locationsInParks = result
      console.log("/mark : parks",locationsInParks)
      // res.json(locationsInParks)
      let data = JSON.stringify(locationsInParks);
      res.send(data)    
  })
})

  // ==================== =========================

//   app.get('/map', isLoggedIn, function(req, res) {
//     db.collection('messages').find().toArray((err, result) => {
//       if (err) return console.log(err)
//       // query db to get the park information
//       let locationsInParks;  
//       db.collection('parks').find().toArray((err,result) => {
//         if (err) return console.log(err)
//         locationsInParks = result
//         // res.json(result)

//       })
//       res.render('map.ejs', {
//         locations: locationsInParks
//         // messages: result
//         // user: req.user
//         // mapInfo: {
//         //   coordinates: [-71, 41]
//         // }
//       })
//     })
// });

app.get('/map', isLoggedIn, function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    // query db to get the park information
    let locationsInParks;  
    db.collection('parks').find().toArray((err,result) => {
      if (err) return console.log(err)
      locationsInParks = result
      // res.json(result)

    })
    res.render('map.ejs', {
      locations: locationsInParks
      // messages: result
      // user: req.user
      // mapInfo: {
      //   coordinates: [-71, 41]
      // }
    })
    let data = JSON.stringify(locationsInParks);
fs.writeFileSync('student-2.json', data);
  })
});

app.get('/map/:mapid', isLoggedIn, function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    // query db to get the park information by mapid
    res.render('map.ejs', {
      // user : req.user,
      // messages: result
      mapInfo: {
        coordinates: [-71, 41]
      }
    })
  })
});

  // app.get('/new-map', isLoggedIn, function(req, res) {
  //   db.collection('messages').find().toArray((err, result) => {
  //     if (err) return console.log(err)
  //     res.render('new-map.ejs', {
  //       // user : req.user,
  //       // messages: result
  //     })
  //   })
  // });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    // app.post('/specificmessages', (req, res) => {
    //   db.collection('messages').save({
    //     name: req.body.name,
    //     msg: req.body.msg,
    //     workout: req.body.workout,
    //     thumbUp: 0, thumbDown:0,
    //     favorite: "(Click to Save)", 
    //     parkId: ObjectId(req.body.individualId),
    //   userId: ObjectId(req.user._id)},
    //     (err, result) => {
    //     if (err) return console.log(err)
    //     console.log('saved to database')
    //     res.redirect('/individualpark')
    //   })
    // })

    app.post('/messages', upload.single('file-to-upload'), (req, res) => {
      
      db.collection('messages').save({
        name: req.body.name,
        msg: req.body.msg,
        workout: req.body.workout,
        thumbUp: 0, thumbDown:0,
        favorite: "(Click to Save)", 
        parkId: ObjectId(req.body.individualId),
        userId: ObjectId(req.user._id),
        imgPath: req.file ? 'images/uploads/' + req.file.filename : '' },
        (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })
// POST IMAGES =======================================================================
    // app.post('/messages', upload.single('file-to-upload'), (req, res, next) => {  //one picture to post   //next????
    //   let uId = ObjectId(req.session.passport.user) // uId === the individual
    //   db.collection('messages').save({imgPath: 'images/uploads/' + req.file.filename}, (err, result) => {
    //     if (err) return console.log(err)
    //     console.log('saved to database')
    //     res.redirect('/individualpark')
    //   })
    // });

// MAP POST COORDINATES ===============================================================

app.post('/mark', (req, res) => {
  console.log("body: ",req.body)
  const coordinatePair = {lat: req.body.lat, lng: req.body.lng}
  db.collection('parks').save({
    
    name: req.body.name,
    coordinates: coordinatePair,
    approved: false,
    userId: ObjectId(req.user._id)},
    (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/map')
  })
})

//  Park Put COORDINATES ===============================================================

app.put('/keepPark', (req, res) => {
  
  const parkId = req.body.id
  console.log("approving:", parkId)
  db.collection('parks').findOneAndUpdate({_id: ObjectId(parkId)},{
    $set: {
      approved: true
    }
  },{upsert: false},
    (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    // res.redirect('/map')
    res.send("okay")
  })
})


//===============================================================
    app.put('/messages', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp + 1,
          favorite: "Saved"
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/messages', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp + 1,
          favorite: "Saved"
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })
    
    app.put('/thumbDown', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp - 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      console.log(req.user._id)
      db.collection('messages').findOneAndDelete({
        name: req.body.name,
         msg: req.body.msg,
        userId: req.user._id}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })
    

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/map', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
