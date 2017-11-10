Sensor management Web
====

Connect various sensors to the Internet and visualize the data.

## Description

Graphs the values measured by sensors such as temperature and humidity.

## Install
```bash
yarn install
```

Only client build & run
```bash
yarn run client
```

Only server build & run
```bash
yarn run server
```

### Installing the golang library
```bash
go get -u github.com/labstack/echo
go get -u github.com/go-sql-driver/mysql
go get -u github.com/gocraft/dbr
go get -u github.com/dgrijalva/jwt-go
go get -u golang.org/x/crypto/acme/autocert
```

Client + Server build & run
```bash
yarn run start
```
http://localhost:4444/

Create table
```bash
yarn run db-create
```

DB migration
```bash
yarn run db-up
yarn run db-down
```

## Directory structure
```
SensorManagementWeb
├─client
│  ├─assets
│  ├─component
│  ├─containers
│  └─modules
├─db
└─server
    ├─REST API
    ├─...
    └─...
```

## license
Copyright (c) 2017 Densan Service Corporation  
Released under the MIT license  
http://opensource.org/licenses/mit-license.php
