# Log Analyzer CLI

A simple CLI-based log ingestion and analysis tool built with Node.js.  
The tool processes mixed-format server logs, handles malformed entries safely, and generates useful analytics such as endpoint usage, error summaries, and response-time reports.

## Requirements

 Node.js v18+

## Installation

git clone https://github.com/Qaissumshahaab/log-analyzer.git

cd log_analyzer

npm install

## RUN APP -- IN TERMINAL

node app.js your-log-file 

## TEST on my generated log file

RUN: node app.js logs/sample.log

## example OUTPUT

 LOG ANALYSIS REPORT:

- Total Lines: 1000
- Valid Logs: 945
- Malformed Lines: 55

- Top Endpoints:
- GET /api/users: 210

## Project Structure

- app.js             -> entry point
- parser.js          -> parses logs
- analyzer.js        -> analytics
- scripts/           -> test log generator
- logs/              -> sample log