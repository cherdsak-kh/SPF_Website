CREATE TABLE articles (
    dateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    author TEXT NOT NULL,
    linkSharing VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `articles` (`topic`, `author`, `linkSharing`) VALUES ('คู่มือหน่วยทหารขนาดเล็ก (เล่มเล็ก) 1', 'BentsuKun', 'https://drive.google.com/file/d/1U9VtyIUCPUfJESrShE78pWPfRQX9S9dl/view');
INSERT INTO `articles` (`topic`, `author`, `linkSharing`) VALUES ('คู่มือหน่วยทหารขนาดเล็ก (เล่มเล็ก) 2', 'BentsuKun', 'https://drive.google.com/file/d/18cI90PaWqGnN1VoNDGHUlAcZSZqNT2Ee');
INSERT INTO `articles` (`topic`, `author`, `linkSharing`) VALUES ('คู่มือหน่วยทหารขนาดเล็ก (เล่มเล็ก) 3', 'BentsuKun', 'https://drive.google.com/file/d/1n78BzHWOpQxXYxkI5epMTMRzDZJ-osnm/view');
INSERT INTO `articles` (`topic`, `author`, `linkSharing`) VALUES ('คู่มือหน่วยทหารขนาดเล็ก (เล่มเล็ก) 4', 'BentsuKun', 'https://drive.google.com/file/d/1Rku_uOgHBuUrgSbJMzQQ8xf-_vmjuO5V');
INSERT INTO `articles` (`topic`, `author`, `linkSharing`) VALUES ('คู่มือหน่วยทหารขนาดเล็ก (เล่มเล็ก) 5', 'BentsuKun', 'https://drive.google.com/file/d/10d8eKJZo0isX5_Czw2BHYOt3ySYYkcEc/view');