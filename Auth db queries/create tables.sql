CREATE TABLE Student(
    student_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    registration_no VARCHAR(200) UNIQUE NOT NULL,
    profile_pic VARCHAR(MAX),
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    year_of_study VARCHAR(200) NOT NULL,
);
-- parent table (contains parents/guardian information)
CREATE TABLE Parent(
    parent_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    phone_number VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    registration_no VARCHAR(200) FOREIGN KEY REFERENCES Student(registration_no)
);
CREATE TABLE Users(
    users_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    email VARCHAR(200) UNIQUE NOT NULL,
    pwd VARCHAR(600) NOT NULL,
    registration_no VARCHAR(200) FOREIGN KEY REFERENCES Student(registration_no),
    phone_number VARCHAR(200) NOT NULL,
    created_at DATE DEFAULT GETDATE(),
);
CREATE TABLE Admin(
    admin_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    username VARCHAR(200) UNIQUE NOT NULL,
    pwd VARCHAR(600) NOT NULL,
    phone_number VARCHAR(200) NOT NULL,
    created_at DATE DEFAULT GETDATE(),
);
CREATE TABLE Request(
    request_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    email VARCHAR(200) NOT NULL UNIQUE,
    registration_no VARCHAR(200) NOT NULL,
    phone_number VARCHAR(200) NOT NULL,
    sent_at DATETIME DEFAULT GETDATE(),
    isApproved BIT DEFAULT 0,
);



