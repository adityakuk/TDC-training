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

// Shops PATCH
app.patch('/shops/:id', async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const { id } = req.params;
        const { name, description, address, pincode } = req.body;
        const existingShop = await prisma.shop.findUnique({
            where: {
                id: id
            }
        });

        if (!existingShop) {
            return res.status(404).json({ error: "Shop not found" });
        }
        const updatedShop = await prisma.shop.update({
            where: {
                id: id
            },
            data: {
                name: name || existingShop.name,
                description: description || existingShop.description,
                address: address || existingShop.address,
                pincode: pincode || existingShop.pincode,
            }
        });

        res.status(200).json(updatedShop);
    } catch (error) {
        console.error("Error updating shop:", error);
        res.status(500).json({ error: "Failed to update shop" });
    }
});

// Shops DELETE
app.delete('/shops/:id', async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const { id } = req.params;
        const existingShop = await prisma.shop.findUnique({
            where: {
                id: id
            }
        });
        if (!existingShop) {
            return res.status(404).json({ error: "Shop not found" });
        }
        await prisma.shop.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({ message: "Shop deleted successfully" });
    } catch (error) {
        console.error("Error deleting shop:", error);
        res.status(500).json({ error: "Failed to delete shop" });
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

// Shops Items PATCH
app.patch('/shop_items/:id', async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const existingShopItem = await prisma.ShopItem.findUnique({
            where: {
                id: id
            }
        });
        if (!existingShopItem) {
            return res.status(404).json({ error: "Shop items not found" });
        }
        const updatedShopItems = await prisma.ShopItem.update({
            where: {
                id: id
            },
            data: {
                name: name || existingShopItem.name,
                description: description || existingShopItem.description,
                price: price || existingShopItem.price,
            }
        });

        res.status(200).json(updatedShopItems);
    } catch (error) {
        console.error("Error updating shop Items:", error);
        res.status(500).json({ error: "Failed to update shop items" });
    }
});

// Shops Items DELETE
app.delete('/shop_items/:id', async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const { id } = req.params;
        const existingShopItems = await prisma.ShopItem.findUnique({
            where: {
                id: id
            }
        });
        if (!existingShopItems) {
            return res.status(404).json({ error: "Shop not found" });
        }
        await prisma.ShopItem.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({ message: "Shop Items deleted successfully" });
    } catch (error) {
        console.error("Error deleting shop items:", error);
        res.status(500).json({ error: "Failed to delete shop Items" });
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

app.listen(port, () => {
    console.log('listening on port 4000')
})

