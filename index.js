var http = require('http');

//Print out message
function printMessage(city, description, temperature, wind, clouds){
    var message = 'Currently, ' + city + ' has ' + description + 
            ', a temperature of ' + temperature + ' degrees Celsius' +
            ', a wind speed of ' + wind + 
            ' m/s and clouds covering ' + clouds + '% of the sky.';
    console.log(message);
}

//Print out error
function printError(error){                                                     
    console.error(error.message);                                                                                                                        }                  

function getWeather(city){
    var key = '220bdb799d6b49b3905ce0419c071f9d';
    var linkByCityName = 'http://api.openweathermap.org/data/2.5/weather?q=';

    //Connect to the API
    var request = http.get(linkByCityName + city + '&units=metric&APPID=' + key, function(response){
        var body = '';
        //Read data
        response.on('data', function(chunk){
            body += chunk;
        });
        response.on('end', function(){
                    //Parse data
                    var weather = JSON.parse(body);
                    printMessage(weather.name, 
                                weather.weather[0].description, 
                                weather.main.temp.toFixed(1), 
                                weather.wind.speed, 
                                weather.clouds.all);
        });
    });
    request.on('error', printError);
}

var city = process.argv.slice(2);
getWeather(city);
