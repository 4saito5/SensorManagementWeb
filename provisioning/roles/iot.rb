### IoTサーバーの構築

# 基本的な設定やパッケージのインストール
include_recipe "../cookbooks/base/recipe.rb"

# MariaDBのインストール
include_recipe "../cookbooks/mariadb/recipe.rb"

# golangのインストール
include_recipe "../cookbooks/golang/recipe.rb"

# golangのインストール
include_recipe "../cookbooks/nginx/recipe.rb"

