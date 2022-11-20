import { createPool } from 'mysql';

const pool = createPool({
  connectionLimit : 10,
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DATABASE
});

export function getFederatedCredential(provider: string, subject: string) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [provider, subject], (error, [credential]) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(credential);
    });
  });
}

export function createUser(email: any) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users (email) VALUES (?)', [email], (error, {insertId: id}) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({id, email});
    });
  });
}

export function createFederatedCredential(user_id: number, provider: string, subject: string) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [user_id, provider, subject], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({user_id, provider, subject});
    });
  });
}

export function getUser(id: number) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = ?', [id], (error, [user]) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(user);
    });
  });
}
