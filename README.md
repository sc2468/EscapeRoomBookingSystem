# EscapeRoomBookingSystem
This is an escape room booking system written for my personal use in the future. It contains a graphql server and react frontend with contsumes the graphql backend data. 

# Backend

The Graphql server is implemented using express's implementation of the gralhql standard. The database interactions are handeled by the typeorm library.

* Express Graphql: https://www.npmjs.com/package/express-graphql
* Tyeorm: https://www.npmjs.com/package/typeorm

The graphql server allows users to create, edit and delete escape room teams and escape room bookings. Examples of all the opteractions supported by the graphql service can be found in the Insomnia workspace saved in the server file.

For instructions on how to setup and configure the graphql server see the readme in the server folder  

Reason I chose to use graphql over rest 
* wanted to take advantage of graphql's flexable nature to rappialy change API resonses as I prototype dirrent frontend implemenntation.
* Greater control over returned data
* leverage its self documenting nature to cut down on the ammount of documentation I was required to write.


# Frontend

