### IoT：クライアント・サーバーアプリのデプロイ＆サービス化

# IoTソースの取得
execute "git clone" do
  user "iot"
  command "git clone -b develop https://github.com/4saito5/sensor-management-web.git"
end

# 開発環境構築
execute "Package install" do
  user "iot"
  command "yarn"
  cwd "./sensor-management-web"
end

# データベース作成
execute "Create Database" do
  user "iot"
  command "yarn db-create"
  cwd "./sensor-management-web"
end

# クライアントアプリのビルド
execute "Build client" do
  user "iot"
  command "yarn build-prod-client"
  cwd "./sensor-management-web"
end

# サーバーアプリのビルド
execute "Build server" do
  user "iot"
  command "yarn build-prod-server"
  cwd "./sensor-management-web"
end

# サーバーアプリのデプロイ
execute "Deploy server" do
  command "mv iot-servd /opt/"
  cwd "./sensor-management-web/server"
end

# ファイル転送
remote_file "/etc/systemd/system/iot-servd.service" do
  source "./files/iot-servd.service"
end

# サーバーアプリの自動起動ON
execute "Service enable iot-servd" do
  command "sudo systemctl enable iot-servd.service"
end

# サーバーアプリの起動
execute "Service start iot-servd" do
  command "sudo systemctl start iot-servd.service"
end
