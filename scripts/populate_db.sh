#!/bin/bash

readonly NAME='test3'
readonly CONTRACT='0x24e5bba6218d711ee675a844fc237f1ebfe83fe9'

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
}

main "$@"
