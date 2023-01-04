const TABLE_ITEMS = ['Compra', 'Venda', 'Variação',
 'Porcentagem de Variação', 'Máximo', 'Mínimo']; // Usado pra criar o cabeçalho da table
const COINS_FLAGS = { // Usado pra converter o nome de uma moeda em uma bandeira do pais que usa a moeda
  'USD': 'https://countryflagsapi.com/png/usa',
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

function createDataTable() { // Cria o cabeçalho da tabela
  const table = document.createElement('table');
  const tableRow = document.createElement('tr');
  TABLE_ITEMS.forEach((item) => {
    const tableHead = document.createElement('th');
    tableHead.innerHTML = item;
    tableRow.appendChild(tableHead);
    table.appendChild(tableRow);
  });
  return table;
}

function createCardElement(coins) {
  const { bid, code } = coins[1];
  const cardContents = document.createElement('div');
  const div = document.createElement('div');
  const coinName = document.createElement('h3');
  const coinFlag = document.createElement('img');
  const coinPrice = document.createElement('h5');
  coinPrice.innerText = `R$ ${bid}`;
  cardContents.className = `cardContents`;
  div.className = 'coinCard';
  coinFlag.className = 'coinFlagImg';
  coinName.innerHTML = coins[0];

  const table = createDataTable();
  table.className = `table-${code}`
  coinFlag.setAttribute('crossOrigin', '');
  coinFlag.src = COINS_FLAGS[coins[0]];
  div.appendChild(coinName);
  div.appendChild(coinFlag);
  div.appendChild(coinPrice);
  cardContents.appendChild(div);
  cardContents.appendChild(table);
  return cardContents;
}

async function createCoinCard() {
  const allCoins = await fetchDataCoins();
  const mappedCoins = Object.entries(allCoins).map((arrCoin) => {
    if (arrCoin[0] === 'USDT') return '';
    const newDiv = createCardElement(arrCoin);
    const getMain = document.querySelector('#allCards');
    getMain.appendChild(newDiv);
    return newDiv;
  });
}

function createTableValues(coins) {
  const { ask, bid, code, high, low, pctChange, varBid} = coins[1];
  const valuesArr = [bid, ask, varBid, pctChange, high, low];
  const table = document.querySelector(`.table-${code}`);
  const tableRow = document.createElement('tr');

  valuesArr.forEach((value) => {
    const tableData = document.createElement('td');
    tableData.innerText = value;
    tableRow.appendChild(tableData);
    table.appendChild(tableRow);
  })
  console.log(table)
}

function tableStack() {

}

async function updateTableValues() { // Atualiza os valores na tabela e na card
  const allCoins = await fetchDataCoins();
  Object.entries(allCoins).forEach((arrCoin) => {
    if (arrCoin[0] === 'USDT') return '';
    createTableValues(arrCoin);
  });
}

function runTable() {
  updateTableValues();
  setTimeout(runTable, 20000);
}

runTable();

window.onload = async () => {
  await createCoinCard();
  createDataTable();
  await updateTableValues();
};

// let run = true;
// while(run) {
//   try{

//   }catch(err) {
//     run = false;
//     console.log(err);
//   }
// }
