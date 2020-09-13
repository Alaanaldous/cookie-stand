'use strict';
var hours = ['6 am','7 am', '8 am','9 am' , '10 am ' , '11 am ', '12 am' , '1 pm' , '2 pm ', '3 pm' , '4 pm' , '5 pm' , '6 pm' , '7 pm'];
function getRandomNumber(min, max){
  var random =math.random();
  random = (random*(max-min+1)+min);
  random = math.floor(random);
  return random;
}

var seattle = {
    location : 'seattle',
    minCust: 23,
    maxCust: 65,
    avgSale : 6.3,
    results: [],
    total: 0,
    gitCust: function(){
        for (var i =0; i< hours.length; i++)
        this.results[i]= getRandomNumber(this.min, this.max);
        
    },

    render: function(){
      var parentElement = document.getElementById('seattlelist');
      var article = document.createElement('article');
      //parentElement.appendChile('article');
      var h2 = document.createElement('h2');
      h2.textContent= this.location;
      var ul = document.createElement('ul');
      for (var i =0; i< hours.length; i++){
        var li = document.createElement('li');
        li.textContent = this.results[i];
        ul.appendChild(li);
    }

}
}

seattle.gitCust();
seattle.render();

