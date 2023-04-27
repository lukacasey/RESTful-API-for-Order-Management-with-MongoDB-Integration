import { ObjectId } from "mongodb";

let orders;

export default class OrdersDAO {
  static async injectDB(conn) {
    if (orders) {
      return;
    }
    try {
      orders = await conn.db(process.env.ORDERS_NS).collection("orders");
    } catch (e) {
      console.error(`unable to connect in OrdersDAO: ${e}`);
    }
  }

  static async getOrders() {
    try {
      const cursor = await orders.find({});
      const ordersList = await cursor.toArray();
      return ordersList;
    } catch (e) {
      console.error(`Unable to retrieve orders: ${e}`);
      return { error: e };
    }
  }

  static async getOrderById(id) {
    try {
      const query = { _id: new ObjectId(id) };
      const order = await orders.findOne(query);
      return order;
    } catch (e) {
      console.error(`Unable to retrieve order: ${e}`);
      return { error: e };
    }
  }

  static async addOrder(order) {
    try {
      const result = await orders.insertOne(order);
      return result.insertedId;
    } catch (e) {
      console.error(`Unable to add order: ${e}`);
      return { error: e };
    }
  }

  static async updateOrder(orderId, updatedOrder) {
    try {
      const query = { _id: new ObjectId(orderId) };
      const newValues = { $set: updatedOrder };
      const { modifiedCount } = await orders.updateOne(query, newValues);
      return { modifiedCount };
    } catch (e) {
      console.error(`Unable to update order ${e}`);
      return { error: e };
    }
  }

  static async deleteOrder(id) {
    try {
      const query = { _id: new ObjectId(id) };
      const result = await orders.deleteOne(query);
      return result;
    } catch (e) {
      console.error(`Unable to delete order: ${e}`);
      return { error: e };
    }
  }

  static async patchOrder(id, updates) {
    try {
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updates,
      };
      const result = await orders.updateOne(query, updateDoc);
      return result;
    } catch (e) {
      console.error(`Unable to patch order: ${e}`);
      return { error: e };
    }
  }
}
