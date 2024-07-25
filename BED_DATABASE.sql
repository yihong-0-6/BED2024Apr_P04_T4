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
(23, 'Burma VJ', 2008, 'Anders �stergaard', 'Myanmar'),
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
 �� ID INT PRIMARY KEY NOT NULL,
 �� Title VARCHAR(300) NOT NULL,
 �� Author VARCHAR(120) NOT NULL,
 �� Published_Date DATE NOT NULL,
);

INSERT INTO Articles (ID, Title, Author, Published_Date) VALUES
(1, 'How independent filmmakers in Southeast Asia are on the rise', 'Liz Shackleton', '2019-09-11'),
(2, 'How the Vietnam film industry is booming even in the face of censorship', 'Silvia Wong', '2023-09-08'),
(3, 'Southeast Asia cinema chains thrive as other markets struggle', 'Elizabeth Beattie', '2023-09-21'),
(4, 'AI film festival gives glimpse of cinemas future', 'The Straits Times', '2024-05-13'),
(5, 'For Over a Decade, Singaporean Cinema Was Dead. Then the 90s Came Along.', 'Hidzir Junaini', '2023-08-04'),
(6, 'X3D STUDIO: PIONEERING VIRTUAL PRODUCTION IN SOUTHEAST ASIA', 'Metropolitant', '2024-06-19');
 
CREATE TABLE Forums (
    forumId INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(255) NOT NULL,
    author NVARCHAR(50) NOT NULL,
    comments NVARCHAR(255) NULL
);

INSERT INTO Forums (forumId, title, author, comments)
VALUES (1, 'Economic Development in Southeast Asia', 'Alex Harper', 'Good discussion!'),
       (2, 'Regional Climate Change Adaptation Strategies', 'Jordan Blake', 'Really enjoyed this topic!'),
       (3, 'Regional Security and Cooperation', 'Casey Morgan', 'Other countries should learn from SEA'),
       (4, 'Sustainable Tourism Initiatives In Southeast Asia', 'Taylor Quinn', 'Tourism in SEA is not too bad'),
       (5,'Regional Technological Advancements and Innovation', 'Avery Brooks', 'SEA improving on technological advancements'),
       (6, 'Regional Cultural Exchange and Heritage Preservation', 'Riley Parker', 'Preservation efforts is essential in SEA');


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

CREATE TABLE Admins (
    id INT IDENTITY(1,1) PRIMARY KEY,
	email NVARCHAR(50) NOT NULL,
    password NVARCHAR(50) NOT NULL
);

INSERT INTO Admins (email, password)
VALUES 
   ('admin123@gmail.com', 'pass1234'), 
   ('admin456@gmail.com', 'pass456');

   
CREATE TABLE Countries (
    ID INT PRIMARY KEY IDENTITY(1,1),
    CountryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500)
);


