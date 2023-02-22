// Write solution code here to dynamically add the form fields
// Save the order details on clicking the submit button
function submitFeedback() {
    // Get form data
    const customerName = document.getElementById("customerName").value;
    const email = document.getElementById("email").value;
    const contactNo = document.getElementById("contactNo").value;
    const address = document.getElementById("address").value;
    const orderDate = document.getElementById("orderDate").value;
    
    // Get order data
    const tableRows = document.querySelectorAll(".tablerow");
    const orders = [];
    tableRows.forEach(row => {
      const category = row.querySelector(".category").value;
      const itemName = row.querySelector(".itemname").value;
      const itemPrice = row.querySelector(".itemprice").value;
      const itemQuantity = row.querySelector(".itemquantity").value;
      const totalItemPrice = row.querySelector(".totalitemprice").value;
      
      if (category && itemName && itemPrice && itemQuantity && totalItemPrice) {
        orders.push({
          category: category,
          itemName: itemName,
          itemPrice: itemPrice,
          itemQuantity: itemQuantity,
          totalItemPrice: totalItemPrice
        });
      }
    });


    //json format needed below
    const data = {
        customerName: customerName,
        email: email,
        contactNo: contactNo,
        address: address,
        orderDate: orderDate,
        orders: orders
      };
// Read the JSON file
 orders = JSON.parse(fs.readFileSync('orders.json'));

// Create a string that contains details of all orders
let allOrdersDetails = '';
orders.forEach(order => {
  allOrdersDetails += `Order ID: ${order.orderId}\n`;
  allOrdersDetails += `Customer Name: ${order.customerName}\n`;
  allOrdersDetails += `Email: ${order.email}\n`;
  allOrdersDetails += `Contact Number: ${order.contactNo}\n`;
  allOrdersDetails += `Address: ${order.address}\n`;
  allOrdersDetails += `Order Date: ${order.orderDate}\n\n`;
  allOrdersDetails += 'Items:\n';
  order.items.forEach(item => {
    allOrdersDetails += `   Category Name: ${item.categoryName}\n`;
    allOrdersDetails += `   Item Name: ${item.itemName}\n`;
    allOrdersDetails += `   Price: ${item.price}\n`;
    allOrdersDetails += `   Quantity: ${item.quantity}\n`;
    allOrdersDetails += `   Total Item Price: ${item.totalItemPrice}\n\n`;
  });
});

// Show an alert with details of all orders
alert(allOrdersDetails);
}

function datePicker() {
  let minDate = new Date().toISOString().split("T")[0];
  document.getElementById("orderDate").min = minDate;
}

//-----------------------------------------------------------------// Select the plus button and the table body element
let plusButton = document.querySelector(".plus");
let table = document.querySelector("#table tbody");

// Define the HTML for a new table row
let tableRowHtml = `
<tr class="tablerow">
<td>
    <select class="category">
        <option value="">Select a category</option>
        <option value="pizza">Pizza</option>
        <option value="beverages">Beverages</option>
        <option value="garlic-bread">Garlic Bread</option>
    </select> 
</td>
<td>
    <select class="itemname">
        <option value="">Select an item</option>
    </select>
</td>

<td><input type="number" class="itemprice"  readonly></td>

<td><input type="number" class="itemquantity"></td>
<td><input type="number" class="totalitemprice" readonly ></td>

</tr>

`;

// Add a click event listener to the plus button
plusButton.addEventListener("click", function () {
  // Create a new table row and add it to the table
  let newRow = document.createElement("tr");
  newRow.classList.add("tablerow");
  newRow.innerHTML = tableRowHtml;
  table.appendChild(newRow);

  // Add event listeners to the new row
  addRowEventListeners(newRow);
});

// Define a dictionary of categories and their items
const categories = {
  pizza: [
    { name: "Large", price: 10 },
    { name: "Medium", price: 7 },
    { name: "Small", price: 5 },
  ],
  beverages: [
    { name: "Coke", price: 2 },
    { name: "Pepsi", price: 3 },
  ],
  "garlic-bread": [{ name: "Garlic Bread", price: 4 }],
};

