let  express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();
let router = express.Router();

app.use(cors());
app.set( bodyParser.urlencoded({extended: false}))
app.set('port',(process.env.PORT || 8084));


app.get('/',function(request,response){
   response.send('hello friend');
});
// start sepomex
let sepomex = require('./routes/sepomex.route');
app.use('/api',sepomex);
// end sepomex


app.listen( app.get('port'),function(){ console.log('That cool')});