async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const IPOFactory = await ethers.getContractFactory("IPOFactory");
    const ipoFactory = await IPOFactory.deploy();
    console.log("IPOFactory deployed to:", ipoFactory.address);

    const ERC721Enhanced = await ethers.getContractFactory("ERC721Enhanced");
    const erc721Enhanced = await ERC721Enhanced.deploy();
    console.log("ERC721Enhanced deployed to:", erc721Enhanced.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });