CREATE TABLE Movies (
    ID INT PRIMARY KEY NOT NULL,
    Name VARCHAR(250) NOT NULL,
    Published_Year INT NOT NULL,
    Director VARCHAR(120) NOT NULL,
    Country VARCHAR(50) NOT NULL
);

INSERT INTO Movies (ID, Name, Published_Year, Director, Country) VALUES
(1, 'Ong-Bak: Muay Thai Warrior', 2003, 'Prachya Pinkaew', 'Thailand'),
(2, 'Ilo Ilo', 2013, 'Anthony Chen', 'Singapore'),
(3, 'A Land Imagined', 2018, 'Yeo Siew Hua', 'Singapore'),
(4, 'Bad Genius', 2017, 'Apichatpong Weerasethakul', 'Thailand'),
(5, 'Sepet', 2004, 'Yasmin Ahmad', 'Malaysia'),
(6, 'The Raid', 2011, 'Gareth Evans', 'Indonesia'),
(7, 'Ola Bola', 2016, 'Chiu Keng Guan', 'Malaysia'),
(8, 'The Monk', 2014, 'The Maw Naing', 'Myanmar'),
(9, 'Uncle Boonmee Who Can Recall His Past Lives', 2010, 'Apichatpong Weerasethakul', 'Thailand'),
(10, 'Heneral Luna', 2015, 'Jerrold Tarog', 'Philippines'),
(11, 'The Journey', 2014, 'Chiu Keng Guan', 'Malaysia'),
(12, 'The Road to Mandalay', 2016, 'Midi Z', 'Myanmar'),
(13, 'Pop Aye', 2017, 'Kirsten Tan', 'Singapore'),
(14, '881', 2007, 'Royston Tan', 'Singapore'),
(15, 'Four Sisters and a Wedding', 2013, 'Cathy Garcia-Molina', 'Philippines'),
(16, 'That Thing Called Tadhana', 2014, 'Antoinette Jadaone', 'Philippines'),
(17, 'Talentime', 2009, 'Yasmin Ahmad', 'Malaysia'),
(18, 'Tropical Malady', 2004, 'Apichatpong Weerasethakul', 'Thailand'),
(19, 'Crazy Rich Asians', 2018, 'Jon M. Chu', 'Singapore'),
(20, 'The Protector', 2005, 'Prachya Pinkaew', 'Thailand'),
(21, 'On the Job', 2013, 'Erik Matti', 'Philippines'),
(22, 'Birdshot', 2016, 'Mikhail Red', 'Philippines'),
(23, 'Burma VJ', 2008, 'Anders Østergaard', 'Myanmar'),
(24, 'Ada Apa dengan Cinta?', 2002, 'Rudy Soedjarwo', 'Indonesia'),
(25, 'Laskar Pelangi', 2008, 'Riri Riza', 'Indonesia'),
(26, 'Pulang', 2018, 'Kabir Bhatia', 'Malaysia'),
(27, 'Kita Kita', 2017, 'Sigrid Andrea Bernardo', 'Philippines'),
(28, 'Gie', 2005, 'Riri Riza', 'Indonesia'),
(29, 'Mudras Calling', 2017, 'Christina Kyi', 'Myanmar'),
(30, 'The Act of Killing', 2012, 'Joshua Oppenheimer', 'Indonesia'),
(31, 'KL Gangster', 2011, 'Syamsul Yusof', 'Malaysia'),
(32, 'Water Festival', 2013, 'Sai Naw Kham', 'Myanmar'),
(33, 'A Copy of My Mind', 2015, 'Joko Anwar', 'Indonesia');
 
CREATE TABLE Articles (
    ID INT PRIMARY KEY NOT NULL,
    Title VARCHAR(300) NOT NULL,
    Author VARCHAR(120) NOT NULL,
    Published_Date DATE NOT NULL,
	ImagePath VARCHAR(255)
);

INSERT INTO Articles (ID, Title, Author, Published_Date, ImagePath) VALUES
(1, 'How independent filmmakers in Southeast Asia are on the rise', 'Liz Shackleton', '2019-09-11', '/Images/independentFilmmakers.jpg'),
(2, 'How the Vietnam film industry is booming even in the face of censorship', 'Silvia Wong', '2023-09-08', '/Images/vietnamFilmIndustry.jpg'),
(3, 'Southeast Asia cinema chains thrive as other markets struggle', 'Elizabeth Beattie', '2023-09-21', '/Images/cinemaChainsThrive'),
(4, 'AI film festival gives glimpse of cinemas future', 'The Straits Times', '2024-05-13', '/Images/aiFilmFestival'),
(5, 'For Over a Decade, Singaporean Cinema Was Dead. Then the 90s Came Along.', 'Hidzir Junaini', '2023-08-04', '/Images/singaporeCinema'),
(6, 'X3D STUDIO: PIONEERING VIRTUAL PRODUCTION IN SOUTHEAST ASIA', 'Metropolitant', '2024-06-19', '/Images/x3dStudio');
 
CREATE TABLE Forums (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(255) NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    comments INT DEFAULT 0
);

INSERT INTO Forums (title, likes, dislikes, comments)
VALUES ('Economic Development in Southeast Asia', 56, 23, 73),
       ('Regional Climate Change Adaptation Strategies', 34, 78, 37),
       ('Regional Security and Cooperation', 45, 12, 76),
       ('Sustainable Tourism Initiatives In Southeast Asia', 89, 67, 17),
       ('Regional Technological Advancements and Innovation', 54, 37, 61),
       ('Regional Cultural Exchange and Heritage Preservation', 21, 49, 69);


CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL,
    password NVARCHAR(50) NOT NULL,
	email NVARCHAR(50) NOT NULL
);

INSERT INTO Users (username, password, email)
VALUES 
   ('User123', 'pass1234', 'User123@gmail.com'), 
   ('admin123', 'forum456', 'admin123@gmail.com');