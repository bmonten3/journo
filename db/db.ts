import { createClient } from '@libsql/client';

// export const db = createClient({
//   url: process.env.TURSO_URL!,
//   authToken: process.env.TURSO_AUTH_KEY!,
// });

export const db = createClient({
  url: `file:./db/db.sqlite`,
});
