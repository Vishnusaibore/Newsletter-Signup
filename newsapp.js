const express = require("express")
const bodyParser = require("body-parser")
const request= require("request")
const https = require('node:https');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("static"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
  })
  
app.post("/",(req,res)=>{
    var f_name= req.body.fName
    var l_name= req.body.lName
    var mailid= req.body.email
    //console.log(f_name,l_name,mailid)
    const data={
      members:[
        {
          email_address:mailid,
          status:"subscribed",
          merge_fields:{
            FNAME:f_name,
            LNAME:l_name
          }
        }
      ]
    };

    const jsonData=JSON.stringify(data);
    const url ="https://us21.api.mailchimp.com/3.0/lists/421d2e5d7e"
    const options={
      method:"POST",
      auth:"sanji:a1b4561838c9d3899ea2dea9e7f0b0b6-us21"
    }

    const requ = https.request(url,options,(response)=>{
      if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html")
      }
      else{
        res.sendFile(__dirname + "/failure.html")
      }
 
    })
    requ.write(jsonData);
    requ.end();
})

//adding route for failure page
app.post("/failure",(req,res)=>{
  res.redirect("/")
})

  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  //apikey1 name newsapp
  // cf9fb3a73d769ac6cd9a61f5aa0e5fea-us21
  // List id  421d2e5d7e
  // apikey2 nnewsapp2
  // a1b4561838c9d3899ea2dea9e7f0b0b6-us21