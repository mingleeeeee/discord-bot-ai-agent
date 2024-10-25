interface LanguageMessages {
  [key: string]: { [key: string]: string };
}

export const localeMessages: LanguageMessages = {
  en: {
    //user commands
    onlyInCheckStatus:
      "This command can only be used in the check-status channel.",
    noBalance: "Your balance is 0 pt.",
    noDebt: "Your debt is 0 pt.",
    somethingWrong:
      "Apologies. It seems that an error has occurred. Please contact support using the Contact Us form.",
    balance: "Balance",
    debt: "Debt",
    balanceAndDebt: "Balance and Debt",

    noEnoughMoney: "You have insufficient funds.",
    yourBet: "Your Bet",
    won: "Congratulations! You won.",
    lost: "That's too bad. You lost.",
    tryAgain: "I'm terribly sorry. Please try again.",

    invalidSpace: "Invalid space entered.",
    theBallLandedOn: "The ball landed on...",
    bet: "Bet",

    notLabor: "You are not a forced laborer.",
    noRobTask: "No rob tasks available.",
    noRobTaskData: "No rob task type data available.",
    robFailed: "Failed. {penalty} pts will be drawn from your balance.",
    robSuccess: "You were able to steal {reward} pts! {bonus}.",
    robAlreadyRobbed:
      "You have already robbed today. You can rob again in {hours}h {minutes}m {seconds}s.",

    noItemInStore: "There are no products in the shop right now.",
    storeItem:
      "Price: {price} pts. Balance: {balance} pts. Description: {description}. {maxiumPerPesron} max per person.",

    noItemInfo: "You do not have any items right now.",
    itemInfo: "{description}. Your balance is {balance}. Price: {price}.",

    noDailyLoginTaskData: "There are no daily login tasks available.",
    notTaskTagetRole: "Your role is not eligible for the task.",
    onlySpecificChannel: "This command can only be used in specific channels.",
    dailyLoginNotAvailable:
      "You are currently unable to use daily login tasks.",
    noLoginTaskType: "No login task type available.",
    completeDailyLoginTask:
      "Daily login task complete! {reward} pts will be added to your balance. {bonus}.",
    alreadyLogin:
      "You've already completed today's login task. \nThe next login time is in {hours}h {minutes}m {seconds}s.",

    noCrimeTask: "You cannot commit any crimes right now.",
    noCrimeTaskTypeData: "No crime task type data available.",
    crimeFailed:
      "Failed. A {reward} pt penalty will be drawn from your balance.",
    crimeSuccess:
      "Crime successfully committed! {reward} pts will be added to your balance. {bonus}.",
    alreadyCrime:
      "You can only commit a crime once a day. \nTime until you can commit your next crime:  {hours}h {minutes}m {seconds}s.",

    connectX: "Link to X",

    seasonId: "Season ID",
    seasonName: "Season Name",
    startBalance: "Starting Balance",
    nextSeasonStartBalance: "Starting Balance for Next Season",
    duration: "Duration",
    remainingTime: "Remaining Time",
    status: "Status",

    itemNotInStore: "{getBuyItemName} is not currently available in the shop.",
    itemDeleted: "{getBuyItemName} has been deleted.",
    itemExceedMaxiumPerPesron:
      "A total of {maxiumPerPesron} {itemName}(s) can be purchased per person. \nSince you have already purchased {userItemBalance}, you can purchase {remain} more.",
    itemNotEnough: "{itemName} is not currently in stock.",
    userBuyItem: "You purchased {getBuyAmount} {itemName}.",

    borrowMoney: "Borrow Money",
    alreadyBorrowed: "You've already borrowed money this season.",
    onlyBorrowedOnce: "You can only borrow money once per season.",
    borrowSuccess: "You borrowed {amount} pts from the bank.",

    sendXLikeTask:
      "Post on X: {originalUrl} \nGet points through engagement on X.\nEnds in: {days} d {hours} h {minutes} m {seconds} s.\n@everyone",
    sendXRetweetTask:
      "Post on X: {originalUrl} \nGet points through engagement on X.\nEnds in: {days} d {hours} h {minutes} m {seconds} s.\n@everyone",

    // addMoney
    addMoneyWithExpire:
      "Add money to {targetUser} with value {addValue}, button will expire in 20 minutes",
    addMoneyCancel: "Cancel add money to {targetUser}",
    timeout: "Timeout, please use the command again",
    notAdmin: "You are not an administrator.",
    addMoneyToUser: `Add {addValue} to {username}.`,
    addMoneyToRole: `Add {addValue} to each {targetRoleName}.`,

    //addTaskRole
    taskTypeNotInTaskTypeTable:
      "The task type **{getTaskType}** is not in the task type table.",
    taskTypeAlreadyInTaskTargetRoleTable:
      "The task type **{getTaskType}** with the role **{roleName}** is already in the taskTargetRole table.",
    taskTypeToRoleCreated:
      "The task type **{getTaskType}** with the role **{roleName}** is created.",

    //checkSetting
    noTaskRole: "No task target role found.",

    //createItem
    itemAlreadyInTable: "Item {getItemName} is already in the table.",
    itemCreated: "Item {getItemName} created.",

    //createTask
    loginTaskExisted: "The login task already existed. Plesae edit it.",
    notValidDate: "Please input a valid date as YYYY-MM-DD HH:mm:ss.",
    createdLoginTask:
      "Created login task with \nDuration:{getDuration} days \nStart date: {getStartDate} \nEnd date: {getEndDate} \nChannel: {channelName} \nRole: The task target role {roleName} already existed.",
    createdLoginTaskWithRole:
      "Created login task with \nDuration:{getDuration} days \nStart date: {getStartDate} \nEnd date: {getEndDate} \nChannel: {channelName} \nRole: {roleName}.",
    discordPostTaskExisted:
      "The discord post task already existed. Plesae edit it.",
    createDCPostTask:
      "Created discord post task with \nIncluded string: {includedString} \nChannel: {channelName} \nRole: The task target role {roleName} already existed.",
    createDCPostTaskWithRole:
      "Created discord post task with \nIncluded string: {includedString} \nChannel: {channelName} \nRole: {roleName}.",

    xRetweetTaskExisted: "The x retweet task already existed. Plesae edit it.",
    createXRetweetTask:
      "Created x-retweet task with \nTweet: {getTweetUrl} \nExpire time: {days} days {hours} hours {minutes} minutes {seconds} seconds \nRole: The task target role {roleName} already existed.",
    createXRetweetTaskWithRole:
      "Created x-retweet task with \nTweet: {getTweetUrl} \nExpire time: {days} days {hours} hours {minutes} minutes {seconds} seconds \nRole: {roleName}.",

    xLikeTaskExisted: "The x like task already existed. Plesae edit it.",
    createXLikeTask:
      "Created x-like task with \nTweet: {getTweetUrl} \nExpire time: {days} days {hours} hours {minutes} minutes {seconds} seconds \nRole: The task target role {roleName} already existed.",
    createXLikeTaskWithRole:
      "Created x-like task with \nTweet: {getTweetUrl} \nExpire time: {days} days {hours} hours {minutes} minutes {seconds} seconds \nRole: {roleName}.",

    robTaskExisted: "The rob task already existed. Plesae edit it.",
    createRobTask:
      "Created rob task with \nDuration: {getDuration} days \nPenalty: {getPenalty} \nWin rate: {getWinRate} % \nStolen role: {roleName}",

    crimeTaskExisted: "The crime task already existed. Plesae edit it.",
    createCrimeTask:
      "Created crime task with \nDuration: {getDuration} days \nPenalty: {getPenalty} \nWin rate: {getWinRate} %",

    inValidSubcommand: "Please input a valid subcommand.",

    // createTaskType
    existedTaskType:
      "The task type {getTaskType} is already in the task type table.",
    createdTaskType: "The task type {getTaskType} is created.",

    // deleteItem
    itemNotInTable: "Item {getItemName} is not in the table.",
    itemIsDeleted: "Item {getItemName} is deleted.",
    itemStatusChanged: "Item {getItemName} status is changed to deleted.",

    // editItem
    itemNotInItemTable: "Item {getItemName} is not in the item table.",
    chooseUpdateParams: "Please choose update params.",
    itemUpdated: "Item {getItemName} is updated.",

    // editTask
    loginTaskNotExisted: "The login task not existed. Plesae create it.",
    editLoginTask:
      "Updated login task with \nDuration:{getDuration} days \nStart date: {getStartDate} \nEnd date: {getEndDate} \nChannel: {channelName}",
    dcPostTaskNotExisted:
      "The discord post task not existed. Plesae create it.",
    editDCPostTask:
      "Updated discord post task with \nNew included string: {includedString} \nNew channel: {channelName}",
    tweetNotExisted:
      "The tweet not existed. Plesae create it. \nTweet: {getTweetUrl}",
    editXRetweetTask:
      "Updated x-retweet task with \nTweet: {getTweetUrl} \nRemaining time: {days} days {hours} hours {minutes} minutes {seconds} seconds",
    editXLikeTask:
      "Updated x-like task with \nTweet: {getTweetUrl} \nRemaining time: {days} days {hours} hours {minutes} minutes {seconds} seconds",
    robTaskNotExisted: "The rob task not existed. Plesae create it.",
    editRobTask:
      "Updated rob task with \nDuration: {getDuration} days \nPenalty: {getPenalty} \nWin rate: {getWinRate} % \nStolen role: {roleName}",
    crimeTaskNotExisted: "The crime task not existed. Plesae create it.",
    editCrimeTask:
      "Updated crime task with \nDuration: {getDuration} days \nPenalty: {getPenalty} \nWin rate: {getWinRate} %",

    // editTaskType
    taskTypeNotExisted: "The task type not existed. Plesae create it.",
    editTaskType:
      "The task type {getTaskType} is updated with repetitive {getRepetitive} and reward {getReward}",

    // removeMoney
    removeMoney: "Remove {removeValue} from {username}.",
    removeMoneyWithExpire:
      "Remove money from {targetUser} with value {removeValue}, button will expire in 20 minutes",
    removeMoneyCancel: "Cancel remove money from {targetUser}",

    // removeMoneyRole
    removeMoneyRole: "Remove {removeValue} from each {targetRoleName}.",

    // removeTaskRole
    taskTypeNotInTaskTargetRoleTable:
      "The task type **{getTaskType}** is not in the taskTargetRole table.",
    noTaskTypeWithRole:
      "The task type **{getTaskType}** with the role **{roleName}** is not in the taskTargetRole table.",
    taskTypeWithRoleDeleted:
      "The task type **{getTaskType}** with the role **{roleName}** is deleted.",

    // setBonus
    createdBonus:
      "Task {getTaskType} bonus with task id {getTaskId} is created.",
    updatedBonus:
      "Task {getTaskType} bonus with task id {getTaskId} existed, please use /edit-bonus.",

    // setSlot
    set1to100: "Winrate should be between 1 and 100.",
    slotWinrateSet: "Slot winrate has been set to {getWinRate}%",

    //setStartBalance:
    noSeason: "There is no season.",
    setStartBalance:
      "Set the start balance {nextStartBalance} for next season. Please use /check-season to check info.",

    // index
    completedDailyStamp:
      "Completed daily stamp. Add {reward} to your balance. {bonus}",
    tweetNotInTaskTable: "The tweet is not in the task table.",
    tweetExpired: "The tweet is expired.",
    notTaskTargetRole: "You are not a task target role.",
    seasonAlreadyStarted: "Season has already started.",
    seasonStart: "Season start!",

    // blackjack
    alreadyInGame: "You are already in a game.",
    tieBjGame: "You tied the game, no payout.",
    winBjGame: "You won",
    loseBjGame: "You lost",

    borrowReminder: "Make sure your **balance > debt** before the season ends.",

    // season
    currentSeasonInfo: "Current Season Info",
    seasonWillStartIn: "Season will start in:",
    seasonStartTime:
      "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds",

    // rob
    robbed: "was robbed.",

    // serial code
    serialCode: "Serial Code",
    onlyIbSerialCode:
      "This command can only be used in the receive-serial-code channel.",
    alreadyHasSerialCode: "You already have a serial code.",
    yourSerialCode: "Your Serial Code",

    // check setting
    noTaskType: "No task type found.",
    taskTypeInfo: "Id:{id}, Repetitive:{repetitive}, Reward:{reward}",
    noLoginTask: "No login task found",
    loginTaskInfo:
      "Id:{id}, TaskTypeId:{taskTypeId}, Duration:{parsedDuration}, StartAt:{parsedStartAt}, EndAt:{parsedEndAt}, Channel:{channelName}",
    noDcPostTask: "No discord post task found.",
    dcPostTaskInfo: "Channel:{channelName}, IncludedString:{includedString}",
    noRobTaskFound: "No rob task found.",
    robTaskInfo:
      "Id:{id}, Duration:{parsedDuration}, Penalty:{penalty}, WinRate:{winRate}, StolenRole:{roleName}",
    noCrimeTaskFound: "No crime task found.",
    crimeTaskInfo:
      "Id:{id}, Duration:{parsedDuration}, Penalty:{penalty}, WinRate:{winRate}",
    noXRetweetTask: "No x retweet task found.",
    showUnexpiredXRetweetTask: "Show unexpired x retweet task.",
    xRetweetTaskInfo: "TweetId:{tweetId}, Deadline:{parsedDeadline}",
    noXLikeTask: "No x like task found.",
    showUnexpiredXLikeTask: "Show unexpired x like task.",
    xLikeTaskInfo: "TweetId:{tweetId}, Deadline:{parsedDeadline}",
    noTaskTargetRole: "No task target role found.",
    taskTargetRoleInfo: "Role:{role}",
    noBonusFound: "No task bonus found.",
    bonusInfo: "Amount:{amount}, StartAt:{parsedStartAt}, EndAt:{parsedEndAt}",
    invalidCommand: "Please input a valid subcommand.",

    // check stats
    nullGuild: "interaction.guild is null.",
    checkSnapShot: "Check the user stats in the snapshot channel.",

    // check edit bonus
    invalidBonusDate: "Please input a valid date as YYYY-MM-DD.",
    noBonusTask:
      "Task {getTaskType} bonus with task id {getTaskId} not exist, please use /set-bonus to create it.",
    bonusUpdate:
      "Task {getTaskType} bonus with task id {getTaskId} is updated.",

    // index-2
    invalidDateFormat: "Please input a valid date format, YYYY-MM-DD HH:mm:ss",
    invalidPastDate: "Invalid date. The date is in the past",
    seasonReservationStart: "Season Start Reservation!",
    seasonStartDate: "Season Start Date",
    seasonStartDateInMs: "Season Start Date in milliseconds",
    xAction: "Retweet, Like and Reply!",

    seasonNotStarted: "Season has not started yet.",
    seasonStop: "Season stop!",
    seasonReservationStop: "Season Stop Reservation!",
    seasonStopDate: "Season Stop Date",
    seasonStopDateInMs: "Season Stop Date in milliseconds",
    invalidStopDate:
      "Invalid stop date. The stop date is bigger than the season end date.",

    nameTooLong: "The name is longer than 50 characters.",
    descriptionTooLong: "The description is longer than 150 characters.",

    // check-item
    noItem: "No item found.",
    checkItemInfo:
      "Price:{price}, Balance:{balance}, MaxiumPerPesron:{maxiumPerPesron}, Description:{description}, Status:{status}, Reset:{reset}",

    // addMoneyItem
    noItemHolder: "No item holder found.",
    addMoneyToItemHolder:
      "Add {addValue} points to each holder per {targetItem}.",

    // blockCommand
    noActiveSeason: "This command is only available in the active season.",

    // casino commands
    onlyInBlackjackChannel:
      "This command can only be used in casino-blackjack channel.",
    onlyInSlotChannel: "This command can only be used in casino-slot channel.",
    onlyInRouletteChannel:
      "This command can only be used in casino-roulette channel.",
  },
  ja: {
    //user commands
    onlyInCheckStatus:
      "このコマンドはcheck-statusチャンネルでのみ使用できます。",
    noBalance: "あなたの残高は0です。",
    noDebt: "あなたの借金は0ptです。",
    somethingWrong:
      "申し訳ございません。何らかの問題が発生しました。問い合わせフォームにてお問い合わせいただけますと幸いです。",
    balance: "残高",
    debt: "借金",
    balanceAndDebt: "残高と借金",

    noEnoughMoney: "十分な資金がありません。",
    yourBet: "あなたの賭け金",
    won: "おめでとうございます！勝ちました。",
    lost: "残念、負けました。",
    tryAgain: "申し訳ございません。もう一度お試しください。",

    invalidSpace: "無効なスペースを入力しました。",
    theBallLandedOn: "ボールはが着地したのは...",
    bet: "賭け",

    notLabor: "あなたは強制労働者ではありません。",
    noRobTask: "窃盗タスクがありません。",
    noRobTaskData: "窃盗タスクのデータはありません。",
    robFailed: "失敗しました。残高から {penalty} ptが引かれます。",
    robSuccess: "窃盗に成功しました！ {reward} ptを盗めました! {bonus}",
    robAlreadyRobbed:
      "今日はすでに窃盗をしました。次回窃盗ができるのは {hours} 時間 {minutes} 分 {seconds} 秒後です。",

    noItemInStore: "現在ショップに商品はありません。",
    storeItem:
      "価格{price}pt, 残高 {balance} pt, {description}。 1人 {maxiumPerPesron} 個まで購入可能",

    noItemInfo: "現在何もアイテムを持っていません。",
    itemInfo: "{description}、あなたの残高は {balance} 、価格： {price}",

    noDailyLoginTaskData: "デイリーログインタスクがありません。",
    notTaskTagetRole: "あなたはタスクの対象ロールではありません。",
    onlySpecificChannel: "このコマンドは特定のチャンネルでのみ使用できます。",
    dailyLoginNotAvailable: "デイリーログインタスクは現在利用できません。",
    noLoginTaskType: "ログインタスクタイプがありません。",
    completeDailyLoginTask:
      "デイリーログインタスク完了！残高に {reward} ptを追加します。 {bonus}",
    alreadyLogin:
      "本日のログインタスクは完了しています。次のログイン時間： {hours} 時間 {minutes} 分 {seconds} 秒。",

    noCrimeTask: "現在犯罪はできません。",
    noCrimeTaskTypeData: "犯罪タスクタイプのデータがありません。",
    crimeFailed: "失敗しました。罰金として残高から{penalty}ptが引かれます。",
    crimeSuccess: "犯罪に成功しました！残高に{reward}ptを追加します。 {bonus}",
    alreadyCrime:
      "犯罪ができるのは1日1回です。次の犯罪ができるまで: {hours} 時間 {minutes} 分 {seconds} 秒。",

    connectX: "Xを連携",

    seasonId: "シーズンID",
    seasonName: "シーズン名",
    startBalance: "スタート残高",
    nextSeasonStartBalance: "次シーズンのスタート残高",
    duration: "期間",
    remainingTime: "残り時間",
    status: "状態",

    itemNotInStore: "現在店に {getBuyItemName} はありません。",
    itemDeleted: "{getBuyItemName} アイテムは削除されました。",
    itemExceedMaxiumPerPesron:
      "{itemName} は {maxiumPerPesron} 以上購入することはできません。あなたは現在 {userItemBalance} 個購入しているので、残り {remain} 個購入できます。",
    itemNotEnough: "{itemName} の在庫が足りません。",
    userBuyItem: "{getBuyAmount} {itemName} を購入しました。",

    borrowMoney: "お金を借りる",
    alreadyBorrowed: "このシーズンはすでにお金を借りています。",
    onlyBorrowedOnce: "1シーズンに1回だけお金を借りることができます。",
    borrowSuccess: "銀行から {amount} ptを借りました。",

    sendXLikeTask:
      "X投稿: {originalUrl} \nエンゲージXタスクでポイントを獲得 \n終了: {days} 日 {hours} 時間 {minutes} 分 {seconds} 秒 \n@everyone",
    sendXRetweetTask:
      "X投稿: {originalUrl} \nエンゲージXタスクでポイントを獲得 \n終了: {days} 日 {hours} 時間 {minutes} 分 {seconds} 秒 \n@everyone",

    // addMoney
    addMoneyWithExpire:
      "{targetUser} に {addValue} を追加します。confirmボタンは20分後に無効になります。",
    addMoneyCancel: "{targetUser} への追加をキャンセルしました。",
    timeout: "タイムアウトしました。もう一度コマンドを使用してください。",
    notAdmin: "あなたは管理者ではありません。",
    addMoneyToUser: "{username} に {addValue} を追加しました。",

    addMoneyToRole: "各 {targetRoleName} に {addValue} を追加しました。",

    //addTaskRole
    taskTypeNotInTaskTypeTable:
      "タスクタイプ **{getTaskType}** はタスクタイプテーブルにありません。",
    taskTypeAlreadyInTaskTargetRoleTable:
      "タスクタイプ **{getTaskType}** はタスクターゲットロールテーブルにすでに存在します。",
    taskTypeToRoleCreated: "タスクタイプ **{getTaskType}** が作成されました。",

    //checkSetting
    noTaskRole: "タスクターゲットロールが見つかりません。",

    //createItem
    itemAlreadyInTable: "アイテム {getItemName} はすでにテーブルにあります。",
    itemCreated: "アイテム {getItemName} が作成されました。",

    //createTask
    loginTaskExisted: "ログインタスクが既に存在します。編集してください。",
    notValidDate: "有効な日付をYYYY-MM-DD HH:mm:ssとして入力してください。",
    createdLoginTask:
      "ログインタスクを作成しました。期間：{getDuration}日 開始日：{getStartDate} 終了日：{getEndDate}チャンネル：{channelName} 役割：タスクターゲットロール{roleName}は既に存在します。",
    createdLoginTaskWithRole:
      "ログインタスクを作成しました。期間：{getDuration}日 開始日：{getStartDate} 終了日：{getEndDate} チャンネル：{channelName} 役割：{roleName}。",
    discordPostTaskExisted:
      "Discord投稿タスクは既に存在しています。編集してください。",
    createDCPostTask:
      "Discord投稿タスクを作成しました\n含まれる文字列: {includedString} \nチャンネル: {channelName} \nロール: タスク対象ロール {roleName} は既に存在しています。",
    createDCPostTaskWithRole:
      "Discord投稿タスクを作成しました\n含まれる文字列: {includedString} \nチャンネル: {channelName} \nロール: {roleName}。",
    xRetweetTaskExisted:
      "Xリツイートタスクは既に存在しています。編集してください。",
    createXRetweetTask:
      "Xリツイートタスクを作成しました\nツイート: {getTweetUrl} \n有効期限: {days}日 {hours}時間 {minutes}分 {seconds}秒 \nロール: タスク対象ロール {roleName} は既に存在しています。",
    createXRetweetTaskWithRole:
      "Xリツイートタスクを作成しました\nツイート: {getTweetUrl} \n有効期限: {days}日 {hours}時間 {minutes}分 {seconds}秒 \nロール: {roleName}。",
    xLikeTaskExisted: "Xいいねタスクは既に存在しています。編集してください。",
    createXLikeTask:
      "Xいいねタスクを作成しました\nツイート: {getTweetUrl} \n有効期限: {days}日 {hours}時間 {minutes}分 {seconds}秒 \nロール: タスク対象ロール {roleName} は既に存在しています。",
    createXLikeTaskWithRole:
      "Xいいねタスクを作成しました\nツイート: {getTweetUrl} \n有効期限: {days}日 {hours}時間 {minutes}分 {seconds}秒 \nロール: {roleName}。",
    robTaskExisted: "ロブタスクは既に存在しています。編集してください。",
    createRobTask:
      "ロブタスクを作成しました\n期間: {getDuration}日 \n罰金: {getPenalty} \n勝率: {getWinRate}% \n盗まれたロール: {roleName}",
    crimeTaskExisted: "犯罪タスクは既に存在しています。編集してください。",
    createCrimeTask:
      "犯罪タスクを作成しました\n期間: {getDuration}日 \n罰金: {getPenalty} \n勝率: {getWinRate}%",
    inValidSubcommand: "有効なサブコマンドを入力してください。",

    // createTaskType
    existedTaskType:
      "タスクタイプ {getTaskType} はタスクタイプテーブルに既に存在しています。",
    createdTaskType: "タスクタイプ {getTaskType} が作成されました。",

    // deleteItem
    itemNotInTable: "アイテム {getItemName} はテーブルにありません。",
    itemIsDeleted: "アイテム {getItemName} は削除されました。",
    itemStatusChanged:
      "アイテム {getItemName} のステータスが削除に変更されました。",

    // editItem
    itemNotInItemTable:
      "アイテム {getItemName} はアイテムテーブルにありません。",
    chooseUpdateParams: "更新するパラメータを選択してください。",
    itemUpdated: "アイテム {getItemName} が更新されました。",

    // editTask
    loginTaskNotExisted: "ログインタスクが存在しません。作成してください。",
    editLoginTask:
      "ログインタスクを更新しました\n期間: {getDuration}日 \n開始日: {getStartDate} \n終了日: {getEndDate} \nチャンネル: {channelName}",
    dcPostTaskNotExisted: "Discord投稿タスクが存在しません。作成してください。",
    editDCPostTask:
      "Discord投稿タスクを更新しました\n新しい含まれる文字列: {includedString} \n新しいチャンネル: {channelName}",
    tweetNotExisted:
      "ツイートが存在しません。作成してください。\nツイート: {getTweetUrl}",
    editXRetweetTask:
      "Xリツイートタスクを更新しました\nツイート: {getTweetUrl} \n残り時間: {days}日 {hours}時間 {minutes}分 {seconds}秒",
    editXLikeTask:
      "Xいいねタスクを更新しました\nツイート: {getTweetUrl} \n残り時間: {days}日 {hours}時間 {minutes}分 {seconds}秒",
    robTaskNotExisted: "ロブタスクが存在しません。作成してください。",
    editRobTask:
      "ロブタスクを更新しました\n期間: {getDuration}日 \n罰金: {getPenalty} \n勝率: {getWinRate}% \n盗まれたロール: {roleName}",
    crimeTaskNotExisted: "犯罪タスクが存在しません。作成してください。",
    editCrimeTask:
      "犯罪タスクを更新しました\n期間: {getDuration}日 \n罰金: {getPenalty} \n勝率: {getWinRate}%",

    // editTaskType
    taskTypeNotExisted: "タスクタイプが存在しません。作成してください。",
    editTaskType:
      "タスクタイプ {getTaskType} は繰り返し {getRepetitive} と報酬 {getReward} で更新されました",

    // removeMoney
    removeMoney: "{removeValue} を {username} から取り除きます。",
    removeMoneyWithExpire:
      "{targetUser} から {removeValue} を取り除く、confirmボタンは20分後に無効になります。",
    removeMoneyCancel: "{targetUser} へのお金の取り除きをキャンセルしました。",

    // removeMoneyRole
    removeMoneyRole: "{removeValue} を各 {targetRoleName} から取り除きます。",

    // removeTaskRole
    taskTypeNotInTaskTargetRoleTable:
      "タスクの種類 **{getTaskType}** はtaskTargetRoleテーブルにありません。",
    noTaskTypeWithRole:
      "役割 **{roleName}** を持つタスクの種類 **{getTaskType}** はtaskTargetRoleテーブルにありません。",
    taskTypeWithRoleDeleted:
      "役割 **{roleName}** を持つタスクの種類 **{getTaskType}** は削除されました。",

    // setBonus
    createdBonus:
      "タスクID {getTaskId} を持つタスク {getTaskType} ボーナスが作成されました。",
    updatedBonus:
      "タスクID {getTaskId} を持つタスク {getTaskType} ボーナスが既に存在します。/edit-bonusを使用してください。",

    // setSlot
    set1to100: "勝率は1から100の間でなければなりません。",
    slotWinrateSet: "スロットの勝率が {getWinRate} %に設定されました。",

    //setStartBalance:
    noSeason: "シーズンが存在しません。",
    setStartBalance:
      "次のシーズンの開始残高 {nextStartBalance} を設定してください。情報を確認するには/check-seasonを使用してください。",

    // index
    completedDailyStamp:
      "デイリースタンプを完了しました。あなたの残高に{reward}を追加しました。 {bonus} 。",
    tweetNotInTaskTable: "ツイートはタスクテーブルにありません。",
    tweetExpired: "ツイートは期限切れです。",
    notTaskTargetRole: "あなたはタスク対象の役割ではありません。",
    seasonAlreadyStarted: "シーズンはすでに始まっています。",
    seasonStart: "シーズン開始！",

    // blackjack
    alreadyInGame: "すでにゲーム中です。",
    tieBjGame: "ゲームが引き分けになりました。ペイアウトはありません。",
    winBjGame: "勝ちました",
    loseBjGame: "負けました",

    borrowReminder:
      "シーズン終了前に **残高 > 借金** であることを確認してください。",

    // season
    currentSeasonInfo: "現在のシーズン情報",
    seasonWillStartIn: "シーズン開始まで: ",
    seasonStartTime: "{days} 日 {hours} 時間 {minutes} 分 {seconds} 秒",

    // rob
    robbed: "から盗まれました。",

    // serial code
    serialCode: "シリアルコード",
    onlyIbSerialCode:
      "このコマンドはreceive-serial-codeチャンネルでのみ使用できます。",
    alreadyHasSerialCode: "すでにシリアルコードを持っています。",
    yourSerialCode: "あなたのシリアルコード",

    // check setting
    noTaskType: "タスクタイプが見つかりません。",
    taskTypeInfo: "ID:{id}, 繰り返し:{repetitive}, 報酬:{reward}",
    noLoginTask: "ログインタスクが見つかりません",
    loginTaskInfo:
      "ID:{id}, TaskTypeId:{taskTypeId}, 期間:{parsedDuration}, 開始日:{parsedStartAt}, 終了日:{parsedEndAt}, チャンネル:{channelName}",
    noDcPostTask: "Discord投稿タスクが見つかりません。",
    dcPostTaskInfo: "チャンネル:{channelName}, 含まれる文字列:{includedString}",
    noRobTaskFound: "窃盗タスクが見つかりません。",
    robTaskInfo:
      "ID:{id}, 期間:{parsedDuration}, 罰金:{penalty}, 勝率:{winRate}, 盗まれたロール:{roleName}",
    noCrimeTaskFound: "犯罪タスクが見つかりません。",
    crimeTaskInfo:
      "ID:{id}, 期間:{parsedDuration}, 罰金:{penalty}, 勝率:{winRate}",
    noXRetweetTask: "Xリツイートタスクが見つかりません。",
    showUnexpiredXRetweetTask: "有効期限内のXリツイートタスクを表示します。",
    xRetweetTaskInfo: "ツイートID:{tweetId}, 期限:{parsedDeadline}",
    noXLikeTask: "Xいいねタスクが見つかりません。",
    showUnexpiredXLikeTask: "有効期限内のXいいねタスクを表示します。",
    xLikeTaskInfo: "ツイートID:{tweetId}, 期限:{parsedDeadline}",
    noTaskTargetRole: "タスク対象ロールが見つかりません。",
    taskTargetRoleInfo: "役割:{role}",
    noBonusFound: "タスクボーナスが見つかりません。",
    bonusInfo: "金額:{amount}, 開始日:{parsedStartAt}, 終了日:{parsedEndAt}",
    invalidCommand: "有効なサブコマンドを入力してください。",

    // check stats
    nullGuild: "interaction.guild がnullです。",
    checkSnapShot:
      "スナップショットチャンネルでユーザーの統計情報を確認します。",

    // check edit bonus
    invalidBonusDate: "有効な日付をYYYY-MM-DDとして入力してください。",
    noBonusTask:
      "タスクID {getTaskId} を持つタスク {getTaskType} ボーナスが存在しません。/set-bonusを使用して作成してください。",
    bonusUpdate:
      "タスクID {getTaskId} を持つタスク {getTaskType} ボーナスが更新されました。",

    // index-2
    invalidDateFormat: "有効な日付形式を入力してください、YYYY-MM-DD HH:mm:ss",
    invalidPastDate: "無効な日付です。日付が過去のものです",
    seasonReservationStart: "シーズン開始予約！",
    seasonStartDate: "シーズン開始日",
    seasonStartDateInMs: "シーズン開始日のミリ秒",
    xAction: "リツイート、いいね、リプライ",

    seasonNotStarted: "シーズンはまだ始まっていません。",
    seasonStop: "シーズン終了！",
    seasonReservationStop: "シーズン終了予約！",
    seasonStopDate: "シーズン終了日",
    seasonStopDateInMs: "シーズン終了日のミリ秒",
    invalidStopDate: "無効な終了日です。終了日がシーズン終了日より大きいです。",

    nameTooLong: "名前が50文字を超えています。",
    descriptionTooLong: "説明が150文字を超えています。",

    // check-item
    noItem: "アイテムが見つかりません。",
    checkItemInfo:
      "価格:{price}, 残高:{balance}, 1人 {maxiumPerPesron} 個まで購入可能, 説明:{description}, ステータス:{status}, リセット:{reset}。",

    // addMoneyItem
    noItemHolder: "アイテムホルダーが見つかりません。",
    addMoneyToItemHolder:
      "各ホルダーごとに {targetItem} に {addValue} ポイントを追加します。",

    noActiveSeason: "このコマンドはアクティブなシーズンでのみ利用可能です。",

    // casino commands
    onlyInBlackjackChannel:
      "このコマンドはcasino-blackjackチャンネルでのみ使用できます。",
    onlyInSlotChannel:
      "このコマンドはcasino-slotチャンネルでのみ使用できます。",
    onlyInRouletteChannel:
      "このコマンドはcasino-rouletteチャンネルでのみ使用できます。",
  },
  "zh-CN": {
    //user commands
    onlyInCheckStatus: "此命令只能在check-status频道中使用。",
    noBalance: "你的余额为零",
    noDebt: "你的债务为零",
    somethingWrong: "非常抱歉，发生了一些问题。请联系客服。",
    balance: "余额",
    debt: "债务",
    balanceAndDebt: "余额和债务",

    noEnoughMoney: "你的资金不足",
    yourBet: "你的押注",
    won: "恭喜你！你胜利了。",
    lost: "非常遗憾，你输了。",
    tryAgain: "非常抱歉，请再试一次。",

    invalidSpace: "输入空格无效。",
    theBallLandedOn: "球落在了。。。",
    bet: "押注。",

    notLabor: "你不是强制劳工。",
    noRobTask: "没有抢劫任务。",
    noRobTaskData: "没有抢劫任务的数据。",
    robFailed: "你失败了。从余额中扣除 {penalty} pt。",
    robSuccess: "抢劫成功！余额增加 {reward} pt。 {bonus}",
    robAlreadyRobbed:
      "今天已经抢劫过了。距离下次可以抢劫的时间:{hours}小时{minutes}分{seconds}秒。",

    noItemInStore: "当前商店内没有商品。",
    storeItem:
      "价格: {price}, 余额:{balance}, {description}, 每人最多可购买数量:{maxiumPerPesron}。",

    noItemInfo: "当前没有所持物品。",
    itemInfo: "{description}，你的余额{balance}，价格：{price}",

    noDailyLoginTaskData: "没有每日登录任务。",
    notTaskTagetRole: "你不是目标任务角色。",
    onlySpecificChannel: "此命令只能在特定频道中使用。",
    dailyLoginNotAvailable: "每日登录任务当前不可使用。",
    noLoginTaskType: "没有登录任务类型。",
    completeDailyLoginTask: "每日登录任务已完成！余额增加{reward}pt。 {bonus}",
    alreadyLogin:
      "今天的登录任务已完成。距离下次登录时间：{hours}小时{minutes}分{seconds}秒。",

    noCrimeTask: "当前不能犯罪。",
    noCrimeTaskTypeData: "没有犯罪任务的数据。",
    crimeFailed: "你失败了。从余额中扣除罚款{penalty}pt。",
    crimeSuccess: "犯罪成功！余额增加{reward}pt。 {bonus}",
    alreadyCrime:
      "每日可以犯罪一次。距离下次可犯罪时间：{hours}小时{minutes}分{seconds}秒。",

    connectX: "连接到X",

    seasonId: "赛季ID",
    seasonName: "赛季名",
    startBalance: "初始余额",
    nextSeasonStartBalance: "下次赛季的初始余额",
    duration: "期间",
    remainingTime: "剩余时间",
    status: "状态",

    itemNotInStore: "当前店内没有{getBuyItemName}。",
    itemDeleted: "{getBuyItemName}物品已删除。",
    itemExceedMaxiumPerPesron:
      "{itemName}超过{maxiumPerPesron}以上无法购入。 \n当前已持有{userItemBalance}个，剩余可购入数为{remain}个。",
    itemNotEnough: "{itemName} 在库不足。",
    userBuyItem: "已购入{getBuyAmount}{itemName}。",

    borrowMoney: "借钱",
    alreadyBorrowed: "你在本季已经借过钱了。",
    onlyBorrowedOnce: "每季只能借一次钱。",
    borrowSuccess: "你从银行借了{amount}pt",

    sendXLikeTask:
      "X投稿：{originalUrl}\n X参加X任务或者积分  \n结束：{days}天{hours}小时{minutes}分{seconds}分 \n@everyone",
    sendXRetweetTask:
      "X投稿：{originalUrl}\n X参加X任务或者积分  \n结束：{days}天{hours}小时{minutes}分{seconds}分 \n@everyone",

    // addMoney
    addMoneyWithExpire:
      "向 {targetUser} 增加 {addValue}。按钮将在20分钟后失效。",
    addMoneyCancel: "取消了对 {targetUser} 的增加。",
    timeout: "超时。请再次使用命令。",
    notAdmin: "你不是管理员。",
    addMoneyToUser: "{username}增加了 {addValue}",

    addMoneyToRole: "每个{targetRoleName} 增加了{addValue}",

    //addTaskRole
    taskTypeNotInTaskTypeTable: "任务类型**{getTaskType}**不在任务列表中。",
    taskTypeAlreadyInTaskTargetRoleTable:
      "任务类型**{getTaskType}**已经在任务目标角色列表中。",
    taskTypeToRoleCreated: "任务类型**{getTaskType}**已创建。",

    //checkSetting
    noTaskRole: "没有任务目标角色。",

    //createItem
    itemAlreadyInTable: "物品 {getItemName}已在列表中。",
    itemCreated: "物品 {getItemName}已创建。",

    //createTask
    loginTaskExisted: "登陆任务已存在。请进行编辑。",
    notValidDate: "请输入有效日期，如 YYYY-MM-DD HH:mm:ss。",
    createdLoginTask:
      "登录任务已创建。 \n期间：{getDuration}日　\n开始日期：{getStartDate}　\n结束日期：{getEndDate} \n频道：{channelName} \n角色：目标任务角色{roleName}已存在。",
    createdLoginTaskWithRole:
      "登录任务已创建。 \n期间：{getDuration}日　\n开始日期：{getStartDate}　\n结束日期：{getEndDate} \n频道：{channelName} \n角色：{roleName}。",
    discordPostTaskExisted: "Discord发布任务已存在。请进行编辑。",
    createDCPostTask:
      "Discord发布任务已创建 \n包含字符: {includedString} \n频道: {channelName}  \n角色: 对象任务角色 {roleName} 已存在。",
    createDCPostTaskWithRole:
      "Discord发布任务已创建 \n包含字符: {includedString} \n频道: {channelName}  \n角色: {roleName} 。",
    xRetweetTaskExisted: "X转发任务已存在。请进行编辑。",
    createXRetweetTask:
      "X转发任务已创建 \n发布: {getTweetUrl} \n有効期限: {days}天 {hours}小时 {minutes}分 {seconds}秒 \n角色: 对象任务角色{roleName} 已存在。",
    createXRetweetTaskWithRole:
      "X转发任务已创建 \n发布: {getTweetUrl} \n有効期限: {days}天 {hours}小时 {minutes}分 {seconds}秒 \n角色:  {roleName}。",
    xLikeTaskExisted: "X点赞任务已存在。请进行编辑。",
    createXLikeTask:
      "X点赞任务已创建 \n发布: {getTweetUrl} 有效期限: {days}天 {hours}小时 {minutes}分 {seconds}秒  \n角色: 对象任务角色{roleName} 已存在。",
    createXLikeTaskWithRole:
      "X点赞任务已创建 \n发布: {getTweetUrl} 有效期限: {days}天 {hours}小时 {minutes}分 {seconds}秒  \n角色: {roleName}。",
    robTaskExisted: "犯罪任务已存在。请进行编辑。",
    createRobTask:
      "犯罪任务已创建 \n期间: {getDuration}天 \n罚款: {getPenalty} \n胜率: {getWinRate}％ \n被盗角色: {roleName}",
    crimeTaskExisted: "犯罪任务已存在。请进行编辑。",
    createCrimeTask:
      "犯罪任务已创建 \n期间: {getDuration}天 \n罚款: {getPenalty} \n胜率: {getWinRate}％",
    inValidSubcommand: "请输入有效的子命令。",

    // createTaskType
    existedTaskType: "任务类型{getTaskType}已经在任务列表中。",
    createdTaskType: "任务类型{getTaskType}已创建。",

    // deleteItem
    itemNotInTable: "物品 {getItemName}不在列表中。",
    itemIsDeleted: "物品 {getItemName}已删除。",
    itemStatusChanged: "物品 {getItemName}状态变更为已删除。",

    // editItem
    itemNotInItemTable: "物品 {getItemName}不在物品列表中。",
    chooseUpdateParams: "请选择待更新参数。",
    itemUpdated: "物品 {getItemName}已更新。",

    // editTask
    loginTaskNotExisted: "登录任务不存在。请创建。",
    editLoginTask:
      "登录任务已更新 \n期间: {getDuration}天 \n开始日期: {getStartDate} \n结束日期: {getEndDate} \n频道: {channelName}",
    dcPostTaskNotExisted: "Discord发布任务不存在。请创建。",
    editDCPostTask:
      "Discord发布任务已更新\n新包含字符: {includedString} \n新频道: {channelName}",
    tweetNotExisted: "发布内容不存在。请创建。\n发布: {getTweetUrl}",
    editXRetweetTask:
      "X转发任务已更新\n发布: {getTweetUrl} \n剩余时间: {days}天 {hours}小时 {minutes}分 {seconds}秒",
    editXLikeTask:
      "X点赞任务已经更新\n发布 {getTweetUrl} \n剩余时间: {days}天 {hours}小时 {minutes}分 {seconds}秒",
    robTaskNotExisted: "犯罪任务不存在。请创建。",
    editRobTask:
      "犯罪任务已更新 \n期间: {getDuration}天 \n罚款: {getPenalty} \n胜率: {getWinRate}％ \n被盗角色: {roleName}",
    crimeTaskNotExisted: "犯罪任务不存在。请创建。",
    editCrimeTask:
      "犯罪类型已更新\n期间: {getDuration}天 \n罚款: {getPenalty} \n胜率: {getWinRate}％",

    // editTaskType
    taskTypeNotExisted: "任务类型不存在。请创建。",
    editTaskType: "任务类型通过重复以及获得报酬已更新。",

    // removeMoney
    removeMoney: "从 {username} 中移除{removeValue} 。",
    removeMoneyWithExpire:
      "从 {targetUser} 中移除 {removeValue} ，按钮将在20分钟后失效。",
    removeMoneyCancel: "取消了对 {targetUser} 的移除。",

    // removeMoneyRole
    removeMoneyRole: "从各 {removeValue} 中移除 {removeValue} 。",

    // removeTaskRole
    taskTypeNotInTaskTargetRoleTable:
      "任务类型 **{getTaskType}** 不在目标任务列表中。",
    noTaskTypeWithRole:
      "角色 **{roleName}**所持任务类型 **{getTaskType}** 不在任务列表中。",
    taskTypeWithRoleDeleted:
      "角色 **{roleName}** 所持任务类型 **{getTaskType}** 已删除。",

    // setBonus
    createdBonus: "任务ID {getTaskId} 所持任务 {getTaskType} 奖励已创建。",
    updatedBonus:
      "任务ID {getTaskId} 所持任务 {getTaskType} 奖励已存在。请使用/edit-bonus进行编辑。",

    // setSlot
    set1to100: "胜率必须在1-100之间。",
    slotWinrateSet: "老虎机的胜率 {getWinRate} %已设定。",

    //setStartBalance:
    noSeason: "没有赛季。",
    setStartBalance:
      "请设定下次赛季的初始余额 {nextStartBalance} 。请使用/check-season确认信息。",

    // index
    completedDailyStamp:
      "每日印章已完成。你的余额已经增加 {reward} 。 {bonus} 。",
    tweetNotInTaskTable: "发布不在任务列表中。",
    tweetExpired: "发布已超过期限。",
    notTaskTargetRole: "你不是目标任务角色。",
    seasonAlreadyStarted: "赛季正在进行中。",
    seasonStart: "赛季开始！",

    // blackjack
    alreadyInGame: "你已经在游戏中。",
    tieBjGame: "你和庄家打成平局，没有奖金。",
    winBjGame: "你赢了",
    loseBjGame: "你输了",

    borrowReminder: "请确保在赛季结束前，你的 **余额 > 债务** 。",

    // season
    currentSeasonInfo: "当前赛季信息",
    seasonWillStartIn: "赛季将开始：",
    seasonStartTime: "{days} 天 {hours} 小时 {minutes} 分 {seconds} 秒",

    // rob
    robbed: "被抢劫。",

    // serial code
    serialCode: "序列码",
    onlyIbSerialCode: "此命令只能在receive-serial-code频道中使用。",
    alreadyHasSerialCode: "你已经有序列码了。",
    yourSerialCode: "你的序列码",

    // check setting
    noTaskType: "没有任务类型。",
    taskTypeInfo: "ID:{id}, 重复:{repetitive}, 奖励:{reward}",
    noLoginTask: "没有登录任务。",
    loginTaskInfo:
      "ID:{id}, TaskTypeId:{taskTypeId}, 期间:{parsedDuration}, 开始日期:{parsedStartAt}, 结束日期:{parsedEndAt}, 频道:{channelName}",
    noDcPostTask: "没有Discord发布任务。",
    dcPostTaskInfo: "频道:{channelName}, 包含字符:{includedString}",
    noRobTaskFound: "没有抢劫任务。",
    robTaskInfo:
      "ID:{id}, 期间:{parsedDuration}, 罚款:{penalty}, 胜率:{winRate}, 被抢劫角色:{roleName}",
    noCrimeTaskFound: "没有犯罪任务。",
    crimeTaskInfo:
      "ID:{id}, 期间:{parsedDuration}, 罚款:{penalty}, 胜率:{winRate}",
    noXRetweetTask: "没有X转发任务。",
    showUnexpiredXRetweetTask: "显示未过期的X转发任务。",
    xRetweetTaskInfo: "发布ID:{tweetId}, 期限:{parsedDeadline}",
    noXLikeTask: "没有X点赞任务。",
    showUnexpiredXLikeTask: "显示未过期的X点赞任务。",
    xLikeTaskInfo: "发布ID:{tweetId}, 期限:{parsedDeadline}",
    noTaskTargetRole: "没有任务目标角色。",
    taskTargetRoleInfo: "角色:{role}",
    noBonusFound: "没有任务奖励。",
    bonusInfo:
      "金额:{amount}, 开始日期:{parsedStartAt}, 结束日期:{parsedEndAt}",
    invalidCommand: "请输入有效的子命令。",

    // check stats
    nullGuild: "interaction.guild 为null。",
    checkSnapShot: "在快照频道中查看用户统计信息。",

    // check edit bonus
    invalidBonusDate: "请输入有效日期，如YYYY-MM-DD。",
    noBonusTask:
      "任务ID {getTaskId} 所持任务 {getTaskType} 奖励不存在。请使用/set-bonus创建。",
    bonusUpdate: "任务ID {getTaskId} 所持任务 {getTaskType} 奖励已更新。",

    // index-2
    invalidDateFormat: " 请输入有效的日期格式，如YYYY-MM-DD HH:mm:ss。",
    invalidPastDate: " 无效的日期。日期已过去。",
    seasonReservationStart: " 赛季预约开始！",
    seasonStartDate: " 赛季开始日期",
    seasonStartDateInMs: " 赛季开始日期的毫秒数",
    xAction: " 转发、点赞、回复",

    seasonNotStarted: "赛季尚未开始。",
    seasonStop: "赛季结束！",
    seasonReservationStop: "赛季结束预约！",
    seasonStopDate: "赛季结束日期",
    seasonStopDateInMs: "赛季结束日期的毫秒数",
    invalidStopDate: "无效的结束日期。结束日期大于赛季结束日期。",

    nameTooLong: "名称超过50个字符。",
    descriptionTooLong: "描述超过150个字符。",

    // check-item
    noItem: "没有物品。",
    checkItemInfo:
      "价格:{price}, 余额:{balance}, 每人最多可购买数量:{maxiumPerPesron}, 描述:{description}, 状态:{status}, 重置:{reset}。",

    // addMoneyItem
    noItemHolder: "没有物品持有者。",
    addMoneyToItemHolder: "持有者每持有 1个 {targetItem} 增加 {addValue} 点。",

    noActiveSeason: "此命令仅在活动赛季中可用。",

    // casino commands
    onlyInBlackjackChannel: "此命令只能在casino-blackjack频道中使用。",
    onlyInSlotChannel: "此命令只能在casino-slot频道中使用。",
    onlyInRouletteChannel: "此命令只能在casino-roulette频道中使用。",
  },
  "zh-TW": {
    onlyInCheckStatus: "此命令只能在 check-status 頻道中使用。",
    noBalance: "你沒有餘額",
    noDebt: "你沒有債務",
    somethingWrong: "出了些問題。",
    balance: "餘額",
    debt: "債務",
    balanceAndDebt: "餘額和債務",

    noEnoughMoney: "你沒有足夠的錢。",
    yourBet: "你的押注",
    won: "恭喜你！你贏了",
    lost: "抱歉，你輸了",
    tryAgain: "再試一次！",

    invalidSpace: "你輸入了無效的空間。",
    theBallLandedOn: "球落在:",
    bet: "押注",

    notLabor: "你不是勞工。",
    noRobTask: "沒有搶劫任務。",
    noRobTaskData: "沒有搶劫任務數據。",
    robFailed: "失敗。你失去了 {penalty} 元。",
    robSuccess: "成功搶劫。你的餘額增加了 {reward}。 {bonus}",
    robAlreadyRobbed:
      "你今天已經搶劫過了。下一次搶劫時間: {hours}小時 {minutes}分 {seconds}秒。",
    noItemInStore: "商店裡沒有東西。",
    storeItem:
      "價格: {price}, 餘額:{balance}, 最大限制:{maxiumPerPesron}, 描述:{description}",
    noItemInfo: "你沒有物品信息。",
    itemInfo: "描述: {description}, 你有 {balance}, 價格:{price}",
    noDailyLoginTaskData: "沒有每日登錄任務。",
    notTaskTagetRole: "你不是任務目標角色。",
    onlySpecificChannel: "此命令只能在特定頻道中使用。",
    dailyLoginNotAvailable: "每日登錄任務現在不可用。",
    noLoginTaskType: "沒有登錄任務類型。",
    completeDailyLoginTask:
      "完成每日登錄任務。你的餘額增加了 {reward}。 {bonus}",
    alreadyLogin:
      "你已經登錄過了。\n下一次登錄時間: {hours}小時 {minutes}分 {seconds}秒。",
    noCrimeTask: "沒有犯罪任務。",
    noCrimeTaskTypeData: "沒有犯罪任務類型數據。",
    crimeFailed: "失敗。你失去了 {penalty} 元。",
    crimeSuccess: "成功犯罪。你的餘額增加了 {reward}。 {bonus}",
    alreadyCrime:
      "你今天已經犯罪過了。\n下一次犯罪時間: {hours}小時 {minutes}分 {seconds}秒。",
    connectX: "連接到 X",
    seasonId: "賽季 ID",
    seasonName: "賽季名稱",
    startBalance: "開始餘額",
    nextSeasonStartBalance: "下一季開始餘額",
    duration: "持續時間",
    remainingTime: "剩餘時間",
    status: "狀態",
    itemNotInStore: "商店裡沒有 {getBuyItemName}。",
    itemDeleted: "{getBuyItemName} 已刪除。",
    itemExceedMaxiumPerPesron:
      "你不能擁有超過 {maxiumPerPesron} {itemName}。\n你已經有 {userItemBalance}。\n你最多可以購買 {remain}。",
    itemNotEnough: "{itemName} 餘額不足。",
    userBuyItem: "你買了 {getBuyAmount} {itemName}。",
    borrowMoney: "借錢",
    alreadyBorrowed: "你本季已經借過錢了。",
    onlyBorrowedOnce: "你每季只能借錢一次。",
    borrowSuccess: "你從銀行借了 {amount}。",
    sendXLikeTask:
      "Tweet: {originalUrl} \n參與 X 任務以獲得你的積分 \n結束: {days} 天 {hours} 小時 {minutes} 分 {seconds} 秒 \n@everyone",
    sendXRetweetTask:
      "Tweet: {originalUrl} \n參與 X 任務以獲得你的積分 \n結束: {days} 天 {hours} 小時 {minutes} 分 {seconds} 秒 \n@everyone",

    // addMoney
    addMoneyWithExpire: "給 {targetUser} 加 {addValue}。按鈕將在20分鐘後失效。",
    addMoneyCancel: "取消了對 {targetUser} 的增加。",
    timeout: "超時。請再次使用命令。",
    notAdmin: "你不是管理員。",
    addMoneyToUser: `給 {username} 加 {addValue}。`,
    addMoneyToRole: `給每個 {targetRoleName} 加 {addValue}。`,
    taskTypeNotInTaskTypeTable: "任務類型 **{getTaskType}** 不在任務類型表中。",
    taskTypeAlreadyInTaskTargetRoleTable:
      "任務類型 **{getTaskType}** 與角色 **{roleName}** 已經在 taskTargetRole 表中。",
    taskTypeToRoleCreated:
      "任務類型 **{getTaskType}** 與角色 **{roleName}** 已創建。",
    noTaskRole: "沒有任務目標角色。",
    itemAlreadyInTable: "物品 {getItemName} 已經在表中。",
    itemCreated: "物品 {getItemName} 已創建。",
    loginTaskExisted: "登錄任務已經存在。請編輯它。",
    notValidDate: "請輸入有效日期，如 YYYY-MM-DD HH:mm:ss。",
    createdLoginTask:
      "創建登錄任務 \n持續時間:{getDuration} 天 \n開始日期: {getStartDate} \n結束日期: {getEndDate} \n頻道: {channelName} \n角色: 任務目標角色 {roleName} 已存在。",
    createdLoginTaskWithRole:
      "創建登錄任務 \n持續時間:{getDuration} 天 \n開始日期: {getStartDate} \n結束日期: {getEndDate} \n頻道: {channelName} \n角色: {roleName}。",
    discordPostTaskExisted: "Discord 發布任務已經存在。請編輯它。",
    createDCPostTask:
      "創建 Discord 發布任務 \n包含字符串: {includedString} \n頻道: {channelName} \n角色: 任務目標角色 {roleName} 已存在。",
    createDCPostTaskWithRole:
      "創建 Discord 發布任務 \n包含字符串: {includedString} \n頻道: {channelName} \n角色: {roleName}。",
    xRetweetTaskExisted: "X 轉發任務已經存在。請編輯它。",
    createXRetweetTask:
      "創建 X 轉發任務 \nTweet: {getTweetUrl} \n到期時間: {days} 天 {hours} 小時 {minutes} 分 {seconds} 秒 \n角色: 任務目標角色 {roleName} 已存在。",
    createXRetweetTaskWithRole:
      "創建 X 轉發任務 \nTweet: {getTweetUrl} \n到期時間: {days} 天 {hours} 小時 {minutes} 分 {seconds} 秒 \n角色: {roleName}。",
    xLikeTaskExisted: "X 點贊任務已經存在。請編輯它。",
    createXLikeTask:
      "創建 X 點贊任務 \nTweet: {getTweetUrl} \n到期時間: {days} 天 {hours} 小時 {minutes} 分 {seconds} 秒 \n角色: 任務目標角色 {roleName} 已存在。",
    createXLikeTaskWithRole:
      "創建 X 點贊任務 \nTweet: {getTweetUrl} \n到期時間: {days} 天 {hours} 小時 {minutes} 分 {seconds} 秒 \n角色: {roleName}。",
    robTaskExisted: "搶劫任務已經存在。請編輯它。",
    createRobTask:
      "創建搶劫任務 \n持續時間: {getDuration} 天 \n罰款: {getPenalty} \n勝率: {getWinRate} % \n被搶角色: {roleName}",
    crimeTaskExisted: "犯罪任務已經存在。請編輯它。",
    createCrimeTask:
      "創建犯罪任務 \n持續時間: {getDuration} 天 \n罰款: {getPenalty} \n勝率: {getWinRate} %",
    inValidSubcommand: "請輸入有效的子命令。",
    existedTaskType: "任務類型 {getTaskType} 已經在任務類型表中。",
    createdTaskType: "任務類型 {getTaskType} 已創建。",
    itemNotInTable: "物品 {getItemName} 不在表中。",
    itemIsDeleted: "物品 {getItemName} 已刪除。",
    itemStatusChanged: "物品 {getItemName} 狀態已更改為已刪除。",
    itemNotInItemTable: "物品 {getItemName} 不在物品表中。",

    chooseUpdateParams: "請選擇更新參數。",
    itemUpdated: "物品 {getItemName} 已更新。",
    loginTaskNotExisted: "登錄任務不存在。請創建它。",
    editLoginTask:
      "更新登錄任務 \n持續時間:{getDuration} 天 \n開始日期: {getStartDate} \n結束日期: {getEndDate} \n頻道: {channelName}",
    dcPostTaskNotExisted: "Discord 發布任務不存在。請創建它。",
    editDCPostTask:
      "更新 Discord 發布任務 \n新包含字符串: {includedString} \n新頻道: {channelName}",
    tweetNotExisted: "Tweet 不存在。請創建它。\nTweet: {getTweetUrl}",
    editXRetweetTask:
      "更新 X 轉發任務 \nTweet: {getTweetUrl} \n剩餘時間: {days} 天 {hours} 小時 {minutes} 分 {seconds} 秒",
    editXLikeTask:
      "更新 X 點贊任務 \nTweet: {getTweetUrl} \n剩餘時間: {days} 天 {hours} 小時 {minutes} 分 {seconds} 秒",
    robTaskNotExisted: "搶劫任務不存在。請創建它。",
    editRobTask:
      "更新搶劫任務 \n持續時間: {getDuration} 天 \n罰款: {getPenalty} \n勝率: {getWinRate} % \n被搶角色: {roleName}",
    crimeTaskNotExisted: "犯罪任務不存在。請創建它。",
    editCrimeTask:
      "更新犯罪任務 \n持續時間: {getDuration} 天 \n罰款: {getPenalty} \n勝率: {getWinRate} %",

    taskTypeNotExisted: "任務類型不存在。請創建它。",
    editTaskType:
      "任務類型 {getTaskType} 已更新，重複 {getRepetitive} 和獎勵 {getReward}",

    removeMoney: "從 {username} 中移除 {removeValue}。",
    removeMoneyWithExpire:
      "從 {targetUser} 中移除 {removeValue} ，按鈕將在20分鐘後失效。",
    removeMoneyCancel: "取消了對 {targetUser} 的移除。",

    removeMoneyRole: "從每個 {targetRoleName} 中移除 {removeValue}。",
    taskTypeNotInTaskTargetRoleTable:
      "任務類型 **{getTaskType}** 不在 taskTargetRole 表中。",
    noTaskTypeWithRole:
      "任務類型 **{getTaskType}** 與角色 **{roleName}** 不在 taskTargetRole 表中。",
    taskTypeWithRoleDeleted:
      "任務類型 **{getTaskType}** 與角色 **{roleName}** 已刪除。",
    createdBonus: "任務 {getTaskType} 獎金與任務 id {getTaskId} 已創建。",
    updatedBonus:
      "任務 {getTaskType} 獎金與任務 id {getTaskId} 已存在。請使用 /edit-bonus 進行編輯。",
    set1to100: "勝率應該在 1 到 100 之間。",
    slotWinrateSet: "老虎機勝率已設置為 {getWinRate}%。",
    noSeason: "沒有賽季。",
    setStartBalance:
      "為下一季設置開始餘額 {nextStartBalance}。請使用 /check-season 來查看信息。",
    completedDailyStamp: "完成每日印章。你的餘額增加了 {reward}。 {bonus}",
    tweetNotInTaskTable: "Tweet 不在任務表中。",
    tweetExpired: "Tweet 已過期。",
    notTaskTargetRole: "你不是任務目標角色。",
    seasonAlreadyStarted: "賽季已經開始。",
    seasonStart: "賽季開始！",

    // blackjack
    alreadyInGame: "你已經在遊戲中。",
    tieBjGame: "平局。",
    winBjGame: "你贏了",
    loseBjGame: "你輸了",

    borrowReminder: "請確保在賽季結束前，你的 **餘額 > 負債**",

    // season
    currentSeasonInfo: "當前賽季資訊",
    seasonWillStartIn: "賽季即將開始",
    seasonStartTime: "{days} 日, {hours} 時, {minutes} 分, {seconds} 秒",

    // rob
    robbed: "被搶了。",

    // serial code
    serialCode: "序列碼",
    onlyIbSerialCode: "此命令只能在 receive-serial-code 頻道中使用。",
    alreadyHasSerialCode: "你已經有序列碼。",
    yourSerialCode: "你的序列碼",

    // check setting
    noTaskType: "沒有任務類型。",
    taskTypeInfo: "ID:{id}, 重複:{repetitive}, 獎勵:{reward}",
    noLoginTask: "沒有登錄任務。",
    loginTaskInfo:
      "ID:{id}, TaskTypeId:{taskTypeId}, 持續時間:{parsedDuration}, 開始日期:{parsedStartAt}, 結束日期:{parsedEndAt}, 頻道:{channelName}",
    noDcPostTask: "沒有 Discord 發布任務。",
    dcPostTaskInfo: "頻道:{channelName}, 包含字符:{includedString}",
    noRobTaskFound: "沒有搶劫任務。",
    robTaskInfo:
      "ID:{id}, 持續時間:{parsedDuration}, 罰款:{penalty}, 勝率:{winRate}, 被搶角色:{roleName}",
    noCrimeTaskFound: "沒有犯罪任務。",
    crimeTaskInfo:
      "ID:{id}, 持續時間:{parsedDuration}, 罰款:{penalty}, 勝率:{winRate}",
    noXRetweetTask: "沒有 X 轉發任務。",
    showUnexpiredXRetweetTask: "顯示未過期的 X 轉發任務。",
    xRetweetTaskInfo: "發布 ID:{tweetId}, 期限:{parsedDeadline}",
    noXLikeTask: "沒有 X 點贊任務。",
    showUnexpiredXLikeTask: "顯示未過期的 X 點贊任務。",
    xLikeTaskInfo: "發布 ID:{tweetId}, 期限:{parsedDeadline}",
    noTaskTargetRole: "沒有任務目標角色。",
    taskTargetRoleInfo: "角色:{role}",
    noBonusFound: "沒有任務獎勵。",
    bonusInfo:
      "金額:{amount}, 開始日期:{parsedStartAt}, 結束日期:{parsedEndAt}",
    invalidCommand: "請輸入有效的子命令。",

    // check stats
    nullGuild: "interaction.guild 為 null。",
    checkSnapShot: "在快照頻道中查看用戶統計信息。",

    // check edit bonus
    invalidBonusDate: "請輸入有效日期，如 YYYY-MM-DD。",
    noBonusTask:
      "任務 ID {getTaskId} 所持任務 {getTaskType} 獎勵不存在。請使用 /set-bonus 創建。",
    bonusUpdate: "任務 ID {getTaskId} 所持任務 {getTaskType} 獎勵已更新。",

    // index-2
    invalidDateFormat: "請輸入有效的日期格式，如 YYYY-MM-DD HH:mm:ss。",
    invalidPastDate: "無效的日期。日期已過去。",
    seasonReservationStart: "賽季預約開始！",
    seasonStartDate: "賽季開始日期",
    seasonStartDateInMs: "賽季開始日期的毫秒數",
    xAction: "轉發、讚、回覆",

    seasonNotStarted: "賽季尚未開始。",
    seasonStop: "賽季結束！",
    seasonReservationStop: "賽季結束預約！",
    seasonStopDate: "賽季結束日期",
    seasonStopDateInMs: "賽季結束日期的毫秒數",
    invalidStopDate: "無效的結束日期。結束日期大於賽季結束日期。",

    nameTooLong: "名稱超過50個字符。",
    descriptionTooLong: "描述超過150個字符。",

    // check-item
    noItem: "沒有物品。",
    checkItemInfo:
      "價格:{price}, 餘額:{balance}, 每人最多可購買數量:{maxiumPerPesron}, 描述:{description}, 狀態:{status}, 重置:{reset}。",

    // addMoneyItem
    noItemHolder: "沒有物品持有者。",
    addMoneyToItemHolder: "持有者每持有 1個 {targetItem} 增加 {addValue} 點。",

    noActiveSeason: "此命令僅在活動賽季中可用。",

    // casino commands
    onlyInBlackjackChannel: "此命令只能在 casino-blackjack 頻道中使用。",
    onlyInSlotChannel: "此命令只能在 casino-slot 頻道中使用。",
    onlyInRouletteChannel: "此命令只能在 casino-roulette 頻道中使用。",
  },
};

