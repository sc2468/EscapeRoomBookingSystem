import express from 'express';
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import { schema } from './Schema';
import { BookingsEntity } from './Entities/Booking';
import { TeamsEntity } from './Entities/Teams';

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "EscapeRoom",
    username: "root",
    password: "password",
    logging: true,
    // to get database tables to be generated switch this to true
    synchronize: false,
    entities: [TeamsEntity, BookingsEntity],
  });

  const app = express()
  app.use(cors())
  // set up request body type
  app.use(express.json())
  // apply graphql middleware
  app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
  }))

  app.listen(3001, () => {
    console.log('server running')
  })
}

main().catch((error => {
  console.log(error);
}))