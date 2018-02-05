-- SELECT CURRENT_DATE;
DROP TABLE IF EXISTS notes;

CREATE TABLE notes(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  created timestamp DEFAULT current_timestamp
);

ALTER SEQUENCE notes_id_seq RESTART WITH 1000;

 INSERT INTO notes
   (title, content) VALUES
   ('TEST NOTE 2', 'CANADA'),
   ('TEST NOTE 3', 'GERMANY'),
   ('TEST NOTE 4', 'CHINA'),
   ('TEST NOTE 5', 'INDIA'),
   ('TEST NOTE 6', 'BRAZIL');   

SELECT * FROM notes;