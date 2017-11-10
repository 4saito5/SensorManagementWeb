センサー管理Web
====

様々なセンサーをインターネットに繋いで、データを見える化します。

## 説明

温度や湿度などのセンサーで計測した値をグラフ表示します。

## インストール
```bash
yarn install
```

クライアントのみビルド＆実行
```bash
yarn run client
```

サーバーのみビルド＆実行
```bash
yarn run server
```

### golangライブラリのインストール
```bash
go get -u github.com/labstack/echo
go get -u github.com/go-sql-driver/mysql
go get -u github.com/gocraft/dbr
```

クライアント+サーバービルド＆実行
```bash
yarn run start
```
http://localhost:4444/

テーブル作成
```bash
yarn run db-create
```

DBマイグレーション
```bash
yarn run db-up
yarn run db-down
```

## ディレクトリ構成
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

## ライセンス
Copyright (c) 2017 Densan Service Corporation  
Released under the MIT license  
http://opensource.org/licenses/mit-license.php
