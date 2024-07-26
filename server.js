var express=require("express");
var mysql2=require("mysql2");
var fileuploader=require("express-fileupload");
const { enable } = require("express/lib/application");
let app=express();
app.use(express.static("public"));
app.use(express.urlencoded("true"));
app.use(fileuploader());

app.listen(2001,function()
{
    console.log("the server started for the project")
})
let config=
{
    host:"bw0sxjo6te5zaem14xoj-mysql.services.clever-cloud.com",
    user:"uyktogz7sg8rce65",
    password:"t6G8frl5MXHK3IbuZv8X",
    database:"bw0sxjo6te5zaem14xoj",
    dateStrings:true ,
    keepAliveDelay: 10000,
    enablekeepalive: true

}
/*let config=
{
    host:"127.0.0.1",
    user:"root",
    password:"Ruchi@01",
    database:"project",
    dateStrings:true  
}**/
var mysql=mysql2.createConnection(config);
mysql.connect(function(err)
{
    if (err==null)
        console.log("the date base is connected as well");
    else
    console.log(err.message)
})
app.get("/",function(req,resp)
{
    let path=__dirname+"/public/index.html";
    resp.sendFile(path);
})
app.get("/inf-dash",function(req,resp)
{
    let path=__dirname+"/public/infl-dash.html";
    resp.sendFile(path);
})
app.get("/logo",function(req,resp)
{
    let path=__dirname+"/public/pics/removeddd.png";
    resp.sendFile(path);
})
app.get("/pic2",function(req,resp)
{
    let path=__dirname+"/public/pics/8803202.jpg";
    resp.sendFile(path);
})
app.get("/pic1",function(req,resp)
{
    let path=__dirname+"/public/pics/new.jpg";
    resp.sendFile(path);
})
app.get("/new1",function(req,resp)
{
    let path=__dirname+"/public/pics/promo.jpg";
    resp.sendFile(path);
})
app.get("/new2",function(req,resp)
{
    let path=__dirname+"/public/pics/collab.jpg";
    resp.sendFile(path);
})
app.get("/new3",function(req,resp)
{
    let path=__dirname+"/public/pics/8893854.jpg";
    resp.sendFile(path);
})
app.get("/new4",function(req,resp)
{
    let path=__dirname+"/public/pics/meet_reet.jpg";
    resp.sendFile(path);
})
app.get("/inf-prof",function(req,resp)
{
    let path=__dirname+"/public/inf-profile.html";
    resp.sendFile(path);
})
app.get("/prof",function(req,resp)
{
    let path=__dirname+"/public/pics/profile.jpg";
    resp.sendFile(path);
})
app.get("/booking",function(req,resp)
{
    let path=__dirname+"/public/pics/bookings.jpg";
    resp.sendFile(path);
})
app.get("/event_manage",function(req,resp)
{
    let path=__dirname+"/public/pics/event_management.jpg";
    resp.sendFile(path);
})
app.get("/event_management",function(req,resp)
{
    let path=__dirname+"/public/event_management.html";
    resp.sendFile(path);
})
app.get("/setting",function(req,resp)
{
    let path=__dirname+"/public/pics/settings.jpg";
    resp.sendFile(path);
})
app.get("/signup-process",function(req,resp)
{ console.log(req.query)
    let email=req.query.txtemail;
    let pwd=req.query.txtpwd;
    let utype=req.query.combo;
    mysql.query("insert into users values(?,?,?,?)",[email,pwd,utype,1],function(err)
{
    if(err==null)
        {resp.send("signed up succesfully");}
    else
   { resp.send(err.message);}
})
})
app.get("/login-process",function(req,resp)
{
    let txtemaill=req.query.txtemaill;
    let txtpwdd=req.query.txtpwdd;
    mysql.query("select * from users where email=? and pwd=?",[txtemaill,txtpwdd],function(err,result)
{
    if (err!=null)
        {resp.send(err.message);
    return;}
    if(result.length==0)
        {
            resp.send("invalid id or password");
            return;
        }

      if(result[0].status==1)
        {
            resp.send(result[0].utype);
          /*if(result[0].utype==1)
                {
                    resp.send("influencer");
                }
            else
            {
                resp.send("collaborator");
            }*/
            return;
        }
        else
        resp.send("you are blocked due to your multiple complaints");      
})
})
app.get("/post-event",function(req,resp)
{
    let eemail=req.query.eemail;
    let etitle=req.query.etitle;
    let edate=req.query.edate;
    let etime=req.query.etime;
    let ecity=req.query.ecity;
    let evenue=req.query.evenue;
    console.log(req.query)
    mysql.query("insert into eventss values(?,?,?,?,?,?)",[eemail,etitle,edate,etime,ecity,evenue],function(err)
{
    if(err==null)
        {resp.send("event posted");}
    else
   { resp.send(err.message);}
})
})
app.post("/profile-save",function(req,resp)
{
    let fileName="";
    if(req.files!=null)
        {
            fileName=req.files.ppic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        fileName="nopic.jpg";
    let ary=req.body.ifield;
    let str;
    if(Array.isArray(ary))
        {
         str="";
    for(i=0;i<ary.length;i++)
        {
            str+=ary[i]+",";
        }
    console.log(str);
        }
        else
        str=ary;
   let name=  req.body.iname;
   let gender=req.body.igender;
   let add=req.body.iaddress;
   let dob=req.body.idob;
   let city=req.body.icity;
   let cont=req.body.icontact;
   /*let field=req.body.ifield;*/
   let insta=req.body.iinsta;
   let fb=req.body.ifb;
   let youtube=req.body.iyoutube;
   let other=req.body.iothers;
   let email=req.body.iemail;
    console.log(req.body);
    mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[email,name,gender,dob,add,city,cont,str,insta,fb,youtube,fileName,other],function(err)
{
    if(err==null)
        {
            resp.send("saved");
        }
        else
        {
        resp.send(err.message);
        }
})
})
app.post("/profile-update",function(req,resp)
{
    let fileName="";
    if(req.files!=null)
        {
            fileName=req.files.ppic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        {
            fileName=req.body.hdn;
        }
        let ary=req.body.ifield;
        let str;
        if(Array.isArray(ary))
            {
             str="";
        for(i=0;i<ary.length;i++)
            {
                str+=ary[i]+",";
            }
        console.log(str);
            }
            else
            str=ary;
       let name=  req.body.iname;
       let gender=req.body.igender;
       let dob=req.body.idob;
       let add=req.body.iaddress;
       let city=req.body.icity;
       let cont=req.body.icontact;
       let insta=req.body.iinsta;
       let fb=req.body.ifb;
       let youtube=req.body.iyoutube;
       let other=req.body.iothers;
       let email=req.body.iemail;
        console.log(req.body);
mysql.query("update iprofile set iname=?, gender=?, dob=?, address=?, city=?, contact=?, field=?, insta=?, fb=?, youtube=?, picpath=?, other=? where emailid=?",[name,gender,dob,add,city,cont,str,insta,fb,youtube,fileName,other,email],function(err,result)
{
    if(err==null)//no error
        {
               if(result.affectedRows>=1) 
                   resp.send("Updated  Successfulllyyyy");
                else
                    resp.send("Invalid Email ID");
        }
    else
        resp.send(err.message);
    })

})
app.get("/find-user-details",function(req,resp)
{
    console.log("API called");
    let emailid= req.query.iemail;
   
    mysql.query("select * from iprofile where emailid=?",[emailid],function(err,jsonaray){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        console.log(jsonaray);
            resp.send(jsonaray);//sending array of json object 0-1
})
})

app.get("/admin_dash",function(req,resp)
{
    let path=__dirname+"/public/admin_pannel.html";
    resp.sendFile(path);
})
app.get("/pannel",function(req,resp)
{
    let path=__dirname+"/public/pics/user_manager.jpg";
    resp.sendFile(path);
})
app.get("/console",function(req,resp)
{
    let path=__dirname+"/public/pics/influencerconsole.jpg";
    resp.sendFile(path);
})
app.get("/settings",function(req,resp)
{
    let path=__dirname+"/public/pics/settings.jpg";
    resp.sendFile(path);
})
app.get("/all_user",function(req,resp)
{
    let path=__dirname+"/public/admin_users.html";
    resp.sendFile(path);
})
app.get("/fetch-all",function(req,resp)
{
    mysql.query("select * from users",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })
})
app.get("/del-one",function(req,resp)
{
    mysql.query(" delete from users where email=?",[req.query.email],function(err,resultJsonAry)
{
if(err!=null)
    {
        resp.send(err.message);
        return;
    }
    resp.send(resultJsonAry);
})
})
app.get("/block-one",function(req,resp)
{
    mysql.query(" update users set status=? where email=?",[0,req.query.email],function(err,resultJsonAry)
{
if(err!=null)
    {
        resp.send(err.message);
        return;
    }
    resp.send(resultJsonAry);
})
})
app.get("/unblock-one",function(req,resp)
{
    mysql.query(" update users set status=? where email=?",[1,req.query.email],function(err,resultJsonAry)
{
if(err!=null)
    {
        resp.send(err.message);
        return;
    }
    resp.send(resultJsonAry);
})
})

