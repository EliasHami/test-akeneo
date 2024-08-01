BEGIN;

SET client_encoding = 'LATIN1';

CREATE TABLE participant (
    id integer NOT NULL,
    name text NOT NULL,
    gift text NOT NULL,
    blacklist text[] NOT NULL
);

CREATE TABLE draw (
    id integer NOT NULL,
    date DATE NOT NULL,
    participants text[] NOT NULL,
    gifts text[] NOT NULL
);

COPY participant (id, name, gift, blacklist) FROM stdin;
1	john	ps4	{lucie}
2	lucie	computer	{}
3	mickael	travel_card	{}
\.

ALTER TABLE ONLY participant
    ADD CONSTRAINT participant_pkey PRIMARY KEY (id);

ALTER TABLE ONLY draw
    ADD CONSTRAINT draw_pkey PRIMARY KEY (code);

COMMIT;

ANALYZE participant;
ANALYZE draw;
