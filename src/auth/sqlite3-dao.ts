import { Database, OPEN_READWRITE, OPEN_FULLMUTEX } from "sqlite3";

const filename = process.env.DB_FILE || 'sqlite.db';

const mode = OPEN_READWRITE | OPEN_FULLMUTEX;

export function getFederatedCredential(provider: string, subject: string) {
  return new Promise((resolve, reject) => {
    const db = new Database(filename, mode, err => {
      if (err) {
        reject(err);
        return;
      }

      db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [provider, subject], (err, cred) => {
        db.close(() => {
          if (err) {
            reject(err);
            return;
          }
          resolve(cred);
        });
      });
    });
  });
}

export function createUser(name: string) {
  return new Promise((resolve, reject) => {
    const db = new Database(filename, mode, err => {
      if (err) {
        reject(err);
        return;
      }

      db.run('INSERT INTO users (name) VALUES (?)', [name], function(err) {
        db.close(() => {
          if (err) {
            reject(err);
            return;
          }
          const id = this.lastID;
          resolve({id, name});
        });
      });
    });
  });
}

export function createFederatedCredential(user_id: number, provider: string, subject: string) {
  return new Promise((resolve, reject) => {
    const db = new Database(filename, mode, err => {
      if (err) {
        reject(err);
        return;
      }

      db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [user_id, provider, subject], function(err) {
        db.close(() => {
          if (err) {
            reject(err);
            return;
          }
          resolve({user_id, provider, subject});
        });
      });
    });
  });
}

export function getUser(id: number) {
  return new Promise((resolve, reject) => {
    const db = new Database(filename, mode, err => {
      if (err) {
        reject(err);
        return;
      }

      db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
        db.close(() => {
          if (err) {
            reject(err);
            return;
          }
          resolve(user);
        });
      });
    });
  });
}
