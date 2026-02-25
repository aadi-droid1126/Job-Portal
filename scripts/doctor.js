const fs = require("fs");
const path = require("path");

const EXPECTED_DEV_SCRIPT = "node scripts/dev-runner.js";

const root = process.cwd();
const pkgPath = path.join(root, "package.json");

const fail = (message, code = 1) => {
  console.error(`[doctor] ${message}`);
  process.exit(code);
};

if (!fs.existsSync(pkgPath)) {
  fail("package.json not found in current directory.");
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const devScript = pkg.scripts?.dev || "<missing>";

const checks = {
  backendDir: fs.existsSync(path.join(root, "backend")),
  frontendDir: fs.existsSync(path.join(root, "frontend")),
  devRunner: fs.existsSync(path.join(root, "scripts", "dev-runner.js")),
  doctorScript: fs.existsSync(path.join(root, "scripts", "doctor.js")),
};

console.log(`[doctor] cwd: ${root}`);
console.log(`[doctor] root package: ${pkg.name || "unknown"}`);
console.log(`[doctor] dev script: ${devScript}`);
console.log(`[doctor] backend exists: ${checks.backendDir}`);
console.log(`[doctor] frontend exists: ${checks.frontendDir}`);
console.log(`[doctor] dev-runner exists: ${checks.devRunner}`);
console.log(`[doctor] doctor script exists: ${checks.doctorScript}`);

if (!checks.backendDir || !checks.frontendDir) {
  fail(
    "backend/ or frontend/ directory is missing. Run this inside the project root.",
    2,
  );
}

if (!checks.devRunner) {
  fail(
    "scripts/dev-runner.js is missing. Pull latest changes or restore the file.",
    3,
  );
}

if (devScript !== EXPECTED_DEV_SCRIPT) {
  const looksOldConcurrently =
    devScript.includes("concurrently") ||
    devScript.includes("wait-on") ||
    devScript.includes(" open ");

  if (looksOldConcurrently) {
    fail(
      `Outdated dev script detected (concurrently/open variant). Set scripts.dev to "${EXPECTED_DEV_SCRIPT}" or pull latest changes.`,
      4,
    );
  }

  fail(
    `Unexpected dev script. Expected \"${EXPECTED_DEV_SCRIPT}\" but got \"${devScript}\".`,
    5,
  );
}

console.log("[doctor] Setup looks correct. You can run: npm run dev");