INSERT INTO Countries (CountryName, Description) VALUES
('Singapore', 'Singapore, an island city-state off southern Malaysia, is a global financial hub with a tropical climate and multicultural population. Known for its colonial core centered on the Padang, a cricket field since the 1830s and now flanked by grand buildings such as City Hall, with its 18 Corinthian columns. In Singapore''s circa-1820 Chinatown stands the red-and-gold Buddha Tooth Relic Temple, said to house one of Buddha''s teeth.'),
('Indonesia', 'Indonesia, officially the Republic of Indonesia, is a country in Southeast Asia and Oceania, between the Indian and Pacific oceans. It consists of over 17,000 islands, including Sumatra, Java, Sulawesi, and parts of Borneo and New Guinea. Indonesia is known for its diverse culture, vibrant cities, and extensive biodiversity. It is the world''s largest island country and the 14th largest country by land area, with over 270 million people, making it the world''s fourth-most populous country.'),
('Philippines', 'The Philippines, officially the Republic of the Philippines, is an archipelagic country in Southeast Asia. It consists of about 7,641 islands that are categorized broadly under three main geographical divisions from north to south: Luzon, Visayas, and Mindanao. The Philippines is known for its rich biodiversity as its main tourist attraction. Its beaches, mountains, rainforests, islands, and diving spots are among the country''s most popular tourist destinations.'),
('Myanmar', 'Myanmar, officially the Republic of the Union of Myanmar, also known as Burma, is a country in Southeast Asia. It is bordered by Bangladesh and India to its northwest, China to its northeast, Laos and Thailand to its east and southeast, and the Andaman Sea and the Bay of Bengal to its south and southwest. Myanmar is known for its unique culture and history, as well as its diverse landscapes which range from the Himalayan foothills in the north to tropical beaches in the south.'),
('Malaysia', 'Malaysia is a Southeast Asian country occupying parts of the Malay Peninsula and the island of Borneo. It''s known for its beaches, rainforests, and mix of Malay, Chinese, Indian, and European cultural influences. The capital, Kuala Lumpur, is home to colonial buildings, busy shopping districts such as Bukit Bintang, and skyscrapers such as the iconic Petronas Twin Towers. Malaysia is also famous for its rich biodiversity and the wildlife found in its rainforests.'),
('Thailand', 'Thailand, officially the Kingdom of Thailand, is a country in Southeast Asia located at the centre of the Indochinese Peninsula. Known for its tropical beaches, opulent royal palaces, ancient ruins, and ornate temples displaying figures of Buddha. In Bangkok, the capital, an ultramodern cityscape rises next to quiet canal-side communities and the iconic temples of Wat Arun, Wat Pho, and the Emerald Buddha Temple (Wat Phra Kaew).'),
('Vietnam', 'Vietnam, officially the Socialist Republic of Vietnam, is a country in Southeast Asia located at the eastern edge of the Indochinese Peninsula. It is known for its beaches, rivers, Buddhist pagodas, and bustling cities. Hanoi, the capital, pays homage to the nation''s iconic Communist-era leader, Ho Chi Minh, via a huge marble mausoleum. Ho Chi Minh City (formerly Saigon) has French colonial landmarks, plus Vietnamese War history museums and the Củ Chi tunnels, used by Viet Cong soldiers.'),
('Brunei', 'Brunei, officially the Nation of Brunei, the Abode of Peace, is a country located on the north coast of the island of Borneo in Southeast Asia. Apart from its coastline with the South China Sea, the country is completely surrounded by the Malaysian state of Sarawak. It is known for its vast oil reserves and wealth. The capital, Bandar Seri Begawan, is home to the opulent Sultan Omar Ali Saifuddien Mosque.'),
('Cambodia', 'Cambodia, officially the Kingdom of Cambodia, is a country located in the southern portion of the Indochinese Peninsula in Southeast Asia. It is known for its rich culture, history, and the famous Angkor Wat temple complex in Siem Reap. The capital city, Phnom Penh, is home to the Art Deco Central Market, glittering Royal Palace, and the National Museum''s historical and archaeological exhibits.'),
('Laos', 'Laos, officially the Lao People''s Democratic Republic, is a socialist state and the only landlocked country in Southeast Asia. It is known for its mountainous terrain, French colonial architecture, hill tribe settlements, and Buddhist monasteries. Vientiane, the capital, is the site of That Luang, a stupa believed to house the Buddha''s breastbone, plus Patuxai war memorial and Talat Sao (Morning Market), a complex jammed with food, clothes, and craft stalls.');




ALTER TABLE Movies
ADD Description NVARCHAR(1000);



UPDATE Movies
SET Description = 'Ong-Bak: Muay Thai Warrior is a 2003 Thai martial arts film directed by Prachya Pinkaew. The film stars Tony Jaa, Mum Jokmok, and Suchao Pongwilai. The story centers on Ting, a village martial artist who travels to Bangkok to retrieve the stolen head of his village''s Buddha statue. Ting faces numerous challenges and opponents in his quest, showcasing his incredible Muay Thai skills. The film is renowned for its breathtaking stunts and choreography, all performed without the use of CGI or wire work, which brought a new level of realism and excitement to the martial arts genre. Tony Jaa''s performance in Ong-Bak has been credited with revitalizing interest in traditional martial arts films, and the movie has since become a cult classic, influencing many subsequent action films.'
WHERE ID = 1;

