# FreshFeast App API
This API allows FreshFeast's App create, read, and update data relating to FreshFeast's customers and meals.
The API is available at `http://localhost:3000/api`
## Endpoints ##

### User ###
GET `/users/:email`
Returns a user's basic information.

### User Info ###
GET `/info/:userId`
Returns more detailed information on a user

### Orders ###
GET `/orders/user/:userId/`

| Queury      | Default     | Description   |
| :---        |    :----:   |          ---: |
| Count       | 5           | The amount of orders returned  |
| Page        | 1        | Selects the page of results to return      |
