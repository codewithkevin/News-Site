const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/singup.html');
    
});

app.post ("/", function(req, res){

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
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

   var jsonData = JSON.stringify(data);
   
   console.log (jsonData)

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
