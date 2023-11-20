-- Felhasználók beillesztése, a jelszó mindegyik felhasználóhoz "password", az adatbázisba titkosítva kerül elmentésre
INSERT INTO users (id, games_played, games_won, password, user_name)
VALUES
  (1, 10, 8, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'admin'),
  (2, 5, 3, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'john_doe'),
  (3, 8, 6, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'jane_smith'),
  (4, 12, 9, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'alice_jones'),
  (5, 4, 2, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'bob_jenkins'),
  (6, 15, 12, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'sara_miller'),
  (7, 7, 4, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'peter_smith'),
  (8, 9, 7, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'emily_davis'),
  (9, 11, 8, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'alex_carter'),
  (10, 6, 5, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'olivia_white'),
  (11, 10, 10, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'michael_brown'),
  (12, 3, 1, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'grace_taylor'),
  (13, 7, 5, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'ryan_cooper'),
  (14, 9, 6, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'hannah_jackson'),
  (15, 14, 11, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'david_ross'),
  (16, 8, 4, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'lily_hill'),
  (17, 6, 3, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'max_wood'),
  (18, 11, 7, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'zoey_turner'),
  (19, 5, 2, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'logan_roberts'),
  (20, 12, 9, '$2a$10$c0cm87ZN80wvnDeHMbzdhe8iTHuMOqhBu6QFMjt5zFpaMh.TnizQK', 'mia_nelson');

-- USER jogosultság beállítása minden felhasználónak
INSERT INTO user_authority (user_id, authority_id)
SELECT id, 2 FROM users;

-- ADMIN jogosultság beállítása néhány felhasználónak
INSERT INTO user_authority (user_id, authority_id)
VALUES
  (1, 1),
  (6, 1),
  (8, 1),
  (14, 1),
  (18, 1),
  (20, 1);
