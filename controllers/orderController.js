import Order from "../models/Order.js";

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find({ deleteAt: null });
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al buscar todos los pedidos`, error });
  }
}

async function getORderById(req, res) {
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
}

async function createOrder(req, res) {
  const { user, products, totalAmount, status } = req.body;
  try {
    const newOrder = new Order({
      user,
      products,
      totalAmount,
      status,
    });
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el pedido", error });
  }
}

async function updateOrder(req, res) {
  const updateOrder = await Order.findById(req.params.id);
  try {
    if (updateOrder !== null) {
      const { products, totalAmount, status } = req.body;
      updateOrder.products = products || updateOrder.products;
      updateOrder.totalAmount = totalAmount || updateOrder.totalAmount;
      updateOrder.status = status || updateOrder.status;

      await updateOrder.save();

      return res.status(200).json("El pedido ha sido actualizado");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar el pedido", error });
  }
}
async function softDeleteOrder(req, res) {
  const orderToDelete = await Order.findById(req.params.id);

  try {
    orderToDelete.deleteAt = Date.now();
    orderToDelete.save();
    return res.status(200).json("El pedido ha sido elminado");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el pedido", error });
  }
}

export default {
  getAllOrders: getAllOrders,
  getORderById: getORderById,
  createOrder: createOrder,
  updateOrder: updateOrder,
  softDeleteOrder: softDeleteOrder,
};
