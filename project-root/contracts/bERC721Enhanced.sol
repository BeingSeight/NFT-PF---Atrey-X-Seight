import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Enhanced is ERC721 {
    mapping(uint256 => string) private _ipoMetadata;

    constructor() ERC721("IPO-NFT", "INFT") {}

    function mintWithIPO(
        address to,
        uint256 tokenId,
        string memory metadataCID
    ) external {
        _ipoMetadata[tokenId] = metadataCID;
        _safeMint(to, tokenId);
    }

    function purchaseNFT(uint256 tokenId) external payable {
        require(_exists(tokenId), "Token does not exist");
        require(msg.value == price, "Incorrect payment amount");

        address owner = ownerOf(tokenId);
        payable(owner).transfer(msg.value);

        _transfer(owner, msg.sender, tokenId);
    }
}
