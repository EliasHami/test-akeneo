BEGIN;

SET client_encoding = 'LATIN1';

CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    gift text NOT NULL,
    blacklist text[] NOT NULL
);

CREATE TABLE draw (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    participants text[] NOT NULL,
    draws text[] NOT NULL
);

COPY participant (id, name, gift, blacklist) FROM stdin;
1	john	ps4	{lucie}
2	lucie	computer	{}
3	mickael	travel_card	{}
\.

COMMIT;

ANALYZE participant;
ANALYZE draw;
