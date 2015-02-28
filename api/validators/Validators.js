module.exports = {
  money: function (money) {
    money = JSON.parse(money);
    return money.amount && money.currency;
  },

  address: function (address) {
    address = JSON.parse(address);
    return (!address) || (address.street && address.city && address.postcode && address.country);
  }
};