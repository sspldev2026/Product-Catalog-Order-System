# Product-Catalog-Order-System

## Run Backend
    cd server
    npm install
    npm run dev

## Run FrontEnd
    cd client
    npm install
    npm serve

## Run seeding file 
    npm run seed 

## what should happen if two orders for the last unit of a product arrive close together?

 steps to haddle the race condition

1. When an order is placed, check whether the product's stock is greater than zero.
2. Decrease the stock in the same database operation (or inside a database transaction).
3. If the stock update succeeds, continue creating the order.
4. If the stock is already 0, reject the order with a message such as "Product is out of stock."