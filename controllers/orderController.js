import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deleteAt: null });
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al buscar todos los pedidos`, error });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = await Order.findById(req.params.id);
    if (!orderId || orderId.deleteAt) {
      return res.status(404).json({ message: `Pedido no encontrado` });
    }
    return res.status(200).json(orderId);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al buscar el pedido", error });
  }
};

export const createOrder = async (req, res) => {
  const { user, products, totalAmount, status } = req.body;
  try {
    const newOrder = new Order({ user, products, totalAmount, status });
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el pedido", error });
  }
};


export const updateOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findById(req.params.id);
    if (updateOrder) {
      const { products, totalAmount, status } = req.body;
      updateOrder.products = products || updateOrder.products;
      updateOrder.totalAmount = totalAmount || updateOrder.totalAmount;
      updateOrder.status = status || updateOrder.status;
      await updateOrder.save();
      return res.status(200).json("El pedido ha sido actualizado");
    } else {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};


export const softDeleteOrder = async (req, res) => {
  try {
    const orderToDelete = await Order.findById(req.params.id);
    if (orderToDelete) {
      orderToDelete.deleteAt = Date.now();
      await orderToDelete.save();
      return res.status(200).json("El pedido ha sido elminado");
    } else {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el pedido", error });
  }
};

