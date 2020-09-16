'use strict';
//lab-09
var form =document.getElementById('addinNewLocation');
form.addEventListener('submit' , function(event){
 event.preventDefault();

 var name = event.target.name.value;
 var min = event.target.min.value;
 var max = event.target.max.value;
 var average1 = event.target.average1.value;
 localStorage.renderContent();
 localStorage.renderLastRow();
});

var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var store = [];
function BranchInfo(name, min, max, avg) {
    this.name = name;
    this.minCustomers = min;
    this.maxCustomers = max;
    this.averageSales = avg;
    this.storeCookies = [];
    this.dailyCookie = 0;
    store.push(this);
}
BranchInfo.prototype.salesPerHour = function () {
    for (var i = 0; i < storeHours.length; i++) {
        var x = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
        var y = x * this.averageSales;
        this.storeCookies.push(Math.floor(y));
        this.dailyCookie += Math.floor(y);
    }
    this.storeCookies.push(this.dailyCookie);
};
new BranchInfo('Seattle', 23, 65, 6.3);
new BranchInfo('Tokyo', 3, 24, 1.2);
new BranchInfo('Dubai', 11, 38, 3.7);
new BranchInfo('Paris', 20, 38, 2.3);
new BranchInfo('Lima', 2, 16, 4.6);
// console.log(store);
var total = 0;
BranchInfo.prototype.render = function () {
    var container = document.getElementById("sales");
    var articleEl = document.createElement('article');
    container.appendChild(articleEl);
    articleEl.setAttribute('id', 'table');
    var headerEl = document.createElement('h3');
    articleEl.appendChild(headerEl);
    headerEl.textContent = 'Daily Sales Per Hour';
    var tableEl = document.createElement('table');
    articleEl.appendChild(tableEl);
    tableEl.setAttribute('id', 'sales-table');
};
BranchInfo.prototype.headerFunc = function () {
    var container = document.getElementById("sales-table");
    var headerRowEl = document.createElement('tr');
    container.appendChild(headerRowEl);
    var thElEm = document.createElement('th');
    headerRowEl.appendChild(thElEm);
    thElEm.setAttribute('id', 'empty');
    for (var i = 0; i < storeHours.length; i++) {
        var thEl = document.createElement('th');
        headerRowEl.appendChild(thEl);
        thEl.textContent = storeHours[i];
    }
    var thEl2 = document.createElement('th');
    headerRowEl.appendChild(thEl2);
    thEl2.textContent = 'Total';
};
BranchInfo.prototype.tableBody = function () {
    var container = document.getElementById("sales-table");
    for (var i = 0; i < store.length; i++) {
        var dataRowEl = document.createElement('tr');
        container.appendChild(dataRowEl);
        var tdEl = document.createElement('td');
        dataRowEl.appendChild(tdEl);
        tdEl.textContent = this.name;
        for (var i = 0; i < this.storeCookies.length; i++) {
            var tdEl = document.createElement('td');
            dataRowEl.appendChild(tdEl);
            tdEl.textContent = this.storeCookies[i];
        }
    }
};
var totals = [];
BranchInfo.prototype.totals = function () {
    for (var i = 0; i <= storeHours.length; i++) {
        var sumOfSum = 0;
        for (var j = 0; j < store.length; j++) {
            var sum = store[j].storeCookies[i];
            sumOfSum += sum;
        };
        totals.push(sumOfSum);
    }
};
BranchInfo.prototype.totalFun = function () {
    var container = document.getElementById("sales-table");
    var totalRowEl = document.createElement('tr');
    container.appendChild(totalRowEl);
    var tdEl = document.createElement('td');
    totalRowEl.appendChild(tdEl);
    tdEl.textContent = 'Total';
    for (var i = 0; i < this.storeCookies.length; i++) {
        var tdEl = document.createElement('td');
        totalRowEl.appendChild(tdEl);
        tdEl.textContent = totals[i];
    };

};
store[0].render();
store[0].headerFunc();
for (var i = 0; i < store.length; i++) {
    store[i].salesPerHour();
    store[i].tableBody();
}
store[0].totals();
store[0].totalFun();


//locations
var OpenHour = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'];

var Locations =[Seattle,Tokyo,Dubai,Paris,Lima];

//Create Locations Objects 

