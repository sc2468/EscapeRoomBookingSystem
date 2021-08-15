import "reflect-metadata";
import express from 'express';
import { createConnection } from "typeorm";
import { __prod__ } from './constants';
import { TeamsEntity } from './entities/Teams';
import { BookingsEntity } from './entities/Booking';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql'
import { BookingResolver } from './resolvers/booking';
import { ResultEntity } from "./entities/Result";
import { ResultResolver } from "./resolvers/result";
//import { sendEmail } from "./utils/sendEmail";


const main = async () => {
  //sendEmail('scassiy@gmail.com', 'Booking info');
  const typeormConnection = await createConnection({
    type: "mysql",
    database: "EscapeRoom",
    username: "root",
    password: "password",
    logging: !__prod__,
    // to get database tables to be generated switch this to true
    synchronize: true,
    entities: [TeamsEntity, BookingsEntity, ResultEntity],
  });

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookingResolver, ResultResolver],
      validate: false
    }),
    // exposes things to all resolvers
    context: () => ({ typeormConnection })
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((error => {
  console.log(error);
}))