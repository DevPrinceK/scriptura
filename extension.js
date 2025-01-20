const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "scriptura" is now active!');

	const disposable = vscode.commands.registerCommand('scriptura.scriptura', function () {
		
		vscode.window.showInformationMessage('Hello World from scriptura!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
