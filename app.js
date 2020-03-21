//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
 
//Create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));
app.use(express.static('views'))




/////////////////////////////////////////////////////////////////////PRODUCT/////////////////////////////////////////////
//route for homepage
/*
app.get('/',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results
    });
  });
});
 
//route for insert data
app.post('/save',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////CUSTOMER//////////////////////////////////////
//route for homepage

app.get('/', (req, res) => {
    res.sendfile('public/home.html')
})
app.get('/cst',(req, res) => {
    let sql = "SELECT * FROM customer";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.render('customer_view',{
        results: results
      });
    });
  });
   
  //route for insert data
  app.post('/save',(req, res) => {
    let data = {nama: req.body.nama, alamat: req.body.alamat, no_hp: req.body.no_hp};
    let sql = "INSERT INTO customer SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/cst');
    });
  });
   
  //route for update data
  app.post('/update',(req, res) => {
    let sql = "UPDATE customer SET nama='"+req.body.nama+"', alamat='"+req.body.alamat+"', no_hp='"+req.body.no_hp+"' WHERE id_customer="+req.body.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.redirect('/cst');
    });
  });
   
  //route for delete data
  app.post('/delete',(req, res) => {
    let sql = "DELETE FROM customer WHERE id_customer="+req.body.id_customer+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.redirect('/cst');
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
//server listening
app.listen(5000, () => {
  console.log('Server is running at port 5000');
});