var Seattle = {

  name: 'Seattle',
  Max: 65,
  Min: 23,
  average_cookies_per_customer: 6.3,
  // random_customers_per_hour: generateRandomNumber(23,65),
  // cookies_purchased_Hour:generateRandomNumber(2,200) ,
  random_customers_per_hour1: [],
  cookies_purchased_Hour: [],
  total:0, 
  getRandomCustomerPerHours: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.random_customers_per_hour1[i] = generateRandomNumber(this.Min, this.Max);
    }


  },

  getcookies_purchased_Hour: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.cookies_purchased_Hour[i] =Math.floor (this.random_customers_per_hour1[i] * this.average_cookies_per_customer);

      //this.total = this.total + cookies_purchased_Hour[i];
      
    }
  },
    //console.log(this.cookies_purchased_Hour[i]);
  calculateCookiesPerHour: function(){
      var numberOfCookies;
      for(var i= 0; i < OpenHour.length; i++){
        numberOfCookies = (this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
        this.cookies_purchased_Hour.push(numberOfCookies);
        this.total =Math.ceil(this.total + numberOfCookies);
      }
    },
    

    
  render: function () {

    var Parent_main = document.getElementById('sales');

    var LocatoinName = document.createElement('h2');
    LocatoinName.textContent = this.name;
    Parent_main.appendChild(LocatoinName);

    var unorderlistDeatilsHour = document.createElement('ul');
    Parent_main.appendChild(unorderlistDeatilsHour);
    for (var j = 0; j < OpenHour.length; j++) {
      var ListItemLocation = document.createElement('li');

      ListItemLocation.textContent = OpenHour[j] + ' : ' + this.cookies_purchased_Hour[j];

      unorderlistDeatilsHour.appendChild(ListItemLocation);
    }
    ListItemLocation = document.createElement('li');
    unorderlistDeatilsHour.appendChild(ListItemLocation);
    ListItemLocation.textContent = 'Total ' + this.total + ' cookies';
  }

};


///////////////////////////////////////        [Tokyo]      /////////////////////////////////////////////////


var Tokyo = {

  name: 'Tokyo',
  Max: 24,
  Min: 3,
  average_cookies_per_customer: 1.2,
  total: 0,
  // random_customers_per_hour: generateRandomNumber(23,65),
  // cookies_purchased_Hour:generateRandomNumber(2,200) ,
  random_customers_per_hour1: [],
  cookies_purchased_Hour: [],
  getRandomCustomerPerHours: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.random_customers_per_hour1[i] = generateRandomNumber(this.Min, this.Max);
    }


  },

  getcookies_purchased_Hour: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.cookies_purchased_Hour[i] = Math.floor(this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
    }

  },
  calculateCookiesPerHour: function(){
    var numberOfCookies;
    for(var i= 0; i < OpenHour.length; i++){
      numberOfCookies = (this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
      this.cookies_purchased_Hour.push(numberOfCookies);
      this.total =Math.ceil(this.total + numberOfCookies);
    }
  },

  render: function () {

    var Parent_main = document.getElementById('sales');

    var LocatoinName = document.createElement('h2');
    LocatoinName.textContent = this.name;
    Parent_main.appendChild(LocatoinName);

    var unorderlistDeatilsHour = document.createElement('ul');
    Parent_main.appendChild(unorderlistDeatilsHour);
    for (var j = 0; j < OpenHour.length; j++) {
      var ListItemLocation = document.createElement('li');

      ListItemLocation.textContent = OpenHour[j] + ' : ' + this.cookies_purchased_Hour[j];

      unorderlistDeatilsHour.appendChild(ListItemLocation);
    }
    ListItemLocation = document.createElement('li');
    unorderlistDeatilsHour.appendChild(ListItemLocation);
    ListItemLocation.textContent = 'Total ' + this.total + ' cookies';
  }

};



///////////////////////////////////////        [Dubai]      /////////////////////////////////////////////////


var Dubai = {

  name: 'Dubai',
  Max: 38,
  Min: 11,
  average_cookies_per_customer: 3.7,
  total: 0,
  // random_customers_per_hour: generateRandomNumber(23,65),
  // cookies_purchased_Hour:generateRandomNumber(2,200) ,
  random_customers_per_hour1: [],
  cookies_purchased_Hour: [],
  getRandomCustomerPerHours: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.random_customers_per_hour1[i] = generateRandomNumber(this.Min, this.Max);
    }


  },

  getcookies_purchased_Hour: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.cookies_purchased_Hour[i] = Math.floor(this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
    }

  },
  calculateCookiesPerHour: function(){
    var numberOfCookies;
    for(var i= 0; i < OpenHour.length; i++){
      numberOfCookies = (this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
      this.cookies_purchased_Hour.push(numberOfCookies);
      this.total =Math.ceil(this.total + numberOfCookies);
    }
  },

  render: function () {

    var Parent_main = document.getElementById('sales');

    var LocatoinName = document.createElement('h2');
    LocatoinName.textContent = this.name;
    Parent_main.appendChild(LocatoinName);

    var unorderlistDeatilsHour = document.createElement('ul');
    Parent_main.appendChild(unorderlistDeatilsHour);
    for (var j = 0; j < OpenHour.length; j++) {
      var ListItemLocation = document.createElement('li');

      ListItemLocation.textContent = OpenHour[j] + ' : ' + this.cookies_purchased_Hour[j];

      unorderlistDeatilsHour.appendChild(ListItemLocation);
    }
    ListItemLocation = document.createElement('li');
    unorderlistDeatilsHour.appendChild(ListItemLocation);
    ListItemLocation.textContent = 'Total ' + this.total + ' cookies';
  }

};



