const Origin = artifacts.require("Origin");

module.exports = function (deployer) {
  deployer.deploy(Origin, {from: "0xBbCb5bcbA422F20AaF7A523baF521d62156FA669"});
};
