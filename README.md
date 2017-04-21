# Waitlist
Application available at: http://uofscwaitlist.meteorapp.com

Login for admin page

email: admin2@email.com

password: asdfasdf

### NOTIFICATION WHEN TESTING:

Any number should be able to receive messages as long as the "opt in for text" box is checked on submission.

If you need to test this application, please contact either either Cory Redmond (redmonc2@email.sc.edu) or Eddie Pace (paceea@email.sc.edu) member and we will deploy it. We do not keep it deployed all the time because we pay by the hour for it to be up

For testing the "forgot password" function. Send us one of your emails and we will change the admin account email to match it. The password will remain "asdfasdf". This web application only uses one account as per clients request.

## Home/log-in page
This is the page that will be displayed for all students who wish to add themselves to the waitlist. 
###### Header
**Sign-in** - drop menu to sign in to the admin account using the valid e-mail and password. a "forgot password" funciton is also provided to send to the valid admin e-mail account.

**Check Wait Time** - A prompt to enter a phone number. If the phone number is currently attributed to a student in the wait list, it will return their current estimated remaining time.

###### Form Fields
**Name** - (Required field) - 

**Phone Number** - (Required field) - will only accept properly formatted numbers of 10-digits with no white-space or non-integer values.

**USC ID** - (Required field) - USC ID is 9-digits/characters long.(foun on back of student ID cards).

**Reason for Visit** - (Required field) - 3 drop-down options as per client request.

**Current Major** - (Required field) - A list of all majors offered at UofSC-Columbia. This list will auto-complete and show a list of majors that match what you currenty have typed in for you to select. 

**Intended Major** - (Optional) - Same as Current Major.

**Comments** - (Optional) - A text field to allow students to write anything they wish the Advisor to see before entering the appointment.

**Text service radio buttion** - Checking this button to opt in for texting services will send text notifications to the phone number inputed in Phone Number field. This will first alert you that you have been added to the list. You can respond with either "Time" to get your current estimated remaining wait time or respond "Remove" to be removed form the waitlist. 

**Submit** - submits form to database

## Admin Page
This is the page for the administrator who will be advising during drop in hours. 

###### Header
The header will be similar to that of the Sign up page, but will just contain the dropdown for signing out or changing the password while logged in as an admin.

###### Features
This page contains a table with all people currently on the wait list. It is sorted based off of who submitted their information first.

This has each row show (Name, Phone number, USCID, Button selections, and current status). 

**Expand button**  - This is the button with a plus sign on the left side of each row. If this button is pressed the row will expand and show a hidden row within the table that will show (Reason for visit, Current major, Intended major, and any submitted comments). This can be pressed again to hide the row.

###### Button Selections

**Edit button** - This button will bring a modal with a form similar to that of the sign in page (excludes comments and opt in for text radio button). It will populate the field with the selected students information and if any of that information is changed on submission it will then change in the table.

**Delete button** - This will bring up a modal for confirmation of deleting the selected student from the wait list.

**Move button** - This button is the one with a down arrow. This will move the specific student to the botton of the wait list and will reorder all wait times.

**Check-in button** - This is a button that will change the current status field to "In Advisement" if pressed. If you wish to change the status back to "Waiting" double click on the check-in buttons (this is for accidental clicks on the check-in button). This is meant to be a check for the advisor to help keep track of who is in advisement if there are multiple advisors advising at one time.

**Check-out buttons** - Basically the same thing as the delete button. It will bring up a modal for confirmation that the student has completed their advisement. If selected as done then the student will be removed from the list. This is meant to be a clarification button for the adminstrative user to try and reduce confusion of what to do once the person is done with advisement. 
