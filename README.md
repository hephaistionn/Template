# Fullstack Project template : Express React+Reflux 

## Start project
  
```sh
$ npm install
$ npm run build
$ node .
```

.
## Client

### Used technologies
The client works with the following technos : 

| About | Tech |
| ------ | ------ |
| Lib | React+Reflux |
| Style | Sass |
| Bundler | Webpack |

### Building commands
Build the prod bundles
```sh
$ npm run build
```
Build the dev bundles
```sh
$ npm run dev
```

### Webpack configuration  
  

```js
const sassEntry = './client/src/app.scss';
const jsEntry = './client/src/app.js';
const langEntry = '/client/assets/';
const output = './client/.dist';
const bundleName = 'bundle'
```


### Multi language

The project use **i18n-webpack-plugin** to create one bunles by languages.
The strings included in the tr() functions are automatically translated into bundles.  
The translation keys are here : 

```sh
./client/assets/[lang].json
```
For each [lang].json a [lang].bundle.js is maked.
In Local env, only **fr** is enabled.

.
## Server

The server works with the following technos  

| About | Tech |
| ------ | ------ |
| Engine | Express|
| BDD | Mongo |
| Templating | EJS |

### Start server

Simple server start
```sh
$ node .
```
Start with auto-refresh
```sh
$ npm install nodemon -g // first time
$ nodemon .
```
Start in production
```sh
$ npm install forever -g // first time
$ forever start . .
```

### Server configuration

The server is configured in conf.js
```sh
./server/conf.js
```
    
```sh
NODE_ENV: process.env.NODE_ENV,
HOST_NAME: process.env.NODE_ENV,
URI: process.env.URI,
EMAIL_KEY: process.env.EMAIL_KEY,
EMAIL_SECRET: process.env.EMAIL_SECRET,
CLOUD_KEY: process.env.CLOUD_KEY,
CLOUD_SECRET: process.env.CLOUD_SECRET
```
### API
The server API is configured via this directory.
```sh
./server/api/
```
    
One directory for each model.
In each directory : 
 - routes directory to declare enabled routes
 - model.js to declare a mongo document model

In each model Access Control List must be configured :

Actions : 
  - READ
  - CREATE
  - UPDATE
  - DELETE
 
Limites :
  - $everyone 
  - $authenticated
  - $teamMember
  - $owner


### Languages

The language is determined according to the domain extension.

* **fr** use  **fr.bundle.js**
* **com** use  **en.bundle.js**
* **none** use **fr.bundle.js**


## Add a new language

  1.  Add a **[newlang].json** in **./client/assets/**
  2.  Configure  **./server/routes.js**:   res.render(index, { lang: 'newlang' });
  3.  Add a new seo template  :   **./server/template/seo/[newlang].js**   