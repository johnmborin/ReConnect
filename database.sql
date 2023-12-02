CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  date_of_birth DATE,
  city VARCHAR(255),
  state VARCHAR(255),
  access_level VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE family (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_family (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES "user"(id),
    family_id INT REFERENCES family(id)
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date DATE NOT NULL,
    detail TEXT,
    family_id INT REFERENCES family(id),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(255)
);

CREATE TABLE user_event (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    event_id INT REFERENCES event(id),
    user_id INT REFERENCES "user"(id),
    attending BOOLEAN NOT NULL
);

CREATE TABLE resource (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    access_level VARCHAR(255) NOT NULL
);

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    detail TEXT,
    hidden BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE response (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES "user"(id),
    date DATE NOT NULL,
    question_id INT REFERENCES question(id),
    response TEXT,
    score INT
);

CREATE TABLE prompt (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    detail TEXT
);

CREATE TABLE journal (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    prompt_id INT REFERENCES prompt(id),
    user_id INT REFERENCES "user"(id),
    date DATE NOT NULL,
    detail TEXT,
    hidden BOOLEAN
);

-- please write an insert statement for each table to add some data to it
-- Path: insert.sql
-- INSERT INTO "user" (first_name, last_name, state, city, date_of_birth, password, username, access_level)
-- VALUES ('John', 'Doe', 'CA', 'San Francisco', '1990-01-01', 'password', 'jerry@gmail.com', 'admin');

INSERT INTO family (id)
VALUES (1);

INSERT INTO user_family (user_id, family_id)
VALUES (1, 1);

INSERT INTO event (date, detail, family_id, time, type)
VALUES ('2020-01-01', 'New Years', 1, '2020-01-01 00:00:00', 'holiday');

INSERT INTO user_event (event_id, user_id, attending)
VALUES (1, 1, true);

INSERT INTO resource (access_level)
VALUES ('parent');

INSERT INTO question (id, type, detail, hidden)
VALUES (1, 'type', 'detail', true);

INSERT INTO response (user_id, date, question_id, response, score)
VALUES (1, '2020-01-01', 1, 'response', 1);

INSERT INTO prompt (detail)
VALUES ('detail');

INSERT INTO journal (prompt_id, user_id, date, detail)
VALUES (1, 1, '2020-01-01', 'detail');

