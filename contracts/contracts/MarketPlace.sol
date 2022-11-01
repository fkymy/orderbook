// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MarketPlace is ReentrancyGuard {
	address payable public	owner;
	uint public				feePercent;
	string public			name;
	uint					itemCount;

	struct Item {
		uint			itemId;
		IERC721			collection;
		uint			tokenId;
		uint			price;
		address	payable	seller;
		bool			sold;
	}

	mapping(uint => Item) public items;

	constructor(string memory _name, address _owner, uint _feePercent) {
		owner = payable(_owner);
		name = _name;
		feePercent = _feePercent;
	}

	event Listed(uint itemId, address collection, uint tokenId, uint price, address seller);
	event Bought(uint itemId, address collection, uint tokenId, uint price, address seller, address buyer);

	function listItem(IERC721 _collection, uint _tokenId, uint _price) external nonReentrant {
		require(_price > 0, "Price must be greater than 0");

		_collection.transferFrom(msg.sender, address(this), _tokenId);

		itemCount++;
		items[itemCount] = Item(
			itemCount,
			_collection,
			_tokenId,
			_price,
			payable(msg.sender),
			false
		);
	}

	function purchaseItem(uint _itemId) external payable nonReentrant {
		require(0 < _itemId && _itemId <= itemCount, "item does not exist");
		Item memory item = items[_itemId];
		uint totalPrice = getTotalPrice(_itemId);
		require(msg.value >= totalPrice, "not enough currency to buy this item");
		require(item.sold == false, "item already sold");

		item.seller.transfer(item.price);
		owner.transfer(totalPrice - item.price);

		item.sold = true;
		item.collection.transferFrom(address(this), msg.sender, item.tokenId);

		emit Bought(item.itemId, address(item.collection), item.tokenId, item.price, item.seller, msg.sender);
	}

	function getTotalPrice(uint _itemId) view public returns(uint) {
		return items[_itemId].price * ((100 + feePercent) / 100);
	}

	function myItems() public view returns(Item[] memory) {
		
	}

}