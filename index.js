const coinsFlagsObject = { // Usado pra converter o nome de uma moeda em uma bandeira do pais que usa a moeda
  'USD': 'https://countryflagsapi.com/png/usa',
  'BRL': 'https://countryflagsapi.com/png/brazil',
  'CAD': 'https://countryflagsapi.com/png/can',
  'GBP': 'https://countryflagsapi.com/png/gbr',
  'ARS': 'https://countryflagsapi.com/png/arg',
  'BTC': 'https://media.istockphoto.com/id/1135211279/pt/vetorial/simple-orange-bitcoin-flag-tilted-btc-symbol-in-circle.jpg?s=170667a&w=0&k=20&c=FKDaxzdRmtB8l8S6PYdd-Sit7c-fXc32PDbvvhGqGdc=',
  'LTC': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnyAeJfNiYj9ICSxGjDyPEoauUrX7c5dA7t2eIxAgbE1h5nLdoxds95xqYjUj4OfG875o&usqp=CAU',
  'EUR': 'https://countryflagsapi.com/png/eur',
  'JPY': 'https://countryflagsapi.com/png/japan',
  'CHF': 'https://countryflagsapi.com/png/switzerland',
  'AUD': 'https://countryflagsapi.com/png/australia',
  'CNY': 'https://countryflagsapi.com/png/china',
  'ILS': 'https://countryflagsapi.com/png/israel',
  'ETH': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbjtrQBEHyZ4mySGYG1pjNlLIaKDafakAsXWorqWrV80LUXQZAYhHXWoB6xTPXpSMvpk&usqp=CAU',
  'XRP': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSItQkMn54ALUc3XG9mDlW04FQDYb4XZrnfg&usqp=CAU',
  'DOGE': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTo9UMaKROcSmZ70yPkuB97hHpir3IxBLKgQ&usqp=CAU',
}

async function fetchDataCoins() {
  try{
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await data.json();
    return result;
  } catch(err) {
    console.log(err);
  }
}

function createCardElement(coins) {
  const { bid, code, name } = coins[1];
  const div = document.createElement('div');
  const coinName = document.createElement('h3');
  const coinFlag = document.createElement('img');
  const coinPrice = document.createElement('h5');
  coinPrice.innerText = `R$ ${bid}`;
  div.className = 'coinCard';
  coinName.innerHTML = coins[0];


  coinFlag.setAttribute('crossOrigin', 'Anonymous');
  coinFlag.src = coinsFlagsObject[coins[0]];
  div.appendChild(coinName);
  div.appendChild(coinFlag);
  div.appendChild(coinPrice);
  return div;
}

async function createCoinCard() {
  const allCoins = await fetchDataCoins();
  const mappedCoins = Object.entries(allCoins).map((arrCoin) => {
    if (arrCoin[0] === 'USDT') return '';
    const newDiv = createCardElement(arrCoin);
    const getMain = document.querySelector('.cardContents');
    getMain.appendChild(newDiv);
    return newDiv;
  });
  console.log(mappedCoins)
}

createCoinCard();
