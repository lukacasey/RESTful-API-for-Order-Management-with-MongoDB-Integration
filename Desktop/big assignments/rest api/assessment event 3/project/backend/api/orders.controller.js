import OrdersDAO from "../dao/ordersDAO.js";

export default class OrdersController {
  static async apiGetOrders(req, res) {
    const ordersList = await OrdersDAO.getOrders();
    res.json(ordersList);
  }

  static async apiGetOrderById(req, res, next) {
    const orderId = req.params.id;
    const order = await OrdersDAO.getOrderById(orderId);
    res.json(order);
  }
  catch(e) {
    console.error(`Unable to retrieve order: ${e}`);
    res.status(500).json({ error: e });
  }

  static async apiPostOrder(req, res) {
    try {
      const orderInfo = req.body;
      const orderId = await OrdersDAO.addOrder(orderInfo);
      res.json({ status: "success", orderId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const updatedOrder = req.body;
      const { modifiedCount } = await OrdersDAO.updateOrder(
        orderId,
        updatedOrder
      );

      let response = {
        status: "success",
        modifiedCount: modifiedCount,
        message: "Order updated successfully",
      };
      if (modifiedCount === 0) {
        response.status = "warning";
        response.message = "No order found to update";
      }
      res.json(response);
    } catch (e) {
      console.error(`Unable to update order: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiDeleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const { deletedCount } = await OrdersDAO.deleteOrder(orderId);

      let response = {
        status: "success",
        deletedCount: deletedCount,
        message: "Order deleted successfully",
      };
      if (deletedCount === 0) {
        response.status = "warning";
        response.message = "No order found to delete";
      }
      res.json(response);
    } catch (e) {
      console.error(`Unable to delete order: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPatchOrder(req, res) {
    try {
      const orderId = req.params.id;
      const updates = req.body;
      const { modifiedCount } = await OrdersDAO.patchOrder(orderId, updates);

      let response = {
        status: "success",
        modifiedCount: modifiedCount,
        message: "Order updated successfully",
      };
      if (modifiedCount === 0) {
        response.status = "warning";
        response.message = "No order found to update";
      }
      res.json(response);
    } catch (e) {
      console.error(`Unable to patch order: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
