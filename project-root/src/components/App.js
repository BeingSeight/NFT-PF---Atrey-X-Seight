import React, { useState } from 'react';
import { ethers } from 'ethers';
import IPOFactory from './artifacts/contracts/aIPO-Factory.sol/IPOFactory.json';
import ERC721Enhanced from './artifacts/contracts/bERC721Enhanced.sol/ERC721Enhanced.json';

const ipoFactoryAddress = "YOUR_IPO_FACTORY_CONTRACT_ADDRESS";
const erc721EnhancedAddress = "YOUR_ERC721_ENHANCED_CONTRACT_ADDRESS";

const App = () => {
    const [ipoId, setIpoId] = useState('');
    const [metadataCID, setMetadataCID] = useState('');
    const [totalShares, setTotalShares] = useState(0);
    const [pricePerShare, setPricePerShare] = useState(0);
    const [tokenURI, setTokenURI] = useState('');

    const createIPO = async () => {
        if (!window.ethereum) return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ipoFactoryAddress, IPOFactory.abi, signer);

        await contract.createIPO(ipoId, metadataCID, totalShares, pricePerShare);
    };

    const mintNFT = async () => {
        if (!window.ethereum) return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(erc721EnhancedAddress, ERC721Enhanced.abi, signer);

        await contract.mint(tokenURI, { value: ethers.utils.parseEther("0.1") });
    };

    return (
        <div>
            <h1>Create IPO</h1>
            <input type="text" placeholder="IPO ID" onChange={(e) => setIpoId(e.target.value)} />
            <input type="text" placeholder="Metadata CID" onChange={(e) => setMetadataCID(e.target.value)} />
            <input type="number" placeholder="Total Shares" onChange={(e) => setTotalShares(e.target.value)} />
            <input type="number" placeholder="Price per Share" onChange={(e) => setPricePerShare(e.target.value)} />
            <button onClick={createIPO}>Create IPO</button>

            <h1>Mint NFT</h1>
            <input type="text" placeholder="Token URI" onChange={(e) => setTokenURI(e.target.value)} />
            <button onClick={mintNFT}>Mint NFT</button>
        </div>
    );
};

export default App;