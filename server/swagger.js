const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

const doc = {
  swagger: "2.0",
  info: {
    version: '',      // by default: '1.0.0'
    title: 'All Things Great API',        // by default: 'REST API'
    description: '',  // by default: ''
  },
  host: "localhost:5002",      // by default: 'localhost:3000'
  basePath: '/',  // by default: '/'
  schemes: [],   // by default: ['http']
  consumes: ['application/json', 'x-www-form-urlencoded'],  // by default: ['application/json']
  produces: [],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: '',         // Tag name
      description: '',  // Tag description
    },
    // { ... }
  ],
  definitions: {  // by default: empty object (Swagger 2.0)
  },          
  components: {}            // by default: empty object (OpenAPI 3.x)
};

//Init Swagger
const endpointFiles = [
  './src/routes/blogs.route.js',
  './src/routes/comments.route.js',
  './src/routes/screenplayreviews.route.js',
  './src/routes/screenplays.route.js',
  './src/routes/users.route.js',
  './src/routes/watchservices.route.js',
  './src/routes/writers.route.js',
];

swaggerAutogen(
  './swagger-output.json',
  endpointFiles,
  doc
).then( () => {
  require('./start')
})
