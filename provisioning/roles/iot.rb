### IoTサーバーの構築

# 基本的な設定やパッケージのインストール
include_recipe "../cookbooks/base/recipe.rb"

# golangのインストール
include_recipe "../cookbooks/golang/recipe.rb"

# MariaDBのインストール
include_recipe "../cookbooks/MariaDB/recipe.rb"
