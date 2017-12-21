### Nginxのインストール

package "nginx"

## 設定ファイルの書き換え
# rootパス
execute "configuration nginx" do
  command "sudo sed 's/[^#].*root.*$/\troot \/home\/iot\/sensor-management-web\/dist;/' /etc/nginx/sites-available/default"
end
