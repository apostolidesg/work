# ssbt-kino pipeline

The ssbt-kino pipeline builds Kino application for SSBTs and runs the e2e tests suite.

## Trigger Rules

The pipeline is triggered under the following conditions:

- When a commit is pushed to a branch
- When a merge request is created
- Manual trigger from GitLab UI
- Scheduled trigger

> Test stage runs only if there are changes in the develop branch

## Stages

### build_vue_app

This stage is responsible for building the vue application. It produces the output under electron-app/dist/.
Files under electron-app/dist/ are being passed to the next stage as artifacts.

### package_electron

This stage is responsible for packaging ssbt-kino application.

Prerequisites:
- python 2.7
- Microsoft Build Tools


Artifacts:
- KINO App
- Istanbul Code Coverage Report for Vue Application

>All artifacts remain available for 1 day

### test

This stage is responsible for running e2e tests under electron-app/test/e2e/. \
The test job runs only for commits in develop pipeline.
> Currently this job runs successfully only in dev-testing-02 VM(ssbt_gitlab_agent)

Prerequisites:
- .kinoconfig placed under C:\KinoSSBT\.kinoconfig\
- HAL launched from deveng user
- gitlab-runner launched from deveng user

Manual prerequisite steps:
1. Launch HAL from deveng user. Hal Start.exe is placed under C:\\HAL\
2. Run gitlab-runner from deveng \
    From powershell as Administrator:

    ```bash
    cd C:\GitLab-Runner
    net stop gitlab-runner
    .\gitlab-runner.exe run
    ```
### test_report

This stage is responsible for exporting the test results of the previous stage.

Artifacts:
- junit.xml: GitLab uses this file to visualise the test results
- mochawesome.html: Results in html format
