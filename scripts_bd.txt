DROP TABLE IF EXISTS client CASCADE;
CREATE TABLE client(
   username         CHAR(15) PRIMARY KEY,
   first_name       CHAR(20) NOT NULL,
   last_name      CHAR(20) NOT NULL,
   date_birth	    DATE NOT NULL,
   type_id          CHAR(2),
   id	          BIGINT NOT NULL,
   password	    TEXT NOT NULL,
   phone_number  	    INT NOT NULL,
   address	    CHAR(50) NOT NULL,
   email 	    TEXT NOT NULL,	
   credit_card_number   BIGINT
   CHECK (type_id IN ('CC', 'TI','RC','TP'))
);

DROP TABLE IF EXISTS admin CASCADE;
CREATE TABLE admin(
   id	          CHAR(9) PRIMARY KEY,	
   password	    TEXT NOT NULL,
   description	    TEXT NOT NULL
);

DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message(
   username         CHAR(15) REFERENCES client(nickname),
   id	    CHAR(9) REFERENCES admin(codigo),	
   description	    TEXT NOT NULL
);

DROP TABLE IF EXISTS category CASCADE;
CREATE TABLE category(
   name_category	CHAR(15) PRIMARY KEY,
   description	    TEXT NOT NULL
);

DROP TABLE IF EXISTS subcategory CASCADE;
CREATE TABLE subcategory(
   name_subcategory	CHAR(15) PRIMARY KEY,
   name_category	CHAR(15) REFERENCES category(name_category),
   description	    TEXT NOT NULL
);

DROP TABLE IF EXISTS book CASCADE;
CREATE TABLE book(
   ISBN         	CHAR(15) PRIMARY KEY,
   name_subcategory	CHAR(9) REFERENCES subcategory(name_subcategory),	
   publication_year	DATE NOT NULL,
   synopsis 		TEXT NOT NULL,
   title		TEXT NOT NULL,
   author		CHAR(15) NOT NULL,	
   number_of_pages 		INT NOT NULL,
   price		BIGINT NOT NULL
);

DROP TABLE IF EXISTS critics CASCADE;
CREATE TABLE critics(
   username         CHAR(15) REFERENCES client(nickname),
   ISBN		    CHAR(15) REFERENCES book(ISBN),
   comment	    TEXT NOT NULL
);

DROP TABLE IF EXISTS bill CASCADE;
CREATE TABLE bill(
   id_bill          BIGINT PRIMARY KEY,
   ISBN		    CHAR(15) REFERENCES book(ISBN),
   date		    DATE NOT NULL
);

DROP TABLE IF EXISTS bill_book CASCADE;
CREATE TABLE bill_book(
   id          BIGINT REFERENCES bill(id_bill),
   ISBN		    CHAR(15) REFERENCES book(ISBN),
   score	    INT NOT NULL,
   Quantity	    INT NOT NULL
);