///////////////////////////////////////        [Paris]      /////////////////////////////////////////////////


var Paris = {

  name: 'Paris',
  Max: 38,
  Min: 20,
  average_cookies_per_customer: 2.3,
  total:0,
  // random_customers_per_hour: generateRandomNumber(23,65),
  // cookies_purchased_Hour:generateRandomNumber(2,200) ,
  random_customers_per_hour1: [],
  cookies_purchased_Hour: [],
  getRandomCustomerPerHours: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.random_customers_per_hour1[i] = generateRandomNumber(this.Min, this.Max);
    }


  },

  getcookies_purchased_Hour: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.cookies_purchased_Hour[i] = Math.floor(this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
    }

  },
  calculateCookiesPerHour: function(){
    var numberOfCookies;
    for(var i= 0; i < OpenHour.length; i++){
      numberOfCookies = (this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
      this.cookies_purchased_Hour.push(numberOfCookies);
      this.total =Math.ceil(this.total + numberOfCookies);
    }
  },

  render: function () {

    var Parent_main = document.getElementById('sales');

    var LocatoinName = document.createElement('h2');
    LocatoinName.textContent = this.name;
    Parent_main.appendChild(LocatoinName);

    var unorderlistDeatilsHour = document.createElement('ul');
    Parent_main.appendChild(unorderlistDeatilsHour);
    for (var j = 0; j < OpenHour.length; j++) {
      var ListItemLocation = document.createElement('li');

      ListItemLocation.textContent = OpenHour[j] + ' : ' + this.cookies_purchased_Hour[j];

      unorderlistDeatilsHour.appendChild(ListItemLocation);
    }
    ListItemLocation = document.createElement('li');
    unorderlistDeatilsHour.appendChild(ListItemLocation);
    ListItemLocation.textContent = 'Total ' + this.total + ' cookies';
  }

};




///////////////////////////////////////        [Lima]      /////////////////////////////////////////////////


var Lima = {

  name: 'Lima',
  Max: 16,
  Min: 2,
  average_cookies_per_customer: 4.6,
  total:0,
  // random_customers_per_hour: generateRandomNumber(23,65),
  // cookies_purchased_Hour:generateRandomNumber(2,200) ,
  random_customers_per_hour1: [],
  cookies_purchased_Hour: [],
  getRandomCustomerPerHours: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.random_customers_per_hour1[i] = generateRandomNumber(this.Min, this.Max);
    }


  },

  getcookies_purchased_Hour: function () {

    for (var i = 0; i < OpenHour.length; i++) {
      this.cookies_purchased_Hour[i] = Math.floor(this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
    }

  },
  calculateCookiesPerHour: function(){
    var numberOfCookies;
    for(var i= 0; i < OpenHour.length; i++){
      numberOfCookies = (this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
      this.cookies_purchased_Hour.push(numberOfCookies);
      this.total =Math.ceil(this.total + numberOfCookies);
      
    }
  },

  render: function () {

    var Parent_main = document.getElementById('sales');

    var LocatoinName = document.createElement('h2');
    LocatoinName.textContent = this.name;
    Parent_main.appendChild(LocatoinName);

    var unorderlistDeatilsHour = document.createElement('ul');
    Parent_main.appendChild(unorderlistDeatilsHour);
    for (var j = 0; j < OpenHour.length; j++) {
      var ListItemLocation = document.createElement('li');

      ListItemLocation.textContent = OpenHour[j] + ' : ' + this.cookies_purchased_Hour[j];

      unorderlistDeatilsHour.appendChild(ListItemLocation);
    }
    ListItemLocation = document.createElement('li');
    unorderlistDeatilsHour.appendChild(ListItemLocation);
    ListItemLocation.textContent = 'Total ' + this.total + ' cookies';
  }

};



Seattle.getRandomCustomerPerHours();
Seattle.getcookies_purchased_Hour();
Seattle.calculateCookiesPerHour();
Seattle.render();


Tokyo.getRandomCustomerPerHours();
Tokyo.getcookies_purchased_Hour();
Tokyo.calculateCookiesPerHour();
Tokyo.render();


Dubai.getRandomCustomerPerHours();
Dubai.getcookies_purchased_Hour();
Dubai.calculateCookiesPerHour();
Dubai.render();

Paris.getRandomCustomerPerHours();
Paris.getcookies_purchased_Hour();
Paris.calculateCookiesPerHour();
Paris.render();


Lima.getRandomCustomerPerHours();
Lima.getcookies_purchased_Hour();
Lima.calculateCookiesPerHour();
Lima.render();



function generateRandomNumber(min, max) {

  var random = Math.random();
  random = (random * (max - min + 1)) + min;
  random = Math.floor(random);
  return random;

}

//Alaa N Aldous

