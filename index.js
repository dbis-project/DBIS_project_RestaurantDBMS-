const express=require('express');
const mysql=require('mysql');
const app=express();
const path=require('path')

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))
app.set('public',path.join(__dirname,'/public'))

const db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'strms'
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


app.get('/views/dashboard',(req,res)=>{
    let sql='select * from orders'
    db.query(sql,(err,resultorder)=>{
        if(err) console.log(err)
        res.render("dashboard.ejs",{resultorder})
    })
    

    
 });
 app.get('/views/orders',(req,res)=>{

    let sql=`select * from staff `
    // .js


    db.query(sql, (err, result)=>{
        if(err) console.log(err)
        res.render('orders.ejs', {result})
    })

    });

    app.get('/order-submit',(req,res)=>{
        var type=req.query.type
        var table=req.query.table
        var contents=req.query.contents
        var date=req.query.date
        var attendant=req.query.Attendent
        var amount=Number(req.query.Amount)
        var cname=req.query.cname
        var phone=req.query.phone
        var mail=req.query.email

        let sql=`insert into  orders(otype,descriptions,table_no,odate,attendant,amount,cphone) values('${type}','${contents}',${table},'${date}','${attendant}',${amount},${phone}) `
        // .js
        let sql1=`select * from customers `
        let sql2=`insert into customers(cname,phone_no,email) values('${cname}',${phone},'${mail}') `
    
        db.query(sql, (err, results)=>{
            if(err) console.log(err)
            // console.log(attendant)
            // res.render('home.ejs', {results})
        })
        db.query(sql1, (err1, result1)=>{
            if(err1) console.log(err1)
            console.log(result1)
            var cphone=0;
            // console.log(attendant)
            // res.render('home.ejs', {results})
            for(let values of result1){
                console.log(values.phone_no)
                console.log(phone)
                if(values.phone_no===phone){
                    cphone=phone;
                    console.log(values)

                    break;
                    
                }
                

            }
            console.log(cphone)
            if(!cphone){
                db.query(sql2, (err2, result2)=>{
                    if(err2) console.log(err2)
                    console.log(result2)
                    console.log(phone)
                    // res.render('home.ejs', {results})
                })

            }

            res.render('home.ejs')

            
        })
    
        });
 app.get('/views/KOT',(req,res)=>{


    

    res.render("KOT.ejs")
 });
 app.get('/views/Suppliers',(req,res)=>{
    

    res.render("Suppliers.ejs")
 });
 app.get('/views/Reservation',(req,res)=>{
    

    res.render("Reservation.ejs")
 });
 app.get('/views/Inventory',(req,res)=>{
    

    res.render("Inventory.ejs")
 });
 app.get('/views/Customer_satisfaction',(req,res)=>{
    

    res.render("Customer_satisfaction.ejs")
 });
 app.get('/views/Menu',(req,res)=>{
    

    res.render("Menu.ejs")
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
    // .js


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
            res.locals(prom)
            res.render('login.ejs')
            // prompt("invali password")
        }

    })
})