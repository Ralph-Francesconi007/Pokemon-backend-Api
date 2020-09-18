API="https://git.heroku.com/vast-dusk-11166.git"
URL_PATH="/pokemon"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "pokemon": {
      "name": "'"${NAME}"'",
      "type": "'"${TYPE}"'",
      "move": "'"${MOVE}"'"
    }
  }'

echo
