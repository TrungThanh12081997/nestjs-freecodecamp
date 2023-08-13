## Pynx Microservices

## Pre requisites

```
Node >14.15
Yarn 1.17+
```

## Installation

```bash
$ yarn
```

## Setting up environment variables

```
Go to each app folder
Copy .env.example to .env
Setup variables on .env file
```

## Running database and seeding data

```bash
$ docker-compose up -d mongo mongo-express
$ yarn db:restore

You can check web dashboard (mongo-express) on http://localhost:8081
```

## Running the app

```bash
# development
$ yarn run start:{service-name}:dev

# production mode
$ yarn run start:{service-name}:prod
```

## End to End Tests

```bash
$ yarn test:e2e
```

## Running all microservices in local environment (docker)

```bash
$ docker-compose up -d
```

## New services [(nestjs docs reference)](https://docs.nestjs.com/cli/monorepo#monorepo-mode)

#### Generating the new service

On your terminal at project root, run the following command to create a new service

```
$ nest generate app {service_name}
```

#### Running the new service

On package.json at "scripts" add the following lines

```
"build:{service_name}": "nest build {service_name}",
"start:{service_name}": "cross-env SERVICE_NAME={service_name} nest start {service_name}",
"start:{service_name}:dev": "yarn run start:{service_name} --watch",
"start:{service_name}:prod": "node dist/apps/{service_name}/main",
```

Change default module file to app.module.ts and module name to AppModule
Add BaseModule to app.module.ts **imports**

On service main.ts add these lines
title = Service name on swagger
ws-path = path on loadbalancer (examples: /ws-alpha, /ws-beta) (do not forget the slash '/' at start)

```
bootstrap(AppModule, { title: 'Alpha API', server: '/ws-alpha' }, { queue: 'alpha' });
```

Create the .env file on service root (close to src folder, test folder and tsconfig.app.json file)

```
# APP CONFIG

APP_PORT = 3000

# DATABASE CONFIG

DATABASE_URL = mongodb://mongo:mongo@localhost:27017/admin

```

Run in dev mode (hot reload)

```
$ yarn run start:{service_name}:dev
```

# Development lifecycle

```mermaid
graph LR
subgraph design [Design]
  documentation[Documentation<br> Controller & DTOs]
  docu(docu)
end
subgraph Development
  dev[Development]
  e2e[Jest Test]
  feat1(feature/NES-XXX-ZZZZZZ)
  bugfix1(bugfix/NES-XXX-ZZZZZZ)
  hotfix1(hotfix/NES-XXX-ZZZZZZ)
end
subgraph Regression
  Meteor
  Cypress
  feat2(feature/NES-XXX-ZZZZZZ)
  bugfix2(bugfix/NES-XXX-ZZZZZZ)
  hotfix2(hotfix/NES-XXX-ZZZZZZ)
end
subgraph Done
  Sandpit
  Production
  develop(develop)
  master(master)
end

documentation --> e2e
documentation --> dev
dev --> Meteor
e2e --> Meteor
Meteor --> Cypress
Cypress --> Sandpit
Sandpit --> Production

docu -.-> feat1
docu -.-> bugfix1
docu -.-> hotfix1
feat1 -.-> feat2
bugfix1 -.-> bugfix2
hotfix1 -.-> hotfix2
feat2 -.-> develop
bugfix2 -.-> develop
hotfix2 -.-> develop
develop -.-> master

style documentation fill:#85bbf0,stroke:#5d82a8,color:#000000
style Production fill:#85bbf0,stroke:#5d82a8,color:#000000
style Sandpit fill:#85bbf0,stroke:#5d82a8,color:#000000

style e2e fill:#85bbf0,color:red
style Cypress fill:#85bbf0,color:red

```

## Developer Environment

Start mongo

```
$ docker-compose up -d mongo mongo-express
```

Start Alpha on Tab 1

```
$ yarn run start:alpha:dev
```

Start Beta on Tab 2

```
$ yarn run start:beta:dev
```

Start Meteor on Tab 3

```
$ cd app-meteor
$ bash run.sh
```

## Local Docker

| Container       |                                              |
| :-------------- | :------------------------------------------: |
| Meteor          |                localhost:3000                |
| Alpha           |                                              |
| Beta            |                                              |
| Database        | mongodb://mongo:mongo@localhost:27017/meteor |
| Queue           |            http://localhost:15672            |
| Storage         |                                              |
| Mailer          |                     N/A                      |
| Payment Gateway |                                              |
| CRM             |                                              |
| Google Maps     |                                              |
| Monitoring      |                                              |

## Cypress

Start mongo

```
$ docker-compose up -d mongo mongo-express
```

Start Alpha on Tab 1

```
$ yarn run start:alpha:dev
```

Start Beta on Tab 2

```
$ yarn run start:beta:dev
```

Start Meteor on Tab 3

```
$ cd app-meteor
$ npm run start:test
```

Start Meteor on Tab 4

```
$ cd app-meteor
$ npm run cypress:report
```

| Container       |     |
| :-------------- | :-: |
| Meteor          |     |
| Alpha           |     |
| Beta            |     |
| Database        |     |
| Queue           |     |
| Storage         |     |
| Mailer          | N/A |
| Payment Gateway |     |
| CRM             |     |
| Google Maps     |     |
| Monitoring      |     |

## Sandpit

| Container       |                                                                                                                                                                                                                            |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Meteor          |                                                                                                                                                                                                                            |
| Alpha           |                                                                                      https://api.sandpit.comm.care/ws-alpha/documents                                                                                      |
| Beta            |                                                                                      https://api.sandpit.comm.care/ws-beta/documents                                                                                       |
| Database URI    | mongodb://sandpit:queseyo@sandpit-shard-00-00-shjyc.mongodb.net:27017,sandpit-shard-00-01-shjyc.mongodb.net:27017,sandpit-shard-00-02-shjyc.mongodb.net:27017/sandpit?authSource=admin&replicaSet=Sandpit-shard-0&ssl=true |
| Queue           |                                                                                                                                                                                                                            |
| Storage         |                                                                                                                                                                                                                            |
| Mailer          |                                                                                                            N/A                                                                                                             |
| Payment Gateway |                                                                                                                                                                                                                            |
| CRM             |                                                                                                                                                                                                                            |
| Google Maps     |                                                                                                                                                                                                                            |
| Monitoring      |                                                                                                                                                                                                                            |

## Prod

| Container       |     |
| :-------------- | :-: |
| Meteor          |     |
| Alpha           |     |
| Beta            |     |
| Database        |     |
| Queue           |     |
| Storage         |     |
| Mailer          | N/A |
| Payment Gateway |     |
| CRM             |     |
| Google Maps     |     |
| Monitoring      |     |
