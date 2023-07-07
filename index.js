var express = require("express");
let bodyParser = require("body-parser");
var app = express();
let port = 3070;
const cors = require('cors');
//Array to hold product
const products = [{ id: 1, productName: "p1", price: "$20" }, { id: 2, productName: "p2", price: "$30" }];
app.use(bodyParser.json());
app.use(cors());
//Default 
app.get("/", function (req, res) {
    res.send("App works!!");
})
//reauest to get all products
app.get("/products", function (req, res) {
    res.json(products);
});
//request to get all products based on productId
app.get("/products/:id", function (req, resp) {
    console.log(req);
    let product = products.filter((product) => product.id == req.params.id )
    resp.json(product);
})
//request to add product
app.post("/products/add", function (req, resp) {
    const dataLemgth = products.length;
    const obj = {
        id: Math.floor(Math.random() * 100),
        productName: req.body.productName,
        price: req.body.price
    };
    products.push(obj);
    resp.json(products);
   
})
//request to update product
app.post("/product/update", function (req, resp) {
    
    const index = products.findIndex(ele => ele.id == req.body.id);
    if (index == -1) {
        resp.send(`Invalid ProductId: ${req.params.id}`)
    } else {
        products.forEach(element => {
            if (element.id == req.body.id) {
                element.productName = req.body.productName;
                element.price = req.body.price;
            }
        });
    }
    resp.send(products)
})
//request to delete product
app.delete("/product/delete/:id",function(req,resp){
    const index=products.findIndex(ele=>ele.id==req.params.id);
    if (index==-1) {
        resp.send(`Invalid ProductId: ${req.params.id}`);
    } else {
       products.splice(index,1)
    }
    resp.send(products)
})
//request for random api call
app.get("*", function (req, resp) {
    resp.send("App Works!!");
})
app.listen(port, function (err) {
    console.log("running server on from port:::::::" + port);
});