// Define a function to add event listeners to a new table row
function addRowEventListeners(row) {
  // Get the select elements and input elements from the new row
  const categorySelect = row.querySelector(".category");
  const itemNameSelect = row.querySelector(".itemname");
  const itemPriceInput = row.querySelector(".itemprice");
  const quantityInput = row.querySelector(".itemquantity");
  const totalItemPriceInput = row.querySelector(".totalitemprice");

  // Add a change event listener to the category select element
  categorySelect.addEventListener("change", (event) => {
    // Get the selected category and its items
    const category = event.target.value;
    const items = categories[category] || [];

    // Create HTML for the item name select element
    let itemsHtml = "";
    items.forEach((item) => {
      itemsHtml += `<option value="${item.name}">${item.name}</option>`;
    });
    itemNameSelect.innerHTML = itemsHtml;

    // Clear the item price input and enable it
    itemPriceInput.value = "";
    itemPriceInput.removeAttribute("disabled");
  });

  // Add a change event listener to the new row
  row.addEventListener("change", (event) => {
    // If the item name or category has changed, update the item price input
    if (
      event.target.classList.contains("itemname") ||
      event.target.classList.contains("category")
    ) {
      const itemName = itemNameSelect.value;
      const category = categorySelect.value;
      const items = categories[category] || [];
      const selectedItem = items.find((item) => item.name === itemName);

      if (selectedItem) {
        itemPriceInput.value = selectedItem.price;
      } else {
        itemPriceInput.value = "";
      }
    }

    // Add event listeners to the new row
    addRowEventListeners(newRow);
    const categories = {
      pizza: [
        { name: "Large", price: 10 },
        { name: "Medium", price: 7 },
        { name: "Small", price: 5 },
      ],
      beverages: [
        { name: "Coke", price: 2 },
        { name: "Pepsi", price: 3 },
      ],
      "garlic-bread": [{ name: "Garlic Bread", price: 4 }],
    };

    function addRowEventListeners(row) {
      const categorySelect = row.querySelector(".category");
      const itemNameSelect = row.querySelector(".itemname");
      const itemPriceInput = row.querySelector(".itemprice");
      const quantityInput = row.querySelector(".itemquantity");
      const totalItemPriceInput = row.querySelector(".totalitemprice");

      categorySelect.addEventListener("change", (event) => {
        const category = event.target.value;

        const items = categories[category] || [];
        let itemsHtml = "";
        items.forEach((item) => {
          itemsHtml += `<option value="${item.name}">${item.name}</option>`;
        });
        itemNameSelect.innerHTML = itemsHtml;
        itemPriceInput.value = "";
        itemPriceInput.removeAttribute("disabled");
      });

      row.addEventListener("change", (event) => {
        if (
          event.target.classList.contains("itemname") ||
          event.target.classList.contains("category")
        ) {
          const itemName = itemNameSelect.value;
          const category = categorySelect.value;

          const items = categories[category] || [];
          const selectedItem = items.find((item) => item.name === itemName);
          if (selectedItem) {
            itemPriceInput.value = selectedItem.price;
          } else {
            itemPriceInput.value = "";
          }
        }

        const quantity = quantityInput.value;
        const itemPrice = itemPriceInput.value;

        if (quantity && itemPrice) {
          const totalItemPrice = quantity * itemPrice;
          totalItemPriceInput.value = totalItemPrice.toFixed(2);
        } else {
          totalItemPriceInput.value = "";
        }
      });
    }
    
  });
  // Add a change event listener to the new row
row.addEventListener("change", (event) => {
    // If the item name or category has changed, update the item price input
    if (
      event.target.classList.contains("itemname") ||
      event.target.classList.contains("category")
    ) {
      const itemName = itemNameSelect.value;
      const category = categorySelect.value;
      const items = categories[category] || [];
      const selectedItem = items.find((item) => item.name === itemName);
  
      if (selectedItem) {
        itemPriceInput.value = selectedItem.price;
      } else {
        itemPriceInput.value = "";
      }
    }
  
    // Add event listeners to the new row
    addRowEventListeners(newRow);
  });
  
  // Add a change event listener to the itemNameSelect element
  itemNameSelect.addEventListener("change", (event) => {
    const itemName = event.target.value;
    const category = categorySelect.value;
    const items = categories[category] || [];
    const selectedItem = items.find((item) => item.name === itemName);
  
    if (selectedItem) {
      itemPriceInput.value = selectedItem.price;
    } else {
      itemPriceInput.value = "";
    }
  });
  //=========================
  // Calculate total price for a row
  // Add a change event listener to the quantity input element
quantityInput.addEventListener("change", (event) => {
    // Get the values of the quantity input and item price input
    const quantity = quantityInput.value;
    const itemPrice = itemPriceInput.value;
  
    // Calculate the total item price if both values are present
    if (quantity && itemPrice) {
      const totalItemPrice = quantity * itemPrice;
      totalItemPriceInput.value = totalItemPrice.toFixed(2);
    } else {
      totalItemPriceInput.value = "";
    }
  });
  //=-====================
// Get all the elements with id="total'

// Get a reference to the table element
const table = document.getElementById("table");

// Get a reference to the total field
const totalField = document.getElementById("total");

// Listen for changes to the table rows
table.addEventListener("change", function() {
  let total = 0;

  // Iterate over all the rows in the table
  const rows = table.querySelectorAll("tr.tablerow");
  rows.forEach(function(row) {
    // Get the value of the totalitemprice field in this row
    const totalItemPrice = row.querySelector(".totalitemprice").value;

    // If the value is not empty, add it to the running total
    if (totalItemPrice !== "") {
      total += parseFloat(totalItemPrice);
    }
  });

  // Set the value of the total field to the final total
  totalField.value = total.toFixed(2);
});


}



