const express = require('express');
const morgan = require('morgan');

const vali = require("validator");

const app = express();
app.use(morgan('dev'));

app.get('/greetings/:name', (req, res) => {
    res.send(`hello ${req.params.name}!`);
});

app.get('/roll/:num' , (req , res) => {
    const num = req.params.num;
    if(vali.isNumeric(num)){
        let rando = Math.ceil(Math.random()*num);
        res.send(`you rolled ${rando}`);
    }else{
        res.send('not a number');
    }

});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:indx' , (req , res) => {
    const indx =req.params.indx;
    if(indx<collectibles.length){
    res.send(`you want ${collectibles[indx].name} for ${collectibles[indx].price}`);
    }else{
        res.send('out of stock');
    }
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    

    const min = req.query.min
    const max = req.query.max
    const type = req.query.type

        let qShoes =shoes
    if(!!req.query.min){
        qShoes = qShoes.filter(shoe => shoe.price>Number(min));
    }
    if(!!req.query.max){
        qShoes = qShoes.filter(shoe => shoe.price<Number(max));
    }
    if(!!req.query.type){
        qShoes = qShoes.filter(shoe => shoe.type === type);
    }
    res.send(qShoes);
})





app.listen(3000 , () => {
    console.log('Listening on port 3000');
});

