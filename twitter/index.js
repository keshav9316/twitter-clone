const express = require('express');
const port = 5000;
const cors = require('cors');
const monk = require('monk');

//database
 const db = monk('localhost/database'); //create database
 const collection = db.get('collection');//create collection
//
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('hello'));

app.get('/mews', (req,res) =>{
   // collection.find().then(searched => {res.json(searched);});
    collection.find().then(searched => res.json(searched));
});

app.post('/mews',(req,res) => {

    function isValid(body){
        const bool = body.name && body.name.toString().trim() !== '' &&
                     body.content && body.content.toString().trim() !== ''  ;
        return bool;
    }

    if(isValid(req.body)){
        const name = req.body.name.toString();
        const content = req.body.content.toString();
        const mews = {
            name,
            content,
            date: new Date()
        };
       
 collection
           .insert(mews)
           .then(inserted => res.json({inserted, status: "success"}));
    }else{
      //  res.Status(422);
        res.json({
        message : "invalid argument : name & content required"
    });
   }
});

app.listen( port, () => console.log(`Example app listening on port ${port}`)); 