UPDATE Movies
SET Description = 'Ilo Ilo is a 2013 Singaporean family drama film directed by Anthony Chen. The film chronicles the relationship between a family of three and their newly arrived maid, Teresa, who comes from the Philippines. Set during the 1997 Asian financial crisis, the film highlights the socioeconomic pressures faced by the family and the cultural differences between them and Teresa. As Teresa becomes an integral part of the family, the film delves into themes of domestic labor, economic hardship, and the bonds that form across cultural divides. Ilo Ilo received critical acclaim for its poignant storytelling and realistic portrayal of everyday life, winning the Camera d''Or at the 2013 Cannes Film Festival. The film has been praised for its sensitive direction, strong performances, and its ability to resonate with audiences globally.'
WHERE ID = 2;

UPDATE Movies
SET Description = 'A Land Imagined is a 2018 Singaporean neo-noir mystery thriller film directed by Yeo Siew Hua. The film follows Lok, a sleepless police investigator, as he tries to uncover the truth behind the disappearance of a Chinese construction worker named Wang. Set against the backdrop of Singapore''s rapidly changing urban landscape, the film explores themes of displacement, identity, and the human cost of modernization. Lok''s investigation leads him through a labyrinth of dreams and reality, highlighting the often unseen lives of migrant workers who contribute to the city''s growth. A Land Imagined won the Golden Leopard at the 2018 Locarno Film Festival, underscoring its critical success and its poignant commentary on the sacrifices made in the pursuit of progress.'
WHERE ID = 3;

UPDATE Movies
SET Description = 'Bad Genius is a 2017 Thai heist thriller film directed by Nattawut Poonpiriya. The film stars Chutimon Chuengcharoensukying as Lynn, a brilliant student who devises an elaborate cheating scheme for her classmates to pass exams. What starts as a small operation quickly escalates into a high-stakes international endeavor involving standardized tests like the STIC (SAT equivalent). Lynn collaborates with her friends to execute the scheme, navigating a web of lies, deceit, and moral dilemmas. The film is praised for its intelligent plot, strong performances, and intense pacing, making it one of Thailand''s highest-grossing films. Bad Genius also received international acclaim, highlighting issues of academic pressure and ethics in education systems worldwide.'
WHERE ID = 4;

UPDATE Movies
SET Description = 'Sepet is a 2004 Malaysian romantic comedy-drama film directed by Yasmin Ahmad. The film tells the story of a love affair between a Chinese boy named Jason and a Malay girl named Orked. Through their relationship, the film explores the cultural and racial tensions in Malaysia. Jason, an aspiring poet who sells pirated VCDs, and Orked, a high school student from a traditional Malay family, navigate the challenges posed by their interracial romance. Sepet is noted for its honest portrayal of interracial relationships and the societal pressures they face. Yasmin Ahmad''s direction and storytelling have been praised for their warmth, humor, and humanity, making Sepet a beloved film in Malaysian cinema. The film''s success has sparked conversations about race, identity, and love in contemporary Malaysia.'
WHERE ID = 5;

UPDATE Movies
SET Description = 'The Raid is a 2011 Indonesian action thriller film written, directed, and edited by Gareth Evans. The film stars Iko Uwais as Rama, a rookie member of an elite police squad tasked with raiding a high-rise building controlled by a ruthless drug lord named Tama. As the team ascends the building, they face increasingly brutal encounters with Tama''s henchmen, leading to intense and meticulously choreographed fight sequences. Known for its relentless pacing and visceral action, The Raid has been acclaimed for its choreography, direction, and Uwais''s physical performance. The film showcases the Indonesian martial art of Pencak Silat, bringing it to a global audience and gaining a cult following worldwide. The Raid''s success led to a sequel and discussions of Hollywood adaptations.'
WHERE ID = 6;

