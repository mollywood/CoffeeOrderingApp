// Place orders variables
let orderPlacement = document.getElementById('orderPlacement')
let coffee = document.getElementById('coffee')
let emailAddress = document.getElementById('emailAddress')
let submitOrder = document.getElementById('submitOrder')

//Cancel orders variables
let orderCancellation = document.getElementById('orderCancellation')
let orderDeleteEmail = document.getElementById('orderDeleteEmail')
let deleteEmailButton = document.getElementById('deleteEmailButton')

// Search orders variables
let individualOrder = document.getElementById('individualOrder')
let orderSearchEmail = document.getElementById('orderSearchEmail')
let orderSearchButton = document.getElementById('orderSearchButton')

// List orders variables
let orderList = document.getElementById('orderList')
let searchAllButton = document.getElementById('searchAllButton')

// Functions
function placeOrder(selectedCoffee, selectedEmail) {
  console.log(selectedCoffee, selectedEmail)
  let order = {
    coffee: selectedCoffee,
    emailAddress: selectedEmail
  }
  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  }).then(function(response) {
    console.log(response)
    return response.json()
  }).then(function(json) {
    console.log(json)
    orderPlacement.innerHTML += "<br><br>Your order has been placed!"
  })
}

function deleteOrder(orderByEmail) {
  console.log(orderByEmail)
  fetch(`http://dc-coffeerun.herokuapp.com/api/coffeeorders/${orderByEmail}`,{
    method: 'DELETE'
  })
  orderCancellation.innerHTML += "<br><br>Your order has been deleted."
}

function searchOrder(searchByEmail) {
  console.log(searchByEmail)
  fetch(`http://dc-coffeerun.herokuapp.com/api/coffeeorders/${searchByEmail}`,{
  }).then(function(response) {
    response.json().then(
      function(res){
        console.log(res)
        let orderSearch =
          `<p>Order E-mail: ${res.emailAddress}</p>
          <p>Coffee Order: ${res.coffee}</p>`
        individualOrder.innerHTML += orderSearch
      })
    })
}

function allOrders() {
  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/', {
  }).then(function(response) {
    response.json().then(
      function(response){
        for(email in response){
          let theUser = response[email]
          console.log(theUser)
          let indivOrder =
          `<p>Order E-mail: ${theUser.emailAddress}</p>
          <p>Coffee Order: ${theUser.coffee}</p><br><br>`
          orderList.innerHTML += indivOrder
        }
      }
    )
  })
}

// Button calls
submitOrder.addEventListener('click', function() {
  placeOrder(coffee.value, emailAddress.value)
})

deleteEmailButton.addEventListener('click', function() {
  deleteOrder(orderDeleteEmail.value)
})

orderSearchButton.addEventListener('click', function() {
  searchOrder(orderSearchEmail.value)
})

searchAllButton.addEventListener('click', function() {
  allOrders()
})
