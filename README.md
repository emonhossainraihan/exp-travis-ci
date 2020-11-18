## Available commands:

## `node index`

- Solve recaptcha on puppeteer by using 2captcha API Key

## `npm run test`

- Loads a page with captcha
- Fills the form
- Gets final result page

## Add Travis CI

This whole process of automatically testing and integrating code is called continuous integration.

This whole process of creating build artifacts and deploying them to the production environment is called continuous deployment or CD.

<Details>
<Summary>docker.yml</Summary>

```yml
language: node_js
node_js:
- '14'
dist: trusty
env:
  matrix:
  - TEST="test"
  global:
    secure: cJc3kcfEg0Fw//ekRyj6wm659Gzmh11dI0cJszNOQ929bhwd2XQiDtxgp9lvkAiTRhiuw7xAzP/N2R65DRKDDBTFolbxeRkzvPTaBM02WlNlSsXE+bFVaQPZT//Y5v2F5fAOPasCh3mtBbHb5zpnuMSH3QaqxsK3lcoHRN8Z2qG4eHLWisd7OELAJShgqG818MtTwYZvkdGZezyRbYLPDFJ3WgyX7dgKXlsC0szBrRfshz/zFKL8/xVN1kvvz0Euw16TVookZ+tnyg1PUBShFOTZczMQbs5mHLKTr4ImD7APG9uxBzTUA0238X87LoMuooFznPek6YN3umVQTBpGQql5uApZSRoVsFYR7aXlnGLMdGZQuz+W7B7oEmIBDrhqc8AGS6RZqyWXM2DJqmPNMqi+cIS3420t4fzsWzxRejugqDsRdwehAt1UY4oTo811cRFtRCDRr+eilavYYHJCXKPTb3vqD0hMjZkSI52VRLZ5Tkl5hgcPfyymLhK82DZDO1BJaxVVFEz8gP61OubabRuJn6qHC+umAvUg1UDv3dvJxmvXHwAwqTO43UtWOWm0+AS9UwrAaLMGwKE0AGpNWCVdBSSDQ5+9jkCWN43ly3uYx76kplRd5qVzX3iq3q5yG+hczrI07l5lQ43jN4ZYcjWCwsiMVQgF3iqmBx4Ho2k=
cache:
  directories:
  - node_modules
install:
- npm install
script:
- npm run test

```

</Details>

## GitHub Workflow 

A workflow is a collection of jobs that can perform tasks of continuous integration or continuous deployment.

GitHub uses the term GitHub Actions to signify running workflow processes and these processes are displayed under the Actions tab. 

<Details>
<Summary>docker.yml</Summary>

```yml
name: Docker Image

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: docker-compose build
      - name: Run
        run: docker-compose up
        env:
          CAPTCHA_API: ${{ secrets.CAPTCHA_API }}
```

</Details>

## Add CircleCI  

<Details>
<Summary>config.yml</Summary>

```yml
version: 2
jobs:
  build:
    docker:
      - image: circleci/node:14-browsers

    working_directory: ~/repo

    steps:
      - checkout

      # Download and cache dependencies
      - restore_cache:
          keys:
          - v1-dependencies-{{ checksum "package.json" }}
          # fallback to using the latest cache if no exact match is found
          - v1-dependencies-

      - run: yarn install

      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}

      - run: yarn run test
```

</Details>