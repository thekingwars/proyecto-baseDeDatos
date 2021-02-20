CREATE DATABASE proyecto_bd;

USE proyecto_bd;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(120) NOT NULL,
    contrasena VARCHAR(60) NOT NULL,
    google BOOLEAN DEFAULT false

    primary key(id)
);