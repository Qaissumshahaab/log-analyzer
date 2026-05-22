import fs from 'fs';
import readline from 'readline';

export default async function parser(filePath) {

   const stream= fs.createReadStream(filePath);

   const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
   });
   
    const logs = [];
    let malformedLines = 0;
    let totalLines = 0;

     const regex =
    /(.+?)\s+(\S+)\s+(GET|POST|PUT|DELETE)\s+(\S+)\s+(\d+|-)\s+(\S+)/;

  for await (const line of rl) {
    totalLines++;
     
    if (!line.trim()) {
      malformedLines++;
      continue;
    }
     // JSON logs
    if (line.startsWith("{")) {
      try {
        const jsonLog = JSON.parse(line);

        logs.push({
          method: jsonLog.method || "method is unknown",
          path: jsonLog.path || "path is unknown",
          status: jsonLog.status || "status is unknown",
          responseTime: parseResponseTime(jsonLog.responseTime),
        });
       continue;
      } 
      catch {
        malformedLines++;
        continue;
      }
    }
       const match = line.match(regex);

    if (!match) {
      malformedLines++;
      continue;
    }

    const [, timestamp, ip, method, path, status, responseTime] = match;

    logs.push({
      timestamp,
      ip,
      method,
      path,
      status,
      responseTime: parseResponseTime(responseTime),
    });
  }
  return {
    totalLines,
    malformedLines,
    logs,
  };
}

function parseResponseTime(value) {
  if (!value) return 0;

  if (value.endsWith("ms")) {
    return parseFloat(value.replace("ms", ""));
  }

  if (value.endsWith("s")) {
    return parseFloat(value.replace("s", "")) * 1000;
  }
   return parseFloat(value);
}

