const express = require("express")
const mysql = require("mysql")
const path = require("path")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set('/', path.join(__dirname, '/views'));

// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'/views'))
app.set('public', path.join(__dirname, '/public'))


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',

    database: 'sys'
})

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());
function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
// a variable to save a session
var session;

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("mysql connected...")
});

app.listen(3500, (res, req) => {
    console.log("listening to port 3500")
})

app.get('/', (req, res) => {


    res.render("home.ejs")
});
app.get('/views/home', (req, res) => {


    res.render("home.ejs")
});


app.get('/views/dashboard', (req, res) => {
    let sql = 'select * from orders1 '
    db.query(sql, (err, resultorder) => {
        if (err) console.log(err)
        for(let values of resultorder)
        {
            values.odate=convert(values.odate);
        }
        res.render("dashboard.ejs", { resultorder })
    })





});
app.get('/todayorder', (req, res) => {
    let sql = 'select * from orders1 where odate=current_date();'
    db.query(sql, (err, torder) => {
        if (err) console.log(err)
        res.render("todaysorder.ejs", { torder })
    })





});
app.get('/tpo', (req, res) => {
    let sql = 'select * from orders1 where odate=current_date() and status="pending"'
    db.query(sql, (err, torder) => {
        if (err) console.log(err)
        res.render("todayspo.ejs", { torder })
    })





});
app.get('/complete/:oid', (req, res) => {
    let sql = `update orders1  set status="completed" where oid=${req.params.oid}`
    db.query(sql, (err, torder) => {
        if (err) console.log(err)
        // res.render("todayspo.ejs",{torder})
        res.redirect('http://localhost:3500/tpo')
    })





});
app.get('/views/orders', (req, res) => {

    let sql = `select * from staff1 `
    // .js


    db.query(sql, (err, result) => {
        if (err) console.log(err)
        res.render('orders.ejs', { result })
    })

});

app.get('/order-submit', (req, res) => {
    var type = req.query.type
    var table = req.query.table
    var contents = req.query.contents
    var date = req.query.date
    var attendant = req.query.Attendent
    var amount = Number(req.query.Amount)
    var cname = req.query.cname
    var phone = req.query.phone
    var mail = req.query.email

    let sql = `insert into  orders1(otype,descriptions,table_no,odate,attendant,amount,cphone,status) values('${type}','${contents}',${table},current_date(),'${attendant}',${amount},${phone},'pending') `
    // .js
    let sql1 = `select * from customers1 `
    let sql2 = `insert into customers1(cname,phone_no,email) values('${cname}',${phone},'${mail}') `

   
    db.query(sql1, (err1, result1) => {
        if (err1) console.log(err1)
        console.log(result1)
        db.query(sql, (err, results) => {
            if (err) console.log(err)
            // console.log(attendant)
            // res.render('home.ejs', {results})
        })
        var cphone = 0;
        // console.log(attendant)
        // res.render('home.ejs', {results})
        for (let values of result1) {
            console.log(values.phone_no)
            console.log(phone)
            if (values.phone_no === phone) {
                cphone = phone;
                console.log(values)

                break;

            }


        }
        console.log(cphone)
        if (!cphone) {
            db.query(sql2, (err2, result2) => {
                if (err2) console.log(err2)
                console.log(result2)
                console.log(phone)
                // res.render('home.ejs', {results})
            })

        }

        res.render('home.ejs')


    })

});
app.get('/views/login', (req, res) => {




    res.render("login.ejs")
});
app.get('/views/Suppliers', (req, res) => {


    res.render("Suppliers.ejs")
});
//  app.get('/views/Reservation',(req,res)=>{


//     res.render("Reservation.ejs")
//  });
app.get('/views/Inventory',(req,res)=>{
    let inv_query="select * from inventory1"
    let bool =req.query.bool;
    if(bool==0){
        res.locals.bool=0;
    }else{
        res.locals.bool=1;
    }
    db.query(inv_query,(err,result)=>{
        if(err) throw err;
        res.render("Inventory.ejs",{result})
    });

    
 });
 app.get('/addinventory',(req,res)=>{
    let mat_query = "select material_id from inventory1"
    db.query(mat_query,(err,result)=>{
            for(let values of result){
                let material_used=req.query[values.material_id+'qu'];
                let material_submit=req.query[values.material_id+'qs'];
                let diff=Number(material_submit)-Number(material_used);
                let add_query =`update ignore inventory1 set quantity=quantity+${diff} where material_id=${values.material_id}`
                console.log(add_query);
                db.query(add_query,(err,result1)=>{
                });
            }
            res.redirect('/views/Inventory')
    });
 });
app.get('/views/logout', (req, res) => {
    req.session.destroy();


    res.render("login.ejs")
});

