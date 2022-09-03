-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 03-Set-2022 às 22:56
-- Versão do servidor: 8.0.13-4
-- versão do PHP: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `7U8oYvpBaP`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Categoria`
--

CREATE TABLE `Categoria` (
  `idCategoria` int(11) NOT NULL,
  `nomeCategoria` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Categoria`
--

INSERT INTO `Categoria` (`idCategoria`, `nomeCategoria`) VALUES
(1, 'Parque Natural'),
(2, 'Zonas Habitadas'),
(3, 'Zona Agrícola');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Comentarios`
--

CREATE TABLE `Comentarios` (
  `idComentarios` int(11) NOT NULL,
  `Titulo` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Texto` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Validacao` int(11) DEFAULT NULL,
  `Comentarios_idFotografias` int(11) NOT NULL,
  `Comentarios_idUtilizador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Comentarios`
--

INSERT INTO `Comentarios` (`idComentarios`, `Titulo`, `Texto`, `Validacao`, `Comentarios_idFotografias`, `Comentarios_idUtilizador`) VALUES
(1, 'Foto de Feijó', 'Estas são as fotografias que preciso', NULL, 1, 1),
(2, 'Seixal Velho', 'Esta é uma zona muito perigosa', NULL, 2, 2),
(3, 'Setubal Verde', 'Zona das laranjeiras alentejanas', NULL, 3, 3),
(4, 'Fotos do Outuno', 'Estas são as fotografi', NULL, 4, 4),
(5, 'Almada Lixeira', 'Estas são: ', NULL, 5, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Estado`
--

CREATE TABLE `Estado` (
  `idEstado` int(11) NOT NULL,
  `nomeEstado` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Estado`
--

INSERT INTO `Estado` (`idEstado`, `nomeEstado`) VALUES
(1, 'Limpo'),
(2, 'Semi-Limpo'),
(3, 'Sujo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Fotografias`
--

CREATE TABLE `Fotografias` (
  `idFotografias` int(11) NOT NULL,
  `Url` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Classificacao` int(11) DEFAULT NULL,
  `Latitude` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Longitude` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Data` datetime(6) DEFAULT NULL,
  `Fotografias_idEstado` int(11) NOT NULL,
  `Fotografias_idUtilizador` int(11) NOT NULL,
  `Fotografias_idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Fotografias`
--

INSERT INTO `Fotografias` (`idFotografias`, `Url`, `Classificacao`, `Latitude`, `Longitude`, `Data`, `Fotografias_idEstado`, `Fotografias_idUtilizador`, `Fotografias_idCategoria`) VALUES
(1, 'https://drive.google.com/uc?export=view&id=1g1kVTLWOnH4NWP99eQc0XysogNcF9gdt', 1, '38.6916', '-9.216', '2020-01-01 10:10:10.000000', 1, 1, 1),
(2, 'https://drive.google.com/uc?export=view&id=1VgHb5qXLkSzP1EqeA1W2ItwiXmh8fh4M', 2, '39.3345', '-10.234', '2020-01-01 10:10:10.000000', 1, 2, 2),
(3, 'https://drive.google.com/uc?export=view&id=1Th7X5DV3aLnlFo-mVtNyGk2NgXNr5AY5', 3, '33.4930', '-820', '2020-01-01 10:10:10.000000', 2, 3, 3),
(4, 'https://drive.google.com/uc?export=view&id=1Y9sIj486ghfH80WWW_Tkv4gt4Zq-crUO', 4, '37.4933', '-9.100', '2020-01-01 10:10:10.000000', 2, 4, 1),
(5, 'https://drive.google.com/uc?export=view&id=1EeQuZJ4cnkfGKSDYtAA0ADZJbI9vrUpq', 5, '38.8272', '-8.234', '2020-01-01 10:10:10.000000', 3, 5, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Utilizador`
--

CREATE TABLE `Utilizador` (
  `idUtilizador` int(11) NOT NULL,
  `nomeUtilizador` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Senha` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Utilizador`
--

INSERT INTO `Utilizador` (`idUtilizador`, `nomeUtilizador`, `Email`, `Senha`) VALUES
(1, 'Luis Goveia', 'luis@gmail.com', 'luis'),
(2, 'Mario Ferreira', 'mario@hotmail.com', 'mario'),
(3, 'Terasa Assunção', 'teresa@hotmail.com', 'teresa'),
(4, 'Luis Goveia', 'luis@gmail.com', 'luis'),
(5, 'Joana Matos', 'joana@gmail.com', 'joana');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categoria`
--
ALTER TABLE `Categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indexes for table `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD PRIMARY KEY (`idComentarios`,`Comentarios_idFotografias`,`Comentarios_idUtilizador`),
  ADD KEY `fk_Comentarios_Utilizador1_idx` (`Comentarios_idUtilizador`),
  ADD KEY `fk_Comentarios_Fotografias1` (`Comentarios_idFotografias`);

--
-- Indexes for table `Estado`
--
ALTER TABLE `Estado`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indexes for table `Fotografias`
--
ALTER TABLE `Fotografias`
  ADD PRIMARY KEY (`idFotografias`,`Fotografias_idEstado`,`Fotografias_idUtilizador`,`Fotografias_idCategoria`),
  ADD KEY `fk_Fotografias_Estado1_idx` (`Fotografias_idEstado`),
  ADD KEY `fk_Fotografias_Utilizador1_idx` (`Fotografias_idUtilizador`),
  ADD KEY `fk_Fotografias_Categoria1_idx` (`Fotografias_idCategoria`);

--
-- Indexes for table `Utilizador`
--
ALTER TABLE `Utilizador`
  ADD PRIMARY KEY (`idUtilizador`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categoria`
--
ALTER TABLE `Categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Comentarios`
--
ALTER TABLE `Comentarios`
  MODIFY `idComentarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Estado`
--
ALTER TABLE `Estado`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Fotografias`
--
ALTER TABLE `Fotografias`
  MODIFY `idFotografias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Utilizador`
--
ALTER TABLE `Utilizador`
  MODIFY `idUtilizador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD CONSTRAINT `fk_Comentarios_Fotografias1` FOREIGN KEY (`Comentarios_idFotografias`) REFERENCES `Fotografias` (`idfotografias`),
  ADD CONSTRAINT `fk_Comentarios_Utilizador1` FOREIGN KEY (`Comentarios_idUtilizador`) REFERENCES `Utilizador` (`idutilizador`);

--
-- Limitadores para a tabela `Fotografias`
--
ALTER TABLE `Fotografias`
  ADD CONSTRAINT `fk_Fotografias_Categoria1` FOREIGN KEY (`Fotografias_idCategoria`) REFERENCES `Categoria` (`idcategoria`),
  ADD CONSTRAINT `fk_Fotografias_Estado1` FOREIGN KEY (`Fotografias_idEstado`) REFERENCES `Estado` (`idestado`),
  ADD CONSTRAINT `fk_Fotografias_Utilizador1` FOREIGN KEY (`Fotografias_idUtilizador`) REFERENCES `Utilizador` (`idutilizador`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
