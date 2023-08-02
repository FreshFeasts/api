# FreshFeast App API

This API allows FreshFeast's App create, read, and update data relating to FreshFeast's customers and meals.

The API is available at `http://localhost:3000/api`

## Auth

### Register User

**POST** `/auth/register`

<details>
<summary>JSON Request body should follow</summary>

```
{
    "user": {
        "email": "String",
        "password": "String",
        "firstName": "String",
        "lastName": "String",
        "dietChoice": ["String"],
        "allergens": ["String"],
        "preferredDay": "Number"
    },
    "info": {
    "deliveryAddress": {
        "address1": "String",
        "address2": "String",
        "city": "String",
        "state": "String",
        "zip": "String"
    },
    "DOB": "MM/DD/YYYY",
    "phone": "String"
    },
     "paymentInfo": {
        "ccNum": "string",
        "ccDetails": {
            "address1": "String",
            "address2": "String",
            "city": "String",
            "state": "String",
            "zip": "String"
        },
        "ccExp": {
            "month": Number,
            "year": Number
        }
    }
}
```

</details>

## Endpoints

### User

**GET** `/initdata/:userId`

Returns user basic information and contact information, used after login.

**GET** `/users/:email`

Returns a user's basic information.

**PUT** `/users/cart`

Updates the cart info

```
// Request Body
{
    "userId": String,
    "currentCart": {
        "meals": [], // Array of mealId Strings
        "deliveryDate": Date
    }
}
```

**POST** `users/cart`

Submits a cart to be ordered

```
{
    "userId": String,
    "currentCart": {
        "meals": [], // Array of mealId Strings
        "deliveryDate" : Date,  "07/01/2023" new Date()
        "orderDate": Date
    }
}
```

**PUT** `users/update`

Update the user and user info

<details>
<summary>JSON Request body should follow</summary>

```
{
  "userId": "String",
  "user": {
    "firstName": "String",
    "lastName": "String",
    "email": "String",
    "darkTheme": Boolean
  },
  "info": {
    "deliveryAddress": {
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String"
    },
    "phone": "String"
  }
}
```

</details>

### User Contact Info

**GET** `/info/:userId`

Returns contact and delivery information on user

### Payment Info

**GET** `/cc/user/:userId`

Return user's cards' information

### Orders

**GET** `/orders/user/:userId/`

Returns an array of orders of a specific user.

| Queury Params | Default | Description                           |
| :------------ | :-----: | :------------------------------------ |
| Count         |    5    | The amount of orders returned         |
| Page          |    1    | Selects the page of results to return |

**GET** `orders/:orderId`

Return an order.

**PUT** `orders/delivery-update`

Updates a delivery date

```
// Request body

{
    "orderId": String,
    "userId": String,
    "orderDate": Date, // Today's date
    "deliveryDate": Date
}
```

### Meals

**GET** `/meals`

Returns an array of meals.

| Queury Params | Default | Description                           |
| :------------ | :-----: | :------------------------------------ |
| Count         |    5    | The amount of orders returned         |
| Page          |    1    | Selects the page of results to return |

**POST** `/meals/add-review`

Add user review to meal item

```
// Request Body

{
    "mealId" : String,
    "userId": String,
    "firstName": String,
    "reviewText": String
}
```

**POST** `/meals/add-rating`

Add user rating to meal item

```
// Request Body

{  "mealId" : String,
    "userId": String,
    "rating": Number,
}
```
