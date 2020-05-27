var mysql = require("mysql");
var inquirer = require("inquirer");

require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  password: "password",
  database: "shamazon"
});

//connection with server shows inventory
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadStoreFront();
});

function loadStoreFront() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.table(res);

    promptUserForSelection(res);
  });
}


promptUserForSelection = (inventory) => {
        // ask for ID
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Please choose the id number for the item you wish to buy? [Quit store with capital Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // stop program

      userSelectsQuit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      //give remaining inv amount
      if (product) {
        promptUserForQuant(product);
      }
      else {
        console.log("\nThat item is sold out.");
        loadStoreFront();
      }
    });
}

// Prompt the customer for a product quantity
function promptUserForQuant(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "What quantity? [Quit store with capital Q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      userSelectsQuit(val.quantity);
      var quantity = parseInt(val.quantity);
      // check for quit

      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadStoreFront();
      }
            // inv for item empty re-run loadStoreFront

      else {
        userPurchases(product, quantity);
      }
    });
}
//get item and amount 
 userPurchases = (product, quantity) => {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // complete then run loadStoreFront
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadStoreFront();
    }
  );
}

// checking id forget es6 and go back to es5
checkInventory = (choiceId, inventory) => {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;

}

 userSelectsQuit = (choice) => {
  if (choice.toLowerCase() === "q") {
    console.log("You've Left SHAMAZON!");
    process.exit(0);
  }
}
