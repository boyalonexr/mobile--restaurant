
import menuArray from './data.js';

const mainContainer = document.getElementById('main-container');
const orderItem = document.getElementById('order-item');
const orderReceipt = document.querySelector(".order-receipt");
const orderTotalContainer = document.querySelector(".order-total h3");
const formContainer = document.getElementById('form-container')
const formInput = document.getElementById('form')
const formSubmit = document.getElementById('form-submit')
const payBtn = document.getElementById("btn-div")
const formLoading = document.getElementById('form-loading')


let orderArray = [];
let totalPrice = 0;


document.addEventListener('click', function(e) {
    const addTarget = e.target.dataset.add;
    const removeTarget = e.target.dataset.remove

    if(addTarget) {
        handleAddOrder(addTarget)
        console.log(localStorage.getItem('addOrder'))
    }
    else if (removeTarget) {
        handleRemoveOrder(removeTarget)
    }
    else if (e.target.id === "complete-btn") {
        completeOrderBtn()
    }
    else if (e.target.id === "pay-btn") {
        e.preventDefault()
        completePayBtn()
    }
})


function handleAddOrder(menuId) {
    const addOrder = menuArray.filter(menu => menuId == menu.id)[0]

    //addOrder to html (different from rendering to page)
    if(!orderArray.includes(addOrder)) {
       orderArray.push(addOrder)
       addOrder.quantity = 1
    } else {
        addOrder.quantity++
    }

    // Add totalPrice to page using reduce.method
    totalPrice = orderArray.reduce((acc, val) => acc += val.price * val.quantity, 0);
    orderTotalContainer.textContent = `$${totalPrice}`

   
    //condition to make the orders appear in page
    if (orderArray.length > 0) {
        orderReceipt.classList.add("show")
    }

    
    render() //refresh feed after every click to display the updated html in feed on the page.
}

function handleRemoveOrder(orderId) {
    let removeOrder = orderArray.filter( order => orderId == order.id)[0]

    //removeOrder in html (different from rendering to page)
    if (orderArray.includes(removeOrder)) {
        removeOrder.quantity--
    }
    if (removeOrder.quantity < 1) {
        orderArray = orderArray.filter(order => orderId != order.id)
    }

     // remove totalPrice in page using reduce.method
    totalPrice = orderArray.reduce((acc, val) => acc -= val.price * val.quantity, 0)
    orderTotalContainer.textContent = `$${Math.abs(totalPrice)}` //Math.abs() method removes the minus you see when rendered on a page


     //condition to make the orders disappear in page
    if (orderArray.length < 1) {
        orderReceipt.classList.remove("show")
    }
    
    render() //refresh feed after every click to display the updated html in feed on the page.
}


function completeOrderBtn() { 
        formContainer.classList.add("show")
        formInput.innerHTML = `
        <div class="loading-div" id="loading-div">
            <div><label class="loading-label">Generating Payment Information...</label></div>
            <div><img src="./Pictures/Spin@1x-1.0s-200px-200px.svg" alt="" class="loading"></div>
        </div>`
    setTimeout(() => {
       formInput.innerHTML = `
        <form class="form" id="form">
                <div  class="form-text">
                    <label>Enter Card Details</label>
                    </div>
        
                    <input type="text" id="cardName" name="cardHolder" required
                    placeholder="Enter your name">
                    <input type="text" id="cardNumber" name="cardNumber" required
                     placeholder="Enter Card number" 
                     maxlength="19"
                     oninput="this.value = this.value.replace(/[^0-9 ]/g, '').slice(0, 19);">
                    <input type="text" id="cardCvv" name="cvv" required 
                    placeholder="Enter CVV"
                    maxlength="3"
                    oninput="this.value = this.value.replace(/[^0-9 ]/g, '').slice(0, 3);"> 
                     <div class="btn-div" id="btn-div"><button type="submit" class="form-btn" id="pay-btn">Pay</button></div>
            </form>
       `
    }, 2500);
}

function completePayBtn() {
    if (cardName.value && cardNumber.value && cardCvv.value) {
        setTimeout(() => {
        formInput.innerHTML = `
        <div class="loading-div" id="loading-div">
            <div><label class="loading-label">Generating Order...</label></div>
            <div><img src="./Pictures/Spin@1x-1.0s-200px-200px.svg" alt="" class="loading"></div>
        </div>`
        });
        setTimeout(() => {
             formInput.innerHTML = `
             <div class="loading-div" id="loading-div">
             <div><label class="loading-label">Almost there...</label></div>
            <div><img src="./Pictures/Spin@1x-1.0s-200px-200px.svg" alt="" class="loading"></div>
        </div>
            `
        }, 1500);
        setTimeout(() => {
            formContainer.classList.remove("show");
            orderReceipt.classList.remove("show");
            formSubmit.style.display = "block";
    
         formSubmit.innerHTML = `
            <h3>Thanks, ${cardName.value}! Your order is on its way!</h3>
            `
        }, 3500)

        console.log(cardName.value);
        
}
}


