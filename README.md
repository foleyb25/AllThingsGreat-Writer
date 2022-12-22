# All Things Great Application

---

## Description
All Things Great is a place where people go to escape the the BS of the Main Stream Media. We aim to write with a high degree of creativity, wittiness, sarcasm, informativeness, and topics that leave the reader with a boost a confidence. We steer clear from politics, unless a joke comes to be, to make for the last best place on the internet.

We indulge in locker room talk and walk on the hot coals of twisted humor. Covering sports, achievements, history, entertainment, and topics that make up of greatness - with our own unique tone behind it.

This is the All Things Great experience.

## Application
Currently, the application is going through a complete revamp ranging from the front end, API, and DB Schema. Please stay tuned for the official re-release.

This is one of two front-end applications that communicate with our API. The front end applications consist of a user-side (what the public user engages with) and a writer-side (what a selected authenticated writer interacts with). This is the writer-side application. Writer's are able to read blogs, explore reviews, comment on blogs, and rate blogs.

All Things Great front-end applications are written in VueJS. They use Vite as a build tool and Tailwind for styling.

## Dependencies
All Things Great API

### NPM
* auth0/auth0-vue
* tailwindcss/line-clamp
* axios
* cheerio
* compressorjs
* dotenv
* flowbite
* fs
* vue
* vue-router
* vitejs/plugin-vue
* autoprefixer
* postcss
* postcss-import
* tailwindcss
* vite

## How To Run
### 1. Install Node Js on your machine
Here is a [link to the NodeJS installer](https://nodejs.org/en/download/)

Node JS is what we like to call a Runtime Environment so we can run javascript in a place other than a browser.

### 2. Clone this repository 
```bash
git clone git@github.com:foleyb25/AllThingsGreat-Writer.git
```

### 3. Install npm packages
#### Change Directory into AllThingsGreat
```bash
cd AllThingsGreat-Writer
```

#### Install dependencies
```bash
npm install
```
---

### 4. Run on your localhost
```bash
npm run start:dev
```

### 5. Create a .env file
#### Create the .env file in the root of the repository
```bash
touch .env
```
#### Copy the following contents into your .env file
```
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_CALLBACK_URL=
VITE_AUTH0_AUDIENCE=
VITE_API_SERVER_URL_PROD=
VITE_API_SERVER_URL_DEV=
VITE_ENV=

```

You can follow the [vueJS Auth0 Guide](https://developer.auth0.com/resources/guides/spa/vue/basic-authentication?_ga=2.206481627.994626085.1671747367-310607164.1670727635&_gl=1*rhesnb*rollup_ga*MzEwNjA3MTY0LjE2NzA3Mjc2MzU.*rollup_ga_F1G3E656YZ*MTY3MTc0NzM2Ny4yLjAuMTY3MTc0NzM2Ny42MC4wLjA.) to determine the VITE_AUTH0... variables above.

The VITE_API_SERVER_URL_PROD is reserved for the production url where the API is ran such as fly.io or heroku url.

The VITE_API_SERVER_URL_DEV is reserved for where your API is running in a development environment. For example: localhost:8080

The VITE_ENV can be either 'production' or 'development'. If working in a development or sandbox environment use development. If pushing to a live server, use development