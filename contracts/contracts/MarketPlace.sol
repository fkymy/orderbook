// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MarketPlace is ReentrancyGuard {
	address payable public	owner;
	uint public				feePercent;
	string public			name;
	uint public				itemCount;

	struct Item {
		IERC721			collection;
		uint			tokenId;
		uint			price;
		address	payable	seller;
		bool			sold;
	}

	Item[] public items;

	constructor(string memory _name, address _owner, uint _feePercent) {
		owner = payable(_owner);
		name = _name;
		feePercent = _feePercent;
		itemCount = 0;
	}

	event Listed(address collection, uint tokenId, uint price, address seller);
	event Bought(address collection, uint tokenId, uint price, address seller, address buyer);

	function listItem(IERC721 _collection, uint _tokenId, uint _price) external nonReentrant {
		require(_price > 0, "Price must be greater than 0");

		itemCount++;
		items.push(Item(
			_collection,
			_tokenId,
			_price,
			payable(msg.sender),
			false
		));

		emit Listed(address(_collection), _tokenId, _price, msg.sender);
	}

	function purchaseItem(IERC721 _collection, uint _tokenId) external payable nonReentrant {

		Item memory item = Item(_collection, 0, 0, payable(address(0)), false);
		for (uint i = 0; i < items.length; i++) {
			if (items[i].collection == _collection && items[i].tokenId == _tokenId) {
				item = items[i];
			}
		}

		require(item.seller != payable(address(0)), "item doesn't exist");

		uint totalPrice = getTotalPrice(item.price);
		require(msg.value >= totalPrice, "not enough currency to buy this item");
		require(item.sold == false, "item already sold");

		item.seller.transfer(item.price);
		owner.transfer(totalPrice - item.price);

		item.sold = true;
		item.collection.transferFrom(item.seller, msg.sender, item.tokenId);

		emit Bought(address(item.collection), item.tokenId, item.price, item.seller, msg.sender);
	}

	function getTotalPrice(uint _price) view public returns(uint) {
		return _price * ((100 + feePercent) / 100);
	}

}