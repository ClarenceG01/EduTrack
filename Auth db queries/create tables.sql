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
    pwd_changed BIT DEFAULT 0,
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
CREATE TABLE Pending(
    pending_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    email VARCHAR(200) NOT NULL,
    registration_no VARCHAR(200) NOT NULL,
    phone_number VARCHAR(200) NOT NULL,
    sent_at DATETIME DEFAULT GETDATE(),
);
-- RESULTS TABLES
CREATE TABLE Semester_exam(
    semester_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    semester_name VARCHAR(200) NOT NULL UNIQUE
);
CREATE TABLE Unit(
    unit_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    unit_name VARCHAR(600) NOT NULL UNIQUE,
    unit_code VARCHAR(200) NOT  NULL UNIQUE,
    semester_name VARCHAR(200) FOREIGN KEY REFERENCES Semester_exam(semester_name)
);
CREATE TABLE results(
    results_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    semester_name VARCHAR(200) FOREIGN KEY REFERENCES Semester_exam(semester_name),
    student_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Student(student_id),
    unit_code VARCHAR(200) FOREIGN KEY REFERENCES Unit(unit_code),
    score INTEGER NOT NULL,
    grade varchar(50) NOT NULL
);
CREATE TABLE Notice(
    notice_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    notice_title VARCHAR(200),
    file_path VARCHAR(MAX),
    notice_body VARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    file_type VARCHAR(MAX),
    file_name VARCHAR(MAX)
);
CREATE TABLE user_messages(
    user_messages_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    sender_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(users_id),
    receiver_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Admin(admin_id),
    message_body VARCHAR(MAX) NOT NULL,
    sent_at DATETIME DEFAULT GETDATE(),
    isRead BIT DEFAULT 0
);
CREATE TABLE admin_messages(
    admin_messages_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    sender_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Admin(admin_id),
    receiver_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(users_id),
    message_body VARCHAR(MAX) NOT NULL,
    sent_at DATETIME DEFAULT GETDATE(),
    isRead BIT DEFAULT 0
);

