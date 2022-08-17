const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("epic");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let price = await domainContract.price("abhishek");
  let txn = await domainContract.register("abhishek", {
    value: hre.ethers.utils.parseEther(
      (parseInt(price, 10) / 10 ** 18).toString()
    ),
  });
  await txn.wait();
  console.log("Minted domain abhishek.epic");

  txn = await domainContract.setRecord("abhishek", "EPICCCC!");
  await txn.wait();
  console.log("Set record for abhishek.epic");

  const address = await domainContract.getAddress("abhishek");
  console.log("Owner of domain abhishek:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
