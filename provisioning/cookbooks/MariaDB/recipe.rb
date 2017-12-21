### MariaDBのインストール

package "mariadb-server"

# ファイル転送
remote_file "create_user.sql" do
  source "./files/create_user.sql"
end

# ユーザー作成
execute "mysql -u root --default-character-set=utf8 < create_user.sql" do
  command "mysql -u root --default-character-set=utf8 < create_user.sql"
end

# 全てのIPアドレスからの接続を許す。開発マシン用の設定。本番では使わない。
execute "sed -i 's/^\(bind-address\)/#\1/' /etc/mysql/mariadb.conf.d/50-server.cnf" do
  command "sed -i 's/^\(bind-address\)/#\1/' /etc/mysql/mariadb.conf.d/50-server.cnf"
end
