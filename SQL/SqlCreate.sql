-- Create the database
CREATE DATABASE Aestus;
GO

-- Use the newly created database
USE Aestus;
GO

-- Create the Settings table
CREATE TABLE dbo.Settings (
    SettingId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Value DECIMAL(10, 2) NOT NULL,
    EffectiveDate DATETIME NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Insert an initial row of data into the Settings table
INSERT INTO dbo.Settings (Name, Value, EffectiveDate)
VALUES ('Porez na dobit', 18.00, GETDATE());
GO