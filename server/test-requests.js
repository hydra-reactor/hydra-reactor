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
    "tripName": "Hawaii Vacation",
    "numDays": 3
  }
}

// POST request to /api/activities
// You will need to update user_id, trip_id, and day_id with
// _id values from the database
{
  "user_id": "", // Need to update with database data
  "trip_id": "", // Need to update with database data
  "day_id": "", // Need to update with database data
  "activity": {
    "description": "Eat delicious pizza",
    "category": "Food"
  }
}

// DELETE request to /api/activities
// You will need to update user_id, trip_id, day_id, and activity_id
// with _id values from the database
{
  "user_id": "", // Need to update with database data
  "trip_id": "", // Need to update with database data
  "day_id": "", // Need to update with database data
  "activity_id": "" // Need to update with database data
}
