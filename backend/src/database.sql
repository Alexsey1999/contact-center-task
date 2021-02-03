SELECT * FROM task.app

INSERT INTO task.app (
one, two) VALUES (
$1, $2)
 RETURNING *;
