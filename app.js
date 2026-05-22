import parser from "./parser.js";
import analyzer from "./analyzer.js";




const filepath = process.argv[2];
if (!filepath) {
    console.error("Please provide a log file path as an argument.");
    process.exit();
}
else{
    console.log(`file path is present: ${filepath}`);


async function main() {
    try {
        const parsinglogs = await parser(filepath);
        await analyzer(parsinglogs);
    }
     catch (error) {
        console.error("Error processing log file:", error);
    }
}

main();

}