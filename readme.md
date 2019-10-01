# BeerFront

## Requirements & dependencies 

* Axios
* Pagejs
* Node and NPM
* Bulma
* Git (not necessary but recommended)

## Introduction

BeerFront is a SPA application made with Javascript vanilla, displays a list of beers on the front where you can filter by name and by first Brewed date. Then you can see the detail of each beer if you click on it.

APP is mobile first.

The api you use is as follows:
https://web-bootcamp-exercise-beer-swagger-pgjtqotgtl.now.sh/api-docs/

For routing uses [Pagejs](https://visionmedia.github.io/page.js/)  as a library, and also [bulmaCSS](https://bulma.io/) for design.

You can try the app at the link below:

https://beerfront.herokuapp.com/

## Install

* Clone Repo with https://github.com/rojo2530/BeerFront.git
* Inside folder , execut `npm install`
* Finally execute `npm run start`

Note: By default , server is running in port 7000

## Development Notes

In the application you can filter by date, although in the date field appears day month and year , the field of the first brewed in the api is only the month and year, and therefore is filtered only by those fields.

You can run eslint with next script `npm run lint`
