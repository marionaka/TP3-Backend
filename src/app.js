import express from "express";
import ProductManager from "./ProductManager.js"


const app = express();
const productManager = new ProductManager();


app.use(express.urlencoded({extended: true}));


app.get("/products", async (req,res)=>{
    let limit = req.query.limit;
    console.log(limit);
    if(limit!=="0"){
        try{
            await productManager.readProductsFile();
            let allProducts = await productManager.getProducts();
            let productosFiltrados = allProducts.slice(0,limit);
            res.send(productosFiltrados);
        }
        catch(err){
            res.send(err);
        }    
    } else{
        let productosFiltrados = ""
        res.send(productosFiltrados);
    }
    
});

app.get("/products/:id", async (req,res)=>{
    try{
        await productManager.readProductsFile();
        let allProducts = await productManager.getProducts();
        let ret = allProducts.find((products)=>{
            return products.id == req.params.id;
            
        });
        console.log(ret);
        res.send(ret);   
    }
    catch(err){
        res.send(err);
    }      
     
});

app.listen(8080, ()=>{
    console.log("Estoy escuchando el 8080")
});