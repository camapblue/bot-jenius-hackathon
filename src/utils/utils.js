
module.exports = {
  getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  toIDRCurrency: function(amount) {
    return amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
};
