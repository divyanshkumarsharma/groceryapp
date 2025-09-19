const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

const loadJsonData = (filename) => {
  try {
    const filePath = path.join(dataDir, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error.message);
    return [];
  }
};

const saveJsonData = (filename, data) => {
  try {
    const filePath = path.join(dataDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error saving ${filename}:`, error.message);
    return false;
  }
};

const getData = {
  users: () => loadJsonData('users.json'),
  stores: () => loadJsonData('stores.json'),
  products: () => loadJsonData('products.json'),
  offers: () => loadJsonData('offers.json'),
  brands: () => loadJsonData('brands.json'),
  cart: () => loadJsonData('cart.json'),
  orders: () => loadJsonData('orders.json')
};

const saveData = {
  users: (data) => saveJsonData('users.json', data),
  stores: (data) => saveJsonData('stores.json', data),
  products: (data) => saveJsonData('products.json', data),
  offers: (data) => saveJsonData('offers.json', data),
  brands: (data) => saveJsonData('brands.json', data),
  cart: (data) => saveJsonData('cart.json', data),
  orders: (data) => saveJsonData('orders.json', data)
};

module.exports = {
  getData,
  saveData
};
