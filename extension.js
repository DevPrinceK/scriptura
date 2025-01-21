const vscode = require('vscode');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Log to the console when the extension is activated

	console.log('Congratulations, your extension "scriptura" is now active!');

	// Register a command for the extension
	const disposable = vscode.commands.registerCommand('scriptura.scriptura', function () {
		// Display a message box to the user
		vscode.window.showInformationMessage('scriptura activated successfully!');
	});

	// Add the command to the subscriptions
	context.subscriptions.push(disposable);

	// get the bible data
	let scriptures = readBibleContentFromXL();

	// Start the scripture display function
	generateScriptureEvery30Mins(scriptures);
}

function readBibleContentFromXL(){
	// Load the workbook
	const filePath = path.join(__dirname, 'kjv.xlsx');
	const workbook = XLSX.readFile(filePath);
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];

	// Convert the sheet data to JSON format
	const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

	// Create an array to hold the results
	const results = [];

	// Loop through the rows starting from row 3 (index 2)
	for (let i = 2; i < jsonData.length; i++) {
		const row = jsonData[i];
		
		// Check if the row has at least two columns (A and B)
		if (row.length >= 2) {
			// Create an object with the desired columns
			const obj = {
				verse: row[0], 
				content: row[1],
			};
			results.push(obj);
		}
	}
	return results;
}

function generateScriptureEvery30Mins(scriptures) {

	// Function to display a random scripture
	function displayRandomScripture() {
		// Pick a random scripture
		const randomIndex = Math.floor(Math.random() * scriptures.length);
		const scripture = scriptures[randomIndex];

		// Format the scripture message
		const message = `${scripture.verse} - "${scripture.content}"`;

		// Display the scripture as an information message in VS Code
		vscode.window.showInformationMessage(message);
	}

	// Display the first scripture immediately
	displayRandomScripture();

	// Set an interval to display a scripture every 5 minute 300_000 milliseconds)
	setInterval(displayRandomScripture, 5 * 60 * 1000); 
}


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};
