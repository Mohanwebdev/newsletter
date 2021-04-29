const express=require('express');
const request=require('request');
const https=require('https');


const app=express();

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){


res.sendFile(__dirname+"/signup.html");
})

app.post('/',function (req,res) {
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }

    var jsonData=JSON.stringify(data);

    const url= 'https://us1.api.mailchimp.com/3.0/lists/20268fd59a';
  

    const options={
        method :'POST',
        auth :'hider:946f7aa8d42cf87d3f3b30028f6477d2-us1'
    }
   
const request=https.request(url,options,function(response){
if(response.statusCode===200){
    res.sendFile(__dirname+'/success.html');
}else{
    res.sendFile(__dirname+'/failure.html');
}

})
request.write(jsonData);
request.end();
})

app.get("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT,function(){
    console.log("server is started at port 3000");
});



// api key
// b91693167953a6f0d75280b840392f1f-us1

// list id 
// 20268fd59a
