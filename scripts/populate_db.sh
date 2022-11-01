#!/bin/bash

readonly NAME='test3'
readonly CONTRACT='0x24e5bba6218d711ee675a844fc237f1ebfe83fe9'
readonly MAKER='0xtest'

main () {
    echo 'Creating marketplace'
    curl -X 'POST' \
        'http://localhost:3001/marketplaces' \
        -H 'accept: */*' \
        -H 'Content-Type: application/json' \
        -d "{
            \"name\": \"$NAME\",
            \"slug\": \"$NAME\",
            \"contractAddresses\": [
                \"$CONTRACT\"
            ]
        }"

    echo
    echo 'Creating orderbook orders'
    curl -X 'POST' \
        'http://localhost:3001/orders/orderbook/listings' \
        -H 'accept: */*' \
        -H 'Content-Type: application/json' \
        -d "{
            \"contract\": \"$CONTRACT\",
            \"tokenId\": 0,
            \"maker\": \"$MAKER\",
            \"decimalAmount\": 42.42
        }"
    echo
    curl -X 'POST' \
        'http://localhost:3001/orders/orderbook/listings' \
        -H 'accept: */*' \
        -H 'Content-Type: application/json' \
        -d "{
            \"contract\": \"$CONTRACT\",
            \"tokenId\": 1,
            \"maker\": \"$MAKER\",
            \"decimalAmount\": 42.42
        }"
    echo
    curl -X 'POST' \
        'http://localhost:3001/orders/orderbook/listings' \
        -H 'accept: */*' \
        -H 'Content-Type: application/json' \
        -d "{
            \"contract\": \"$CONTRACT\",
            \"tokenId\": 2,
            \"maker\": \"$MAKER\",
            \"decimalAmount\": 42.42
        }"
    echo
}

main "$@"
