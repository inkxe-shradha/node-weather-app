// Loading path modules
const path = require('path');
//  Handlebars loading express module
const hbs = require('hbs');

// Loading the express module
const express = require('express'); // express is a function
const {
  getWeather,
  getConditionalWeather,
} = require("../src/utils/geoCode.js");

const app = express(); // Used for generating the server

// console.log('Directory Name', __dirname);
// console.log('path Name', path.join(__dirname, '../public'));

const publicDirPath = path.join(__dirname, '../public');
// Customizing the views looking path from default to manually change. Remember to by default express pointing to views folder
const viewPath = path.join(__dirname, '../templates/views');
// Loading common/partials path
const partialPath = path.join(__dirname, '../templates/common');
// App.set used for setting a value for given express variable.
// Here we are setting up the view engine using handle bar.js library
app.set('view engine', 'hbs');
// Setting the views path manually by default its pointing to views folder
app.set('views', viewPath);

// Registering the partials path
hbs.registerPartials(partialPath);

// It is a way to customize the server configuration
app.use(express.static(publicDirPath)); // Serve the HTML page in the browser

// Dynamic routing and page rendering with the help of Handel bar js
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Apps',
        name: 'Shradha'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shradha Suman Praharaj'
    });
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Documentations",
    name: "Contact Us",
    description: 'Contact Us for help documentation'
  });
});

app.get('/weather', (req, res) => {
    const weatherAddresses = req.query.address;
    if (!weatherAddresses) {
        return sendErrorResponse(res, 'Please enter the address');
    }
    getWeather(weatherAddresses, (error, weatherRes, data) => {
        if (error) {
            return sendErrorResponse(res,'Not a valid address given.')
        }
        getConditionalWeather(
          weatherAddresses,
          (coordinateErr, coordinateData) => {
              if (coordinateErr) {
                  return sendErrorResponse(res, 'Not a valid address given to find out the co-ordinates.')
              }
            res.send({
              searchAdd: weatherAddresses,
              coordinateData,
              weather_cast: weatherRes.body.current,
            });
          }
        );
    });
})


function sendErrorResponse(res, message) {
    return res.send({
        error: message,
    });
}

// 404 Page Not Found implementation
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
    })
});
// This used for Routing the server can do when the user asked for getting the help request to used it for the routing.
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express !</h1>');
// })

// app.get('/helps', (req, res) => {
//     const jsonObject = [{
//         name: 'Raj',
//         age: '23',
//         likes: ['Cricket', 'Football', 'Movies']
//     },
//     {
//         name: 'Raju',
//         age: '24',
//         likes: ['Cricket', 'Football', 'Movies']
//     },
//     ];
//     res.send(jsonObject);
// })

// app.get('/about', (req, res) => {
//     res.send('Hello Express ! From About Route');
// })

// Start the server and listen to the port
app.listen(3000, () => {
    console.log('Server is up on port 3000');
})