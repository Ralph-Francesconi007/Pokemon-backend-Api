#!/bin/bash

API="https://vast-dusk-11166.herokuapp.com/"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