app.get("/all_influencer",function(req,resp)
{
    let path=__dirname+"/public/inflencer_console.html";
    resp.sendFile(path);
})
app.get("/fetch_influ",function(req,resp)
{
    mysql.query("select * from iprofile",function(err,resultJsonAry)
{
    if(err!=null)
        {
            resp.send(err.message);
            return;
        }
        resp.send(resultJsonAry);
})
})
app.get("/find_influ",function(req,resp)
{
    let path=__dirname+"/public/influ_finder.html";
    resp.sendFile(path);
})
app.get("/show-city",function(req,resp)
{   console.log(req.query.field);
    mysql.query(" select distinct city from iprofile where field like ?",["%"+req.query.field+"%"],function(err,resultJsonAry)
    {
    if(err!=null)
        {
            resp.send(err.message);
            return;
        }
   else
   {
   // console.log(JSON.stringify(resultJsonAry));
    resp.send(resultJsonAry);
   }
        
    })
    })
app.get("/do-find",function(req,resp)
{
    mysql.query("select * from iprofile where field like ? && city like ?",["%"+req.query.field+"%","%"+req.query.city+"%"],function(err,resultJsonAry)
{
    if(err!=null)
        {
            resp.send(err.message);
            return;

        }
       
   resp.send(resultJsonAry);

})
})


