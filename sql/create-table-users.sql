DROP TABLE IF EXISTS federated_credentials;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE federated_credentials (
  user_id INT NOT NULL REFERENCES users(id),
  provider VARCHAR(100) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  PRIMARY KEY(provider, subject)
);