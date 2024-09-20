🖥 The Nav Bar
A navbar will persist across all views once the user is logged in, allowing navigation throughout the application.
All Restrooms: Links to the view of all restrooms.
My Ratings: Links to the view of the logged-in user’s ratings.
Patrons: Links to a list of users who have left reviews, displaying their number of ratings and average rating.
Logout: Logs out the user and removes them from local storage.

🖥 Login
The user will be required to log in with their email to access the app.
Given the user has navigated to the login screen,
When the user enters their email and submits,
Then the app will check for the email in the database, and if valid, logs in the user, stores their data in localStorage, and redirects to the welcome screen.

🖥 Welcome Screen
A view the user sees after logging in, which contains a welcome message and the navigation bar.
Given the user has logged in,
When the user is redirected to the welcome screen,
Then a message will display along with the navigation bar, allowing the user to explore the app.

🖥 All Restrooms
A view displaying a list of all restrooms in the database.
Given the user wishes to view all restrooms,
When the user navigates to the /restrooms view,
Then the app will display a list of restrooms with an image, name, address, star rating (rounded), and the number of ratings.
Given the user wishes to add a new restroom,
When the user fills out a form with the restroom name and city,
Then the app will use the OpenStreetMap API to display location pins and allow the user to select one, updating the form for submission.

🖥 Restroom Details
A detailed view for a specific restroom.
Given the user clicks on a restroom name in the list,
When the user is navigated to /restrooms/{id},
Then the app will display the restroom’s image, name, address, star rating, number of ratings, and all user reviews.
Given the user wishes to rate the restroom,
When the user selects a star rating and writes a review,
Then the rating and review will be added to the database and the page will update to show the new review.
Given the user has already left a review,
When the user clicks the edit button next to their review,
Then the app will navigate to /myratings/{id} where they can update their review.

🖥 My Ratings
A view for the logged-in user to see all the restrooms they’ve reviewed.
Given the user wants to see all their reviews,
When they navigate to /my-ratings,
Then the app will display the list of their reviews with options to edit or delete each one.
Given the user clicks the delete button next to a review,
When the user confirms deletion,
Then the review will be removed from the database and no longer appear in the list or the restroom details.

🖥 Patrons
A view listing all users who have left reviews, displaying the number of ratings they’ve submitted and their average rating.
Given the user wants to see a list of all users,
When they navigate to /patrons,
Then the app will display a list of users with the number of reviews they’ve submitted and their average rating.
Given the user clicks on the number of reviews next to a user,
When the user is navigated to the user’s list of reviews,
Then the app will display all the reviews that user has made.

🖥 Map with Pins (Stretch Goal)
A map displaying pins for all rated restrooms, showing a summary of the restroom's name, rating, and number of reviews.
Given the user is viewing the map on the main page,
When they click on a pin,
Then the app will navigate to the detailed view of that restroom.
Each Page of given location will show its location on the map via a pin to show its location.
