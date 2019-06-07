# QCM

## Description du projet

Le but de ce projet est de réaliser une application de gestion de QCM avec importation et exportation de fichier texte écrit en Latex. Cela permet d'améliorer et de faciliter la liaison entre les différentes questions Latex que vous avez et l'utilisation de AMC (Auto-Multiple Choice).

Ce projet est costruit à partir de Angular 7 et Electron 4. 

## Electron

Electron permet d'encapsuler le projet Angular pour lui donner les capacités d'une application native pour ordinateur grâce à un Main Process qui tourne sous Node.js. Notre application Angular peut alors créer/lire/modifier/supprimer des documents (c'est ce qu'on cherche pour notre Base de donnée en .json) mais aussi utiliser beaucoup d'autres fonctionnalités natives que je n'évoquerais pas ici. 

Pour mieux comprendre, vous pouvez vous rendre ici : https://malcoded.com/posts/angular-desktop-electron

## Test et déploiement 

L'application ne marchera pas si vous éxecutez juste un `ng serve`, car Electron ne serait pas inclut. 
Vous pouvez utiliser la commande `npm run electron` qui lancera l'application après avoir compilé le code.
Pour déployer le logiciel, installez le cli suivant `npm install electron-packager -g` puis éxécutez`npm run` : 
	-`package-mac` sous Mac
	-`package-win` sous Windows
	-`package-linux` sous Linux
Vous trouverez les fichiers de sortie dans /release-builds/$REPERTORY

#########################################################################################



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


