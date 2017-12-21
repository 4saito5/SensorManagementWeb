### Nginxのインストール

package "nginx"

## 設定ファイルの書き換え
# rootパス
execute "configuration nginx" do
  command "sed -i 's/.*root.*html.*$/\\troot \\/home\\/iot\\/sensor-management-web\\/dist;/' /etc/nginx/sites-available/default"
end

# 再起動
execute "Service restart nginx" do
  command "sudo systemctl restart nginx.service"
end
