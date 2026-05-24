### commit specifications 📐

- feat：New features
- fix： Fix Bug
- docs：Document update
- style：Code modification that does not affect the program logic (modify the blank characters, format indent, complete the missing semicolons, etc., without changing the code logic)
- refactor：Refactoring code (neither new feature nor bug fix)
- perf：Performance, experience optimization
- test：Add the new test cases or update the existing tests
- build：The main purpose is to modify the submission of the project building system (such as glup, webpack, rollup configuration, etc.)
- ci：The main purpose is to modify the submission of project continued integration processes (e. g. Travis, Jenkins, GitLab CI, Circle, etc.)
- chore：Other classes that do not belong to the above types, such as building processes, dependency management
- revert：Roll back some earlier previous submission
- version: Change the package.json version

### 🤝 You should, according on the type of change, choose... English: and a space character 👇

```bash

feat: your commit

```

### 📌 Possible Problems

If running 'pnpm docs:dev' prompts an error, try the following:

- Check 'node' version: development builds require Node.js 22.18.0 or newer
- build and run: 'pnpm build and run' pnpm docs:dev '

```bash
# build project
pnpm build

# run docs
pnpm docs:dev
```
