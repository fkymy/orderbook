// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DemoCollection is ERC721URIStorage {
	uint public tokenCount;
	address	owner;

	constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
		owner = payable(msg.sender);
	}

	event Minted(uint tokenId, string tokenURI, address holder);

	function mint(string memory _tokenURI) external returns(uint) {
		tokenCount++;
		_safeMint(msg.sender, tokenCount);
		_setTokenURI(tokenCount, _tokenURI);

		emit Minted(tokenCount, _tokenURI, msg.sender);

		return(tokenCount);
	}
}