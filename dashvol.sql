--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    user_id integer,
    user_fname character varying(255) NOT NULL,
    user_lname character varying(255) NOT NULL
);


ALTER TABLE public.user_details OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    password text NOT NULL,
    email text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: vol_hours; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vol_hours (
    user_id integer NOT NULL,
    vol_id integer NOT NULL,
    hours integer,
    vol_date date,
    vol_time time without time zone NOT NULL
);


ALTER TABLE public.vol_hours OWNER TO postgres;

--
-- Name: vol_places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vol_places (
    vol_id integer NOT NULL,
    vol_name text,
    vol_desc text,
    vol_website text
);


ALTER TABLE public.vol_places OWNER TO postgres;

--
-- Name: vol_places_vol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vol_places_vol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vol_places_vol_id_seq OWNER TO postgres;

--
-- Name: vol_places_vol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vol_places_vol_id_seq OWNED BY public.vol_places.vol_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: vol_places vol_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vol_places ALTER COLUMN vol_id SET DEFAULT nextval('public.vol_places_vol_id_seq'::regclass);


--
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_details (user_id, user_fname, user_lname) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, email) FROM stdin;
\.


--
-- Data for Name: vol_hours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vol_hours (user_id, vol_id, hours, vol_date, vol_time) FROM stdin;
\.


--
-- Data for Name: vol_places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vol_places (vol_id, vol_name, vol_desc, vol_website) FROM stdin;
11	Best Buyooos	It is a best buy	https://www.bestbuy.com
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 13, true);


--
-- Name: vol_places_vol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vol_places_vol_id_seq', 11, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: vol_places vol_places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vol_places
    ADD CONSTRAINT vol_places_pkey PRIMARY KEY (vol_id);


--
-- Name: vol_places vol_places_vol_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vol_places
    ADD CONSTRAINT vol_places_vol_name_key UNIQUE (vol_name);


--
-- Name: user_details fk_user_details; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT fk_user_details FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: vol_hours fk_vol_places_hours; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vol_hours
    ADD CONSTRAINT fk_vol_places_hours FOREIGN KEY (vol_id) REFERENCES public.vol_places(vol_id) ON DELETE CASCADE;


--
-- Name: vol_hours fk_vol_places_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vol_hours
    ADD CONSTRAINT fk_vol_places_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