app.get('/views/editpage', (req, res) => {
    let sql = `select * from menu1`
    let sql1 = `select * from staff1 where designation='chef'`


    db.query(sql, (err, results1) => {
        if (err) console.log(err)
        res1 = results1;

        db.query(sql1, (err, results2) => {
            if (err) console.log(err)
            res1 = results2;
            console.log(results1)
            console.log(results2)
            res.render("edit.ejs", { results1, results2 })

            // console.log(attendant)
            // res.render('home.ejs', {results})
        })


        // console.log(attendant)
        // res.render('home.ejs', {results})
    })

})
app.get('/views/edit', (req, res) => {

    var name = req.session.username;
    db.query(`select * from staff1 where sname='${name}'`, (err, res1) => {
        if (err) console.log(err);
        else if(res1){
            var des = res1[0]
            console.log(des);
            if(des!==undefined){
                console.log(des.designation);
            }
            

            if (req.session.username === undefined) {
                res.redirect('http://localhost:3500/views/login')
            }
            else if (des.designation === 'Admin' || des.designation === 'Manager') {
                console.log(res1);
                res.redirect('http://localhost:3500/views/editpage')
            }
            else {
                res.render('home.ejs')
            }
        }


    })
});

app.get('/updatemenu', (req, res) => {
    var iname = req.query.iname
    var Availablity = req.query.Availablity
    var chef = req.query.chef
    var Price = Number(req.query.Price)

    let sql = `update  menu1 set availablity='${Availablity}' ,chef='${chef}',price=${Price} where iname='${iname}'`
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        // console.log(attendant)
        // res.render('home.ejs', {results})
        res.redirect('http://localhost:3500/views/Menu')
    })




});

app.get('/additem', (req, res) => {
    var iname = req.query.iname
    var Availablity = req.query.Availablity
    var chef = req.query.chef
    var desc = req.query.desc
    var Price = Number(req.query.Price)

    let sql = `insert ignore into  menu1(iname,availablity,descriptions,price,chef) values ('${iname}','${Availablity}','${desc}',${Price},'${chef}')`
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        // console.log(attendant)
        // res.render('home.ejs', {results})
        res.redirect('http://localhost:3500/views/Menu')
    })
});
app.post('/addmaterial',(req,res)=>{
    let material=req.body.mname;
    let price =req.body.price;
    let iquantity=req.body.iquantity
    let unit_m=req.body.unit_m
    // console.log(req.body);
    // console.log(req.body);
    if(unit_m!=''){
        let add_query =`insert into inventory1(mname,price,quantity,unit_m) values ('${material}',${price},${iquantity},'${unit_m}') `;
        db.query(add_query, (err,result)=>{
            // if(err)throw err;
        });
       
    }else{
        let add_query =`insert into inventory1(mname,price,quantity) values ('${material}',${price},${iquantity}) `;
    db.query(add_query);
    }
    res.redirect('/views/Inventory?bool=0');
})
app.get('/views/Menu', (req, res) => {
    let sql = `select * from menu1 where availablity='available' `

    db.query(sql, (err, menuresult) => {
        if (err) console.log(err)
        // console.log(attendant)
        // res.render('home.ejs', {results})
        res.render("Menu.ejs", { menuresult })
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

app.get('/views/Reservation', (req, res) => {

    let date = req.query.date
    res.locals.date = date;
    console.log(11);
    let a_query = `select table_no from dine_table1 where table_no not in(select table_no from reservation1 where r_date='${date}');`
    if (date != undefined && date != null && date != '') {
        db.query(a_query, (err, result) => {
            console.log(result);
            if (err) throw err;
            res.locals.bool = 0;
            res.render("Reservation.ejs", { result })
            console.log(res.locals)

        })
    } else {
        res.locals.bool = 1;
        let result = {};
        res.render("Reservation.ejs")

    }
});

app.get('/reserve', (req, res) => {
    let cust_num = Number(req.query["Phone Number"]);
    let cust_name = req.query.name;
    let cust_email = req.query.Email;
    let res_table = req.query.table_no;
    let date = req.query.date;
    let pep_count = req.query.num_peop;
    let res_query = `insert  into reservation1(table_no,peoplecount,r_date,c_number) values(${res_table},${pep_count},'${date}',${cust_num})`;
    db.query(res_query, (err, result) => {
        if (err) throw err;
    })
    let sql1 = `select * from customers1 `

    let sql2 = `insert ignore into customers1(cname,phone_no,email) values('${cust_name}',${cust_num},'${cust_email}') `

    db.query(sql2, (err1, result1) => {
        if (err1) console.log(err1)
        console.log(result1)




        res.redirect('http://localhost:3500/views/home');
    })
});

app.get('/login', (req, res) => {
    req.session.username = req.query.username
    var username = req.query.username
    var password = req.query.password
    let sql = `select * from staff1 where sname='${username}'`
    // .js


    db.query(sql, (err, result) => {
        if (err) console.log(err)

        console.log(password)
        console.log(result.spassword)
        if (result.length == 0) {
            res.render('login.ejs')
            // prompt("useremail does not exist")
        }
        else if (result[0].spassword == password) {
            session = req.session
            session.username = req.query.username
            console.log(req.session.username);
            res.render('home.ejs', { result })
        }
        else {
            // res.locals(prom)
            res.render('login.ejs',)
            // prompt("invali password")
        }

    })
})