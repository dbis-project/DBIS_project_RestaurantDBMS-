const express=require('express');
const mysql=require('mysql');
const app=express();
const path=require('path')

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

const db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'restaurant'
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("mysql connected...")
});

app.listen(3500,(res,req)=>{
    console.log("listening to port 3500")
})

app.get('/',(req,res)=>{
    

   res.render("login.ejs")
});

app.get('/login', (req, res)=>
{
    var username= req.query.username
    var pswd= req.query.password
    let sql = "select * from staff2 where username like '%"+username+"%'"
    db.query(sql, (err, results)=>
    {
        if(err) throw err;
       
        // res.send("fetched")
        if(results[0].password==pswd){
        res.render('home.ejs', {results})
        }

        else if(username!=results[0].username ||results[0].password!=pswd || pswd==""||username=="")
            res.render('login.ejs')
        
    })
})