export default async function analyzer(data){
    const { logs, malformedLines, totalLines } = data;

     const endpointCount = {};
  const errorCount = {};
  const responseTimes = {};

  for (const log of logs) {
    const key = `${log.method} ${log.path}`;

    // Endpoint count
    endpointCount[key] = (endpointCount[key] || 0) + 1;

    // Error count
    if (Number(log.status) >= 400) {
      errorCount[key] = (errorCount[key] || 0) + 1;
    }
     // Response time tracking
    if (!responseTimes[key]) {
      responseTimes[key] = [];
    }

    responseTimes[key].push(log.responseTime);
  }

  console.log("\nLOG ANALYSIS REPORT:\n");

  console.log(`Total Lines: ${totalLines}`);
  console.log(`Valid Logs: ${logs.length}`);
  console.log(`Malformed Lines: ${malformedLines}`);

  console.log("\nEndpoints:\n");

  Object.entries(endpointCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([endpoint, count]) => {
      console.log(`${endpoint} : ${count}`);
    });

  console.log("\nEndpoints having Errors:\n");
   Object.entries(errorCount).forEach(([endpoint, count]) => {
    console.log(`${endpoint} : ${count}`);
  });

  console.log("\nSlowest Endpoints:\n");

  const averages = [];

  for (const key in responseTimes) {
    const times = responseTimes[key];

    const avg =
      times.reduce((sum, time) => sum + time, 0) / times.length;

    averages.push({
      endpoint: key,
      avg,
    });
  }

  averages
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5)
    .forEach((item) => {
      console.log(`${item.endpoint} : ${item.avg.toFixed(2)}ms`);
    });

}