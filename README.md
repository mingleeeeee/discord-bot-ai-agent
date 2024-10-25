# tokyobeast-discord-bot

test discord server  
https://discord.gg/4B9ZrpvrtH

## set up
- yarn install --immutable
- yarn patch-package
- touch dist/server.js
- cp .env.example .env
- edit .env
- nohup node watch.mjs > output.log 2>&1 &
- docker-compose up app -d
- yarn migrate
- yarn deployGuildCommands
- sudo docker restart tokyobeast-discord-bot-app-1

## tables

### user
- id

### season
- id
- startAt
- endAt

### balance
- id
- userId ref(user.id)
- ~~seasonId ref(season.id)~~
- balance

### debt
- id
- userId   ref(user.id)
- ~~seasonId ref(season.id)~~
- balance

### item
- id
- name
- description
- status (deleted or not)
- price
- balance

### itemBalance
- id
- itemId ref(item.id)
- userId ref(user.id)
- balance
  
### dailyLogin
- userId ref(user.id)
- last_login 

### channel
- channelId
- amount
- cooldown
- status (deleted, active, inactive)
- createAt

### channelMessage
- id
- userId ref(user.id)
- channelId ref(channel.channelId)
- lastMessageTime

### currency
- id
- symbol
- createAt

### fineAmount
- id
- extremum (max,min)
- amount
- createdAt

### fineType
- id
- type
- status (active, inactive)
- createdAt

### failPercentage
- id
- crimeType(rob, crime)
- percentage (0-100)
- createdAt

### game
- id
- name
- createdAt
  
### betLimit
- id
- gameId ref(game.id)
- extremum (max/min)
- amount
- createdAt


### tweet
- tweetId
- createdAt

### expireTweet
- tweetId ref(tweet.tweetId)
- expireAt
- createdAt

### retweetUser
- id
- tweetId ref(tweet.tweetId)
- userId ref(user.id)
- createdAt

### likeTweetUser
- id
- tweetId ref(tweet.tweetId)
- userId ref(user.id)
- createdAt


  
## commands-dev-progress

| status | priority | command             | description                                                                                                              |                                       |
| ------ | -------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| Done   | 〇       | set-currency        | 通貨のシンボルを設定                                                                                                     |                                       |
| -      | 〇       | set-start-balance   | 初期保有金額を決める                                                                                                     | →リセット機能があればなくてもいいかも |
| Done   | ◎        | add-money           | 特定のアカウントにポイントを送る                                                                                         | admin                                 |
| Done   | ◎        | add-money-role      | 特定のロールにポイントを送る                                                                                             | admin                                 |
| Done   | ◎        | remove-money        | 特定のアカウントのポイントを減らす                                                                                       | admin                                 |
| Done   | ◎        | remove-money-role   | 特定のロールのポイントを減らす                                                                                           | admin                                 |
| Done   | ◎        | balance             | 自分の保有ポイントを確認する                                                                                             |                                       |
| Done   | 〇       | leaderboard         | サーバー内の順位を確認する                                                                                               |                                       |
| Done   | ◎        | reset-money         | メンバーの保有ポイントをリセットする                                                                                     | admin                                 |
| Done   | ◎        | reset-economy       | エコノミーをリセットする                                                                                                 | admin                                 |
|        | 〇       | set-cooldown        | 各コマンドの使用頻度を制限する（時間）                                                                                   | admin                                 |
| Done   | ◎        | chat-money-amount   | デイリーボーナス用 ‧一度のチャットで付与するポイント数 ‧チャンネルを指定 ‧コマンドのクールタイム設定→ログボなら24時間    | admin                                 |
| Done   | ◎        | chat-money-channels |                                                                                                                          | admin                                 |
| Done   | ◎        | chat-money-cooldown |                                                                                                                          | admin                                 |
| Done   | ◎        | set-bet-limit       | ギャンブルへの掛け金の最大最小を設定                                                                                     | admin                                 |
| Done   | ◎        | create-item         | アイテムを作成する                                                                                                       | admin                                 |
| Done   | ◎        | edit-item           | アイテムの名前変更、金額、アイテムの説明                                                                                 | admin                                 |
| Done   | ◎        | delete-item         | アイテムの削除                                                                                                           | admin                                 |
| Done   | 〇       | item-info           | アイテムの詳細を確認する                                                                                                 |                                       |
| Done   | ◎        | buy-item            | アイテムを購入する                                                                                                       |                                       |
|        | 〇       | bot-commander       | admin専用コマンドを打てるロールを設定する                                                                                |                                       |
|        | 〇       | rob                 | 他ユーザーからポイントを奪う                                                                                             |                                       |
|        | 〇       | crime               | 犯罪を犯してポイントを稼ぐ                                                                                               |                                       |
| Done   | 〇       | set-fail-rate       | set-fail-rate <slut                                                                                                      | crime> <percentage>                   |  |
| Done   | 〇       | set-fine-amount     | （rob crime 共通）ユーザーから奪うことを失敗したときの罰金を設定set-fine-amount slut max 30%set-fine-amount crime min 10 |                                       |
|        |          | login-point-special | 特定の時間のみ、ログインポイントをx倍にすることができる,start date, end date, 倍数                                       | admin                                 |
|        |          | debt-limit-special  | 特定の期間のみ、借金上限をx倍にすることができる, start date, end date, 倍数                                              | admin                                 |
| Done   |          | daily login         |                                                                                                                          |                                       |