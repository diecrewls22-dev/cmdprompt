const { Terminal } = xterm;
const { FitAddon } = xtermAddonFit;

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

term.open(document.getElementById('terminal'));
fitAddon.fit();

// Custom commands
const commands = {
    help: () => 'Available: help, about, projects, contact, clear',
    about: () => 'I am a web developer passionate about creating interactive experiences.',
    projects: () => 'Project 1, Project 2, Project 3',
    contact: () => 'email@example.com',
    clear: () => true
};

term.writeln('Welcome to Browser Terminal');
term.writeln('Type "help" to see available commands\r\n');

let currentLine = '';

term.onKey(({ key, domEvent }) => {
    if (domEvent.keyCode === 13) { // Enter
        term.writeln('');
        handleCommand(currentLine);
        currentLine = '';
    } else if (domEvent.keyCode === 8) { // Backspace
        if (currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            term.write('\b \b');
        }
    } else {
        currentLine += key;
        term.write(key);
    }
});

function handleCommand(input) {
    const [cmd, ...args] = input.trim().split(' ');
    
    if (commands[cmd]) {
        const result = commands[cmd](args);
        if (result !== true) { // clear returns true, so we don't print it
            term.writeln(result);
        }
    } else if (cmd) {
        term.writeln(`Command not found: ${cmd}`);
    }
    
    term.write('$ ');
}
