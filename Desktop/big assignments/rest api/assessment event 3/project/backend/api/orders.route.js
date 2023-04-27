import express from "express";
import OrdersController from "./orders.controller.js";

const router = express.Router(); //get access to express router

// OPTIONS method handler for /api/v1/orders
router.options("/", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(200);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all orders
 *     description: Returns a list of all orders.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the order.
 *                   OrderNo:
 *                     type: integer
 *                     description: The order number.
 *                   Order Date:
 *                     type: string
 *                     description: The date the order was placed.
 *                   CustNo:
 *                     type: integer
 *                     description: The customer number.
 *                   Product Code:
 *                     type: integer
 *                     description: The product code.
 *                   Product Name:
 *                     type: string
 *                     description: The name of the product.
 *                   Product Quantity:
 *                     type: integer
 *                     description: The quantity of the product ordered.
 *                   Product Price:
 *                     type: integer
 *                     description: The price of the product.
 *                   Total:
 *                     type: integer
 *                     description: The total cost of the order.
 *                   ModeOf Payment:
 *                     type: string
 *                     description: The mode of payment used for the order.
 */
router.route("/").get(OrdersController.apiGetOrders);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve an order by ID
 *     description: Returns an order with a specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The order with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the order.
 *                 OrderNo:
 *                   type: integer
 *                   description: The order number.
 *                 Order Date:
 *                   type: string
 *                   description: The date the order was placed.
 *                 CustNo:
 *                   type: integer
 *                   description: The customer number.
 *                 Product Code:
 *                   type: integer
 *                   description: The product code.
 *                 Product Name:
 *                   type: string
 *                   description: The name of the product.
 *                 Product Quantity:
 *                   type: integer
 *                   description: The quantity of the product ordered.
 *                 Product Price:
 *                   type: integer
 *                   description: The price of the product.
 *                 Total:
 *                   type: integer
 *                   description: The total cost of the order.
 *                 ModeOf Payment:
 *                   type: string
 *                   description: The mode of payment used for the order.
 *       404:
 *         description: The order with the specified ID was not found.
 */
router.route("/:id").get(OrdersController.apiGetOrderById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order with the specified details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Order object to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrderNo:
 *                 type: integer
 *                 description: The order number.
 *               Order Date:
 *                 type: string
 *                 description: The date the order was placed.
 *               CustNo:
 *                 type: integer
 *                 description: The customer number.
 *               Product Code:
 *                 type: integer
 *                 description: The product code.
 *               Product Name:
 *                 type: string
 *                 description: The name of the product.
 *               Product Quantity:
 *                 type: integer
 *                 description: The quantity of the product ordered.
 *               Product Price:
 *                 type: integer
 *                 description: The price of the product.
 *               Total:
 *                 type: integer
 *                 description: The total cost of the order.
 *               ModeOf Payment:
 *                 type: string
 *                 description: The mode of payment used for the order.
 *             example:
 *               OrderNo: 1007
 *               Order Date: "2022-05-23"
 *               CustNo: 9090909001
 *               Product Code: 7
 *               Product Name: "Toothpaste"
 *               Product Quantity: 5
 *               Product Price: 30
 *               Total: 150
 *               ModeOf Payment: "Online"
 *     responses:
 *       201:
 *         description: The newly created order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the order.
 *                 OrderNo:
 *                   type: integer
 *                   description: The order number.
 *                 Order Date:
 *                   type: string
 *                   description: The date the order was placed.
 *                 CustNo:
 *                   type: integer
 *                   description: The customer number.
 *                 Product Code:
 *                   type: integer
 *                   description: The product code.
 *                 Product Name:
 *                   type: string
 *                   description: The name of the product.
 *                 Product Quantity:
 *                   type: integer
 *                   description: The quantity of the product ordered.
 *                 Product Price:
 *                   type: integer
 *                   description: The price of the product.
 *                 Total:
 *                   type: integer
 *                   description: The total cost of the order.
 *                 ModeOf Payment:
 *                   type: string
 *                   description: The mode of payment used for the order.
 *       400:
 *         description: Bad request, missing or invalid parameters.
 */
router.route("/").post(OrdersController.apiPostOrder);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update an existing order
 *     description: Updates an existing order with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the order to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       description: Order object with new values to update the existing order.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrderNo:
 *                 type: integer
 *                 description: The updated order number.
 *               Order Date:
 *                 type: string
 *                 description: The updated date the order was placed.
 *               CustNo:
 *                 type: integer
 *                 description: The updated customer number.
 *               Product Code:
 *                 type: integer
 *                 description: The updated product code.
 *               Product Name:
 *                 type: string
 *                 description: The updated name of the product.
 *               Product Quantity:
 *                 type: integer
 *                 description: The updated quantity of the product ordered.
 *               Product Price:
 *                 type: integer
 *                 description: The updated price of the product.
 *               Total:
 *                 type: integer
 *                 description: The updated total cost of the order.
 *               ModeOf Payment:
 *                 type: string
 *                 description: The updated mode of payment used for the order.
 *             example:
 *               OrderNo: 1007
 *               Order Date: "2022-05-23"
 *               CustNo: 9090909001
 *               Product Code: 7
 *               Product Name: "Toothpaste"
 *               Product Quantity: 5
 *               Product Price: 30
 *               Total: 150
 *               ModeOf Payment: "Online"
 *     responses:
 *       200:
 *         description: The updated order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the order.
 *                 OrderNo:
 *                   type: integer
 *                   description: The updated order number.
 *                 Order Date:
 *                   type: string
 *                   description: The updated date the order was placed.
 *                 CustNo:
 *                   type: integer
 *                   description: The updated customer number.
 *                 Product Code:
 *                   type: integer
 *                   description: The updated product code.
 *                 Product Name:
 *                   type: string
 *                   description: The updated name of the product.
 *                 Product Quantity:
 *                   type: integer
 *                   description: The updated quantity of the product ordered.
 *                 Product Price:
 *                   type: integer
 *                   description: The updated price of the product.
 *                 Total:
 *                   type: integer
 *                   description: The updated total cost of the order.
 *                 ModeOf Payment:
 *                   type: string
 *                   description: The updated mode of payment used for the order.
 *       400:
 *         description: Bad request, missing or invalid parameters.
 *       404:
 *         description: Order with the specified ID not found.
 */
router.route("/:id").put(OrdersController.apiUpdateOrder);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete an existing order
 *     description: Deletes an existing order with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the order to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: The order has been successfully deleted.
 *       404:
 *         description: Order with the specified ID not found.
 */
router.route("/:id").delete(OrdersController.apiDeleteOrder);

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Partially update an existing order
 *     description: Updates an existing order with the specified ID with the provided fields.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the order to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: body
 *         name: fields
 *         description: Fields to be updated.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             OrderNo:
 *               type: number
 *               example: 1006
 *             Order Date:
 *               type: string
 *               format: date
 *               example: '2022-05-23'
 *             CustNo:
 *               type: number
 *               example: 9090909000
 *             Product Code:
 *               type: number
 *               example: 6
 *             Product Name:
 *               type: string
 *               example: Toothbrush
 *             Product Quantity:
 *               type: number
 *               example: 10
 *             Product Price:
 *               type: number
 *               example: 40
 *             Total:
 *               type: number
 *               example: 400
 *             ModeOf Payment:
 *               type: string
 *               example: Online
 *     responses:
 *       200:
 *         description: The order has been successfully updated.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               format: uuid
 *             OrderNo:
 *               type: number
 *               example: 1006
 *             Order Date:
 *               type: string
 *               format: date
 *               example: '2022-05-23'
 *             CustNo:
 *               type: number
 *               example: 9090909000
 *             Product Code:
 *               type: number
 *               example: 6
 *             Product Name:
 *               type: string
 *               example: Toothbrush
 *             Product Quantity:
 *               type: number
 *               example: 10
 *             Product Price:
 *               type: number
 *               example: 40
 *             Total:
 *               type: number
 *               example: 400
 *             ModeOf Payment:
 *               type: string
 *               example: Online
 *       404:
 *         description: Order with the specified ID not found.
 */
router.route("/:id").patch(OrdersController.apiPatchOrder);

export default router;
