var Task = /** @class */ (function () {
    function Task() {
        this.up = function (store) {
            store.createTable("taskType", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.column("type").varchar(255); //login, discordPost, xRetweet, xLike, rob, crime etc
                table.column("repetitive").int().unsigned(); //0 or 1
                table.column("reward").int().unsigned();
                table.createdAt();
            });
            store.createTable("loginTask", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "loginTask",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("duration").varchar(255); // 1Day
                table.column("startAt").varchar(255);
                table.column("endAt").varchar(255);
                table.column("channelId").varchar(255);
            });
            store.createTable("discordPostTask", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "discordPostTask",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("includedString").varchar(255);
                table.column("channelId").varchar(255);
            });
            store.createTable("xRetweetTask", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "xRetweetTask",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("tweetId").varchar(255);
                table.column("deadline").varchar(255);
            });
            store.createTable("xLikeTask", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "xLikeTask",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("tweetId").varchar(255);
                table.column("deadline").varchar(255);
            });
            store.createTable("robTask", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "robTask",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("duration").varchar(255);
                table.column("penalty").int().unsigned();
                table.column("winRate").int().unsigned();
            });
            store.createTable("crimeTask", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "crimeTask",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("duration").varchar(255);
                table.column("penalty").int().unsigned();
                table.column("winRate").int().unsigned();
            });
            store.createTable("completedTaskUser", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "completedTaskUser",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("completedTaskId").int().unsigned();
                table.references({
                    parentTable: "user",
                    parentColumn: "id",
                    parentFieldName: "completedTaskUser",
                    columnName: "userId",
                    relation: "Many",
                });
                table.column("completedAt").varchar(255);
            });
            store.createTable("taskTargetRole", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "taskTargetRole",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("role").varchar(255);
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on task");
        };
    }
    return Task;
}());
export default Task;