// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IPOFactory {
    struct CompanyIPO {
        address issuer;
        string metadataCID;     // IPFS CID for prospectus/legal docs
        uint256 totalShares;
        uint256 pricePerShare;
        bool isActive;
    }

    mapping(string => CompanyIPO) public ipos;
    
    function createIPO(
        string memory ipoId,
        string memory _metadataCID,
        uint256 _totalShares,
        uint256 _pricePerShare
    ) external {
        ipos[ipoId] = CompanyIPO({
            issuer: msg.sender,
            metadataCID: _metadataCID,
            totalShares: _totalShares,
            pricePerShare: _pricePerShare,
            isActive: true
        });
    }

    function purchaseShares(string memory ipoId, uint256 numberOfShares) external payable {
        CompanyIPO storage ipo = ipos[ipoId];
        require(ipo.isActive, "IPO is not active");
        require(msg.value == numberOfShares * ipo.pricePerShare, "Incorrect payment amount");

        // Logic to transfer shares to the buyer
    }
}
