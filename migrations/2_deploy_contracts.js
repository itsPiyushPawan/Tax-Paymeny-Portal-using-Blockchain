const TaxPayment = artifacts.require("./TaxPayment.sol");

module.exports = function (deployer) {
  deployer.deploy(TaxPayment);
};
