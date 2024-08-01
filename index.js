// Import required modules
let express = require("express");
let cors = require("cors");
let app = express(); // Create an Express application
app.use(cors()); // Apply CORS middleware to handle cross-origin requests
let port = 3000;
app.listen(port, () => {
  console.log(`FlipDeal is running on port ${port}`);
});

let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];

/*
Add an Item to the Cart:

Use the push method to add a new item to the cart array.

Edit Quantity of an Item in the Cart:

Use a for loop to iterate over the cart array and update the quantity of the item with the matching productId.

Delete an Item from the Cart:

Use the filter method to remove the item with the matching productId from the cart array.

Read Items in the Cart:

Simply return the cart array as the response.

Calculate Total Quantity of Items in the Cart:

Use a for loop to iterate over the cart array and sum up the quantity of each item.

Calculate Total Price of Items in the Cart:

Use a for loop to iterate over the cart array and calculate the total price by summing up the product of price and quantity for each item.
*/
/*
Endpoint 1: Add an Item to the Cart

Objective: Add a new item to the cart using the provided details.

Endpoint: /cart/add

Query Parameters:

productId: The ID of the product (integer).

name: The name of the product (string).

price: The price of the product (float).

quantity: The quantity of the product (integer).

Your Task: Create a function that will add a new item to the cart using the details provided in the query parameters.

Example Call:

http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=1

Expected Output:

{
	cartItems: [
	  { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 },
	  { 'productId': 3, 'name': 'Tablet', 'price': 15000, 'quantity': 1 }
	]
}
*/

// Function to add an item to the cart
function addItemToCart(productId, name, price, quantity) {
  // Check if the product already exists in the cart
  let existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    // If the product already exists, update the quantity
    existingItem.quantity += quantity;
  } else {
    // If the product doesn't exist, add it to the cart
    cart.push({ productId, name, price, quantity });
  }
}
// Endpoint 1: Add an item to the cart
app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  if (!productId || !name || !price || !quantity) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  console.log("original cart values : ", cart);
  addItemToCart(productId, name, price, quantity);
  console.log("cart values after adding item : ", cart);
  res.json({ cartItems: cart });
});

/*
Endpoint 2: Edit Quantity of an Item in the Cart

Objective: Edit the quantity of an existing item in the cart based on the product ID.

Endpoint: /cart/edit

Query Parameters:

productId: The ID of the product (integer).

quantity: The new quantity of the product (integer).

Your Task: Create a function that will update the quantity of an item in the cart based on the product ID.

Example Call:

http://localhost:3000/cart/edit?productId=2&quantity=3

Expected Output:

{
	cartItems: [
	  { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 3 }
	]
}


*/
// Function to edit the quantity of an item in the cart
function editItemQuantity(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      return true; // Successfully updated
    }
  }
  console.log("Product not found in cart.");
  return false; // Item not found
}

// Endpoint 2: Edit quantity of an item in the cart
app.get("/cart/edit", (req, res) => {
  console.log("API Call: /cart/edit");
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  if (!productId || !quantity) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  console.log("original cart values: ", cart);

  let success = editItemQuantity(productId, quantity);
  if (!success) {
    return res.status(404).json({ error: "Product not found" });
  }

  console.log("cart values after editing quantity: ", cart);
  res.json({ cartItems: cart });
});

/*
Endpoint 3: Delete an Item from the Cart

Objective: Delete an item from the cart based on the product ID.

Endpoint: /cart/delete

Query Parameters:

productId: The ID of the product to be deleted (integer).

Note: You’ll have to update the original array with the results of .filter() method. For example cart = cart.filter(...)

Your Task: Create a function that will remove an item from the cart based on the product ID.

Example Call:

http://localhost:3000/cart/delete?productId=1

Expected Output:

{
	cartItems: [
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 }
	]
}


*/
// Function to delete an item from the cart
function deleteItemFromCart(productId) {
  let initialLength = cart.length;
  cart = cart.filter((item) => item.productId !== productId);
  return cart.length !== initialLength; // Return true if an item was deleted
}
// Endpoint 3: Delete an item from the cart
app.get("/cart/delete", (req, res) => {
  console.log("API Call: /cart/delete");
  let productId = parseInt(req.query.productId);

  if (!productId) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  console.log("original cart values: ", cart);

  let success = deleteItemFromCart(productId);
  if (!success) {
    return res.status(404).json({ error: "Product not found" });
  }

  console.log("cart values after deleting item: ", cart);
  res.json({ cartItems: cart });
});

/*
Endpoint 4: Read Items in the Cart

Objective: Return the current list of items in the cart.

Endpoint: /cart

Your Task: Create a function that will return the current state of the cart.

Example Call:

http://localhost:3000/cart

Expected Output:

{
	cartItems: {
          { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 },
	]
}


*/
// Function to read the cart
function readCart() {
  return cart;
}
// Endpoint 4: Read items in the cart
app.get("/cart", (req, res) => {
  console.log("API Call: /cart");
  res.json({ cartItems: cart });
});

/*
Endpoint 5: Calculate Total Quantity of Items in the Cart

Objective: Calculate and return the total quantity of items in the cart.

Endpoint: /cart/total-quantity

Your Task: Create a function that will calculate the total quantity of items in the cart.

Example Call:

http://localhost:3000/cart/total-quantity

Expected Output:

{ 'totalQuantity': 3 }
*/

// Function to calculate the total quantity of items in the cart
function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}
// Endpoint 5: Calculate total quantity of items in the cart
app.get("/cart/total-quantity", (req, res) => {
  console.log("API Call: /cart/total-quantity");
  let totalQuantity = calculateTotalQuantity();
  console.log("cart array : ", cart);
  res.json({ totalQuantity: totalQuantity });
});

/*
Endpoint 6: Calculate Total Price of Items in the Cart

Objective: Calculate and return the total price of items in the cart based on their quantities and individual prices.

Endpoint: /cart/total-price

Your Task: Create a function that will calculate the total price of items in the cart.

Example Call:

http://localhost:3000/cart/total-price

Expected Output:

{ 'totalPrice': 90000 }
*/
// Function to calculate the total price of items in the cart
function calculateTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}
// Endpoint 6: Calculate total price of items in the cart
app.get("/cart/total-price", (req, res) => {
  console.log("API Call: /cart/total-price");
  let totalPrice = calculateTotalPrice();
  console.log("cart array : ", cart);
  res.json({ totalPrice: totalPrice });
});