function renderOrder() {
    //create empty string to store items
    let items = ''

    //render items to html of page using forEach itertion
    orderArray.forEach(order => {
        items += `
        <div class="text">
            <div class="list">
                <span> X${order.quantity}</span>
                <h2>${order.name} ${order.emoji}</h2>
                <span class="remove" data-remove=${order.id}>remove</span>
            </div>
            <h3>$${order.price * order.quantity}</h3>
        </div>

        `   
    })
    return items // push items to renderOrder() function
}
  


function renderHtml() {
    //render mainContainer to page using map iteration
    const render = menuArray.map( elements => {
     const {
      name,
      ingredients,
      id,
      price,
      emoji
     } = elements
      return`
            <section>
                <div class="section-emoji">${emoji}</div>
                <div class="section-text">
                    <h2>${name}</h2>
                    <p class="food">${ingredients}</p>
                    <h3>$${price}</h3>
                </div>
                <div class="section-add"> 
                <i class="fa-light fa-plus" data-add="${id}"></i>
                </div>
            </section>
        `
    }).join('') //join the iterated mainContainer loop and eliminate the (') after iteration

    return render // push render to renderHtml() function
}


function render(){
    mainContainer.innerHTML = renderHtml() //assign renderhtml() inside mainContainer innerHTML.
    orderItem.innerHTML = renderOrder() //assign renderorder() inside orderItem innerHTML.
}

render() //call out render() to work when page opens instantly.





// import menuArray from './data.js';

// const mainContainer = document.getElementById('main-container');
// const orderItem = document.getElementById('order-item');
// const orderReceipt = document.querySelector(".order-receipt");
// const orderText = document.querySelector(".order-text");
// const orderTotalContainer = document.querySelector(".order-total h3");


// let orderArray = JSON.parse(localStorage.getItem("orders")) || [];
// console.log(orderArray);



// document.addEventListener('click', function(e) {
//     const target = e.target.dataset.add;
//     if(target) {
//         addOrder(target, orderReceipt)
//     } 

// })

// function addOrder(itemId, orderDisplay) {
    
//     const newItem = orderArray.filter(order => order.id == itemId)[0] || {} 
//     console.log(newItem)
//     const orderArr = menuArray.filter(menu => menu.id == itemId
//     )[0]
//     orderDisplay.classList.add("show")

//     const itemsInHtml = orderDisplay.querySelectorAll(".text")
//     let itemInOrder = false;

//     itemsInHtml.forEach(item => {
//         const itemName = item.querySelector(".list h2").innerText;        
//         if(itemName === orderArr.name){
//             newItem.frequency += 1;
//             newItem.subTotal += orderArr.price;
            

//             item.querySelector(".count").innerText = `X${newItem.frequency}`;
//             item.querySelector(".price").innerText = `$${newItem.subTotal}`;

//             itemInOrder = true;

//             orderArray[orderArray.indexOf(newItem)] = newItem;
//             // localStorage.setItem("orders", JSON.stringify(orderArray));
//         }
//     })

//    if(!itemInOrder) {
//     newItem.name = orderArr.name;
//     newItem.id = orderArr.id;
//     newItem.frequency = 1;
//     newItem.subTotal = orderArr.price;
//     createOrderItems(newItem, orderText)

//     orderArray.push(newItem)
//     // localStorage.setItem("orders", JSON.stringify(orderArray));
//    }
   
// //    update total
// let totalPrice = orderArray.reduce((acc, val) => acc + val.subTotal, 0);

// orderTotalContainer.innerText = `$${totalPrice}`
   
// }

// function createOrderItems(item, itemContainer) {
//     // Create Elements
    
//     const itemWrapper = document.createElement("div")
//     const itemNameContainer = document.createElement("div")
//     const itemPriceContainer = document.createElement("h3")
//     const itemCountContainer = document.createElement("span")
//     const itemNameWrapper = document.createElement("h2")
//     const itemRemoveContainer = document.createElement("span")

//     // Add class names
//     itemWrapper.className = "text";
//     itemNameContainer.className = "list";
//     itemCountContainer.className = "count";
//     itemRemoveContainer.className = "remove";
//     itemPriceContainer.className = "price";


//     // Append Values
//     itemCountContainer.append(`X${item.frequency}`);
//     itemNameWrapper.append(item.name);
//     itemRemoveContainer.append("remove");
//     itemPriceContainer.append(`$${item.subTotal}`);
//     itemNameContainer.append(itemCountContainer, itemNameWrapper, itemRemoveContainer);
//     itemWrapper.append(itemNameContainer, itemPriceContainer);
//     itemContainer.append(itemWrapper);
    
// }



// function renderHtml() {
//     const render = menuArray.map( elements => {
//      const {
//       name,
//       ingredients,
//       id,
//       price,
//       emoji
//      } = elements
//       return`
//             <section>
//                 <div class="section-emoji">${emoji}</div>
//                 <div class="section-text">
//                     <h2>${name}</h2>
//                     <p class="food">${ingredients}</p>
//                     <h3>$${price}</h3>
//                 </div>
//                 <div class="section-add"> 
//                 <i class="fa-light fa-plus" data-add="${id}"></i>
//                 </div>
//             </section>
//         `
//     }).join('')

//     mainContainer.innerHTML += render
// }

// renderHtml()

