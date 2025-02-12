import React, { useState } from 'react';
import { ethers } from 'ethers';
import IPOFactory from './artifacts/contracts/aIPO-Factory.sol/IPOFactory.json';
import ERC721Enhanced from './artifacts/contracts/bERC721Enhanced.sol/ERC721Enhanced.json';

const App = () => {
    const [ipoId, setIpoId] = useState('');
    const [metadataCID, setMetadataCID] = useState('');
    const [totalShares, setTotalShares] = useState(0);
    const [pricePerShare, setPricePerShare] = useState(0);

    const createIPO = async () => {
        if (!window.ethereum) return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(IPOFactoryAddress, IPOFactory.abi, signer);

        await contract.createIPO(ipoId, metadataCID, totalShares, pricePerShare);
    };

    return (
        <div>
            <h1>Create IPO</h1>
            <input type="text" placeholder="IPO ID" onChange={(e) => setIpoId(e.target.value)} />
            <input type="text" placeholder="Metadata CID" onChange={(e) => setMetadataCID(e.target.value)} />
            <input type="number" placeholder="Total Shares" onChange={(e) => setTotalShares(e.target.value)} />
            <input type="number" placeholder="Price per Share" onChange={(e) => setPricePerShare(e.target.value)} />
            <button onClick={createIPO}>Create IPO</button>
        </div>
    );
};

export default App;