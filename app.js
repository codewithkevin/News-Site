const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/singup.html');
    
});

app.post ("/", function(req, res){

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

   const jsonData = JSON.stringify(data);

   const url = 'https://us14.api.mailchimp.com/3.0/lists/ea8e470090'
   
    const options = {
        method: 'POST',
        auth: 'kevin:de43a02608aff9c8cdfe9e667533e2e5-us14'
    };

   const request = https.request(url, options, function (response) {
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }

        response.on('data', function (data) {
            console.log(JSON.parse(data));
        });
   
    });

   request.write(jsonData);
   request.end();

 

});

app.listen(3000, function () {
    console.log('Server is running on port 3000')
})



//** API_KEY **//
// de43a02608aff9c8cdfe9e667533e2e5-us14

//**Audice */
// ea8e470090

// //**Update */
// const mailchimpClient = require("mailchimp_transactional")("YOUR_API_KEY");

// const run = async () => {
//   const response = await mailchimpClient.templates.update({ name: "name" });
//   console.log(response);
// };

// run();
