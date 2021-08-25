# EscapeRoomBookingSystem
This is an escape room booking system written for my personal use in the future. It contains a express graphql server and react with Apollo frontend which contsumes the graphql backend data. 

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

Current Front end status

* Home page: not implemented
* Room page: initial implementation
* Room Booking: Currently Broken
* Admin Room overview page: implementated (some UI bug but workflows working)
  * Date base Pagination (loads next 3 days of bookings, when viewing next day outside this range gets required booking data)
  * Open an escapseRoom time slot: implementated
  * Book open escape room time slot: implementated
  * Close an existing unbooked escape room time slot: implementated
  * Cancel an escape room booking for a given time slot: implemented
  * Enter a result for a escape room time slot: implemented
* Bulk Time Slot Creation: implementated




Reason I chose to use graphql over rest 
* wanted to take advantage of graphql's flexable nature to rappialy change API resonses as I prototype dirrent frontend implemenntation.
* Greater control over returned data
* leverage its self documenting nature to cut down on the ammount of documentation I was required to write.


# Frontend

