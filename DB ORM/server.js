const express = require('express')
const { Prisma, PrismaClient } = require('@prisma/client')

const app = express()
const port = 4000

app.use(express.json())

// Users get 
app.get('/users', async (req, res) => {
    const prisma = new PrismaClient()
    const allUsers = await prisma.user.findMany({
        include: {
            Shops: true,
            orders: true,
        }
    })
    res.status(200).send(allUsers)
})

// users post 
app.post('/users', async (req, res) => {
    const prisma = new PrismaClient()
    const { name, email } = req.body
    const CreateUser = await prisma.user.create({
        data: {
            name,
            email
        }
    })
    res.status(201).json(CreateUser)
})

// Shops Get 
app.get('/shops', async (req, res) => {
    const prisma = new PrismaClient()
    const allShops = await prisma.shop.findMany({
        include: {
            user: true
        }
    })
    res.status(200).send(allShops)
})

// Shops POST 
app.post('/shops', async (req, res) => {
    const prisma = new PrismaClient()
    try {
        const { name, description, address, pincode, userId } = req.body;
        if (!name || !description || !address || !pincode || !userId) {
            return res.status(400).json({ error: "Name, description, address, and pincode, userId are required fields" });
        }
        const createShop = await prisma.shop.create({
            data: {
                name, description, address, pincode, ownerId: userId
            }
        });
        res.status(201).json(createShop);
    } catch (error) {
        console.error("Error creating shop:", error);
        res.status(500).json({ error: "Failed to create shop" });
    }
});

// shop_items GET
app.get('/shop_items', async (req, res) => {
    const prisma = new PrismaClient()
    const allShop_items = await prisma.ShopItem.findMany({
        include: {
            shop: true
        }
    })
    res.status(200).send(allShop_items)
})


// shop_item POST 
app.post('/shop_items', async (req, res) => {
    const prisma = new PrismaClient()
    try {
        const { name, description, price, shopId } = req.body;
        if (!name || !description || !price || !shopId) {
            return res.status(400).json({ error: "Name, description, price, and shopId are required fields" });
        }
        const createShopItems = await prisma.ShopItem.create({
            data: {
                name, description, price, shopId
            }
        });
        res.status(201).json(createShopItems);
    } catch (error) {
        console.error("Error creating shop items:", error);
        res.status(500).json({ error: "Failed to create shop items" });
    }
});

//Order GET
app.get('/orders', async (req, res) => {
    const prisma = new PrismaClient()
    try {
        const allOrders = await prisma.orders.findMany({
            include: {
                user: true,
            }
        })
        res.status(200).send(allOrders)
    } catch (error) {
        console.error("Error creating orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
})

// Order POST
app.post('/orders', async (req, res) => {
    const prisma = new PrismaClient()
    try {
        const { subtotal_at_purchase, shipping_address, billing_address, estimated_delivery_date, orderId } = req.body;
        if (!subtotal_at_purchase || !shipping_address || !billing_address || !estimated_delivery_date || !orderId) {
            return res.status(400).json({ error: "subtotal_at_purchase, shipping_address, billing_address, estimated_delivery_date, and orderId  are required fields" });
        }
        const createOrders = await prisma.orders.create({
            data: {
                subtotal_at_purchase, shipping_address, billing_address, estimated_delivery_date, orderId
            }
        });
        res.status(201).send(createOrders)
    } catch (error) {
        console.error("Error creating Orders:", error);
        res.status(500).json({ error: "Failed to create Orders" });
    }
})




//Order Items GET
app.get('/order_items', async (req, res) => {
    const prisma = new PrismaClient()
    try {
        const allOrder_Items = await prisma.orderItems.findMany({
            include: {
                orders: true
            }
        })
        res.status(200).send(allOrder_Items)
    } catch (error) {
        console.error("Error creating orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
})


// Order Items POST
app.post('/order_items', async (req, res) => {
    const prisma = new PrismaClient()
    try {
        const { price_at_purchase, quantity, ordersId } = req.body;
        if (!price_at_purchase || !quantity || !ordersId) {
            return res.status(400).json({ error: "price_at_purchase, quantity, ordersId, and ordersId are required fields" });
        }
        const createOrderItems = await prisma.orderItems.create({
            data: {
                price_at_purchase, quantity, ordersId
            }
        });
        res.status(201).send(createOrderItems)
    } catch (error) {
        console.error("Error creating Order items:", error);
        res.status(500).json({ error: "Failed to create Order items" });
    }
})

// id String @id @default(uuid())
// price_at_purchase String 
// quantity String

// ordersId String @map("orders_id")

app.listen(port, () => {
    console.log('listening on port 4000')
})

