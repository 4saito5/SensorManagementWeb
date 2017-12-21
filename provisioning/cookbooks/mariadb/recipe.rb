### MariaDBのインストール

package "mariadb-server"

# ファイル転送
remote_file "create_user.sql" do
  source "./files/create_user.sql"
end

# ユーザー作成
execute "create user" do
  command "mysql -u root --default-character-set=utf8 < create_user.sql"
end

# 全てのIPアドレスからの接続を許す。開発マシン用の設定。本番では使わない。
execute "configuration mariadb" do
  command "sed -i 's/^\(bind-address\)/#\1/' /etc/mysql/mariadb.conf.d/50-server.cnf"
end
