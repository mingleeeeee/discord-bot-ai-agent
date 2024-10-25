# Tokyo Beast 

This is the documentation for the Tokyo Beast Discord Bot commands.

## Tasks

### Admin


#### create-task commands

`create-task login [duration] [startdate] [enddate] [role] [channel]`

##### Usage

To create a login task. All parameters are required.

Basically, there is only one login task.

- duration: the task repetitive duration, number of days

- startdate: the time when the task starts, YYYY-MM-DD hh:mm:ss

- enddate: the time when the task ends, YYYY-MM-DD hh:mm:ss

- role: the default role that can do the task

- channel: the channel that can do the task

##### Example
- `create-task login 1 2023-12-31 00:00:00 2024-12-31 00:00:00 admin test`

---

`create-task discord-post [includedstring] [role] [channel]`

##### Usage

To create a discord-post task. All parameters are required.

- includedstring: the string to verify

- role: the default role that can do the task

- channel: the channel that can do the task

##### Example
- `create-task discord-post testString admin test`

---

`create-task x-retweet [tweeturl] [role] [day] [hour] [minute] [second]`

##### Usage

To create a x-retweet task with deadline. `tweeturl` and `role` are required. Time parameters are optional, default is 1 day (24 hours).

- tweeturl: the target tweet url

- role: the default role that can do the task

- day: number of days

- hour: number of hours

- minute: number of minutes

- second: number of seconds

##### Example
- `create-task x-retweet https://x.com/TOKYOBEAST_EN/status/1749350518122766733 admin 1 0 0 0`

---

`create-task x-like [tweeturl] [role] [day] [hour] [minute] [second]`

##### Usage

To create a x-like task with deadline. `tweeturl` and `role` are required. Time parameters are optional, default is 1 day (24 hours).

- tweeturl: the target tweet url

- role: the default role that can do the task

- day: number of days

- hour: number of hours

- minute: number of minutes

- second: number of seconds

##### Example
- `create-task x-like https://x.com/TOKYOBEAST_EN/status/1749350518122766733 admin 1 0 0 0`

---

`create-task rob [duration] [penalty] [winrate]`

##### Usage

To create a rob task. All parameters are required.

Basically, there is only one rob task.

- duration: the task repetitive duration, number of days

- penalty: the penalty when the task fails, number

- winrate: the winrate of success, number between 0 and 100

##### Example
- `create-task rob 1 400 50`

---

`create-task crime [duration] [penalty] [winrate]`

##### Usage

To create a crime task. All parameters are required.

Basically, there is only one crime task.

- duration: the task repetitive duration, number of days

- penalty: the penalty when the task fails, number

- winrate: the winrate of success, number between 0 and 100

##### Example
- `create-task crime 1 400 50`

---

#### edit-task commands

`edit-task login [duration] [startdate] [enddate] [channel]`

##### Usage

To edit an exist login task. All parameters are required.

Basically, there is only one login task.

- duration: the new task repetitive duration, number of days

- startdate: the new time when the task starts, YYYY-MM-DD hh:mm:ss

- enddate: the new time when the task ends, YYYY-MM-DD hh:mm:ss

- channel: the new channel that can do the task

##### Example
- `edit-task login 1 2023-12-31 00:00:00 2024-12-31 00:00:00 test`

---

`edit-task discord-post [oldstring] [oldchannel] [newString] [newChannel]`

##### Usage

To edit a discord-post task. All parameters are required. You need to provide the old string and the old channel to find the task to edit.

- oldstring: the old string to of the original task

- oldchannel: the old channel of the original task

- newString: the new string to verify

- newChannel: the new channel that can do the task

##### Example
- `edit-task discord-post testString test newString post-task`

---

`edit-task x-retweet [tweeturl] [day] [hour] [minute] [second]`

##### Usage

To edit a x-retweet task deadline time. `tweeturl` is required. Time parameters are optional, default is 1 day (24 hours).

- tweeturl: the target tweet url

- day: number of days

- hour: number of hours

- minute: number of minutes

- second: number of seconds

##### Example
- `edit-task x-retweet https://x.com/TOKYOBEAST_EN/status/1749350518122766733 1 0 0 0`

---

`edit-task x-like [tweeturl] [day] [hour] [minute] [second]`

##### Usage

To edit a x-like task deadline time. `tweeturl` is required. Time parameters are optional, default is 1 day (24 hours).

- tweeturl: the target tweet url

- day: number of days

- hour: number of hours

- minute: number of minutes

- second: number of seconds

##### Example
- `edit-task x-like https://x.com/TOKYOBEAST_EN/status/1749350518122766733 1 0 0 0`

---

`edit-task rob [duration] [penalty] [winrate]`

##### Usage

To edit the exist rob task. All parameters are required.

Basically, there is only one rob task.

- duration: the task repetitive duration, number of days

- penalty: the penalty when the task fails, number

- winrate: the winrate of success, number between 0 and 100

##### Example
- `edit-task rob 1 400 50`

---


`edit-task crime [duration] [penalty] [winrate]`

##### Usage

To edit the exist crime task. All parameters are required.

Basically, there is only one crime task.

- duration: the task repetitive duration, number of days

- penalty: the penalty when the task fails, number

- winrate: the winrate of success, number between 0 and 100

##### Example
- `edit-task crime 1 400 50`

---

#### task-type commands

`edit-task-type [tasktype] [repetitive] [reward]`

##### Usage

To edit the `repetitve` and `reward` of a task type. All parameters are required.

- tasktype: the edit target task type

- repetitive: 0 or 1, 0 means not repetitive, 1 means repetitive

- reward: the default reward of the task type

##### Example

- `edit-task-type login 1 100`

---

### User

`daily-login`

##### Usage

To do the daily login task and retrieve the reward.

##### Example

- `daily-login`

---

### Labor

`rob`

##### Usage

To do the rob task and retrieve the reward. One chance per day, labor only.
Once the user fails, the user will need to pay the penalty.
Once the user wins, the user will get the reward from another random user.

##### Example

- `rob`

---

`crime`

##### Usage

To do the crime task and retrieve the reward. One chance per day, labor only.
Once the user fails, the user will need to pay the penalty.

##### Example

- `crime`

---

## Debt

### User

`check-debt` is combined to `check-balance`

---

#### debt command

`borrow-money [amount]`

##### Usage

To borrow money from the bank. The amount is required.

- amount: the amount to borrow, number

- one season only can borrow once

##### Example

- `borrow-money 100`

---

## Currency / Points

### Admin

#### bonus commands

`set-bonus [tasktype] [taskid] [amount] [startAt] [endAt]`

##### Usage

To set a bonus for a specific task. All parameters are required.

- tasktype: the target task type name

- taskid: the id of the specific task

- amount: the bonus amount, number

- startAt: the start time of the bonus, YYYY-MM-DD

- endAt: the end time of the bonus, YYYY-MM-DD

##### Example

- `set-bonus login 1 100 2023-12-31 2024-12-31`

--- 

`edit-bonus [tasktype] [taskid] [amount] [startAt] [endAt]`

##### Usage

To edit a bonus for a specific task. All parameters are required.

- tasktype: the target task type name

- taskid: the id of the specific task

- amount: the bonus amount, number

- startAt: the start time of the bonus, YYYY-MM-DD

- endAt: the end time of the bonus, YYYY-MM-DD

##### Example

- `edit-bonus login 1 100 2023-12-31 2024-12-31`

--- 

#### currency commands

`add-money-role [role] [amount]`

##### Usage

To add money to a role. All parameters are required.

- role: the target role

- amount: the amount to add, number

##### Example

- `add-money-role admin 100`

--- 

`remove-money-role [role] [amount]`

##### Usage

To remove money from a role. All parameters are required.

- role: the target role

- amount: the amount to remove, number

##### Example

- `remove-money-role admin 100`

--- 

`add-money-account [targetUser] [amount]`

##### Usage

To add money to a user. All parameters are required.

- targetUser: the target user

- amount: the amount to add, number

##### Example

- `add-money-account @user 100`

--- 

`remove-money-account [targetUser] [amount]`

##### Usage

To add money to a role. All parameters are required.

- role: the target role

- amount: the amount to add, number

##### Example

- `remove-money-account @user 100`

--- 

### User

`check-balance`

##### Usage

To check the user's balance and debt.

##### Example

- `check-balance`

---

## Mini Games

### User

#### blackjack command

`blackjack [bet]`

##### Usage

To play blackjack. All parameters are required.

