const { Order, OrderItem, Product, sequelize } = require('../models');

exports.addOrder = async (req, res) => {
    // Start a transaction to ensure all-or-nothing database changes
    const transaction = await sequelize.transaction();
    
    try {
        const { items } = req.body;
        const { id } = req.user;

        if (!id || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ 
                message: 'Invalid order data. Please provide userId and items array.'
            });
        }

        // Create order within transaction
        const newOrder = await Order.create({
            date: new Date(),
            CustomerID: id
        }, { transaction });

        const orderItems = [];
        for (const item of items) {
            // Validate each item
            if (!item.productId || !item.quantity || item.quantity <= 0) {
                // No need to manually delete - just roll back transaction
                await transaction.rollback();
                return res.status(400).json({ 
                    message: 'Each item must have a valid productId and positive quantity.'
                });
            }

            // Find product to get current price
            const product = await Product.findByPk(item.productId);
            if (!product) {
                // No need to manually delete - just roll back transaction
                await transaction.rollback();
                return res.status(404).json({ 
                    message: `Product with ID ${item.productId} not found.`
                });
            }

            // Create order item with transaction
            const orderItem = await OrderItem.create({
                quantity: item.quantity,
                price: item.quantity * (item.price || product.price),
                OrderId: newOrder.id,
                ProductId: product.id
            }, { transaction });
            
            orderItems.push(orderItem);
        }
        
        // If we got here, everything succeeded - commit the transaction
        await transaction.commit();
        
        // Return the created order with its items
        res.status(201).json({
            message: 'Order created successfully',
            order: {
                id: newOrder.id,
                date: newOrder.date,
                customerID: newOrder.CustomerID,
                items: orderItems.map(item => ({
                    id: item.id,
                    productId: item.ProductId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        });
    } catch (error) {
        // Rollback on any error
        await transaction.rollback();
        res.status(500).json({
            message: 'Failed to create order',
            error: error.message
        });
    }
}

exports.deleteOrder = async (req,res)=>{
    try {
        const OrderId  = req.params.id;
        const { id , role } = req.user;

        const order = await Order.findByPk(OrderId)

        if (!order){
            return res.status(404).json({error: 'Order not found'});
        }

        if ( order.CustomerID === id || role === 'admin'){
            await order.destroy();
            return res.status(200).json({ success: 'Order has been deleted successfully' });
        }
        else{
            return res.status(403).json({error: 'You are not authorized to delete this order'});
        }
    }
    catch(error){
        res.status(500).json({
            message: 'Failed to delete order',
            error : error.message});
    }

}

exports.updateOrder = async (req, res) => {
    // Start a transaction to ensure all-or-nothing database changes
    const transaction = await sequelize.transaction();
    
    try {
        const orderId = req.params.id;
        const { items } = req.body;
        const { id, role } = req.user;

        // Validate input
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ 
                message: 'Invalid update data. Please provide an items array.'
            });
        }

        // Find the order to update
        const order = await Order.findByPk(orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check authorization - only order owner or admin can update
        if (order.CustomerID !== id && role !== 'admin') {
            return res.status(403).json({ 
                message: 'You are not authorized to update this order'
            });
        }

        // Delete existing order items
        await OrderItem.destroy({
            where: { OrderId: orderId },
            transaction
        });

        // Create new order items
        const orderItems = [];
        for (const item of items) {
            // Validate each item
            if (!item.productId || !item.quantity || item.quantity <= 0) {
                await transaction.rollback();
                return res.status(400).json({ 
                    message: 'Each item must have a valid productId and positive quantity.'
                });
            }

            // Find product to get current price
            const product = await Product.findByPk(item.productId);
            if (!product) {
                await transaction.rollback();
                return res.status(404).json({ 
                    message: `Product with ID ${item.productId} not found.`
                });
            }

            // Create order item
            const orderItem = await OrderItem.create({
                quantity: item.quantity,
                price: item.quantity * (item.price || product.price),
                OrderId: order.id,
                ProductId: product.id
            }, { transaction });
            
            orderItems.push(orderItem);
        }
        
        // Update order date if needed
        order.date = new Date(); // Optional: update date when order is modified
        await order.save({ transaction });
        
        // Commit the transaction
        await transaction.commit();
        
        // Return the updated order
        res.status(200).json({
            message: 'Order updated successfully',
            order: {
                id: order.id,
                date: order.date,
                customerID: order.CustomerID,
                items: orderItems.map(item => ({
                    id: item.id,
                    productId: item.ProductId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        });
    } catch (error) {
        // Rollback on any error
        await transaction.rollback();
        res.status(500).json({
            message: 'Failed to update order',
            error: error.message
        });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const { id, role } = req.user;
        const orderId = req.params.id;

        // Find the specific order with nested includes
        const order = await Order.findByPk(orderId, {
            include: [{
                model: OrderItem,
                include: [Product]
            }],
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if user is authorized to see this order
        if (order.CustomerID !== id && role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to view this order' });
        }

        // Format the response
        const formattedOrder = {
            id: order.id,
            date: order.date,
            customerID: order.CustomerID,
            items: order.OrderItems.map(item => ({
                id: item.id,
                productId: item.ProductId,
                productName: item.Product ? item.Product.name : null,
                quantity: item.quantity,
                price: item.price
            }))
        };

        res.status(200).json(formattedOrder);
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch order',
            error: error.message
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const { id, role } = req.user;
        
        // If admin, get all orders, otherwise get only user's orders
        const whereClause = role === 'admin' ? {} : { CustomerID: id };
        
        const orders = await Order.findAll({
            where: whereClause,
            include: [{
                model: OrderItem,
                include: [Product]
            }],
            order: [['date', 'DESC']] // Most recent orders first
        });
        
        // Format the response
        const formattedOrders = orders.map(order => ({
            id: order.id,
            date: order.date,
            customerID: order.CustomerID,
            items: order.OrderItems.map(item => ({
                id: item.id,
                productId: item.ProductId,
                productName: item.Product ? item.Product.name : null,
                quantity: item.quantity,
                price: item.price
            }))
        }));
        
        res.status(200).json(formattedOrders);
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch orders',
            error: error.message
        });
    }
}