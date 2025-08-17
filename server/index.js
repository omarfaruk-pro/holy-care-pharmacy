const express = require('express');
const Stripe = require('stripe');
const admin = require("firebase-admin");
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors());
app.use(express.json());


const stripe = new Stripe(process.env.STRIPE_SK);


const decodedFB = Buffer.from(process.env.FIREBASE_TOKEN_KEY, 'base64').toString('utf8');
const serviceAccount = JSON.parse(decodedFB);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Unauthorized Access no header' })
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access no token' })
    }
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.decoded = decoded;
        next();
    }
    catch (error) {
        return res.status(401).send({ message: 'Unauthorized Access invalid token' })
    }
}

const verifyEmail = (req, res, next) => {
    if (req.query.email != req.decoded.email) {
        return res.status(401).send({ message: 'Unauthorized Access not email match' })
    }
    next();
}


app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Stripe error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@practice1.stkfhhm.mongodb.net/?retryWrites=true&w=majority&appName=practice1`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const usersCollection = client.db('holyCare').collection('users');
        const bannerCollection = client.db('holyCare').collection('banners');
        const productsCollection = client.db('holyCare').collection('products');
        const cartCollection = client.db('holyCare').collection('cart');
        const orderCollection = client.db('holyCare').collection('orders');
        const categoriesCollection = client.db('holyCare').collection('categories');
        const offerInfoCollection = client.db('holyCare').collection('offerInfo');

        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if (user.role !== 'admin') {
                return res.status(401).send({ message: 'Unauthorized Access as Admin' })
            }
            next();
        }


        app.get('/users', async (req, res) => {
            try {
                const email = req.query.email;
                const { role } = req.query;
                let query = {};
                if (role && role !== 'all') {
                    query = { role: role };
                }
                if (email) {
                    query = { email: email };
                }
                const users = await usersCollection.find(query).toArray();
                res.send(users);
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        app.get('/user/role', async (req, res) => {
            try {
                const email = req.query.email;
                const query = { email: email };
                const user = await usersCollection.findOne(query);
                res.send(user);
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        app.post('/users', async (req, res) => {
            try {
                const { email, name, photoURL, role } = req.body;

                if (!email) {
                    return res.status(400).json({ error: 'Email is required' });
                }

                const existingUser = await usersCollection.findOne({ email });
                const currentTime = new Date().toISOString();

                if (!existingUser) {
                    const newUser = {
                        email,
                        name: name || '',
                        photoURL: photoURL || '',
                        role: role || 'user',
                        createdAt: currentTime,
                        lastLogin: currentTime,
                    };

                    const insertResult = await usersCollection.insertOne(newUser);
                    return res.send(insertResult);
                } else {
                    const updateData = {
                        name: name || existingUser.name,
                        photoURL: photoURL || existingUser.photoURL,
                        lastLogin: currentTime,
                    };

                    const result = await usersCollection.updateOne({ email }, { $set: updateData });
                    return res.send(result);
                }
            } catch (error) {
                console.error('Error in /users:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // this is for track user login and registration
        app.patch('/users/:email', verifyToken, verifyEmail, async (req, res) => {
            const email = req.params.email;
            const updateData = req.body;

            try {
                const result = await usersCollection.updateOne(
                    { email },
                    { $set: updateData }
                );
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: 'Failed to update user' });
            }
        });

        // this is for update user role
        app.patch('/users/:id/role', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const { role } = req.body;

            if (!['user', 'admin'].includes(role)) {
                return res.status(400).json({ error: 'Invalid role' });
            }

            const result = await usersCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { role } }
            );

            res.send(result);
        });





        // all api for banner
        app.get('/banners', async (req, res) => {
            const active = req.query.active;
            let query = {};
            if (active) {
                query = { status: "active" };
            }
            const result = await bannerCollection.find(query).sort({ createdAt: 1 }).toArray();
            res.send(result);
        })

        app.post('/banners', verifyToken, async (req, res) => {
            const banner = req.body;
            const result = await bannerCollection.insertOne(banner);
            res.send(result);
        })

        app.patch('/banners/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const { status } = req.body;

            if (!['active', 'inactive'].includes(status)) {
                return res.status(400).send({ error: 'Invalid status value' });
            }

            const result = await bannerCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { status } }
            );

            res.send(result);
        });

        app.delete('/banners/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const result = await bannerCollection.deleteOne({ _id: new ObjectId(id) });

            res.send(result);
        });


        // All api for products
        app.get('/products', async (req, res) => {
            try {
                const search = req.query.search || '';
                const sort = req.query.sort === 'desc' ? -1 : 1;

                const query = {
                    name: { $regex: search, $options: 'i' }
                };

                const products = await productsCollection
                    .find(query)
                    .sort({ name: sort })
                    .toArray();

                res.send(products);
            } catch (err) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        app.get('/products/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const product = await productsCollection.findOne(query);
                res.send(product);
            } catch (err) {
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        app.post('/products', verifyToken, async (req, res) => {
            try {
                const product = req.body;
                const result = await productsCollection.insertOne(product);
                res.send(result);
            } catch (error) {
                res.status(500).json({ error: 'Failed to add product' });
            }
        });


        app.put('/products/:id', verifyToken, async (req, res) => {
            try {
                const id = req.params.id;
                const updatedProduct = req.body;
                const result = await productsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
                res.send(result);
            } catch (error) {
                res.status(500).json({ error: 'Failed to update product' });
            }
        });

        app.delete('/products/:id', verifyToken, async (req, res) => {
            try {
                const id = req.params.id;
                const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
                res.send(result);
            } catch (error) {
                res.status(500).json({ error: 'Failed to delete product' });
            }
        });



        // all api for cart
        app.get('/cart/:userId', verifyToken, async (req, res) => {
            const { userId } = req.params;

            try {
                const cartItems = await cartCollection
                    .find({ userId })
                    .toArray();

                res.send(cartItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                res.status(500).send({ error: 'Failed to fetch cart items' });
            }
        });


        app.post('/cart', verifyToken, async (req, res) => {
            const { userId, productId, quantity = 1 } = req.body;

            if (!userId || !productId) {
                return res.status(400).json({ message: 'Missing userId or productId' });
            }

            try {
                const existing = await cartCollection.findOne({ userId, productId });

                if (existing) {
                    const result = await cartCollection.updateOne(
                        { userId, productId },
                        { $inc: { quantity: quantity } }
                    );
                    return res.send(result);
                } else {
                    const result = await cartCollection.insertOne({
                        userId,
                        productId,
                        quantity,
                        addedAt: new Date(),
                    });
                    return res.send(result);
                }
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
        });


        app.delete('/cart/:userId/clear', verifyToken, async (req, res) => {
            const userId = req.params.userId;
            const result = await cartCollection.deleteMany({ userId });
            res.send(result);
        });

        app.delete('/cart/:userId/:productId', verifyToken, async (req, res) => {
            const { userId, productId } = req.params;
            const result = await cartCollection.deleteOne({
                userId,
                productId
            });
            res.send(result);
        });

        app.get('/cart/aggregate/:userId', verifyToken, async (req, res) => {
            const userId = req.params.userId;
            try {
                const result = await cartCollection.aggregate([
                    {
                        $match: { userId }
                    },
                    {
                        $addFields: {
                            productObjId: { $toObjectId: '$productId' }
                        }
                    },
                    {
                        $lookup: {
                            from: 'products',
                            localField: 'productObjId',
                            foreignField: '_id',
                            as: 'product'
                        }
                    },
                    {
                        $unwind: '$product'
                    },
                    {
                        $project: {
                            userId: 1,
                            quantity: 1,
                            product: 1,
                        }
                    }
                ]).toArray();

                res.send(result);
            } catch (error) {
                console.error('Aggregation error:', error);
                res.status(500).json({ error: 'Failed to fetch cart items' });
            }
        });


        // all api for orders
        app.get('/orders', async (_, res) => {
            const orders = await orderCollection.find().toArray();
            res.send(orders);
        })

        app.get('/orders/user/:userId', verifyToken, async (req, res) => {
            const { userId } = req.params;
            const orders = await orderCollection.find({ userId }).toArray();
            res.send(orders);
        });

        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        app.get('/invoice/:orderId', async (req, res) => {
            const { orderId } = req.params;
            const result = await orderCollection.findOne({ _id: new ObjectId(orderId) });
            res.send(result);
        });

        app.patch('/orders/:orderId', verifyToken, async (req, res) => {
            const { orderId } = req.params;
            const { status } = req.body;
            const result = await orderCollection.updateOne({ _id: new ObjectId(orderId) }, { $set: { status } });
            res.send(result);
        });

        app.get('/order-by-date', verifyToken, async (req, res) => {
            const result = await orderCollection.aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: { $toDate: "$date" }   // ISO string -> Date
                            }
                        },
                        totalOrder: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        date: '$_id',
                        totalOrder: '$totalOrder'
                    },
                },
                {
                    $sort: {
                        date: -1
                    }
                }
            ]).toArray();
            res.send(result);
        })


        // all api for category
        app.post('/categories', verifyToken, verifyAdmin, async (req, res) => {
            const { name, image } = req.body;
            if (!name || !image) {
                return res.status(400).send({ error: 'Name and Image are required' });
            }
            const newCategory = {
                name,
                image,
                createdAt: new Date()
            };
            const result = await categoriesCollection.insertOne(newCategory);
            res.send(result);
        });

        app.delete('/categories/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { id } = req.params;
            const result = await categoriesCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        app.put('/categories/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { id } = req.params;
            const { name, image } = req.body;
            const result = await categoriesCollection.updateOne({ _id: new ObjectId(id) }, { $set: { name, image } });
            res.send(result);
        });

        app.get('/categories', async (req, res) => {
            const { home } = req.query;

            try {
                const pipeline = [
                    {
                        $lookup: {
                            from: 'products',
                            localField: 'name',
                            foreignField: 'category',
                            as: 'medicines',
                        },
                    },
                    {
                        $addFields: {
                            medicineCount: { $size: '$medicines' },
                        },
                    },
                    {
                        $project: {
                            medicines: 0,
                        },
                    },
                ];

                if (home) {
                    pipeline.push({ $limit: 6 });
                }

                const categories = await categoriesCollection.aggregate(pipeline).toArray();
                res.send(categories);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Failed to fetch categories' });
            }
        });

        app.get('/products/:categoryName/category', async (req, res) => {
            const { categoryName } = req.params;
            const search = req.query.search || '';
            const sort = req.query.sort === 'desc' ? -1 : 1;

            const query = {
                category: categoryName,
                name: { $regex: search, $options: 'i' }
            };
            try {
                const products = await productsCollection
                    .find(query)
                    .sort({ name: sort })
                    .toArray();

                res.send(products);
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Failed to fetch products by category' });
            }
        });


        // payment history
        app.get('/payment-history', verifyToken, async (req, res) => {
            const userEmail = req.query.email;
            const role = req.query.role;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            if (role === 'user') {
                try {
                    const history = await orderCollection
                        .find({ email: userEmail })
                        .project({
                            _id: 1,
                            date: 1,
                            paymentIntentId: 1,
                            status: 1,
                            amount: 1,
                        })
                        .sort({ date: -1 })
                        .toArray();
                    res.send(history);
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ error: 'Failed to fetch payment history' });
                }
            } else if (role === 'admin') {
                try {
                    const history = await orderCollection
                        .find()
                        .project({
                            _id: 1,
                            date: 1,
                            paymentIntentId: 1,
                            status: 1,
                            amount: 1,
                        })
                        .skip(skip)
                        .limit(limit)
                        .sort({ date: -1 })
                        .toArray();

                    res.send(history);
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ error: 'Failed to fetch payment history' });
                }
            }


        });

        app.get("/payment-count", verifyToken, async (req, res) => {
            const result = await orderCollection.estimatedDocumentCount();
            res.send(result);
        })

        // sales report
        app.get('/admin/sales-report', async (_, res) => {
            try {
                const report = await orderCollection.aggregate([
                    {
                        $unwind: '$cartItems'
                    },
                    {
                        $set: {
                            sellerObjId: { $toObjectId: '$cartItems.product.sellerId' }
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'sellerObjId',
                            foreignField: '_id',
                            as: 'sellerInfo'
                        }
                    },
                    {
                        $unwind: {
                            path: '$sellerInfo',
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            medicineName: '$cartItems.product.name',
                            sellerEmail: '$sellerInfo.email',
                            buyerEmail: '$email',
                            price: '$cartItems.product.price',
                            quantity: '$cartItems.quantity',
                            total: { $multiply: [{ $toDouble: '$cartItems.quantity' }, { $toDouble: '$cartItems.product.price' }] },
                            date: 1
                        }
                    }
                ]).toArray();

                res.send(report);
            } catch (error) {
                console.error('Sales Report Error:', error);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        });


        // admin summery
        app.get('/admin/summary', verifyToken, verifyAdmin, async (_, res) => {
            try {
                const [paidData] = await orderCollection.aggregate([
                    { $match: { status: 'paid' } },
                    { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
                ]).toArray();

                const [pendingData] = await orderCollection.aggregate([
                    { $match: { status: 'pending' } },
                    { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
                ]).toArray();

                const [totalProducts, totalCategories, totalBanners] = await Promise.all([
                    productsCollection.countDocuments(),
                    categoriesCollection.countDocuments(),
                    bannerCollection.countDocuments(),
                ]);

                const rolesData = await usersCollection.aggregate([
                    {
                        $group: {
                            _id: '$role',
                            count: { $sum: 1 }
                        }
                    }
                ]).toArray();

                const roleCounts = {
                    user: 0,
                    seller: 0,
                    admin: 0
                };

                rolesData.forEach(({ _id, count }) => {
                    if (_id === 'user') roleCounts.user = count;
                    if (_id === 'seller') roleCounts.seller = count;
                    if (_id === 'admin') roleCounts.admin = count;
                });

                const result = {
                    paidRevenue: paidData?.total || 0,
                    pendingRevenue: pendingData?.total || 0,
                    paidOrders: paidData?.count || 0,
                    pendingOrders: pendingData?.count || 0,
                    totalProducts,
                    totalCategories,
                    totalBanners,
                    totalUsers: roleCounts.user,
                    totalSellers: roleCounts.seller,
                    totalAdmins: roleCounts.admin,
                }
                res.send(result);
            } catch (error) {
                console.error('Dashboard Summary Error:', error);
                res.status(500).send({ error: 'Failed to load dashboard summary' });
            }
        });


        // user summery
        app.get('/user/summary', verifyToken, verifyEmail, async (req, res) => {
            const userEmail = req.query.email;

            if (!userEmail) {
                return res.status(400).send({ message: 'User email is required' });
            }

            try {
                const summary = await orderCollection.aggregate([
                    {
                        $match: { email: userEmail }
                    },
                    {
                        $group: {
                            _id: null,
                            totalOrders: { $sum: 1 },
                            paidSpend: {
                                $sum: {
                                    $cond: [{ $eq: ['$status', 'paid'] }, '$amount', 0]
                                }
                            },
                            pendingSpend: {
                                $sum: {
                                    $cond: [{ $eq: ['$status', 'pending'] }, '$amount', 0]
                                }
                            }
                        }
                    },
                    {
                        $addFields: {
                            totalSpend: { $add: ['$paidSpend', '$pendingSpend'] }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            totalOrders: 1,
                            paidSpend: 1,
                            pendingSpend: 1,
                            totalSpend: 1
                        }
                    }
                ]).toArray();



                res.send(summary[0] || {
                    totalOrders: 0,
                    paidSpend: 0,
                    pendingSpend: 0,
                    totalSpend: 0
                });

            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Failed to fetch user summary' });
            }
        });


        // all offer info api here
        app.get("/offer-info/:id", async (req, res) => {
            try {
                const result = await offerInfoCollection.findOne({ _id: new ObjectId(req.params.id) });
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: "Failed to fetch offer info" });
            }
        })

        app.put("/offer-info/:id", async (req, res) => {
            try {
                const offerInfo = req.body;
                const id = req.params.id;
                const result = await offerInfoCollection.updateOne({ _id: new ObjectId(id) }, { $set: offerInfo }, { upsert: true });
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: "Failed to create offer info" });
            }
        })



    } finally { }
}




run().catch(console.dir);

app.get('/', (_, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});