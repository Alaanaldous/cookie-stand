'use strict';

////////////////////////////////////[Lab-09]/////////////////////////////////////////////////////////

var form = document.getElementById('addinNewLocation');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Reset The Value Of Total to calc agian without double the Result 
  colSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var name = event.target.name.value;

  var minForm = event.target.min.value;
  minForm = Number(minForm);

  var maxForm = event.target.max.value;
  maxForm = Number(maxForm);

  var AvgForm = event.target.average.value;

  AvgForm = Number(AvgForm);

  var AddLocation = new LocationsHope(name, maxForm, minForm, AvgForm);

  for (var i = 0; i < Locations.length; i++) {

    Locations[i].getRandomCustomerPerHours();
    Locations[i].getcookies_purchased_Hour();
  }

  table.textContent = '';

  var DataRow = document.createElement('tr');       //create Row tag
  table.appendChild(DataRow);

  addHeader();

  // Create A row and looping in Locations Objects and Fill Data
  for (var t = 0; t < Locations.length; t++) {

    Locations[t].render();
  }
  // This will Create The Footer Rom In The Table

  addFooter();

});

////////////////////////////////////////lab-07//////////////////////////////////////////////////////////////

var OpenHour = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', 'Daily Location Total'];

var Locations = [];
var colSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//Create an Table insid Main Tag <Table Content >

var mainid = document.getElementById('main');     // get main tag by element id
var table = document.createElement('table');      //create table tag
mainid.appendChild(table);

var DataRow = document.createElement('tr');       //create Row tag
table.appendChild(DataRow);

var emptycol;     //create an empty col for empty cell in header and total in footer 



//Create Locations Objects Constrctour 
function LocationsHope(name, max, min, average_cookies_per_customer) {
  this.name = name;
  this.max = max;
  this.min = min;
  this.average_cookies_per_customer = average_cookies_per_customer;
  this.random_customers_per_hour1 = [];
  this.cookies_purchased_Hour = [];
  Locations.push(this);
}

// Generate a randomNumber for Customer Hour
LocationsHope.prototype.getRandomCustomerPerHours = function () {
  for (var i = 0; i < OpenHour.length; i++) {
    this.random_customers_per_hour1[i] = generateRandomNumber(this.min, this.max);
  }
};
// Calc The Cookies per Hour using value of CustomerPerHour * avg cookies

LocationsHope.prototype.getcookies_purchased_Hour = function () {
  var iteration = 0;
  var sum = 0;
  for (var i = 0; i < OpenHour.length - 1; i++) {
    iteration = Math.floor(this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
    this.cookies_purchased_Hour[i] = iteration;
    sum += iteration;
    colSum[i] += iteration;
  }
  this.cookies_purchased_Hour.push(sum);
  colSum[colSum.length - 1] += sum;

};

//Reander The Location Deatils as a row in The Table 

LocationsHope.prototype.render = function () {

  // create a Row in side  any Table
  var DataRow = document.createElement('tr');
  table.appendChild(DataRow);

  // For Location Name inside row
  var ListItemLocation = document.createElement('td');
  ListItemLocation.textContent = this.name;
  DataRow.appendChild(ListItemLocation);

  // For cookies_purchased_Hour
  for (var j = 0; j < OpenHour.length - 1; j++) {
    ListItemLocation = document.createElement('td');

    ListItemLocation.textContent = this.cookies_purchased_Hour[j];

    DataRow.appendChild(ListItemLocation);

  }
  //Dailay Total 
  ListItemLocation = document.createElement('td');
  ListItemLocation.textContent = this.cookies_purchased_Hour[this.cookies_purchased_Hour.length - 1];
  DataRow.appendChild(ListItemLocation);

};

//Creating Objects Using constructor

var Seattle = new LocationsHope('Seattle', 65, 23, 6.3);
var Tokyo = new LocationsHope('Tokyo', 24, 3, 1.2);
var Dubai = new LocationsHope('Dubai', 38, 11, 3.7);
var Paris = new LocationsHope('Paris', 38, 20, 2.3);
var Lima = new LocationsHope('Lima', 16, 2, 4.6);


// Calling Function To prepare Objects Location Using Loop 
for (var i = 0; i < Locations.length; i++) {

  Locations[i].getRandomCustomerPerHours();
  Locations[i].getcookies_purchased_Hour();
}

// This will Create The Header Rom In The Table
addHeader();

// Create A row and looping in Locations Objects and Fill Data
for (var t = 0; t < Locations.length; t++) {

  Locations[t].render();
}

// This will Create The Footer Rom In The Table

addFooter();


// Fill Open Hour Data in Hour Row 
function addHeader() {
  DataRow = document.createElement('tr');       //create Row tag
  table.appendChild(DataRow);
  emptycol = document.createElement('th');     //create an empty col for empty cell in header and total in footer 
  emptycol.textContent = ' ';
  DataRow.appendChild(emptycol);

  for (var out = 0; out < OpenHour.length; out++) {
    var ListItemLocation = document.createElement('th');
    ListItemLocation.textContent = OpenHour[out];
    DataRow.appendChild(ListItemLocation);
  }

}

// Fill Total Data In Footer Row 
function addFooter() {
  DataRow = document.createElement('tr');
  table.appendChild(DataRow);

  emptycol = document.createElement('td');
  emptycol.textContent = 'Total';
  DataRow.appendChild(emptycol);

  for (var tot = 0; tot < colSum.length; tot++) {

    var TotalRow = document.createElement('td');
    TotalRow.textContent = colSum[tot];
    DataRow.appendChild(TotalRow);
  }

}

//Generate a Randomw Number 
function generateRandomNumber(min, max) {

  var random = Math.random();
  random = (random * (max - min + 1)) + min;
  random = Math.floor(random);
  return random;

}

//Alaa :) 

