//Require...
var express = require('express');
var router = express.Router();
//Luxon time formatting
const { DateTime } = require("luxon");
//Necessary for blog RSS parse
const RSSParser = require("rss-parser");
//Necessary for yelp app
const yelp = require('yelp-fusion');
//Necessary for contact form
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();
//Necessary for tumblr blog
const tumblr = require('tumblr.js');
const html2pug = require('html2pug');

//Connect to tumblr
const tumblrClient = tumblr.createClient({
  credentials:{consumer_key: process.env.TCK,
  consumer_secret: process.env.TCS,
  token: process.env.TT,
  token_secret: process.env.TSS
}, returnPromises: true,});

//Connnect to outlook via nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  },
});

//Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//Authenticate yelp app
const client = yelp.client(process.env.CLIENT);

//Retreive Breakfast Menu from tumblr
function breakfastFresh(req,res,next){
  tumblrClient.blogPosts('waterburyhill', {type: 'text', tag: ['breakfast menu']}).then(resp=>{
    bMenuURL=resp.posts[0].post_url
    bMenuUpdate=resp.posts[0].date;
    bMenuTitle=resp.posts[0].title;
    bMenu=resp.posts[0].trail[0].content;
    //tumblrOptions=resp.posts[0];
    bMenuUpdateToLuxon=bMenuUpdate;
    theBreakfastMenuTitle=bMenuTitle;
    theBreakfastMenu=bMenu;//.slice(1,-1);
    theBreakfastMenuUpdate=DateTime.fromSQL(bMenuUpdateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.theBreakfastMenuTitle=theBreakfastMenuTitle;
    res.locals.theBreakfastMenu=theBreakfastMenu;
    res.locals.theBreakfastMenuUpdate=theBreakfastMenuUpdate;
    res.locals.bMenuURL=bMenuURL;
    //console.log(tumblrOptions);
    next();
  }).catch(e => {
    console.log(e);
    });
}

//Retreive Lunch Menu from tumblr
function lunchFresh(req,res,next){
  tumblrClient.blogPosts('waterburyhill', {type: 'text', tag: ['lunch menu']}).then(resp=>{
    lMenuURL=resp.posts[0].post_url
    lMenuUpdate=resp.posts[0].date;
    lMenuTitle=resp.posts[0].title;
    lMenu=resp.posts[0].trail[0].content;
    //tumblrOptions=resp.posts[0];
    lMenuUpdateToLuxon=lMenuUpdate;
    theLunchMenuTitle=lMenuTitle;
    theLunchMenu=lMenu;//.slice(1,-1);
    theLunchMenuUpdate=DateTime.fromSQL(lMenuUpdateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.theLunchMenuTitle=theLunchMenuTitle;
    res.locals.theLunchMenu=theLunchMenu;
    res.locals.theLunchMenuUpdate=theLunchMenuUpdate;
    res.locals.lMenuURL=lMenuURL;
    //console.log(tumblrOptions);
    next();
  }).catch(e => {
    console.log(e);
    });
}

//Retreive Dinner Menu from tumblr
function dinnerFresh(req,res,next){
  tumblrClient.blogPosts('waterburyhill', {type: 'text', tag: ['dinner menu']}).then(resp=>{
    dMenuURL=resp.posts[0].post_url
    dMenuUpdate=resp.posts[0].date;
    dMenuTitle=resp.posts[0].title;
    dMenu=resp.posts[0].trail[0].content;
    //tumblrOptions=resp.posts[0];
    dMenuUpdateToLuxon=dMenuUpdate;
    theDinnerMenuTitle=dMenuTitle;
    theDinnerMenu=dMenu;//.slice(1,-1);
    theDinnerMenuUpdate=DateTime.fromSQL(dMenuUpdateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.theDinnerMenuTitle=theDinnerMenuTitle;
    res.locals.theDinnerMenu=theDinnerMenu;
    res.locals.theDinnerMenuUpdate=theDinnerMenuUpdate;
    res.locals.dMenuURL=dMenuURL;
    //console.log(tumblrOptions);
    next();
  }).catch(e => {
    console.log(e);
    });
}

//Retreive White Wines from tumblr
function whiteWine(req,res,next){
  tumblrClient.blogPosts('waterburyhill', {type: 'text', tag: ['white wine']}).then(resp=>{
    whiteWineURL=resp.posts[0].post_url
    whiteWineUpdate=resp.posts[0].date;
    whiteWineTitle=resp.posts[0].title;
    whiteWine=resp.posts[0].trail[0].content;
    whiteWineUpdateToLuxon=whiteWineUpdate;
    theWhiteWineTitle=whiteWineTitle;
    theWhiteWine=whiteWine;
    theWhiteWineUpdate=DateTime.fromSQL(whiteWineUpdateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.theWhiteWineTitle=theWhiteWineTitle;
    res.locals.theWhiteWine=theWhiteWine;
    res.locals.theWhiteWineUpdate=theWhiteWineUpdate;
    res.locals.whiteWineURL=whiteWineURL;
    next();
  }).catch(e => {
    console.log(e);
    });
}

//Retreive Red Wines from tumblr
function redWine(req,res,next){
  tumblrClient.blogPosts('waterburyhill', {type: 'text', tag: ['red wine']}).then(resp=>{
    redWineURL=resp.posts[0].post_url
    redWineUpdate=resp.posts[0].date;
    redWineTitle=resp.posts[0].title;
    redWine=resp.posts[0].trail[0].content;
    redWineUpdateToLuxon=redWineUpdate;
    theRedWineTitle=redWineTitle;
    theRedWine=redWine;
    theRedWineUpdate=DateTime.fromSQL(redWineUpdateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.theRedWineTitle=theRedWineTitle;
    res.locals.theRedWine=theRedWine;
    res.locals.theRedWineUpdate=theRedWineUpdate;
    res.locals.redWineURL=redWineURL;
    next();
  }).catch(e => {
    console.log(e);
    });
}

//Retreive Beers from tumblr
function beer(req,res,next){
  tumblrClient.blogPosts('waterburyhill', {type: 'text', tag: ['beer']}).then(resp=>{
    beerURL=resp.posts[0].post_url
    beerUpdate=resp.posts[0].date;
    beerTitle=resp.posts[0].title;
    beer=resp.posts[0].trail[0].content;
    beerUpdateToLuxon=beerUpdate;
    theBeerTitle=beerTitle;
    theBeer=beer;
    theBeerUpdate=DateTime.fromSQL(beerUpdateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.theBeerTitle=theBeerTitle;
    res.locals.theBeer=theBeer;
    res.locals.theBeerUpdate=theBeerUpdate;
    res.locals.beerURL=beerURL;
    next();
  }).catch(e => {
    console.log(e);
    });
}

//Retreive Appetizers from tumblr
function appetizers(req,res,next){
  tumblrClient.blogPosts('waterburyhill', {type: 'text', tag: ['appetizers']}).then(resp=>{
    appetizersURL=resp.posts[0].post_url
    appetizersUpdate=resp.posts[0].date;
    appetizersTitle=resp.posts[0].title;
    appetizers=resp.posts[0].trail[0].content;
    appetizersUpdateToLuxon=appetizersUpdate;
    theAppetizersTitle=appetizersTitle;
    theAppetizers=appetizers;
    theAppetizersUpdate=DateTime.fromSQL(appetizersUpdateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.theAppetizersTitle=theAppetizersTitle;
    res.locals.theAppetizers=theAppetizers;
    res.locals.theAppetizersUpdate=theAppetizersUpdate;
    res.locals.appetizersURL=appetizersURL;
    next();
  }).catch(e => {
    console.log(e);
    });
}

//Retreive Desserts from tumblr
function dessert(req,res,next){
  tumblrClient.blogPosts('waterburyhill', {type: 'text', tag: ['desserts']}).then(resp=>{
    dessertURL=resp.posts[0].post_url
    dessertUpdate=resp.posts[0].date;
    dessertTitle=resp.posts[0].title;
    dessert=resp.posts[0].trail[0].content;
    dessertUpdateToLuxon=dessertUpdate;
    theDessertTitle=dessertTitle;
    theDessert=dessert;
    theDessertUpdate=DateTime.fromSQL(dessertUpdateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.theDessertTitle=theDessertTitle;
    res.locals.theDessert=theDessert;
    res.locals.theDessertUpdate=theDessertUpdate;
    res.locals.dessertURL=dessertURL;
    next();
  }).catch(e => {
    console.log(e);
    });
}

//Retrieve content from primary blog RSS parse
blog=async (req,res,next)=>{
  const djfeedUrl = "https://waterburyhill.tumblr.com/tagged/du%20jour/rss";
  const bHoursUrl = "https://waterburyhill.tumblr.com/tagged/breakfast%20hours/rss";
  const bAboutUrl = "https://waterburyhill.tumblr.com/tagged/about%20breakfast/rss";
  const lHoursUrl = "https://waterburyhill.tumblr.com/tagged/lunch%20hours/rss";
  const lAboutUrl = "https://waterburyhill.tumblr.com/tagged/about%20lunch/rss";
  const dHoursUrl = "https://waterburyhill.tumblr.com/tagged/dinner%20hours/rss";
  const dAboutUrl = "https://waterburyhill.tumblr.com/tagged/about%20dinner/rss";
  const thanksUrl = "https://waterburyhill.tumblr.com/tagged/thanks/rss";
  duJour = await new RSSParser().parseURL(djfeedUrl);
  bHrs = await new RSSParser().parseURL(bHoursUrl);
  bInfo = await new RSSParser().parseURL(bAboutUrl);
  lHrs = await new RSSParser().parseURL(lHoursUrl);
  lInfo = await new RSSParser().parseURL(lAboutUrl);
  dHrs = await new RSSParser().parseURL(dHoursUrl);
  dInfo = await new RSSParser().parseURL(dAboutUrl);
  thanks = await new RSSParser().parseURL(thanksUrl);
  duJourToLuxon=duJour.items[0].pubDate;
  duJourPubDate=DateTime.fromRFC2822(duJourToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
  res.locals.duJour=duJour;
  res.locals.bHrs=bHrs;
  res.locals.bInfo=bInfo;
  res.locals.lHrs=lHrs;
  res.locals.lInfo=lInfo;
  res.locals.dHrs=dHrs;
  res.locals.dInfo=dInfo;
  res.locals.thanks=thanks;
  res.locals.duJourPubDate=duJourPubDate;
  next();
}

//Retrieve client information from yelp app
function yelpInf(req, res, next){
  client.business('cucina-venti-restaurant-mountain-view').then(response => {
    inf = response.jsonBody;
    //console.log(inf);
    res.locals.inf=inf;
    next();
  }).catch(e => {
    console.log(e);
  });
}

//Retrieve client reviews from yelp app
function yelpRev(req, res, next){
  client.reviews('cucina-venti-restaurant-mountain-view').then(response => {
    rev = response.jsonBody.reviews;
    //console.log(rev);
    res.locals.rev=rev;
    next();
  }).catch(e => {
    console.log(e);
  });
}



//GET Homepage
router.get('/', blog, yelpRev, yelpInf, function(req, res) {
//RESPOND: 'views/index.pug' & local variables  
let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  duJour.items.forEach(item =>{
    res.render('index', {
      title:duJour.title,
      //description:duJour.description,
      description:duJour.description,
//Du jour-related variables
      'articleTitle':item.title,
      'articleAuthor':item.author,
      'articleDate':duJourPubDate,
      'articleLink':item.link,
      'articleCategory':item.categories,
      'articleClip':item.contentSnippet,
//Breakfast-related variables
      'bDays':bHrs.items[0].title,
      'bTimes':bHrs.items[0].contentSnippet,
      'bMeal':bInfo.items[0].title,
      'bInfo':bInfo.items[0].contentSnippet,
//Lunch-related variables
      'lDays':lHrs.items[0].title,
      'lTimes':lHrs.items[0].contentSnippet,
      'lMeal':lInfo.items[0].title,
      'lInfo':lInfo.items[0].contentSnippet,
//Dinner-related variables
      'dDays':dHrs.items[0].title,
      'dTimes':dHrs.items[0].contentSnippet,
      'dMeal':dInfo.items[0].title,
      'dInfo':dInfo.items[0].contentSnippet,
//Thanks
      'thanksTitle':thanks.items[0].title,
      'thanksStatement':thanks.items[0].contentSnippet,
      'thanksUrl':thanks.items[0].link,
//pageURL
      'thisPage':fullUrl
    });
    console.log(`\n☙──────◇◯◇──────❧\n\n◇◯   Ｌｏｏｋｉｎｇ ｇｏｏｄ  ◯◇\n\n\n\n\n☙──────◇◯◇──────❧`);
  })
});
//GET Menus
router.get('/menus', breakfastFresh, lunchFresh, dinnerFresh, whiteWine, redWine, beer, appetizers, dessert, blog, function(req, res) {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let tBM=theBreakfastMenu;
  let tLM=theLunchMenu;
  let tDM=theDinnerMenu;
  res.render('menus', { 
    title: 'Menus',
    'bInfo':bInfo.items[0].contentSnippet,
    'lInfo':lInfo.items[0].contentSnippet,
    'dInfo':dInfo.items[0].contentSnippet,
//Breakfast Menu
    'theBreakfastMenuTitle':theBreakfastMenuTitle,
    'theBreakfastMenu':tBM,
    'BarticleLink':bMenuURL,
//Lunch Menu
    'theLunchMenuTitle':theLunchMenuTitle,
    'theLunchMenu':tLM,
    'LarticleLink':lMenuURL,
//Dinner Menu 
    'theDinnerMenuTitle':theDinnerMenuTitle,
    'theDinnerMenu':tDM,
    'DarticleLink':dMenuURL,
//White wine
    'theWhiteWineTitle':theWhiteWineTitle,
    'theWhiteWine':theWhiteWine,
    'theWhiteWineUpdate':theWhiteWineUpdate,
    'whiteWineURL':whiteWineURL,
//Red wine
    'theRedWineTitle':theRedWineTitle,
    'theRedWine':theRedWine,
    'theRedWineUpdate':theRedWineUpdate,
    'redWineURL':redWineURL,
//Beer
    'theBeerTitle':theBeerTitle,
    'theBeer':theBeer,
    'theBeerUpdate':theBeerUpdate,
    'beerURL':beerURL,
//appetizers
    'theAppetizersTitle':theAppetizersTitle,
    'theAppetizers':theAppetizers,
    'theAppetizersUpdate':theAppetizersUpdate,
    'appetizersURL':appetizersURL,
//dessert
    'theDessertTitle':theDessertTitle,
    'theDessert':theDessert,
    'theDessertUpdate':theDessertUpdate,
    'dessertURL':dessertURL,
//Thanks
    'thanksTitle':thanks.items[0].title,
    'thanksStatement':thanks.items[0].contentSnippet,
    'thanksUrl':thanks.items[0].link,
//pageURL
      'thisPage':fullUrl
  });
  cconsole.log(`\n☙──◇◯ Ｍｅｎｕｓ: Ｌｏｏｋｉｎｇ ｇｏｏｄ ◯◇──❧\n\n`);
});
//GET Breakfast Menu
router.get('/menus/breakfast', breakfastFresh, lunchFresh, dinnerFresh, blog, function(req, res) {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let tBM=theBreakfastMenu;
  let tLM=theLunchMenu;
  let tDM=theDinnerMenu;
  res.render('breakfast', { 
    title: theBreakfastMenuTitle,
//Breakfast Menu
    'theBreakfastMenuTitle':theBreakfastMenuTitle,
    'theBreakfastMenu':tBM,
    'theBreakfastMenuUpdate':theBreakfastMenuUpdate,
    'articleLink':bMenuURL,
//Lunch Menu
    'theLunchMenuTitle':theLunchMenuTitle,
    'theLunchMenu':tLM,
    'theLunchMenuUpdate':theLunchMenuUpdate,
//Dinner Menu 
    'theDinnerMenuTitle':theDinnerMenuTitle,
    'theDinnerMenu':tDM,
    'theDinnerMenuUpdate':theDinnerMenuUpdate,
//Thanks
    'thanksTitle':thanks.items[0].title,
    'thanksStatement':thanks.items[0].contentSnippet,
    'thanksUrl':thanks.items[0].link,
//pageURL
      'thisPage':fullUrl
  });
  console.log(`\n☙──◇◯ Ｂｒｅａｋｆａｓｔ: Ｌｏｏｋｉｎｇ ｇｏｏｄ ◯◇──❧\n\n`);
});
//GET Lunch Menu
router.get('/menus/lunch', breakfastFresh, lunchFresh, dinnerFresh, whiteWine, redWine, beer, appetizers, dessert, blog, function(req, res) {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let tBM=theBreakfastMenu;
  let tLM=theLunchMenu;
  let tDM=theDinnerMenu;
  res.render('lunch', { 
    title: theLunchMenuTitle,
//Breakfast Menu
    'theBreakfastMenuTitle':theBreakfastMenuTitle,
    'theBreakfastMenu':tBM,
    'theBreakfastMenuUpdate':theBreakfastMenuUpdate,
//Lunch Menu
    'theLunchMenuTitle':theLunchMenuTitle,
    'theLunchMenu':tLM,
    'theLunchMenuUpdate':theLunchMenuUpdate,
    'articleLink':lMenuURL,
//Dinner Menu 
    'theDinnerMenuTitle':theDinnerMenuTitle,
    'theDinnerMenu':tDM,
    'theDinnerMenuUpdate':theDinnerMenuUpdate,
//White wine
    'theWhiteWineTitle':theWhiteWineTitle,
    'theWhiteWine':theWhiteWine,
    'theWhiteWineUpdate':theWhiteWineUpdate,
    'whiteWineURL':whiteWineURL,
//Red wine
    'theRedWineTitle':theRedWineTitle,
    'theRedWine':theRedWine,
    'theRedWineUpdate':theRedWineUpdate,
    'redWineURL':redWineURL,
//Beer
    'theBeerTitle':theBeerTitle,
    'theBeer':theBeer,
    'theBeerUpdate':theBeerUpdate,
    'beerURL':beerURL,
//appetizers
    'theAppetizersTitle':theAppetizersTitle,
    'theAppetizers':theAppetizers,
    'theAppetizersUpdate':theAppetizersUpdate,
    'appetizersURL':appetizersURL,
//dessert
    'theDessertTitle':theDessertTitle,
    'theDessert':theDessert,
    'theDessertUpdate':theDessertUpdate,
    'dessertURL':dessertURL,
//Thanks
    'thanksTitle':thanks.items[0].title,
    'thanksStatement':thanks.items[0].contentSnippet,
    'thanksUrl':thanks.items[0].link,
//pageURL
      'thisPage':fullUrl
  });
  console.log(`\n☙──◇◯ Ｌｕｎｃｈ: Ｌｏｏｋｉｎｇ ｇｏｏｄ ◯◇──❧\n\n`);
});

//GET Dinner Menu
router.get('/menus/dinner', breakfastFresh, lunchFresh, dinnerFresh, whiteWine, redWine, beer, appetizers, dessert, blog, function(req, res) {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let tBM=theBreakfastMenu;
  let tLM=theLunchMenu;
  let tDM=theDinnerMenu;
  res.render('dinner', { 
    title: theDinnerMenuTitle,
//Breakfast Menu
    'theBreakfastMenuTitle':theBreakfastMenuTitle,
    'theBreakfastMenu':tBM,
    'theBreakfastMenuUpdate':theBreakfastMenuUpdate,
//Lunch Menu
    'theLunchMenuTitle':theLunchMenuTitle,
    'theLunchMenu':tLM,
    'theLunchMenuUpdate':theLunchMenuUpdate,
//Dinner Menu 
    'theDinnerMenuTitle':theDinnerMenuTitle,
    'theDinnerMenu':tDM,
    'theDinnerMenuUpdate':theDinnerMenuUpdate,
    'articleLink':dMenuURL,
//White wine
    'theWhiteWineTitle':theWhiteWineTitle,
    'theWhiteWine':theWhiteWine,
    'theWhiteWineUpdate':theWhiteWineUpdate,
    'whiteWineURL':whiteWineURL,
//Red wine
    'theRedWineTitle':theRedWineTitle,
    'theRedWine':theRedWine,
    'theRedWineUpdate':theRedWineUpdate,
    'redWineURL':redWineURL,
//Beer
    'theBeerTitle':theBeerTitle,
    'theBeer':theBeer,
    'theBeerUpdate':theBeerUpdate,
    'beerURL':beerURL,
//appetizers
    'theAppetizersTitle':theAppetizersTitle,
    'theAppetizers':theAppetizers,
    'theAppetizersUpdate':theAppetizersUpdate,
    'appetizersURL':appetizersURL,
//dessert
    'theDessertTitle':theDessertTitle,
    'theDessert':theDessert,
    'theDessertUpdate':theDessertUpdate,
    'dessertURL':dessertURL,
//Thanks
    'thanksTitle':thanks.items[0].title,
    'thanksStatement':thanks.items[0].contentSnippet,
    'thanksUrl':thanks.items[0].link,
//pageURL
      'thisPage':fullUrl
  });
  console.log(`\n☙──◇◯ Ｄｉｎｎｅｒ: Ｌｏｏｋｉｎｇ ｇｏｏｄ ◯◇──❧\n\n`);
});

router.post('/send', (req, res, ) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      sender: `${data.name} <${data.address}>`,
      to: process.env.EMAIL, // receiver email,
      subject: data.subject,
      text: `From:\n${data.name} <email: ${data.address}> \n${data.message}`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        //res.status(500).send("Something went wrong.");
        res.render('yikes');
      } else {
        res.render('thanksForYourComment');
      }
    });
  });
});

module.exports = router;