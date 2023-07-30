# FreshFeast App API
This API allows FreshFeast's App create, read, and update data relating to FreshFeast's customers and meals.

The API is available at `http://localhost:3000/api`
## Endpoints ##

### User ###
**GET** `/users/:email`

Returns a user's basic information.

### User Info ###
**GET** `/info/:userId`

Returns more detailed information on a user.

### Orders ###
**GET** `/orders/user/:userId/`

Returns an array of orders of a specific user.

| Queury Params      | Default     | Description   |
| :---        |    :----:   |          :--- |
| Count       | 5           | The amount of orders returned  |
| Page        | 1           | Selects the page of results to return      |

**GET** `orders/:orderId`

Return an order.

### Meals ###
**GET** `/meals`

Returns an array of meals.

| Queury Params      | Default     | Description   |
| :---        |    :----:   |          :--- |
| Count       | 5           | The amount of orders returned  |
| Page        | 1           | Selects the page of results to return      |


## Auth ##

### Register User ###

**POST** `/auth/register`

JSON Request body should follow

```
{
    "user": {
        "email": "String",
        "password": "String",
        "firstName": "String",
        "lastName": "String",
        "dietChoice": ["String"],
        "allegens": ["String"],
        "preferredDay": "Some number 1-5"
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
