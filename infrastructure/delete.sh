#!/bin/bash

ACCESS_TOKEN=...

# 一覧取得
existsMenus=$(
    curl -v -X GET https://api.line.me/v2/bot/richmenu/list \
        -H "Authorization: Bearer ${ACCESS_TOKEN}"
)
existsMenus=$(echo $existsMenus | jq ".richmenus")
existsMenusLen=$(echo $existsMenus | jq length)

# 1つずつ削除する
for i in $( seq 0 $(($existsMenusLen - 1)) ); do
    menu=$(echo $existsMenus | jq .[$i])
    menuId=$(echo $menu | jq ".richMenuId")
    menuId=$(echo ${menuId} | sed 's/"//g')

    curl -v -X DELETE https://api.line.me/v2/bot/richmenu/${menuId} \
        -H "Authorization: Bearer ${ACCESS_TOKEN}"
done