- bet: the amount to bet

##### Example

- `blackjack 500`

--- 


#### slot command

`slot [bet]`

##### Usage

To play slot. All parameters are required.

- bet: the amount to bet

##### Example

- `slot 500`

--- 

#### roulette command

`roulette [space] [bet]`

##### Usage

To play roulette. All parameters are required.

- space: the space to bet

- bet: the amount to bet

##### Example

- `roulette red 500`

--- 

### Admin

`set-slot-winrate [winrate]`

##### Usage

To set the winrate of the slot game. The winrate is required.

- winrate: the winrate of the slot game, number between 0 and 100

##### Example

- `set-slot-winrate 50`

--- 

#### mini-game commands

## Role

### Admin

#### task-role commands

`add-task-role [tasktype] [role1] [role2] ... [role5]`

##### Usage

To add a role that can do the task to a task type.

- tasktype: the target task type, required

- role: the role that can do the task, optional

##### Example

- `add-task-role login admin`

--- 

`remove-task-role [tasktype] [role1] [role2] ... [role5]`

##### Usage

To remove a role that can do the task from a task type.

- tasktype: the target task type, required

- role: the role that can do the task, optional

##### Example

- `remove-task-role login admin`

## Items

### Admin

`create-item [name] [description] [image] [price] [balance] [maxium] [status]`

##### Usage

To create a new item. All parameters are required.

- name: the name of the item

- description: the description of the item

- image: the image of the item

- price: the price of the item

- balance: the balance of the item

- maxium: the maxium per person of the item

- status: the status of the item, active or deleted

##### Example

- `create-item apple text URL 50 100 5 active`

--- 

`edit-item [name] [description] [image] [price] [balance] [maxium] [status]`

##### Usage

To edit an exist item. The item name is required. Others are optional.

- name: the name of the target item

- description: the description of the item

- image: the image of the item

- price: the price of the item

- balance: the balance of the item

- maxium: the maxium per person of the item

- status: the status of the item, active or deleted

##### Example

- `edit-item apple text URL 50 100 5 deleted`

--- 

`delete-item [name]`

##### Usage

To delete an exist item. The item name is required.

- name: the name of the target item

##### Example

- `delete-item apple`

--- 

### User

`buy-item [name] [amount]`

##### Usage

To buy items with amount. All parameters are required.

- name: the name of the target item

- amount: the amount to buy

##### Example

- `buy-item apple 5`

---

`check-item`

##### Usage

To check your items.

##### Example

- `check-item`

---

`check-store`

##### Usage

To check the store.

##### Example

- `check-store`

---


## Season

### Admin

#### season commands

`check-season`

##### Usage

To check the current season info.

##### Example

- `check-season`

---

`set-start-balance [startBalance]`

##### Usage 

To set the start balance of the next season. The start balance is required.

- startBalance: the start balance of the next season

##### Example

- `set-start-balance 100`

---

`start-season [date]`

##### Usage

To start the first season. Once the season starts, the bot will reset all the user's balance and debt. And item's balance and maxium per person. And reset the user's role of labor.

Once the admin use the /start-season , the season will keep going for 14 days and will auto start the next season when the season end.

- date: the start date of the season, YYYY-MM-DD hh:mm:ss

## Others

### Admin

#### check setting commands

`check-setting task-type`

##### Usage

To check the task type settings.

--- 

`check-setting login-task`

##### Usage

To check the login task settings.

--- 

`check-setting discord-post-task`

##### Usage

To check the discord-post task settings.

--- 

`check-setting rob-task`

##### Usage

To check the rob task settings.

--- 

`check-setting crime-task`

##### Usage

To check the crime task settings.

--- 

`check-setting x-retweet-task`

##### Usage

To check the x-retweet task settings.

--- 

`check-setting task-target-role [tasktype]`

##### Usage

To check the task target role settings.

- tasktype: the target task type

##### Example

- `check-setting task-target-role login`
- `check-setting task-target-role discord-post`

---

`check-user [user]`

##### Usage

To check the target user's balance and debt.

-  user: the target user

##### Example

- `check-user user1`

---

`check-status`

##### Usage

To output the current all user stats.

Will show a csv file to download.

##### Example

- `check-status`

---

### User

`connect-x`

##### Usage

To connect to the x account.

---

`receive-serial-code`

