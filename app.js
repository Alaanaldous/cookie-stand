'use strict';

var workHours = ['6Am', '7Am', '8Am', '9Am', '10Am', '11Am', '12Pm', '1Pm', '2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm'];

function getRandomNumber(min, max) {
    var random = math.random();
    random = (random * (max - min + 1)) + min;
    random = math.floor(random);
    return random;
}

var Seattle = {
    location: 'Seattle',
    max: 65,
    min: 23,
    result: [],
    total: [],
    customers: 0,
    avgCookies: 6.3,

    purchasecCookies: function () {
        var purchasecCookiesInHour = this.customers * this.avgCookies;
        return [purchasecCookiesInHour];
    },
    render: function () {
        var container = document.getElementById('main');
        var section = document.createElement('section');
        container.appendChild(section);
        var head = document.createElement('h2');
        section.appendChild(head);
        head.textContent = this.location;
        var unOrderedList = document.createElement('ul');
        section.appendChild(unOrderedList);
        for (var i = 0; i < workHours.length; i++) {
            this.purchasecCookies();
            getRandomNumber(this.min, this.max);
            this.purchasecCookies();
            var listItem = document.createElement('li');
            unOrderedList.appendChild(listItem);
            listItem.textContent = this.workHours[i] + ' ' + this.purchasecCookies(); + ' ' + 'cookies';
        }
    }
}
Seattle.purchasecCookies();
Seattle.render();
console.table(Seattle);