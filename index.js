const express = require('express')
const mysql = require('mysql')

const app = express();
app.use(express.json());


const connecttion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api',
})

 connecttion.connect((err) => {
  if (err) {
    console.log('err connecting =' ,err)
    return;
  }

  console.log('Success connecting');
 })


app.post('/create', (req, res) => {
  const {email,name ,password} = req.body;
  try{
    connecttion.query(
      "INSERT INTO user(email,name,password) VALUES(?,?,?)",
      [email,name,password],
      (err, result,filters) => {
        if (err){
          console.log('error inserting',err);
          return res.status(400).send();
        }
        return res.status(201).json({message:'New user Successfully created'});
      }
    )
  } catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.listen(3001, () =>
console.log(`server start`),
);

app.get('/read',async(req, res) => {
  try{
    connecttion.query("SELECT * FROM user",(err,result,filters) => {
      if (err) {
        console.log(err);
        return res.status(400).send;
      }
      res.status(200).json(result)
    })
  }catch(err) {
    console.log(err);
    return res.status(500).send();
  }
})

app.patch('/update/:email',async(req, res) => {
  const email = req.params.email;
  const newPassword = req.body.newPassword;

  try{
    connecttion.query("UPDATE user SET password = ? WHERE email = ?",[newPassword,email],(err,result,fields) =>{
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json({message:"User password updated successfully"})
    })
      }catch(err) {
        console.log(err);
        return res,status(500).send;
      }
      })
