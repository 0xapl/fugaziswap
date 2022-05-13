require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

const toWei = (value) => ethers.utils.parseEther(value.toString());

const fromWei = (value) =>
  ethers.utils.formatEther(
    typeof value === "string" ? value : value.toString()
  );

const getBalance = ethers.provider.getBalance;

main = async () => {
    let owner;
    let user;
    let exchange;

    [owner, user, user1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Token", "TKN", toWei(1000000));
    await token.deployed();

    const Exchange = await ethers.getContractFactory("Exchange");
    exchange = await Exchange.deploy(token.address);
    await exchange.deployed();

    console.log(await token.balanceOf(token.address))
    console.log(await token.balanceOf(user.address))
    console.log(await token.balanceOf(owner.address))
    console.log(owner.address);
    await token.connect(owner).transfer(user.address, toWei(300))
    // await token.transfer(user.address, toWei(300))
    console.log(await token.balanceOf(user.address))
    console.log(await token.balanceOf(owner.address))
    console.log(await getBalance(user.address))
    console.log(await getBalance(owner.address))
    console.log(fromWei(await getBalance(user1.address)))
}

main()
