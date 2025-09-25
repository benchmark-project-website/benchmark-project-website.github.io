# Evaluation

This section explains the evaluation harness, metrics, and configuration.

## Metrics
- **Pass@1** — whether the generated app passes all task checks on the first try.
- **Build success** — Gradle build without errors.
- **Runtime checks** — instrumentation tests & UI smoke tests.
- **Time** — average generation + build time per task.

## Task pipeline
1. Parse task
2. Model generate (code + resources)
3. Gradle build
4. Install on emulator
5. Run tests/checkers
6. Record logs and scores

## Reproducibility
- Pin model version, dataset commit, Docker image, and seed.
- Save CLI command to `command.txt`, env info to `env.txt`, and raw outputs (`results.json`, logs/).