export const localeCommand = {
  checkSerialCode: {
    comDes: {
      ja: "ユーザーのシリアルコードを出力する",
      "zh-TW": "輸出所有用戶序列碼",
      "zh-CN": "输出所有用户序列码",
    },
  },
  createTask: {
    comDes: {
      ja: "タスクを作成する",
      "zh-TW": "創建任務",
      "zh-CN": "创建任务",
    },
    subCommands: {
      login: {
        subDes: {
          ja: "ログインタスクを作成する",
          "zh-TW": "創建登錄任務",
          "zh-CN": "创建登录任务",
        },

        durationDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },
        startdateDes: {
          ja: "開始日を設定します（形式：YYYY-MM-DD hh:mm:ss JST）",
          "zh-TW": "設定開始日期（格式：YYYY-MM-DD hh:mm:ss JST）",
          "zh-CN": "设置开始日期（格式：YYYY-MM-DD hh:mm:ss JST）",
        },
        enddateDes: {
          ja: "終了日を設定します（形式：YYYY-MM-DD hh:mm:ss JST）",
          "zh-TW": "設定結束日期（格式：YYYY-MM-DD hh:mm:ss JST）",
          "zh-CN": "设置结束日期（格式：YYYY-MM-DD hh:mm:ss JST）",
        },
        roleDes: {
          ja: "タスクの対象ロール",
          "zh-TW": "任務目標角色",
          "zh-CN": "任务目标角色",
        },
        channelDes: {
          ja: "タスクの対象チャンネル",
          "zh-TW": "任務目標頻道",
          "zh-CN": "任务目标频道",
        },
      },
      discordPost: {
        subDes: {
          ja: "Discord投稿タスクを作成する",
          "zh-TW": "創建Discord發帖任務",
          "zh-CN": "创建Discord发帖任务",
        },

        includedstringDes: {
          ja: "投稿に含まれるチェック文字列",
          "zh-TW": "帖子中包含的檢查字符串",
          "zh-CN": "帖子中包含的检查字符串",
        },
        roleDes: {
          ja: "タスクの対象ロール",
          "zh-TW": "任務目標角色",
          "zh-CN": "任务目标角色",
        },
        channelDes: {
          ja: "タスクのチャンネル",
          "zh-TW": "任務頻道",
          "zh-CN": "任务频道",
        },
      },
      xRetweet: {
        subDes: {
          ja: "Xリツイートタスクを作成する",
          "zh-TW": "創建X轉推任務",
          "zh-CN": "创建X转推任务",
        },

        tweeturlDes: {
          ja: "リツイートするツイートのURL",
          "zh-TW": "要轉推的推文URL",
          "zh-CN": "要转推的推文URL",
        },
        roleDes: {
          ja: "タスクの対象ロール",
          "zh-TW": "任務目標角色",
          "zh-CN": "任务目标角色",
        },
        dayDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },
        hourDes: {
          ja: "タスクの期間（時）",
          "zh-TW": "任務持續時間（小時）",
          "zh-CN": "任务持续时间（小时）",
        },
        minuteDes: {
          ja: "タスクの期間（分）",
          "zh-TW": "任務持續時間（分）",
          "zh-CN": "任务持续时间（分）",
        },
        secondDes: {
          ja: "タスクの期間（秒）",
          "zh-TW": "任務持續時間（秒）",
          "zh-CN": "任务持续时间（秒）",
        },
      },

      xLike: {
        subDes: {
          ja: "Xいいねタスクを作成する",
          "zh-TW": "創建X喜歡任務",
          "zh-CN": "创建X喜欢任务",
        },

        tweeturlDes: {
          ja: "いいねするツイートのURL",
          "zh-TW": "要喜歡的推文URL",
          "zh-CN": "要喜欢的推文URL",
        },

        roleDes: {
          ja: "タスクの対象ロール",
          "zh-TW": "任務目標角色",
          "zh-CN": "任务目标角色",
        },

        dayDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },

        hourDes: {
          ja: "タスクの期間（時）",
          "zh-TW": "任務持續時間（小時）",
          "zh-CN": "任务持续时间（小时）",
        },

        minuteDes: {
          ja: "タスクの期間（分）",
          "zh-TW": "任務持續時間（分）",
          "zh-CN": "任务持续时间（分）",
        },

        secondDes: {
          ja: "タスクの期間（秒）",
          "zh-TW": "任務持續時間（秒）",
          "zh-CN": "任务持续时间（秒）",
        },
      },
      rob: {
        subDes: {
          ja: "ロブタスクを作成する",
          "zh-TW": "創建搶劫任務",
          "zh-CN": "创建抢劫任务",
        },
        durationDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },
        penaltyDes: {
          ja: "罰金",
          "zh-TW": "罰款",
          "zh-CN": "罚款",
        },
        winrateDes: {
          ja: "勝率",
          "zh-TW": "勝率",
          "zh-CN": "胜率",
        },
        roleDes: {
          ja: "お金を盗むロール",
          "zh-TW": "要偷的角色",
          "zh-CN": "要偷的角色",
        },
      },

      crime: {
        subDes: {
          ja: "犯罪タスクを作成する",
          "zh-TW": "創建犯罪任務",
          "zh-CN": "创建犯罪任务",
        },

        durationDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },
        penaltyDes: {
          ja: "罰金",
          "zh-TW": "罰款",
          "zh-CN": "罚款",
        },
        winrateDes: {
          ja: "勝率",
          "zh-TW": "勝率",
          "zh-CN": "胜率",
        },
      },
    },
  },
  editTask: {
    comDes: {
      ja: "タスクの詳細を編集する",
      "zh-TW": "編輯任務詳情",
      "zh-CN": "编辑任务详情",
    },
    subCommands: {
      login: {
        subDes: {
          ja: "ログインタスクを編集する",
          "zh-TW": "編輯登錄任務",
          "zh-CN": "编辑登录任务",
        },
        durationDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },
        startdateDes: {
          ja: "開始日を設定します（形式：YYYY-MM-DD hh:mm:ss JST）",
          "zh-TW": "設定開始日期（格式：YYYY-MM-DD hh:mm:ss JST）",
          "zh-CN": "设置开始日期（格式：YYYY-MM-DD hh:mm:ss JST）",
        },
        enddateDes: {
          ja: "終了日を設定します（形式：YYYY-MM-DD hh:mm:ss JST）",
          "zh-TW": "設定結束日期（格式：YYYY-MM-DD hh:mm:ss JST）",
          "zh-CN": "设置结束日期（格式：YYYY-MM-DD hh:mm:ss JST）",
        },

        channelDes: {
          ja: "タスクの対象チャンネル",
          "zh-TW": "任務目標頻道",
          "zh-CN": "任务目标频道",
        },
      },
      discordPost: {
        subDes: {
          ja: "Discord投稿タスクを編集する",
          "zh-TW": "編輯Discord發帖任務",
          "zh-CN": "编辑Discord发帖任务",
        },
        oldstringDes: {
          ja: "古い投稿に含まれるチェック文字列",
          "zh-TW": "舊帖子中包含的檢查字符串",
          "zh-CN": "旧帖子中包含的检查字符串",
        },
        oldchannelDes: {
          ja: "古いタスクのチャンネル",
          "zh-TW": "舊任務頻道",
          "zh-CN": "旧任务频道",
        },
        newstringDes: {
          ja: "新しい投稿に含まれるチェック文字列",
          "zh-TW": "新帖子中包含的檢查字符串",
          "zh-CN": "新帖子中包含的检查字符串",
        },
        newchannelDes: {
          ja: "新しいタスクのチャンネル",
          "zh-TW": "新任務頻道",
          "zh-CN": "新任务频道",
        },
      },

      xRetweet: {
        subDes: {
          ja: "Xリツイートタスクを編集する",
          "zh-TW": "編輯X轉推任務",
          "zh-CN": "编辑X转推任务",
        },
        tweeturlDes: {
          ja: "リツイートするツイートのURL",
          "zh-TW": "要轉推的推文URL",
          "zh-CN": "要转推的推文URL",
        },
        dayDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },
        hourDes: {
          ja: "タスクの期間（時）",
          "zh-TW": "任務持續時間（小時）",
          "zh-CN": "任务持续时间（小时）",
        },
        minuteDes: {
          ja: "タスクの期間（分）",
          "zh-TW": "任務持續時間（分）",
          "zh-CN": "任务持续时间（分）",
        },
        secondDes: {
          ja: "タスクの期間（秒）",
          "zh-TW": "任務持續時間（秒）",
          "zh-CN": "任务持续时间（秒）",
        },
      },

      xLike: {
        subDes: {
          ja: "Xいいねタスクを編集する",
          "zh-TW": "編輯X喜歡任務",
          "zh-CN": "编辑X喜欢任务",
        },

        tweeturlDes: {
          ja: "いいねするツイートのURL",
          "zh-TW": "要喜歡的推文URL",
          "zh-CN": "要喜欢的推文URL",
        },

        dayDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },

        hourDes: {
          ja: "タスクの期間（時）",
          "zh-TW": "任務持續時間（小時）",
          "zh-CN": "任务持续时间（小时）",
        },

        minuteDes: {
          ja: "タスクの期間（分）",
          "zh-TW": "任務持續時間（分）",
          "zh-CN": "任务持续时间（分）",
        },

        secondDes: {
          ja: "タスクの期間（秒）",
          "zh-TW": "任務持續時間（秒）",
          "zh-CN": "任务持续时间（秒）",
        },
      },

      rob: {
        subDes: {
          ja: "ロブタスクを編集する",
          "zh-TW": "編輯搶劫任務",
          "zh-CN": "编辑抢劫任务",
        },
        durationDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },
        penaltyDes: {
          ja: "罰金",
          "zh-TW": "罰款",
          "zh-CN": "罚款",
        },
        winrateDes: {
          ja: "勝率",
          "zh-TW": "勝率",
          "zh-CN": "胜率",
        },
        roleDes: {
          ja: "お金を盗むロール",
          "zh-TW": "要偷的角色",
          "zh-CN": "要偷的角色",
        },
      },

      crime: {
        subDes: {
          ja: "犯罪タスクを編集する",
          "zh-TW": "編輯犯罪任務",
          "zh-CN": "编辑犯罪任务",
        },

        durationDes: {
          ja: "タスクの期間（日）",
          "zh-TW": "任務持續時間（天）",
          "zh-CN": "任务持续时间（天）",
        },
        penaltyDes: {
          ja: "罰金",
          "zh-TW": "罰款",
          "zh-CN": "罚款",
        },
        winrateDes: {
          ja: "勝率",
          "zh-TW": "勝率",
          "zh-CN": "胜率",
        },
      },
    },
  },
  editTaskType: {
    comDes: {
      ja: "タスクタイプを編集する",
      "zh-TW": "編輯任務類型",
      "zh-CN": "编辑任务类型",
    },
    taskTypeDes: {
      ja: "編集するタスクタイプ",
      "zh-TW": "要編輯的任務類型",
      "zh-CN": "要编辑的任务类型",
    },
    repetitiveDes: {
      ja: "繰り返しタスクかどうか（1ははい、0はいいえ）",
      "zh-TW": "是否為重複任務（1表示是，0表示否）",
      "zh-CN": "是否为重复任务（1表示是，0表示否）",
    },
    rewardDes: {
      ja: "タスクの報酬",
      "zh-TW": "任務獎勵",
      "zh-CN": "任务奖励",
    },
  },
  addTaskRole: {
    comDes: {
      ja: "タスクに対象のロールを追加する",
      "zh-TW": "向任務添加目標角色",
      "zh-CN": "向任务添加目标角色",
    },
    taskTypeDes: {
      ja: "タスクタイプ名",
      "zh-TW": "任務類型名稱",
      "zh-CN": "任务类型名称",
    },
    roleDes: {
      ja: "対象のロール",
      "zh-TW": "目標角色",
      "zh-CN": "目标角色",
    },
  },
  removeTaskRole: {
    comDes: {
      ja: "タスクからロールを削除する",
      "zh-TW": "從任務中移除角色",
      "zh-CN": "从任务中移除角色",
    },
    taskTypeDes: {
      ja: "タスクタイプ名",
      "zh-TW": "任務類型名稱",
      "zh-CN": "任务类型名称",
    },
    roleDes: {
      ja: "対象ロール",
      "zh-TW": "目標角色",
      "zh-CN": "目标角色",
    },
  },
  deleteItem: {
    comDes: {
      ja: "アイテムのステータスを削除に変更する",
      "zh-TW": "將物品狀態更改為已刪除",
      "zh-CN": "将物品状态更改为已删除",
    },
    nameDes: {
      ja: "アイテム名",
      "zh-TW": "物品名稱",
      "zh-CN": "物品名称",
    },
  },
  editItem: {
    comDes: {
      ja: "アイテムの詳細を編集する",
      "zh-TW": "編輯物品詳情",
      "zh-CN": "编辑物品详情",
    },
    nameDes: {
      ja: "アイテム名",
      "zh-TW": "物品名稱",
      "zh-CN": "物品名称",
    },
    descriptionDes: {
      ja: "アイテムの説明",
      "zh-TW": "物品描述",
      "zh-CN": "物品描述",
    },
    imageDes: {
      ja: "アイテムの画像URL",
      "zh-TW": "物品圖片URL",
      "zh-CN": "物品图片URL",
    },
    priceDes: {
      ja: "アイテムの価格",
      "zh-TW": "物品價格",
      "zh-CN": "物品价格",
    },
    balanceDes: {
      ja: "アイテムの残高",
      "zh-TW": "物品餘額",
      "zh-CN": "物品余额",
    },
    maxiumDes: {
      ja: "一人当たりの最大アイテム数",
      "zh-TW": "每人最大物品數量",
      "zh-CN": "每人最大物品数量",
    },
    statusDes: {
      ja: "アイテムの状態",
      "zh-TW": "物品狀態",
      "zh-CN": "物品状态",
    },
    resetDes: {
      ja: "シーズン終了後にユーザーのアイテム残高をリセットするかどうか",
      "zh-TW": "季度結束後是否重置用戶物品餘額",
      "zh-CN": "季度结束后是否重置用户物品余额",
    },
  },
  setBonus: {
    comDes: {
      ja: "特定のタスクにボーナスを設定する",
      "zh-TW": "設定特定任務的獎金",
      "zh-CN": "设置特定任务的奖金",
    },
    taskTypeDes: {
      ja: "タスクタイプ名",
      "zh-TW": "任務類型名稱",
      "zh-CN": "任务类型名称",
    },
    taskIdDes: {
      ja: "特定のタスクのタスクID",
      "zh-TW": "特定任務的任務ID",
      "zh-CN": "特定任务的任务ID",
    },
    amountDes: {
      ja: "ボーナス額",
      "zh-TW": "獎金數量",
      "zh-CN": "奖金数量",
    },
    startAtDes: {
      ja: "開始日（YYYY-MM-DD）JST",
      "zh-TW": "開始日期（YYYY-MM-DD）JST",
      "zh-CN": "开始日期（YYYY-MM-DD）JST",
    },
    endAtDes: {
      ja: "終了日（YYYY-MM-DD）JST",
      "zh-TW": "結束日期（YYYY-MM-DD）JST",
      "zh-CN": "结束日期（YYYY-MM-DD）JST",
    },
  },
  addMoneyRole: {
    comDes: {
      ja: "ロールにお金を追加する",
      "zh-TW": "向角色添加金錢",
      "zh-CN": "向角色添加金钱",
    },
    roleDes: {
      ja: "設定するロール",
      "zh-TW": "設定的角色",
      "zh-CN": "设置的角色",
    },
    amountDes: {
      ja: "追加する金額",
      "zh-TW": "添加的金額",
      "zh-CN": "添加的金额",
    },
  },
  removeMoneyRole: {
    comDes: {
      ja: "ロールからお金を引き落とす",
      "zh-TW": "從角色中扣款",
      "zh-CN": "从角色中扣款",
    },
    roleDes: {
      ja: "お金を引き落とすロール",
      "zh-TW": "要扣款的角色",
      "zh-CN": "要扣款的角色",
    },
    amountDes: {
      ja: "引き落とす金額",
      "zh-TW": "要扣除的金額",
      "zh-CN": "要扣除的金额",
    },
  },
  balance: {
    comDes: {
      ja: "残高を確認する",
      "zh-TW": "檢查餘額",
      "zh-CN": "检查余额",
    },
  },
  buyItem: {
    comDes: {
      ja: "ストアからアイテムを購入する",
      "zh-TW": "從商店購買物品",
      "zh-CN": "从商店购买物品",
    },
    nameDes: {
      ja: "アイテム名",
      "zh-TW": "物品名稱",
      "zh-CN": "物品名称",
    },
    amountDes: {
      ja: "購入する数量",
      "zh-TW": "購買數量",
      "zh-CN": "购买数量",
    },
  },
  itemInfo: {
    comDes: {
      ja: "あなたのアイテム情報を確認する",
      "zh-TW": "檢查你的物品資訊",
      "zh-CN": "检查你的物品信息",
    },
  },
  itemStore: {
    comDes: {
      ja: "アイテムストアを確認する",
      "zh-TW": "物品商店",
      "zh-CN": "物品商店",
    },
  },
  dailyLogin: {
    comDes: {
      ja: "毎日ログインする",
      "zh-TW": "每日登錄",
      "zh-CN": "每日登录",
    },
  },
  rob: {
    comDes: {
      ja: "他のユーザーのお金を奪う",
      "zh-TW": "搶劫其他用戶的錢",
      "zh-CN": "抢劫其他用户的钱",
    },
  },
  crime: {
    comDes: {
      ja: "犯罪を開始する",
      "zh-TW": "開始犯罪",
      "zh-CN": "开始犯罪",
    },
  },
  blackjack: {
    comDes: {
      ja: "ブラックジャックを開始する",
      "zh-TW": "開始二十一點",
      "zh-CN": "开始二十一点",
    },
    betDes: {
      ja: "賭け金",
      "zh-TW": "賭注",
      "zh-CN": "赌注",
    },
  },
  checkSetting: {
    comDes: {
      ja: "現在の設定を確認する",
      "zh-TW": "檢查當前設定",
      "zh-CN": "检查当前设置",
    },
    taskTypeDes: {
      ja: "タスクタイプ設定を確認する",
      "zh-TW": "檢查任務類型設定",
      "zh-CN": "检查任务类型设置",
    },
    loginTaskDes: {
      ja: "ログイン設定を確認する",
      "zh-TW": "檢查登錄設定",
      "zh-CN": "检查登录设置",
    },
    discordPostTaskDes: {
      ja: "Discord投稿設定を確認する",
      "zh-TW": "檢查Discord發帖設定",
      "zh-CN": "检查Discord发帖设置",
    },
    robTaskDes: {
      ja: "ロブ設定を確認する",
      "zh-TW": "檢查搶劫設定",
      "zh-CN": "检查抢劫设置",
    },
    crimeTaskDes: {
      ja: "犯罪設定を確認する",
      "zh-TW": "檢查犯罪設定",
      "zh-CN": "检查犯罪设置",
    },
    xRetweetTaskDes: {
      ja: "Xリツイート設定を確認する",
      "zh-TW": "檢查X轉推設定",
      "zh-CN": "检查X转推设置",
    },
    xLikeTaskDes: {
      ja: "Xいいね設定を確認する",
      "zh-TW": "檢查X喜歡設定",
      "zh-CN": "检查X喜欢设置",
    },
    taskTargetRoleDes: {
      ja: "タスクターゲットロール設定を確認する",
      "zh-TW": "檢查任務目標角色設定",
      "zh-CN": "检查任务目标角色设置",
    },
    bonusDes: {
      ja: "ボーナス設定を確認する",
      "zh-TW": "檢查獎金設定",
      "zh-CN": "检查奖金设置",
    },
    taskTypeOptionDes: {
      ja: "タスクタイプ",
      "zh-TW": "任務類型",
      "zh-CN": "任务类型",
    },
    itemDes: {
      ja: "アイテム設定を確認する",
      "zh-TW": "檢查所有物品",
      "zh-CN": "检查所有物品",
    },
  },
  removeMoney: {
    comDes: {
      ja: "ユーザーからお金を引き落とす",
      "zh-TW": "從用戶賬戶中扣款",
      "zh-CN": "从用户账户中扣款",
    },
    targetDes: {
      ja: "お金を引き落とすユーザー",
      "zh-TW": "要扣款的用戶",
      "zh-CN": "要扣款的用户",
    },
    valueDes: {
      ja: "ユーザーから引き落とす金額",
      "zh-TW": "從用戶賬戶中扣除的金額",
      "zh-CN": "从用户账户中扣除的金额",
    },
  },
  addMoney: {
    comDes: {
      ja: "ユーザーにお金を追加する",
      "zh-TW": "向用戶添加金錢",
      "zh-CN": "向用户添加金钱",
    },
    targetDes: {
      ja: "お金を追加するユーザー",
      "zh-TW": "要添加金錢的用戶",
      "zh-CN": "要添加金钱的用户",
    },
    valueDes: {
      ja: "追加する金額",
      "zh-TW": "添加的金額",
      "zh-CN": "添加的金额",
    },
  },
  addMoneyItem: {
    //add money to item holder
    comDes: {
      ja: "アイテムホルダーにお金を追加する",
      "zh-TW": "向物品持有者添加金錢",
      "zh-CN": "向物品持有者添加金钱",
    },
    itemDes: {
      ja: "お金を追加するアイテム",
      "zh-TW": "要添加金錢的物品",
      "zh-CN": "要添加金钱的物品",
    },
    valueDes: {
      ja: "追加する金額",
      "zh-TW": "添加的金額",
      "zh-CN": "添加的金额",
    },
  },
  connectX: {
    comDes: {
      ja: "X(twitter)を接続する",
      "zh-TW": "連接X(twitter)",
      "zh-CN": "连接X(twitter)",
    },
  },
  slot: {
    comDes: {
      ja: "スロットゲームをプレイする",
      "zh-TW": "玩老虎機遊戲",
      "zh-CN": "玩老虎机游戏",
    },
    betDes: {
      ja: "ベットの金額",
      "zh-TW": "下注金額",
      "zh-CN": "下注金额",
    },
  },
  roulette: {
    comDes: {
      ja: "ルーレットゲームをプレイする",
      "zh-TW": "玩輪盤賭遊戲",
      "zh-CN": "玩轮盘赌游戏",
    },
    spaceDes: {
      ja: "ベットするスペース",
      "zh-TW": "要下注的空間",
      "zh-CN": "要下注的空间",
    },
    betDes: {
      ja: "ベットの金額",
      "zh-TW": "下注金額",
      "zh-CN": "下注金额",
    },
  },
  setSlot: {
    comDes: {
      ja: "スロットの勝率を設定する",
      "zh-TW": "設定插槽的勝率",
      "zh-CN": "设置插槽的胜率",
    },
    winrateDes: {
      ja: "勝率（パーセンテージ）",
      "zh-TW": "勝率（百分比）",
      "zh-CN": "胜率（百分比）",
    },
  },
  checkSeason: {
    comDes: {
      ja: "現在のシーズンを確認する",
      "zh-TW": "檢查當前季度",
      "zh-CN": "检查当前季度",
    },
  },
  setStartBalance: {
    comDes: {
      ja: "次のシーズンの開始バランスを設定する",
      "zh-TW": "設定下一季度的開始餘額",
      "zh-CN": "设置下一季度的开始余额",
    },
    startBalanceDes: {
      ja: "次のシーズンの開始バランス",
      "zh-TW": "下一季度的開始餘額",
      "zh-CN": "下一季度的开始余额",
    },
  },
  startSeason: {
    comDes: {
      ja: "シーズンを開始する",
      "zh-TW": "開始季度",
      "zh-CN": "开始季度",
    },
    dateDes: {
      ja: "予約時間をYYYY-MM-DD hh:mm:ss JST形式で設定する",
      "zh-TW": "設定預約時間為YYYY-MM-DD hh:mm:ss JST格式",
      "zh-CN": "设置预约时间为YYYY-MM-DD hh:mm:ss JST格式",
    },
  },
  stopSeason: {
    comDes: {
      ja: "シーズン終了日を設定する (デフォルトは開始日から14日後)",
      "zh-TW": "設定季度結束日期（默認為開始日期後14天）",
      "zh-CN": "设置季度结束日期（默认为开始日期后14天）",
    },
    dateDes: {
      ja: "予約時間をYYYY-MM-DD hh:mm:ss JST形式で設定する",
      "zh-TW": "設定預約時間為YYYY-MM-DD hh:mm:ss JST格式",
      "zh-CN": "设置预约时间为YYYY-MM-DD hh:mm:ss JST格式",
    },
  },
  borrowMoney: {
    comDes: {
      ja: "銀行からお金を借りる",
      "zh-TW": "從銀行借錢",
      "zh-CN": "从银行借钱",
    },
    amountDes: {
      ja: "借りる金額、最大3000。",
      "zh-TW": "借款金額，最多3000。",
      "zh-CN": "借款金额，最多3000。",
    },
  },
  checkUser: {
    comDes: {
      ja: "ユーザーの残高を確認する",
      "zh-TW": "檢查用戶的餘額",
      "zh-CN": "检查用户的余额",
    },
    targetDes: {
      ja: "確認するユーザー",
      "zh-TW": "要檢查的用戶",
      "zh-CN": "要检查的用户",
    },
  },
  editBonus: {
    comDes: {
      ja: "特定のタスクにボーナスを設定する",
      "zh-TW": "設定特定任務的獎金",
      "zh-CN": "设置特定任务的奖金",
    },
    taskTypeDes: {
      ja: "タスクタイプ名",
      "zh-TW": "任務類型名稱",
      "zh-CN": "任务类型名称",
    },
    taskIdDes: {
      ja: "特定のタスクのタスクID",
      "zh-TW": "特定任務的任務ID",
      "zh-CN": "特定任务的任务ID",
    },
    amountDes: {
      ja: "ボーナス額",
      "zh-TW": "獎金數量",
      "zh-CN": "奖金数量",
    },
    startAtDes: {
      ja: "開始日（YYYY-MM-DD）JST",
      "zh-TW": "開始日期（YYYY-MM-DD）JST",
      "zh-CN": "开始日期（YYYY-MM-DD）JST",
    },
    endAtDes: {
      ja: "終了日（YYYY-MM-DD）JST",
      "zh-TW": "結束日期（YYYY-MM-DD）JST",
      "zh-CN": "结束日期（YYYY-MM-DD）JST",
    },
  },
  checkStats: {
    comDes: {
      ja: "すべてのユーザー統計を出力する",
      "zh-TW": "輸出所有用戶統計",
      "zh-CN": "输出所有用户统计",
    },
  },
  receiveCode: {
    comDes: {
      ja: "MTホルダーがシリアルコードを受け取るためのもの",
      "zh-TW": "供MT持有者接收序列碼",
      "zh-CN": "供MT持有者接收序列码",
    },
  },
  createItem: {
    comDes: {
      ja: "アイテムを作成する",
      "zh-TW": "創建物品",
      "zh-CN": "创建物品",
    },
    nameDes: {
      ja: "アイテム名",
      "zh-TW": "物品名稱",
      "zh-CN": "物品名称",
    },
    desDes: {
      ja: "アイテムの説明",
      "zh-TW": "物品描述",
      "zh-CN": "物品描述",
    },
    imageDes: {
      ja: "アイテムの画像URL",
      "zh-TW": "物品圖片網址",
      "zh-CN": "物品图片网址",
    },
    priceDes: {
      ja: "アイテムの価格",
      "zh-TW": "物品價格",
      "zh-CN": "物品价格",
    },
    balanceDes: {
      ja: "アイテムの残高",
      "zh-TW": "物品餘額",
      "zh-CN": "物品余额",
    },
    maxiumDes: {
      ja: "一人当たりのアイテムの最大数",
      "zh-TW": "每人物品最大數量",
      "zh-CN": "每人物品最大数量",
    },
    statusDes: {
      ja: "アイテムの状態",
      "zh-TW": "物品狀態",
      "zh-CN": "物品状态",
    },
    resetDes: {
      ja: "シーズン終了後にユーザーのアイテム残高をリセットするかどうか",
      "zh-TW": "季度結束後是否重置用戶物品餘額",
      "zh-CN": "季度结束后是否重置用户物品余额",
    },
  },
};