UPDATE Movies
SET Description = 'Ola Bola is a 2016 Malaysian sports film directed by Chiu Keng Guan. Inspired by true events, the film tells the story of the Malaysian national football team''s journey to qualify for the 1980 Moscow Olympics. Set against the backdrop of Malaysia''s multicultural society, Ola Bola highlights the challenges and triumphs of the players from diverse backgrounds as they come together to achieve a common goal. The film captures the spirit of unity and perseverance, with standout performances and stirring football sequences. Ola Bola was a commercial and critical success, resonating with audiences for its inspirational message and celebration of Malaysia''s diverse heritage. The film''s legacy continues to inspire a sense of national pride and unity in Malaysia.'
WHERE ID = 7;

UPDATE Movies
SET Description = 'The Monk is a 2014 Burmese drama film directed by The Maw Naing. The story revolves around a young novice monk named Zawana who lives in a remote monastery. As he navigates his spiritual journey, Zawana is faced with the decision to leave the monastic life and return to the secular world to care for his ailing mother. The film explores themes of duty, faith, and the conflict between personal desires and religious obligations. The Monk offers a poignant look at the challenges of monastic life and the sacrifices involved in maintaining one''s spiritual commitments. The film''s serene and contemplative tone, combined with its beautiful cinematography, provides a deep insight into the lives of monks in Myanmar.'
WHERE ID = 8;

UPDATE Movies
SET Description = 'Uncle Boonmee Who Can Recall His Past Lives is a 2010 Thai drama film written and directed by Apichatpong Weerasethakul. The film tells the story of Boonmee, a man suffering from acute kidney failure, who spends his final days in the countryside surrounded by his loved ones. As Boonmee''s health deteriorates, he begins to recall his past lives and experiences visions of deceased family members and spirits. The film explores themes of reincarnation, memory, and the interconnectedness of all life. Uncle Boonmee Who Can Recall His Past Lives won the Palme d''Or at the 2010 Cannes Film Festival, solidifying Apichatpong''s reputation as a visionary filmmaker. The film is celebrated for its meditative pace, mystical atmosphere, and profound philosophical insights.'
WHERE ID = 9;

UPDATE Movies
SET Description = 'Heneral Luna is a 2015 Filipino historical biopic film directed by Jerrold Tarog. The film depicts the life of General Antonio Luna, a brilliant but hot-tempered military leader of the Philippine Revolutionary Army during the Philippine-American War. Heneral Luna focuses on Luna''s fierce dedication to the cause of Philippine independence and his conflicts with both American forces and his own government. The film highlights the political intrigue, betrayal, and heroism that marked this tumultuous period in Philippine history. Heneral Luna received critical acclaim for its compelling storytelling, strong performances, and its unflinching portrayal of the complexities of war and leadership. The film has sparked renewed interest in Philippine history and inspired a resurgence of national pride.'
WHERE ID = 10;

UPDATE Movies
SET Description = 'The Journey is a 2014 Malaysian Chinese-language comedy-drama film directed by Chiu Keng Guan. The film tells the story of Uncle Chuan, a conservative father who reluctantly agrees to let his daughter marry her British boyfriend, Benji. The couple decides to hold a traditional Malaysian wedding, and Uncle Chuan and Benji embark on a cross-country journey to deliver the wedding invitations by hand. Along the way, they encounter various cultural and generational differences, leading to humorous and heartwarming moments. The Journey explores themes of family, tradition, and acceptance, capturing the essence of Malaysia''s multicultural society. The film was a box office hit and received praise for its authentic portrayal of Malaysian customs and its universal message of love and understanding.'
WHERE ID = 11;

