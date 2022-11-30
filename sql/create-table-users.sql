DROP TABLE IF EXISTS federated_credentials;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255)
);

CREATE TABLE federated_credentials (
  user_id INT NOT NULL REFERENCES users(id),
  provider VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  PRIMARY KEY(provider, subject)
);
