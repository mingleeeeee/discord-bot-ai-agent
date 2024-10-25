# Commands


## Role
currently, role-related function are not set for admin only.
### create-role

#### Usage
`create-role [role name]`

- Create a role in the guild. 

- You need to input the role name.


#### Example

`create-role admin`

#### Permission
- admin only

### delete-role

#### Usage
`delete-role [role name]`

- Delete a role in the guild. 

- You need to input the role name.


#### Example

`delete-role admin`

#### Permission
- admin only

### set-role

#### Usage
`set-role [user name] [role name]`

- Set a role to a user.

- You need to input the user name and the role name.


#### Example
`set-role Alice admin`

#### Permission
- admin only


## Economy

### balance

#### Usage
`balance`

- Get your current balance.

#### Permission
- All users

### add-money

#### Usage
`add-money [target user] [value]`

- Add money to a user.

- You need to input the target user name and the value.

#### Example
`add-money Alice 100`

#### Permission
- admin only

### add-money-role

#### Usage
`add-money-role [target role] [value]`

- Add money to all users with a specific role.

- You need to input the target role name and the value.

#### Example
`add-money-role admin 100`

#### Permission
- admin only

### remove-money

#### Usage
`remove-money [target user] [value]`

- Remove money from a user.

- You need to input the target user name and the value.

#### Example
`remove-money Alice 100`

#### Permission
- admin only

### remove-money-role

#### Usage
`remove-money-role [target role] [value]`

- Remove money from all users with a specific role.

- You need to input the target role name and the value.

#### Example
`remove-money-role admin 100`

#### Permission
- admin only

### reset-money

#### Usage
`reset-money`

- Reset all user's money to 0.

- You need to input the target role name and the value.


#### Permission
- admin only

### set-chat-money

#### Usage
`set-chat-money [channel] [amount] [cooldown] [status]`

- Set the chat money information to a channel. 

- This is for admin who want to give chat bonus when a user send messages in specific channel, with a bonus collected cooldown time.

- You need to input the channel name, the bonus amount, the cooldown time (seconds), and the channel status.

- The channel status: `active` or `inactive` or `deleted`


#### Example
`set-chat-money channelA 100 10 active`

#### Permission
- admin only 


### channel-info

#### Usage
`channel-info`

- Get the channel information. 

- You can get the channel's name, the bonus amount, the cooldown time (seconds), and the current status.


#### Permission
- admin only

### daily-login

#### Usage
`daily-login`

- You can get the daily login reward. 

- This command can be used once a day or it will show the cooldown time.


#### Permission
- All users

### leaderboard

#### Usage
`leaderboard`

- You can get the current top ten rich user. 


#### Permission
- All users


### set-currency

#### Usage
`set-currency [symbol]`

- Set the currency symbol. 

#### Example
`set-currency $`

`set-currency 😀`

#### Permission
- admin only 


## Item

### add-item

#### Usage
`add-item [name] [description] [status] [price] [balance]`

- Add an item to the store. 

- You need to input the item name, the description, the item status, the price and the balance.

- The item status: `active` or `inactive` or `deleted`


#### Example
`add-item apple "a red apple" active 100 10`

#### Permission
- admin only


### edit-item

#### Usage
`edit-item [name] [description] [status] [price] [balance]`

- Edit an item in the store. 

- You need to input the item name, the description, the item status, the price and the balance.

- The item status: `active` or `inactive` or `deleted`


#### Example
`edit-item apple "a red apple" active 100 10`

#### Permission
- admin only

### remove-item

#### Usage
`remove-item [name]`

- Remove an item from the store. 

- You need to input the item name.

- This command will change the item status to `deleted`.


#### Example
`remove-item apple`

#### Permission
- admin only

### buy-item

#### Usage
`buy-item [name] [amount]`

- Buy item(s) from the store. 

- You need to input the item name and the amount want to buy.


#### Example
`buy-item apple 10`

#### Permission
- All users


### item-info

#### Usage
 `item-info`

- Get your item information.


#### Permission
- All users

### `item-store`

#### Usage

`item-store`

- Get items' information in the store. 

- You need to input the item name and the amount want to buy.


#### Permission
- All users


## Other

### set-tweet

#### Usage
`set-tweet [twitter url] [day] [hour] [minute] [second]` `

- Set a tweet and the expire time.
  
- Generate buttons for tweet related-function (retweet/like). 

- You need to input the twitter url, the day, the hour, the minute and the second.
  
- Time parameters are optional. If you don't input the time, the tweet will be expired in 24 hours.


#### Example
`set-tweet https://twitter.com/elonmusk/status/1354506705618975744 1 0 0 0`

#### Permission
- admin only 
  

## Crime

### set-fail-percentage

#### Usage
`set-fail-percentage [crimeType] [percentage]`

- Set the fail percentage for a crime. 

- You need to input the crime type and the percentage.

- The crime type: `crime` or `rob`

- The percentage: 0-100

#### Example
`set-fail-percentage crime 30`

`set-fail-percentage rob 10`

#### Permission
- admin only 


### set-fine-type

#### Usage
`set-fine-type [type]`

- Set the fine type. 

- You need to input the fine type name.

- The fine type name: `percentage` or `amount`

#### Example
`set-fine-type percentage`

`set-fine-type amount`

#### Permission
- admin only 


### set-fine-amount

#### Usage
`set-fine-amount [extremum] [amount]`

- Set the fine extremum and amount. 

- You need to input the fine extremum and amount.

- The fine extremum type: `max` or `min`

#### Example
`set-fine-amount max 1000`

`set-fine-amount min 100`


#### Permission
- admin only 


## Game

### set-bet-limit

#### Usage
`set-bet-limit [game] [extremum] [amount]`

- Set the bet limit for a game with max and min amount. 

- You need to input game name, extremum and amount.

- The extremum type: `max` or `min`

- The amount need to >= 0

#### Example
`set-bet-limit BlackJack min 30`

`set-bet-limit BlackJack max 100`

#### Permission
- admin only 