app.get("/fetch-all-event",function(req,resp)
{   let email=req.query.infemail
    mysql.query("select * from eventss where emailid=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            console.log(resultJsonAry)
       resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/delevent",function(req,resp)
{
    mysql.query(" delete from eventss where events=?",[req.query.events],function(err,resultJsonAry)
{
if(err!=null)
    {
        resp.send(err.message);
        return;
    }
    resp.send("deleted");
})
})
app.get("/update-check",function(req,resp)
{
    let email= req.query.semail;
    let oldpwd= req.query.spass;
    let newpwd= req.query.spassnew;
    let reppwd= req.query.spassrep;

   
mysql.query("select * from users where email=? && pwd=?",[email,oldpwd],function(err,resultJsonAry)
{
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        if(resultJsonAry.length==0) 
            resp.send("Invalid User id or Pwd");
        else{
            if(newpwd==reppwd){
                mysql.query("update users set pwd=? where email=?", [newpwd, email ], function (err, result) {
                    if (err == null) {
                        resp.send("successfully changed the password");
                    }
                    else
                        console.log(err.message);
                }) 
            }
            else{
                resp.send("repeat  password doesnot match with new password")
            }
        }
            
    })

})
app.get("/client-prof",function(req,resp)
{
    let path=__dirname+"/public/client-profile.html";
    resp.sendFile(path);
})

app.post("/cprofile-save",function(req,resp)
{
    let fileName="";
    if(req.files!=null)
        {
            fileName=req.files.ppic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        fileName="nopic.jpg";
    let ary=req.body.ctype;
    let str;
    if(Array.isArray(ary))
        {
         str="";
    for(i=0;i<ary.length;i++)
        {
            str+=ary[i]+",";
        }
    console.log(str);
        }
        else
        str=ary;
   let name=  req.body.cname;
   let add=req.body.caddress;
   let cont=req.body.ccontact;
   let org=req.body.corganisation;
   let email=req.body.cemail;
    console.log(req.body);
    mysql.query("insert into cprofile values(?,?,?,?,?,?,?)",[email,name,add,cont,org,str,fileName],function(err)
{
    if(err==null)
        {
            resp.send("saved");
        }
        else
        {
        resp.send(err.message);
        }
})
})
app.post("/cprofile-update",function(req,resp)
{
    let fileName="";
    if(req.files!=null)
        {
            fileName=req.files.ppic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        {
            fileName=req.body.hdn;
        }
        let ary=req.body.ctype;
        let str;
        if(Array.isArray(ary))
            {
             str="";
        for(i=0;i<ary.length;i++)
            {
                str+=ary[i]+",";
            }
        console.log(str);
            }
            else
            str=ary;
            let name=  req.body.cname;
            let add=req.body.caddress;
            let cont=req.body.ccontact;
            let org=req.body.corganisation;
            let email=req.body.cemail;
             console.log(req.body);
        console.log(req.body);
mysql.query("update cprofile set cname =?,caddress =?,ccontact=?,corganisation=?,ctype=?,picpath=? where cemailid=?",[name,add,cont,org,str,fileName,email],function(err,result)
{
    if(err==null)//no error
        {
               if(result.affectedRows>=1) 
                   resp.send("Updated  Successfulllyyyy");
                else
                    resp.send("Invalid Email ID");
        }
    else
        resp.send(err.message);
    })

})
app.get("/cfind-user-details",function(req,resp)
{
    console.log("API called");
    let emailid= req.query.cemail;
   
    mysql.query("select * from cprofile where cemailid=?",[emailid],function(err,jsonaray){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        console.log(jsonaray);
            resp.send(jsonaray);//sending array of json object 0-1
})
})
app.get("/finding",function(req,resp)
{
    let path=__dirname+"/public/pics/2808802.jpg";
    resp.sendFile(path);
})
app.get("/findinginflu",function(req,resp)
{
    let path=__dirname+"/public/influ_finder.html";
    resp.sendFile(path);
})
app.get("/aupdate-check",function(req,resp)
{
    let email= req.query.aemail;
    let oldpwd= req.query.apass;
    let newpwd= req.query.apassnew;
    let reppwd= req.query.apassrep;

   
mysql.query("select * from users where email=? && pwd=?",[email,oldpwd],function(err,resultJsonAry)
{
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        if(resultJsonAry.length==0) 
            resp.send("Invalid User id or Pwd");
        else{
            if(newpwd==reppwd){
                mysql.query("update users set pwd=? where email=?", [newpwd, email ], function (err, result) {
                    if (err == null) {
                        resp.send("successfully changed the password");
                    }
                    else
                        console.log(err.message);
                }) 
            }
            else{
                resp.send("repeat  password doesnot match with new password")
            }
        }
            
    })

})



