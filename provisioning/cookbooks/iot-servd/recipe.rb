### IoT：クライアント・サーバーアプリのデプロイ＆サービス化

# IoTソースの取得
execute "git clone" do
  command "git clone -b develop https://github.com/4saito5/sensor-management-web.git"
end

# 開発環境構築
execute "Package install" do
  command "./sensor-management-web/yarn"
end

# データベース作成
execute "db create" do
  command "./sensor-management-web/yarn db-create"
end

# クライアントアプリのビルド
execute "build client" do
  command "./sensor-management-web/yarn build-prod-client"
end

# サーバーアプリのビルド
execute "build server" do
  command "./sensor-management-web/yarn build-prod-server"
end


## 
#execute "" do
#  command ""
#end

