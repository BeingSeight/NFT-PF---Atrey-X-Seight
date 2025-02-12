const { expect } = require("chai");

describe("IPOFactory", function () {
    it("Should create an IPO", async function () {
        const IPOFactory = await ethers.getContractFactory("IPOFactory");
        const ipoFactory = await IPOFactory.deploy();
        await ipoFactory.deployed();

        await ipoFactory.createIPO("IPO1", "Qm...", 1000, ethers.utils.parseEther("0.1"));

        const ipo = await ipoFactory.ipos("IPO1");
        expect(ipo.totalShares).to.equal(1000);
    });
});