UPDATE Movies
SET Description = 'The Road to Mandalay is a 2016 Burmese drama film directed by Midi Z. The film tells the story of two Burmese migrants, Lianqing and Guo, who flee their country in search of a better life in Thailand. As they navigate the harsh realities of illegal immigration, their dreams and aspirations are put to the test. The Road to Mandalay explores themes of displacement, hope, and the struggle for a better future. The film''s stark realism and compelling performances offer a powerful commentary on the plight of migrants and the sacrifices they make. The Road to Mandalay received critical acclaim for its poignant storytelling and its unflinching portrayal of the human cost of migration.'
WHERE ID = 12;

UPDATE Movies
SET Description = 'Pop Aye is a 2017 Singaporean-Thai drama film directed by Kirsten Tan. The story revolves around Thana, a disenchanted architect who bumps into his long-lost elephant, Pop Aye, on the streets of Bangkok. Determined to return Pop Aye to their rural hometown, Thana embarks on a journey across Thailand, encountering various characters and experiences along the way. The film explores themes of friendship, nostalgia, and the search for meaning in a rapidly changing world. Pop Aye is noted for its heartfelt storytelling, beautiful cinematography, and the touching bond between Thana and Pop Aye. The film won the Special Jury Award for Screenwriting at the 2017 Sundance Film Festival and has been praised for its unique perspective and emotional depth.'
WHERE ID = 13;

UPDATE Movies
SET Description = '881 is a 2007 Singaporean musical-comedy film directed by Royston Tan. The film tells the story of two childhood friends, Big Papaya and Small Papaya, who form a getai (stage performance) band called the Papaya Sisters. Set against the backdrop of Singapore''s Hungry Ghost Festival, the film explores the vibrant and colorful world of getai performances, filled with music, dance, and elaborate costumes. As the Papaya Sisters rise to fame, they face challenges, rivalries, and personal struggles. 881 is celebrated for its energetic musical numbers, heartfelt story, and its portrayal of Singapore''s cultural traditions. The film''s success brought renewed interest in getai and highlighted the importance of preserving cultural heritage.'
WHERE ID = 14;

UPDATE Movies
SET Description = 'Four Sisters and a Wedding is a 2013 Filipino comedy-drama film directed by Cathy Garcia-Molina. The film revolves around four sisters, Teddie, Bobbie, Alex, and Gabbie, who reunite for their younger brother CJ''s wedding. As the wedding preparations unfold, the sisters confront unresolved issues, sibling rivalries, and personal challenges. The film delves into themes of family dynamics, love, and forgiveness, capturing the complexities of sibling relationships. Four Sisters and a Wedding is praised for its witty dialogue, strong performances, and emotional depth. The film has become a beloved classic in Filipino cinema, resonating with audiences for its relatable portrayal of family bonds and the enduring power of love.'
WHERE ID = 15;

UPDATE Movies
SET Description = 'That Thing Called Tadhana is a 2014 Filipino romantic comedy film directed by Antoinette Jadaone. The film follows Mace, a heartbroken woman who meets Anthony, a stranger, at an airport. Together, they embark on a spontaneous road trip to Baguio, where they share their stories, fears, and dreams. Through their journey, Mace and Anthony find solace and healing in each other''s company. The film explores themes of love, heartbreak, and self-discovery, capturing the bittersweet nature of moving on. That Thing Called Tadhana is celebrated for its authentic dialogue, charming performances, and its heartfelt exploration of the complexities of love. The film has garnered a loyal following and is considered a modern classic in Filipino cinema.'
WHERE ID = 16;

UPDATE Movies
SET Description = 'Talentime is a 2009 Malaysian drama film written and directed by Yasmin Ahmad. The film revolves around a talent search competition held in a Malaysian high school, bringing together students from diverse backgrounds. The story follows several characters, including Melur, a gifted singer, and Mahesh, a hearing-impaired student, as they navigate personal challenges and societal expectations. Talentime explores themes of love, friendship, and the beauty of cultural diversity. Yasmin Ahmad''s sensitive direction and storytelling highlight the importance of understanding and acceptance in a multicultural society. The film is celebrated for its poignant narrative, memorable characters, and its ability to evoke deep emotions, making it a cherished work in Malaysian cinema.'
WHERE ID = 17;

