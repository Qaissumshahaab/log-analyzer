## How to Run on Fresh Machine

clone from github and Install dependencies:

git clone https://github.com/Qaissumshahaab/log-analyzer.git

cd log_analyzer

npm install

Run the analyzer:

node app.js your-log-file


## Stack Choice

I chose Node.js because it is well suited for file streaming and CLI tools. 
The built-in fs and readline modules make it easy to process large log files efficiently line-by-line without loading the entire file into memory.

A worse choice would have been a frontend-heavy stack because this assessment focuses primarily on backend parsing, resilience, and data processing rather than UI complexity.


## One Real Edge Case

The parser safely handles malformed log lines that do not match the expected format.

File:
parser.js

Relevant section:
if (!match) {
  malformedCount++;
  continue;
}

Without this handling, the application could crash or attempt to process undefined values when encountering corrupted or incomplete log entries.


## AI Usage

I used ChatGPT to:
- understand the assessment requirements
- improve regex parsing logic
- review project structure ideas

Example:
1 - ChatGPT suggested an initial regex for parsing logs. 
I modified it to better handle missing status codes and inconsistent spacing because the original version failed on some malformed entries.



##  Gap

The current parser supports several common log variations, but timestamp  could be improved further to support additional uncommon formats more reliably.

With another day or two, I can :
- add more comprehensive automated tests
- improve timestamp parsing
- add configurable parsing rules
- can extract more details
- can configure simple frontend too
- can also store result in database 
