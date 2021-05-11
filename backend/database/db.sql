CREATE DATABASE IF NOT EXISTS proyecto_bd;

USE proyecto_bd;

CREATE TABLE IF NOT EXISTS `users`
(
    `id`         BIGINT       NOT NULL PRIMARY KEY  AUTO_INCREMENT,
    `nombre`     VARCHAR(50)  NOT NULL,
    `apellido`   VARCHAR(50)  NOT NULL,
    `correo`     VARCHAR(120) UNIQUE NOT NULL,
    `contrasena` VARCHAR(60)  NOT NULL,
    `google`     BOOLEAN      DEFAULT false,
    `create_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `contact`
(
    `id_contact`     BIGINT      NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`           VARCHAR(50) NOT NULL CHECK (`name` <> ''),
    `lastname`       VARCHAR(50) NOT NULL CHECK (`lastname` <> ''),
    `phone`          VARCHAR(15),
    `business`       VARCHAR(50),
    `description`    VARCHAR(120) NOT NULL CHECK (`description` <> ''),
    `email`          VARCHAR(120) NOT NULL,
    `create_at`      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at`      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `appointment`
(
    `id_appointment` BIGINT      NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`           VARCHAR(50) NOT NULL CHECK (`name` <> ''),
    `create_at`      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at`      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `employees`
(
    `id_employee`    BIGINT      NOT NULL PRIMARY KEY  AUTO_INCREMENT,
    `name`           VARCHAR(50) NOT NULL CHECK (`name` <> ''),
    `lastname`       VARCHAR(50) NOT NULL CHECK (`lastname` <> ''),
    `dni`            VARCHAR(50) NOT NULL CHECK (`dni` <> ''),
    `typeofpayroll`  VARCHAR(20) NOT NULL CHECK (`typeofpayroll` <> ''),
    `phone`          VARCHAR(15) NOT NULL CHECK (`phone` <> ''),
    `fecha`          DATE        NOT NULL,
    `fk_appointment` BIGINT      NOT NULL CHECK (`fk_appointment` > 0 ),
    `create_at`      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at`      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (`fk_appointment`) REFERENCES `appointment` (`id_appointment`)
     ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `estate`
(
    `id_estate`   BIGINT     NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`        VARCHAR(50) NOT NULL CHECK (`name` <> ''),
    `city`        VARCHAR(25) NOT NULL CHECK (`city` <> ''),
    `state`       VARCHAR(25) NOT NULL CHECK (`state` <> ''),
    `nro_country` BIGINT      NOT NULL CHECK (`nro_country` > 0 ),
    `areas`       VARCHAR(50) NOT NULL CHECK ( `areas` <> ''),
    `create_at`   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at`   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS `animal`
(
    `id_animal`  BIGINT       NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`       VARCHAR(50)  NOT NULL CHECK (`name` <> ''),
    `fecha`      DATE         NOT NULL,
    `cod_animal` VARCHAR(200) NOT NULL CHECK (`cod_animal` <> ''),
    `breed`      VARCHAR(40)  NOT NULL CHECK (`breed` <> ''),
    `color`      VARCHAR(15)  NOT NULL CHECK (`color` <> ''),
    `img_animal` JSON,
    `create_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `fk_estate` BIGINT NOT NULL,
    FOREIGN KEY (`fk_estate`) REFERENCES `estate` (`id_estate`)
    ON DELETE CASCADE
);