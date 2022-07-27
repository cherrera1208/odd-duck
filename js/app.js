'use strict';

//Global Variables
let myContainer = document.getElementById('images');
// let myButton = document.getElementById('survey');
let ul = document.querySelector('ul');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let allProducts = [];
let clicks = 0;
let indexArray = [];
let clickAllowed = 5;


// CONSTRUCTOR
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${this.name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
}

// FUNCTIONS
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  // let product1 = getRandomProduct();
  // let product2 = getRandomProduct();
  // let product3 = getRandomProduct();
  // // console.log(product1, product2, product3);
  // while (product1 === product2 || product1 === product3) {
  //   product2 = getRandomProduct();
  //   product3 = getRandomProduct();
  //   console.log(product1);
  //   console.log(product2);
  //   console.log(product3);
  // }

  while (indexArray.length < 6) {
    let ranNum = getRandomProduct();
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }
  console.log(indexArray);

  let product1 = indexArray.shift();
  let product2 = indexArray.shift();
  let product3 = indexArray.shift();

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

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  console.log(clickedProduct);

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
  renderProducts();

  if (clicks === clickAllowed) {
    // myButton.className = 'clicks-allowed';
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
    // myButton.addEventListener('click', handleButtonClick);
  }
}

// function handleButtonClick() {
//   if (clicks === clickAllowed) {
//     renderResults();
//   }
// }

// function renderResults() {

//   // for each  product in my array, generate a LI
//   // ex: name had X views and was clicked on X times
//   for (let i = 0; i < allProducts.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked on ${allProducts[i].clicks} times`;
//     ul.appendChild(li);
//   }
// }

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
let sweep = new Product('sweep', 'png');
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
        borderColor: [
          '#F5590F'
        ],
        borderWidth: 1
      },
      {
        label: 'Clicks/Votes',
        data: productClicks,
        backgroundColor: [
          '#61EB0E'
        ],
        borderColor: [
          '#9C18DE',
        ],
        borderWidth: 1
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


// testing different chart types
//   const DATA_COUNT = 7;
//   const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

//   const labels = productNames({ count: 15 });
//   const data = {
//     labels: productNames,
//     datasets: [
//       {
//         label: 'Views',
//         data: productViews(NUMBER_CFG),
//         borderColor: productViews,
//         CHART_COLORS.red
//         backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
//         stack: 'combined',
//         type: 'bar'
//       },
//       {
//         label: 'Votes',
//         data: productClicks(NUMBER_CFG),
//         borderColor: Utils.CHART_COLORS.blue,
//         backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
//         stack: 'combined'
//       }
//     ]
//   };
//   const config = {
//     type: 'line',
//     data: data,
//     options: {
//       plugins: {
//         title: {
//           display: true,
//           text: 'Chart.js Stacked Line/Bar Chart'
//         }
//       },
//       scales: {
//         y: {
//           stacked: true
//         }
//       }
//     },
//   };
// }
// const myChart = new Chart(
//   document.getElementById('myChart'),
//   config);
