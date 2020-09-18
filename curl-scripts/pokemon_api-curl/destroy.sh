#!/bin/bash

API="https://git.heroku.com/vast-dusk-11166.git"
URL_PATH="/pokemon"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
