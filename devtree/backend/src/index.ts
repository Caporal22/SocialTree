import colors from 'colors';
import server from './server';

const app = server;

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(colors.magenta.italic('Server is running on port:'), port);
});


/* PRÁCTICA 
let productName = "Tablet";
let isAutomatic = true;
let price = 50;

interface Product  {
    id: number;
    price: number;
    name: string;
}

type ProductId  = Pick<Product, 'id'>;

let product3 : ProductId = {
    id : 1
}

let product : Product = {
    id : 1,
    price : 30,
    name: "Smartphone"
}

let product2 : Product = {
    id : 2,
    price : 30,
    name: "Smartphone",
    // image: "image.jpg"
}
    */
