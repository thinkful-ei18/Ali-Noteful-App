-- SELECT * FROM notes;

-- SELECT * FROM notes LIMIT 5;

-- SELECT * FROM notes ORDER BY content desc;

-- SELECT * FROM notes ORDER BY id asc;

-- SELECT * FROM notes WHERE title = 'TEST NOTE 5';

-- SELECT * FROM notes WHERE content LIKE '%IN%';

-- UPDATE notes
--   SET content = 'GHANA'
--   WHERE id= '1';

-- INSERT INTO notes
--   (title) VALUES
--   ('GIBBERISH');

-- DELETE FROM notes WHERE id = '6';

ALTER SEQUENCE id RESTART 1000;

-- SELECT * FROM notes;