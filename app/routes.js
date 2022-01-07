const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
    res.locals.currentURL = req.originalUrl; // current screen
    res.locals.prevURL = req.get('Referrer'); // previous screen

    console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );

    next()
})
// Run this code when a form is submitted to 'juggling-balls-answer'
router.post('/current/juggling-balls-answer', function (req, res) {

    // Make a variable and give it the value from 'how-many-balls'
    var howManyBalls = req.session.data['how-many-balls']
  
    // Check whether the variable matches a condition
    if (howManyBalls == "3 or more"){
      // Send user to next page
      res.redirect('/current/juggling-trick')
    } else {
      // Send user to ineligible page
      res.redirect('/current/ineligible')
    }
  
  })

  // Start folder-specific routes

  // Current sprint. Remember to add older sprint when adding a new folder — When starting a new sprint, duplicate the "current" folder and then put a link in "app/view/routes.js" to make sure all the logic in the old folder still works.
  router.use('/current', require('./views/current/__routes'));

module.exports = router