UPDATE Movies
SET Description = 'Tropical Malady is a 2004 Thai romantic psychological drama film written and directed by Apichatpong Weerasethakul. The film is divided into two parts: the first part follows the romance between a soldier named Keng and a country boy named Tong, while the second part delves into a mystical and allegorical journey through the jungle. As Keng searches for Tong, who has disappeared, he encounters strange and supernatural occurrences. The film explores themes of love, desire, and the intersection of the spiritual and physical worlds. Tropical Malady is renowned for its experimental narrative structure, poetic visuals, and its ability to blend reality and myth. The film won the Jury Prize at the 2004 Cannes Film Festival, solidifying Apichatpong''s reputation as a visionary filmmaker.'
WHERE ID = 18;

UPDATE Movies
SET Description = 'Crazy Rich Asians is a 2018 American romantic comedy-drama film directed by Jon M. Chu. Based on Kevin Kwan''s novel of the same name, the film follows Rachel Chu, a Chinese-American professor, who travels to Singapore with her boyfriend, Nick Young, to attend his best friend''s wedding. Rachel discovers that Nick''s family is one of the wealthiest in Asia, and she must navigate the lavish lifestyle and the expectations of Nick''s formidable mother. The film explores themes of love, cultural identity, and the clash between tradition and modernity. Crazy Rich Asians is celebrated for its vibrant portrayal of Asian culture, its strong performances, and its groundbreaking representation of an all-Asian cast in a Hollywood film. The film was a critical and commercial success, sparking important conversations about diversity and inclusion in the entertainment industry.'
WHERE ID = 19;

UPDATE Movies
SET Description = 'The Protector is a 2005 Thai martial arts film directed by Prachya Pinkaew. The film stars Tony Jaa as Kham, a young man from a family of elephant herders in Thailand. When his prized elephants are stolen and smuggled to Sydney, Australia, Kham embarks on a journey to retrieve them. Along the way, he faces numerous adversaries and uncovers a sinister conspiracy. The Protector is known for its incredible martial arts sequences, featuring Tony Jaa''s acrobatic and powerful fighting style. The film showcases traditional Muay Thai techniques and highlights the bond between humans and animals. The Protector''s intense action and emotional story have made it a standout in the martial arts genre, earning acclaim for its choreography and Jaa''s physical prowess.'
WHERE ID = 20;

UPDATE Movies
SET Description = 'On the Job is a 2013 Filipino crime thriller film directed by Erik Matti. The film tells the story of prisoners who are temporarily released from jail to carry out political assassinations for corrupt politicians. The plot follows two hitmen, Tatang and Daniel, as well as two law enforcers, Francis and Joaquin, who are investigating the murders. On the Job explores themes of corruption, power, and the blurred lines between right and wrong. The film is praised for its gritty realism, complex characters, and its unflinching portrayal of the Philippine justice system. On the Job received critical acclaim and was showcased at the Cannes Film Festival, solidifying Erik Matti''s reputation as a master of the crime thriller genre.'
WHERE ID = 21;

UPDATE Movies
SET Description = 'Birdshot is a 2016 Filipino coming-of-age thriller film directed by Mikhail Red. The film tells the story of a young farm girl named Maya who accidentally kills a critically endangered Philippine eagle. As local authorities investigate the eagle''s death, they uncover a deeper and more sinister conspiracy. Birdshot explores themes of innocence, survival, and the clash between traditional values and modernity. The film''s stunning cinematography and powerful performances provide a haunting look at the human impact on nature and the lengths people will go to protect their secrets. Birdshot received international acclaim, winning the Best Asian Future Film Award at the Tokyo International Film Festival and being selected as the Philippines'' entry for the Best Foreign Language Film at the 90th Academy Awards.'
WHERE ID = 22;

