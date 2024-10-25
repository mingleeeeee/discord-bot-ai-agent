// /* eslint-disable prefer-const */
// import { BalanceDBDataSource } from "../src/sasat/dataSources/db/Balance";
// import { DebtDBDataSource } from "../src/sasat/dataSources/db/Debt";

// console.log("Ready!");
// const MINUTES = 1;
// let commandCount = 0;
// let responseTimes: number[] = [];
// let interval = setInterval(() => {
//   let promises = [];
//   for (let i = 0; i < 100; i++) {
//     let startTime = Date.now();
//     let promise = checkBalanceTest("693475597862567986").then(() => {
//       let endTime = Date.now();
//       let responseTime = endTime - startTime;
//       responseTimes.push(responseTime);
//     });
//     promises.push(promise);
//   }
//   Promise.all(promises)
//     .then(() => {
//       commandCount += 100;
//       if (commandCount >= 100 * 60 * MINUTES) {
//         clearInterval(interval);
//         let totalResponseTime = responseTimes.reduce((a, b) => a + b, 0);
//         let averageResponseTime = totalResponseTime / responseTimes.length;
//         console.log(`Average response time: ${averageResponseTime} ms`);
//       }
//     })
//     .catch(console.error);
// }, 1000);

// async function checkBalanceTest(id: string) {
//   try {
//     const userId = id;
//     const getBalanceById = await new BalanceDBDataSource().findById(
//       userId,
//       { fields: ["id", "balance"] },
//       { lock: "FOR UPDATE" }
//     );
//     const getDebtById = await new DebtDBDataSource().findById(
//       userId,
//       { fields: ["id", "balance"] },
//       { lock: "FOR UPDATE" }
//     );

//     // if there is no user's balance
//     if (!getBalanceById) {
//       console.error("No balance found");
//       return;
//     }

//     // if there is no user's debt
//     if (!getDebtById) {
//       console.error("No debt found");
//       return;
//     }

//     console.log("Balance: ", getBalanceById.balance);
//     return;
//   } catch (error) {
//     console.error(error);

//     return;
//   }
// }
