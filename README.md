const { spawn } = require("child_process");
const http = require("http");
const path = require("path");

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";
const FRONTEND_URL = "http://localhost:5173";

const children = [];
let shuttingDown = false;

const run = (name, cwd, args) => {
const child = spawn(npmCmd, args, {
cwd,
shell: false,
stdio: "pipe",
});

child.stdout.on("data", (chunk) => process.stdout.write(`[${name}] ${chunk}`));
child.stderr.on("data", (chunk) => process.stderr.write(`[${name}] ${chunk}`));

child.on("exit", (code) => {
if (!shuttingDown && code !== 0) {
console.error(`[${name}] exited with code ${code}`);
shutdown(code || 1);
}
});

children.push(child);
return child;
};

const shutdown = (code = 0) => {
if (shuttingDown) return;
shuttingDown = true;

for (const child of children) {
if (!child.killed) {
child.kill();
}
}

setTimeout(() => process.exit(code), 200);
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

const backendDir = path.join(process.cwd(), "backend");
const frontendDir = path.join(process.cwd(), "frontend");

run("backend", backendDir, ["run", "dev"]);
run("frontend", frontendDir, ["run", "dev"]);

const openBrowser = () => {
let opener;

if (process.platform === "win32") {
opener = spawn("cmd", ["/c", "start", "", FRONTEND_URL], { stdio: "ignore", detached: true });
} else if (process.platform === "darwin") {
opener = spawn("open", [FRONTEND_URL], { stdio: "ignore", detached: true });
} else {
opener = spawn("xdg-open", [FRONTEND_URL], { stdio: "ignore", detached: true });
}

opener.on("error", () => {
console.warn(`[browser] Could not auto-open browser. Visit ${FRONTEND_URL}`);
});

opener.unref();
};

const waitForFrontend = () => {
const req = http.get(FRONTEND_URL, () => {
req.destroy();
openBrowser();
});

req.on("error", () => {
setTimeout(waitForFrontend, 500);
});
};

waitForFrontend();
