# EscapeRoomBookingSystem
This is an escape room booking system written for my personal use in the future. It contains a express graphql server and react with Apollo frontend which contsumes the graphql backend data. 

# Note the currnet implementation is spike code and is not fit for production

# Backend

The Graphql server is implemented using express's implementation of the gralhql standard. The database interactions are handeled by the typeorm library.

* Express Graphql: https://www.npmjs.com/package/express-graphql
* Tyeorm: https://www.npmjs.com/package/typeorm

Currently Supported Backend operations

* Open an escapseRoom time slot.
* Bulk creation of escapseRoom time slots.
* Book and escape room time slot.
* Close an existing unbooked escape room time slot.
* Cancel an escape room booking for a given time slot.
* Enter a result for a escape room time slot.
* Get date based paginiated exsiting bookings.

For instructions on how to setup and configure the graphql server see the readme in the server folder

# Frontend

Current Front end status

* Home page: not implemented
* Room page: initial implementation
* Room Booking: initial implementation
* Admin Room overview page: implementated
  * Date base Pagination (loads next 3 days of bookings, when viewing next day outside this range gets required booking data)
  * Open an escapseRoom time slot: implementated
  * Book open escape room time slot: implementated (UI bugs)
  * Close an existing unbooked escape room time slot: implementated
  * Cancel an escape room booking for a given time slot: implemented
  * Enter a result for a escape room time slot: implemented
* Bulk Time Slot Creation: implementated

Current Bugs: 
* Creating an open booking then booking it without reloading the page does not update UI. (not a normal workflow) 
* Openning Admin screen going forward 4 days opening customer booking screen going foward four days causes app to reload. (not normal workflow)
* on Admin screen pop up is not close after any user action.


Reason I chose to use graphql over rest 
* wanted to take advantage of graphql's flexable nature to rappialy change API resonses as I prototype dirrent frontend implemenntation.
* Greater control over returned data
* leverage its self documenting nature to cut down on the ammount of documentation I was required to write.