UPDATE Movies
SET Description = 'Burma VJ is a 2008 Danish documentary film directed by Anders Østergaard. The film follows the 2007 uprisings against the military regime in Burma, featuring footage shot by undercover journalists known as the Democratic Voice of Burma (DVB). Despite the severe risks, these journalists document the brutal crackdown on peaceful protesters, providing a rare and powerful glimpse into the country''s struggle for democracy. Burma VJ combines this raw footage with interviews and reenactments, creating a compelling narrative of courage and resistance. The documentary has been praised for its unflinching portrayal of the Burmese people''s fight for freedom and has won numerous awards, including the World Cinema Documentary Film Editing Award at the Sundance Film Festival.'
WHERE ID = 23;

UPDATE Movies
SET Description = 'Ada Apa dengan Cinta? is a 2002 Indonesian romantic drama film directed by Rudy Soedjarwo. The film tells the story of Cinta, a popular high school girl, who falls in love with Rangga, a reclusive and mysterious student. As their relationship develops, Cinta must navigate the challenges posed by her friends'' disapproval and her own insecurities. Ada Apa dengan Cinta? explores themes of love, identity, and the pressures of adolescence. The film''s portrayal of teenage romance and its vibrant depiction of Jakarta''s youth culture resonated deeply with audiences, making it a box office hit and a cultural phenomenon in Indonesia. The film''s success led to a sequel, further cementing its legacy in Indonesian cinema.'
WHERE ID = 24;

UPDATE Movies
SET Description = 'Laskar Pelangi is a 2008 Indonesian film directed by Riri Riza. Based on Andrea Hirata''s novel of the same name, the film follows a group of poor students and their two inspirational teachers at the Muhammadiyah Elementary School on Belitung Island. Despite the school''s lack of resources, the teachers strive to provide a quality education and instill hope in their students. Laskar Pelangi highlights the power of education, the importance of perseverance, and the beauty of friendship. The film''s heartwarming story and beautiful cinematography captured the hearts of audiences, becoming one of Indonesia''s highest-grossing films. Laskar Pelangi has inspired numerous educational initiatives and remains a beloved story of hope and resilience.'
WHERE ID = 25;

UPDATE Movies
SET Description = 'Pulang is a 2018 Malaysian drama film directed by Kabir Bhatia. The film is based on the true story of a man named Othman who leaves his family to work as a sailor, with the promise of returning home. However, Othman''s voyages take him farther and farther away, and his letters become the only connection to his family. Pulang explores themes of sacrifice, love, and the longing for home, capturing the emotional journey of Othman''s wife, Thom, who waits for his return. The film''s sweeping narrative, rich historical context, and strong performances make it a poignant and powerful story of devotion and endurance. Pulang has been praised for its beautiful storytelling and its tribute to the lives of seafarers and their families.'
WHERE ID = 26;

UPDATE Movies
SET Description = 'Kita Kita is a 2017 Filipino romantic comedy film directed by Sigrid Andrea Bernardo. The film tells the story of Lea, a Filipina tour guide in Japan who goes blind after witnessing her boyfriend''s infidelity. While dealing with her heartbreak and disability, Lea meets Tonyo, a fellow Filipino who helps her rediscover joy and trust. As their friendship blossoms into romance, Lea''s blindness becomes both a literal and metaphorical journey of seeing the world anew. Kita Kita is celebrated for its charming performances, heartfelt humor, and its exploration of love beyond appearances. The film was a surprise box office success and has been praised for its unique premise and its ability to balance comedy and drama.'
WHERE ID = 27;

