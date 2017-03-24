// Below are some sample request objects you can use
// when testing requests to the database using a service like Postman.
// https://www.getpostman.com

// POST request to /api/signup
{
  "email": "user@email.com",
  "password": "password123"
}

// POST request to /api/signin
{
  "email": "user@email.com"
}

// POST request to /api/trips
// You will need to update user_id with an _id from the database
{
  "user_id": "",
  "trip": {
    "tripName": "Hawaii Vacation"
  }
}

// POST request to /api/activities
// You will need to update user_id and trip_id with
// _id values from the database
{
  "user_id": "",
  "trip_id": "",
  "activity": {
    "description": "Eat delicious pizza",
    "category": "Food"
  }
}

// DELETE request to /api/activities
// You will need to update user_id, trip_id, and activity_id
// with _id values from the database
{
  "user_id": "",
  "trip_id": "",
  "activity_id": ""
}
