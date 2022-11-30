import { createPool } from 'mysql';

const pool = createPool({
  connectionLimit : 10,
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DATABASE
});

export function getUser(email: string) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, [user]) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(user);
    });
  });
}
