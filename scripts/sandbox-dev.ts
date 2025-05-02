#!/usr/bin/env node

console.log('Starting sandbox dev server...');
import { spawn } from 'node:child_process';
import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('Root directory:', rootDir);
// Function to build components
async function buildComponents() {
  console.log('🔨 Building components...');

  return new Promise<void>((resolve, reject) => {
    const build = spawn('pnpm', ['--filter', '@imho-ui/components', 'build'], {
      stdio: 'inherit',
      cwd: rootDir,
    });

    build.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Components built successfully');
        resolve();
      } else {
        console.error(`❌ Component build failed with code ${code}`);
        reject(); // Still resolve to continue watching
      }
    });
  });
}

// Function to run sandbox dev server
function runSandbox() {
  console.log('🚀 Starting sandbox dev server...');

  const sandbox = spawn('pnpm', ['--filter', 'sandbox', 'dev'], {
    stdio: 'inherit',
    cwd: rootDir,
  });

  sandbox.on('close', (code) => {
    console.log(`Sandbox server exited with code ${code}`);
    process.exit(code);
  });

  return sandbox;
}

// Initial component build
await buildComponents();

// Start watching for changes
const watcher = chokidar.watch('packages/components/src', {
  ignored: ['**/node_modules/**', '**/package.json'],
  persistent: true,
  cwd: rootDir,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100,
  },
});

watcher.on('ready', () => {
  console.log('👀 Watching for component changes...');
  console.log('Watched paths:', Object.keys(watcher.getWatched()));

  // Start sandbox after initial watch is ready
  const sandboxProcess = runSandbox();

  // Listen for process termination to clean up
  process.on('SIGINT', () => {
    console.log('Shutting down...');
    watcher.close();
    if (sandboxProcess) {
      sandboxProcess.kill();
    }
    process.exit(0);
  });
});

watcher.on('change', async (path) => {
  console.log(`📝 Change detected in ${path}`);
  buildComponents();
});
