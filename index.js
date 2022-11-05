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

    database:'sys'
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
app.get('/views/home',(req,res)=>{
    

    res.render("home.ejs")
 });


app.get('/views/dashboard',(req,res)=>{
    let sql='select * from orders1'
    db.query(sql,(err,resultorder)=>{
        if(err) console.log(err)
        res.render("dashboard.ejs",{resultorder})
    })
    

    
 });
 app.get('/views/orders',(req,res)=>{

    let sql=`select * from staff1 `
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

        let sql=`insert into  orders1(otype,descriptions,table_no,odate,attendant,amount,cphone) values('${type}','${contents}',${table},'${date}','${attendant}',${amount},${phone}) `
        // .js
        let sql1=`select * from customers1 `
        let sql2=`insert into customers1(cname,phone_no,email) values('${cname}',${phone},'${mail}') `
    
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
 app.get('/views/edit',(req,res)=>{

    let sql=`select * from menu1`
    let sql1=`select * from staff1 where designation='chef'`
   

    db.query(sql, (err, results1)=>{
        if(err) console.log(err)
        res1=results1;

        db.query(sql1, (err, results2)=>{
            if(err) console.log(err)
            res1=results2;
            console.log(results1)
            console.log(results2)
            res.render("edit.ejs",{results1, results2})
    
            // console.log(attendant)
            // res.render('home.ejs', {results})
        })

        
        // console.log(attendant)
        // res.render('home.ejs', {results})
    })

    // db.query(sql1, (err, results2)=>{
    //     if(err) console.log(err)
    //     res1=results2;

    //     // console.log(attendant)
    //     // res.render('home.ejs', {results})
    // })
    // console.log(res1)
    

    
 });

 app.get('/updatemenu',(req,res)=>{
    var iname=req.query.iname
    var Availablity=req.query.Availablity
    var chef=req.query.chef
    var Price=Number(req.query.Price)

    let sql=`update  menu1 set availablity='${Availablity}' ,chef='${chef}',price=${Price} where iname='${iname}'`
    db.query(sql, (err, result)=>{
        if(err) console.log(err)
        // console.log(attendant)
        // res.render('home.ejs', {results})
        res.redirect('http://localhost:3500/views/Menu')
    })

    

    
 });

 app.get('/additem',(req,res)=>{
    var iname=req.query.iname
    var Availablity=req.query.Availablity
    var chef=req.query.chef
    var desc=req.query.desc
    var Price=Number(req.query.Price)

    let sql=`insert into  menu1(iname,availablity,descriptions,price,chef) values ('${iname}','${Availablity}','${desc}',${Price},'${chef}')`
    db.query(sql, (err, result)=>{
        if(err) console.log(err)
        // console.log(attendant)
        // res.render('home.ejs', {results})
        res.redirect('http://localhost:3500/views/Menu')
    })

    

    
 });
 app.get('/views/Menu',(req,res)=>{
    let sql=`select * from menu1 where availablity='available' `

    db.query(sql, (err, menuresult)=>{
        if(err) console.log(err)
        // console.log(attendant)
        // res.render('home.ejs', {results})
        res.render("Menu.ejs",{menuresult})
    })
    

    
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
    let sql=`select * from staff1 where sname='${username}'`
    // .js


    db.query(sql, (err, result)=>{
        if(err) console.log(err)

        console.log(password)
        console.log(result.spassword)
        if(result.length==0)
        {
            res.render('login.ejs')
            // prompt("useremail does not exist")
        }
        else if(result[0].spassword==password)
        {
            res.render('home.ejs', {result})
        }
        else
        {
            res.locals(prom)
            res.render('login.ejs',)
            // prompt("invali password")
        }

    })
})