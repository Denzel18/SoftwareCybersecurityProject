use cybersecurity;

-- Username: admin
-- Password: admin
INSERT into user (id, name, username, password, account, type)
values ('1', 'Luca Rossi', 'admin', '$2b$10$STop8hMjsywnmwy.XWAKkunhoGU7MPiiaraSMKjD5KVsqKv1OKj6G',
        '0xed9d02e382b34818e88b88a309c7fe71e65f419d', 'admin');

-- Username: invalidator
-- Password: invalidator
INSERT into user (id, name, username, password, account, type)
values ('2', 'Giovanni Rossi', 'invalidator', '$2b$10$ENaa26rmvVJIyH.O4hkzQ.XlmyKv5M4UpjGNsor0hOrwU9z3mDUOe',
        '0xed9d02e382b34818e88b88a309c7fe71e65f419d', 'invalidator');

-- Username: user
-- Password: user
INSERT into user (id, name, username, password, account, type)
values ('3', 'Mario Rossi', 'user', '$2b$10$CsC/5Mcf8XTXiZkNndc5PecVJazyHRezC89DiVYAVPjbdaI8sm1fq',
        '0xed9d02e382b34818e88b88a309c7fe71e65f419d', 'user');