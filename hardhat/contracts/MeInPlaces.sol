// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MeInPlaces is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MeInPlaces", "BLT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://andreiblt1304.github.io/MeInPlaces-metadata/";
    }

    function getBaseURI() public view returns (string memory) {
        return tokenURI(0);
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        uint16[10] memory ids = [216, 283, 361, 576, 593, 700, 713, 881, 884, 903];
        return string(abi.encodePacked(_baseURI(), (getRandomIndex(ids)),".json"));
    }

    function getRandomIndex(uint16[10] memory idArr) public view returns (string memory) {
        uint randomIndex = uint(
            keccak256(
                abi.encodePacked(
                    block.timestamp, 
                    block.prevrandao, 
                    msg.sender
                    )
                )
            ) % idArr.length;

        return Strings.toString(idArr[randomIndex]);
    }

    function buyToken() public payable {
        uint256 tokenId = _tokenIdCounter.current();
        require(msg.value == tokenId * 0.1 ether, "Wrong amount of funds sent");
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function burn(uint256 tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not owner nor approved");
        _burn(tokenId);
    }
}