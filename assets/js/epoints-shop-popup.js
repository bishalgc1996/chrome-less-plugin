const hostUser = chromeless_ajax_ajax_object.host_user;
const epValue = chromeless_ajax_ajax_object.ep;

console.log(epValue)

const items = chromeless_ajax_ajax_object.items;

const maxepointLimit = chromeless_ajax_ajax_object.max_limit;
const productId = chromeless_ajax_ajax_object.product_id;
const productPrice = chromeless_ajax_ajax_object.product_price;
const productName = chromeless_ajax_ajax_object.product_name;
const redemptionItemInfo = chromeless_ajax_ajax_object.redemption_items;
const detectgiftCard = chromeless_ajax_ajax_object.gift_card;

console.log(maxepointLimit);
console.log(productId);
console.log(productName, "+++++++++");

function runOnce() {
  let counter = 1;

  if (counter === 1) {
    localStorage.setItem("meL", maxepointLimit);
    // debugger;
  } else {
    return;
  }

  counter++;
}

runOnce();

// console.log(items);

console.log(hostUser);
// console.log(epValue);

if (epValue == "true" && hostUser == "https://qa-admin.eachperson.com/") {
  // Save data to sessionStorage
  sessionStorage.setItem("epReward", "true");
}

// Get saved data from sessionStorage
let ssInitialValue = sessionStorage.getItem("epReward");

console.log(ssInitialValue);

const headerBarNext = document.getElementById("tbay-header");

console.log(headerBarNext);

/*

let generateInvisibleInput = () => {
  console.log("Invisible Input Field generated");

  return (headerBarNext.innerHTML = `<form name="form" action="" method="get">
 

 <input id="chromeless-field" name="subject" type = "text" value = "${ssInitialValue}"> </form>`);
};

generateInvisibleInput();

*/

if (ssInitialValue != null) {
  document.body.classList.add("chrome-less-reward");

  window.opener.postMessage("getData", "*");
  var basket = JSON.parse(localStorage.getItem("data")) || {};
  window.addEventListener("message", (a) => {
    if (a.origin === "https://qa-shop.eachperson.com") {
      return;
    }
    let eachPersonData = a.data;
    if (eachPersonData.products?.length) {
      let data = {};
      eachPersonData.products.forEach((el, i) => {
        data[el.productId] = {
          quantity: el.quantity,
          imgUrl: el.imageUrl,
          price: el.amountInCurrency,
          name: el.productTitle,
        };
      });
      localStorage.setItem("data", JSON.stringify(data));
    }
  });
	
  (function ($) {
  	
  })(jQuery);
}
