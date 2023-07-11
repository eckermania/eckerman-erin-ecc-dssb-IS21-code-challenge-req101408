# eckerman-erin-ecc-dssb-IS21-code-challenge-req101408
Full stack web application that tracks and manages web applications developed by the Province of BC.

## Background
This app was built as a take-home assignment from the Province of BC as part of a job application. It uses a JSON file (products.json) as a mock database. A new version of this file can be created by running `node generated-db.js` 

## Running Locally
To run this application locally, follow these steps from within your terminal, in the root of this repository/directory:
1. run `npm i`
2. after packages are done installing, run `nodemon` - your server should now be up and running on (http://localhost:3000)
3. open a new tab in your terminal and run `cd client && npm i`
4. after packages are done installing, run `npm start` - the application should automatically open in your browswer at (http://localhost:3001)

## Docker
Build image:
docker build -t "bc-web-apps-server" .

cd client
docker build -t "bc-web-apps-ui" .

Start container:

docker run -dp 3000:3000 bc-web-apps-server
docker run -dp 3001:80 bc-web-apps-ui .

## API Documentation
To view documentation of the endpoints contained in the API and to manually test, you can find a Swagger page at (http://localhost:3000/api/swagger)

## Testing
A suite of unit tests for the product-related endpoints are contained within the test.js file in the root of the directory. These tests use mocha/chai and can be run with `npm test`. Please note that these tests are intended to be run prior to any records being added or deleted from the mock db file.

## Assumptions
- Product ID numbers from previously deleted products can be reused
- Deletions are an acceptable one-way door since they involve actual removal from the mock db (as opposed to toggling a "deleted" bit)

## Next Steps
- Create form/page for updating records
- Add more graceful error handling on the frontend
- Add server-side validation check that contents of product create and update are all present and correctly formed within request
- Expand unit tests for more robust checks of writing to mock db