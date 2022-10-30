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

// app.get('/login', (req, res)=>
// {
//     if(  (req.query.username==null)|| (req.query.password==null)){
//         res.redirect('/login')

//     }
    
//     var username= req.query.username
//     var pswd= req.query.password
//     let sql = "select * from staff2 where username like '%"+username+"%'"
//     db.query(sql, (err, results)=>
//     {
//         if(err) throw err;
       
//         // res.send("fetched")
//         if(results[0].password==pswd){
//         res.render('home.ejs', {results})
//         }

//         else{
//             res.redirect('/login')

//         }
        
        
//     })
// })

app.get('/login', (req, res)=>{
    var username=req.query.username
    var password=req.query.password
    let sql=`select * from staff2 where username='${username}'`

    db.query(sql, (err, result)=>{
        if(err) console.log(err)

        console.log(password)
        console.log(result.password)
        if(result.length==0)
        {
            res.render('login.ejs')
            // prompt("useremail does not exist")
        }
        else if(result[0].password==password)
        {
            res.render('home.ejs', {result})
        }
        else
        {
            res.render('login.ejs')
            // prompt("invali password")
        }

    })
})