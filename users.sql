DROP TABLE IF EXISTS federated_credentials;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT
);

CREATE TABLE federated_credentials (
  user_id INTEGER NOT NULL REFERENCES users(id),
  provider TEXT NOT NULL,
  subject TEXT NOT NULL,
  PRIMARY KEY(provider, subject)
);