##### Usage

Make sure the user already connects to Guild.xyz and gets the MT Holder role. 

Set up the channel to MT Holder only. 

In the channel, the user can use the command.

--- 

# Tables

This is the documentation for the Tokyo Beast Discord Bot tables.

## Task Tables

### taskType

need to be pre-set first
default reward: 100

- id (int)
- type (varchar) (login, discordPost, xRetweet, xLike, rob, crime)
- repetitive(int) (0 or 1)
- reward (int)
- createdAt 

| id  | type        | repetitive | reward | createdAt |
| --- | ----------- | ---------- | ------ | --------- |
| 1   | login       | 1          | 100    | datetime  |
| 2   | discordPost | 0          | 200    | datetime  |
| 3   | xRetweet    | 0          | 100    | datetime  |
| 4   | xLike       | 0          | 100    | datetime  |
| 5   | rob         | 1          | 100    | datetime  |
| 6   | crime       | 1          | 100    | datetime  |


### loginTask 

only one

- id (int)
- taskTypeId (ref: taskType.id)
- duration (varchar, store ms)
- startAt (varchar, store ms)
- endAt (varchar, store ms)
- channelId (varchar)

| id  | taskTypeId | duration | startAt | endAt | channelId |
| --- | ---------- | -------- | ------- | ----- | --------- |
| 1   | 1 (login)  | 1day     | ms      | ms    | 23414231  |


### discordPostTask

multiple tasks

- id (int)
- taskTypeId (ref: taskType.id)
- includedString (varchar)
- channel_id (varchar)

| id  | taskTypeId | includedString | channelId |
| --- | ---------- | -------------- | --------- |
| 1   | 2          | good           | 23414231  |
| 2   | 2          | bad            | 23414231  |
| 3   | 2          | apple          | 23414231  |
| 4   | 2          | orange         | 23414231  |



 ### xRetweetTask

 multiple tasks

 - id (int)
 - taskTypeId (ref: taskType.id)
 - tweetId (varchar)
 - deadline (varchar)

| id  | taskTypeId | tweetId      | deadline |
| --- | ---------- | ------------ | -------- |
| 1   | 3          | "1234421432" | ms       |
| 2   | 3          | "1234421432" | ms       |
| 3   | 3          | "1234421432" | ms       |
| 4   | 3          | "1234421432" | ms       |

 ### xLikeTask

 multiple tasks

 - id (int)
 - taskTypeId (ref: taskType.id)
 - tweetId (varchar)
 - deadline (varchar)


| id  | taskTypeId | tweetId      | deadline |
| --- | ---------- | ------------ | -------- |
| 1   | 4          | "1234421432" | ms       |
| 2   | 4          | "1234421432" | ms       |
| 3   | 4          | "1234421432" | ms       |
| 4   | 4          | "1234421432" | ms       |

 ### robTask

repetitive

only one

- id (int)
- taskTypeId (ref: taskType.id)
- duration (varchar, store ms)
- penalty (int)
- winRate (int)
 
| id  | taskTypeId | duration | penalty(int) | winRate (%) |
| --- | ---------- | -------- | ------------ | ----------- |
| 1   | 5          | 1Day     | 100          | 30          |
| 2   | 5          | 1Day     | 100          | 30          |
| 3   | 5          | 1Day     | 100          | 30          |
| 4   | 5          | 1Day     | 100          | 30          |

### crimeTask

repetitive

only one

- id (int)
- taskTypeId (ref: taskType.id)
- duration (varchar, store ms)
- penalty (int)
- winRate (int)
 
| id  | taskTypeId | duration | penalty(int) | winRate (%) |
| --- | ---------- | -------- | ------------ | ----------- |
| 1   | 6          | 1Day     | 100          | 30          |
| 2   | 6          | 1Day     | 100          | 30          |
| 3   | 6          | 1Day     | 100          | 30          |
| 4   | 6          | 1Day     | 100          | 30          |

### completedTaskUser

- id (int)
- taskTypeId (ref: taskType.id)
- completedTaskId (the id of a specific task)
- userId (ref: user.id)
- completedAt 

record the completed tasks of each user

