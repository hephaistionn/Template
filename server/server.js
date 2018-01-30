//const upload =  require('multer')({ dest: 'uploads/' })
const express = require('express');
const app = express();
const yields = require('express-yields');
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser').json()
const middlewareSession = require('./middleware/session');
const middlewareError = require('./middleware/error');
const acl = require('./middleware/acl');
const apiArticle = require('./api/article');
const apiMember = require('./api/member');
const apiComment = require('./api/comment');
const apiMessage = require('./api/message');
const routes = require('./routes');

// templating engine 
app.set('view engine', 'ejs');

// loading middleware
app.use(cookieParser, bodyParser, middlewareSession);

// loading routes
app.use(routes);

// loading api
app.use('/api/', acl, apiArticle, apiMember, apiComment, apiMessage)

// loading error middleware
app.use(middlewareError);

app.listen(3000, function () { 
  console.log('Example app listening on port 3000!')
});
