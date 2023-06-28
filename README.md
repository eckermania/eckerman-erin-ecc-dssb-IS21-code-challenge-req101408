# eckerman-erin-ecc-dssb-IS21-code-challenge-req101408
Full stack web application that tracks and manages web applications developed by the Province of BC

Run npm i in your terminal to install the app's dependencies. Once that is completed, use nodemon to start the server.


## Assumptions
- Product ID numbers from previously deleted products can be reused
- Deletions are an acceptable one-way door since they involve actual removal from the mock db (as opposed to toggling a "deleted" bit)

## Testing
npm test
* contains tests that will not pass if records have been added or removed from the mock gb since it's original generation

## Next Steps
- Create form/page for updating records
- Add server-side validation check that contents of product create and update are all present and correctly formed within request
- Expand tests for more robust checks of writing to mock db