'use strict';

//Global Variables
let myContainer = document.getElementById('images');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let allProducts = [];
let clicks = 0;
let indexArray = [];
let clickAllowed = 5;

// CONSTRUCTOR
function Product(name, views = 0, clicks = 0, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${this.name}.${fileExtension}`;
  this.views = views;
  this.clicks = clicks;
  this.fileExtension = fileExtension;
}

// FUNCTIONS
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

//this function makes it possible to cycle through the array of products without showing repeats in the same slide.
function renderProducts() {
  while (indexArray.length < 6) {
    let ranNum = getRandomProduct();
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }

  //this allows the products that have been shown to "shift" to the back of the array to possibly be shown again, rather than be excluded all together until refresh
  let product1 = indexArray.shift();
  let product2 = indexArray.shift();
  let product3 = indexArray.shift();
  console.log(allProducts[product1]);
  image1.src = allProducts[product1].src;
  image1.alt = allProducts[product1].name;
  allProducts[product1].views++;
  image2.src = allProducts[product2].src;
  image2.alt = allProducts[product2].name;
  allProducts[product2].views++;
  image3.src = allProducts[product3].src;
  image3.alt = allProducts[product3].name;
  allProducts[product2].views++;
}

//this is the container click event telling the user to click an image if they accidentally click the background
function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }

  //here the clicks are tallied
  clicks++;
  let clickedProduct = event.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      console.log(allProducts[i]);
      break;
    }
  }
  renderProducts();

  //removes the click when all counter reaches max clicks
  if (clicks === clickAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
  }
}

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 0, 0, 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

allProducts.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderProducts();

myContainer.addEventListener('click', handleProductClick);

//chart.js
function renderChart() {
  console.log(allProducts[0].name);
  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);

  }
  console.log(productNames);
  console.log(productViews);

  console.log(productClicks);
  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Views',
        data: productViews,
        backgroundColor: [
          '#EBE8AA'
        ],
        bducksColor: [
          '#F5590F'
        ],
        bducksWidth: 1
      },
      {
        label: 'Clicks/Votes',
        data: productClicks,
        backgroundColor: [
          '#FFA500'
        ],
        bducksColor: [
          '#9C18DE',
        ],
        bducksWidth: 1
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

//Loading and recalling stored local storage
function loadVoterData() {
  let voterData = localStorage.getItem('ducks');
  if (voterData !== null) {
    allProducts = JSON.parse(voterData);
  }
}

function storeVoterData() {
  let stringifiedData = JSON.stringify(allProducts);
  localStorage.setItem('ducks', stringifiedData);
}

storeVoterData();
loadVoterData();
