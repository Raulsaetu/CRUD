const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();


//Koneksi ke mysql database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil');
});

app.use(bodyParser.json());
app.listen(4000, () => console.log('Server berjalan di port 4000'));
app.use(express.static('public'));

//Baca Semua Data
app.get('/read',(req, res) => {

  let sql = "SELECT * FROM tabel";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan NIS
app.get('/crud/:tabel', async (req, res) =>{
    const nis = req.params.nis;
    console.log(nis);

    let sql = "SELECT * FROM tabel Where Nama_Makanan = "+ nis +"";
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
      });
});

//route untuk insert data
app.post('/api', (req, res) => {
    let action = req.body.action;
    let data = {Nama_Makanan: req.body.Nama_Makanan, Harga: req.body.Harga,};
    let sql;

    if(action === 'Simpan'){
        sql = "INSERT INTO tabel SET ?";    
    }else{
        sql = `UPDATE tabel SET Nama_Makanan='`+req.body.Nama_Makanan+`', 
                Harga='`+req.body.Harga+`', 
                WHERE Nama_Makanan='`+req.body.Nama_Makanan+`';`
    }
    
    console.log(sql);
    let query = conn.query(sql, data,(err, results) => {
       if(err) throw err;
       res.json(results);
       console.log(results);
    });
});

//Baca Data Berdasarkan NIS
app.get('/tabel/:Nama_Makanan', async (req, res) =>{
    const nis = req.params.nis;
    console.log(nis);

    let sql = `DELETE FROM tabel Where Nama_Makanan = '`+ Nama_Makanan +`';`
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
      });
});