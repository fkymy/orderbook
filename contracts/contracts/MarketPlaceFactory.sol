// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './MarketPlace.sol';

contract MarketPlaceFactory {
	mapping(address => address) public listOfMarketPlaces;

	event MarketPlaceCreated(address contractAddress);

	function createMarketPlace(string memory _name, uint _feePercent) external {
		MarketPlace newMarketPlace = new MarketPlace(_name, msg.sender, _feePercent);
		listOfMarketPlaces[msg.sender] = address(newMarketPlace);

		emit MarketPlaceCreated(address(newMarketPlace));
	}
}