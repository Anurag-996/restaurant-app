// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Selecting elements from the DOM
  const aside = document.querySelector(".aside");
  const mainBody = document.querySelector(".main-body");
  const toggleBtn = document.querySelector(".toggle-btn");

  // Toggle sidebar on button click
  toggleBtn.addEventListener("click", function () {
    aside.classList.toggle("open");
    mainBody.classList.toggle("open");
    toggleBtn.classList.toggle("open");
  });

  // Close sidebar when a link is clicked (optional)
  document.querySelectorAll(".quick-links ol li").forEach(function (link) {
    link.addEventListener("click", function () {
      aside.classList.remove("open");
      mainBody.classList.remove("open");
      toggleBtn.classList.remove("open");
    });
  });

  // Close sidebar when clicking outside of it
  document.addEventListener("click", function (event) {
    const isInsideAside = aside.contains(event.target);
    const isInsideToggleBtn = toggleBtn.contains(event.target);

    if (!isInsideAside && !isInsideToggleBtn && aside.classList.contains("open")) {
      aside.classList.remove("open");
      mainBody.classList.remove("open");
      toggleBtn.classList.remove("open");
    }
  });
});

// Utility Function

// Function to get random elements from an array
function getRandomElements(array, numElements) {
  const copyArray = array.slice();

  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }

  return copyArray.slice(0, numElements);
}

// Function to display data in the menu
async function displayData(data) {
  const itemCom = document.querySelector(".menu-items");
  data.forEach((ele) => {
    const item = document.createElement("div");
    item.className = "item";

    // HTML structure for each menu item
    item.innerHTML = `
      <div class="item-img-con">
          <img src="${ele.imgSrc}" alt="">
      </div>
      <div class="item-details d-flex">
          <div>
              <h5>${ele.name}</h5>
              <p>$${ele.price}/-</p>
          </div>
          <button class="add-btn">+</button>
      </div>
    `;

    itemCom.append(item);
  });
}

// Project Function

// Function to fetch and display the menu
async function getMenu() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    const data = await response.json();
    await displayData(data);
    return data;
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}

// Function to simulate taking an order
function takeOrder(data) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const selectedBurgers = getRandomElements(data, 3);
        const order = {
          burgers: selectedBurgers,
        };
        resolve(order);
      }, 2500);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to simulate order preparation
function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// Function to simulate payment
function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// Function to show a thank you message
function thankYouFnc() {
  alert("Thank you for eating with us today!");
}

// Function to handle the entire order process
async function processOrder() {
  try {
    const data = await getMenu();
    console.log("Get menu is called");

    // Step 1: Take Order
    const order = await takeOrder(data);
    console.log("Order received:", order);

    // Step 2: Order Preparation
    const prepResult = await orderPrep(order);
    console.log("Order preparation:", prepResult);

    // Step 3: Payment
    const paymentResult = await payOrder(prepResult);
    console.log("Payment:", paymentResult);

    // Step 4: Thank You
    if (paymentResult.paid) {
      thankYouFnc();
    }
  } catch (error) {
    console.error("Error processing order:", error);
  }
}

// Invoke the order processing when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", processOrder);