UPDATE Movies
SET Description = 'Gie is a 2005 Indonesian biographical film directed by Riri Riza. The film is based on the diaries of Soe Hok Gie, a prominent Indonesian activist and intellectual who opposed the dictatorships of Sukarno and Suharto. Gie chronicles his life from his university days, where he became a vocal critic of the government, to his untimely death at the age of 27. The film explores themes of political idealism, personal integrity, and the cost of dissent. Gie''s portrayal of a young man''s unwavering commitment to justice and truth resonated with audiences, making it an important film in Indonesian cinema. The film''s powerful narrative and historical significance have made it a lasting tribute to Gie''s legacy.'
WHERE ID = 28;

UPDATE Movies
SET Description = 'Mudras Calling is a 2017 Burmese romantic drama film directed by Christina Kyi. The film follows Jaden, a Burmese-American musician who returns to Myanmar to discover his roots and learn more about his mother''s mysterious past. During his journey, he meets Hnin Thuzar, a local tour guide, and they develop a deep connection as they explore the country together. Mudras Calling delves into themes of identity, heritage, and the rediscovery of one''s cultural roots. The film is noted for its beautiful portrayal of Myanmar''s landscapes, traditions, and the emotional journey of its characters. Mudras Calling has been praised for its heartfelt story, strong performances, and its celebration of Burmese culture.'
WHERE ID = 29;

UPDATE Movies
SET Description = 'The Act of Killing is a 2012 documentary film directed by Joshua Oppenheimer. The film focuses on the individuals who participated in the Indonesian mass killings of 1965-66, particularly Anwar Congo and his companions, who were promoted from small-time gangsters to death squad leaders. The documentary explores the perpetrators'' perspectives as they reenact their crimes in various cinematic genres, revealing their memories, motivations, and the lingering impact of their actions. The Act of Killing is a chilling and provocative examination of the nature of violence, impunity, and the human capacity for evil. The film received widespread critical acclaim and numerous awards, including the BAFTA for Best Documentary, and has sparked important discussions about justice and reconciliation.'
WHERE ID = 30;

UPDATE Movies
SET Description = 'KL Gangster is a 2011 Malaysian action film directed by Syamsul Yusof. The film follows two estranged brothers, Malik and Jai, who become embroiled in the Malaysian underworld. Malik, recently released from prison, tries to leave his criminal past behind, while Jai rises through the ranks of the gang led by King. The film explores themes of loyalty, redemption, and the brutal realities of gang life. KL Gangster is known for its intense action sequences, gripping storyline, and strong performances. The film became a commercial success and was praised for its portrayal of the complexities of family relationships and the challenges of escaping a life of crime. KL Gangster remains one of the most popular action films in Malaysian cinema.'
WHERE ID = 31;

UPDATE Movies
SET Description = 'Water Festival is a 2013 Burmese drama film directed by Sai Naw Kham. The film revolves around the traditional Thingyan festival in Myanmar, a time of celebration and cleansing during the Burmese New Year. The story interweaves the lives of several characters, each experiencing personal transformations and revelations during the festival. Water Festival captures the cultural significance and communal spirit of Thingyan, highlighting themes of renewal, forgiveness, and the joy of human connection. The film is noted for its vibrant depiction of the festival''s water fights, music, and rituals, providing a rich and immersive experience of Burmese culture. Water Festival has been praised for its heartfelt storytelling and its celebration of tradition and community.'
WHERE ID = 32;

UPDATE Movies
SET Description = 'A Copy of My Mind is a 2015 Indonesian drama film directed by Joko Anwar. The film tells the story of Sari, a young woman who works in a beauty salon and enjoys pirated DVDs, and Alek, a man who creates subtitles for these DVDs. Their romance blossoms amidst the gritty backdrop of Jakarta''s bustling streets. However, their lives take a dangerous turn when they stumble upon a corrupt political scheme involving a powerful politician. A Copy of My Mind explores themes of love, ambition, and the moral compromises individuals make in a corrupt society. The film is praised for its raw and realistic portrayal of Jakarta''s urban life, its compelling narrative, and the chemistry between the lead actors. A Copy of My Mind has been celebrated as a poignant and thought-provoking commentary on contemporary Indonesian society.'
WHERE ID = 33;
