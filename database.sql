-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  lun. 10 août 2020 à 12:56
-- Version du serveur :  5.7.26
-- Version de PHP :  7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `creativeolympics`
--
CREATE DATABASE IF NOT EXISTS `creativeolympics` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `creativeolympics`;

-- --------------------------------------------------------

--
-- Structure de la table `Donations`
--

CREATE TABLE `Donations` (
  `id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `amount_global` float NOT NULL,
  `currency` varchar(45) NOT NULL,
  `uuid` varchar(100) DEFAULT NULL,
  `discordId` varchar(100) DEFAULT NULL,
  `referrer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Referrers`
--

CREATE TABLE `Referrers` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `avatar` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Donations`
--
ALTER TABLE `Donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `referrer` (`referrer`);

--
-- Index pour la table `Referrers`
--
ALTER TABLE `Referrers`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Donations`
--
ALTER TABLE `Donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Referrers`
--
ALTER TABLE `Referrers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Donations`
--
ALTER TABLE `Donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`referrer`) REFERENCES `Referrers` (`ID`);
