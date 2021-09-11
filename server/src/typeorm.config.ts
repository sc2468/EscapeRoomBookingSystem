import { __prod__ } from "./constants";
import { BookingsEntity } from "./entities/Booking";
import { ResultEntity } from "./entities/Result";
import { TeamsEntity } from "./entities/Teams";

export default {
  type: "mysql",
  database: "EscapeRoom",
  username: "root",
  password: "password",
  logging: !__prod__,
  // to get database tables to be generated switch this to true
  synchronize: false,
  entities: [TeamsEntity, BookingsEntity, ResultEntity],
} as const;
//} as Parameters<typeof createConnections>[0];