| id  | taskTypeId      | completedTaskId | userId   | completedAt |
| --- | --------------- | --------------- | -------- | ----------- |
| 1   | 1 (login)       | 1               | "222222" | ms          |
| 2   | 2 (discordOost) | 1               | "111111" | ms          |
| 3   | 3 (xRetweet)    | 1               | "111111" | ms          |
| 4   | 4 (xLike)       | 1               | "111111" | ms          |
| 5   | 3 (xRetweet)    | 1               | "111111" | ms          |
| 6   | 2               | 2               | "222222" | ms          |

### taskTargetRole

- id (int)
- taskTypeId (ref: taskType.id)
- role (varchar)

| id  | taskTypeId | role     |
| --- | ---------- | -------- |
| 1   | 1          | everyone |
| 2   | 2          | roleA    |
| 3   | 2          | roleB    |
| ... | ...        | ...      |


## Item Tables 


### item

- id
- name
- description
- image (jpeg)
- price 
- balance (reset in the new season)
- maxiumPerPesron (reset in the new season)
- status (deleted or not)

| id  | name  | description | image | price | balance | maxiumPerPesron | status  |
| --- | ----- | ----------- | ----- | ----- | ------- | --------------- | ------- |
| 1   | apple | text        | URL   | 50    | 100     | 5               | deleted |
| 2   | box   | text        | URL   | 50    | 100     | 10              | active  |
| 3   | cat   | text        | URL   | 50    | 100     | 10              | active  |
| ... | ...   | ...         | ...   | ...   | ...     | ...             | ...     |

### itemBalance
- id
- itemId ref(item.id)
- userId ref(user.id)
- balance

| id  | itemId | userId   | balance |
| --- | ------ | -------- | ------- |
| 1   | 1      | "111111" | 5       |
| 2   | 1      | "222222" | 5       |
| 3   | 2      | "111111" | 10      |
| 4   | 2      | "222222" | 8       |


## MiniGame Tables 

### miniGame

- Should set winrate for these games?
pending now

- id
- name
- winRate


| id  | name      | winRate       | maxDebt | maxBet | minBet |
| --- | --------- | ------------- | ------- | ------ | ------ |
| 1   | roulette  | 0(cannot set) | 3000    | 50     | 50     |
| 2   | slot      | 50            | 50      | 50     | 50     |
| 3   | blackjack | 0(cannot set) | 50      | 50     | 50     |
| ... | ...       | ...           | ...     | ...    | ...    |


maxiumDebt?
maxiumBet?
minimumBet?

## User Tables

### user
- id

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

## Currency Tables

### currency
- id
- symbol
- createAt

| id  | symbol | createAt |
| --- | ------ | -------- |
| 1   | $      | ms       |



### bonus

- id
- taskTypeId ref(taskType.id)
- bonusTaskId (the id of a specific task, in each task table)
- amount (num) (+-)
- startAt
- endAt

| id  | taskTypeId | bonusTaskId | amount | startAt | endAt |
| --- | ---------- | ----------- | ------ | ------- | ----- |
| 1   | 1          | 1           | 100    | ms      | ms    |
| 2   | 2          | 1           | 150    | ms      | ms    |
| 3   | 3          | 1           | 50     | ms      | ms    |


TODO:
## Season Tables

- a season 14 days

### season

- id
- name (varchar)
- startBalance (num)
- nextStartBalance (num)
- duration (varchar, store ms)
- startAt (varchar, store ms)
- endAt (varchar, store ms)
- status

| id  | name | startBalance | nextStartBalance | duration | startAt | endAt | status |
| --- | ---- | ------------ | ---------------- | -------- | ------- | ----- | ------ |
| 1   | s1   | 100          | 100              | 14 days  | ms      | ms    | active |
| 2   | s2   | 1            | 100              | 14 days  | ms      | ms    |        |
| 3   | s3   | 1            | 100              | 14 days  | ms      | ms    |        |

set-currency-symbol?
auto add season row new when the season end? Yes

trigger when the season end:
(build season tools)
- 1. reset the all old 強制勞動者's balance and debt
- 2. remove all old 強制勞動者's role
- 3. check all user's debt and balance, if debt > balance, change role to 強制勞動者
- 4. reset all the balance and debt (or set to the start-balance)
- 5. reset the item.balance and item.maxiumPerPesron
- 6. reset the season status to ended
  
To confirm:
- do not reset user's items balance 
- reset the item.balance and item.maxiumPerPesron