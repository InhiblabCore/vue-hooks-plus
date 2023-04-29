// feat：新增功能 | New features
// fix： Bug 修复 | Fix Bug
// docs：文档更新 | Document update
// style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑) | Code modification that does not affect the program logic (modify the blank characters, format indent, complete the missing semicolons, etc., without changing the code logic)
// refactor：重构代码(既没有新增功能，也没有修复 bug) | Refactoring code (neither new feature nor bug fix)
// perf：性能, 体验优化 | Performance, experience optimization
// test：新增测试用例或是更新现有测试 | Add the new test cases or update the existing tests
// build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交 | The main purpose is to modify the submission of the project building system (such as glup, webpack, rollup configuration, etc.)
// workflow：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交 | The main purpose is to modify the submission of project continued integration processes (e. g. Travis, Jenkins, GitLab CI, Circle, etc.)
// chore：不属于以上类型的其他类，比如构建流程, 依赖管理 | Other classes that do not belong to the above types, such as building processes, dependency management
// revert：回滚某个更早之前的提交 | Roll back some earlier previous submission
// version: 改变package.json 版本 | Change the package.json version

module.exports = {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'type',
        'chore',
        'revert',
        'workflow',
        'release',
        'version',
      ],
    ],
  },
}
