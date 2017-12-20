### MariaDBのインストール

package "mariadb-server"

# ファイル転送
remote_file "~/create_user.sql" do
  source "./files/create_user.sql"
end

# ユーザー作成
execute "mysql -u root --default-character-set=utf8 < create_user.sql" do
  command "mysql -u root --default-character-set=utf8 < create_user.sql"
end
