### golangのインストール

package "golang-go"

# ファイル転送
remote_file "~/.bash_profile" do
  source "./files/.bash_profile"
end

# 環境変数セット
execute "source ~/.bash_profile" do
  command "source ~/.bash_profile"
end

# golangパッケージのダウンロード
execute "go get github.com/labstack/echo" do
  command "go get github.com/labstack/echo"
end
execute "go get github.com/dgrijalva/jwt-go" do
  command "go get github.com/dgrijalva/jwt-go"
end
execute "go get github.com/go-sql-driver/mysql" do
  command "go get github.com/go-sql-driver/mysql"
end
execute "go get github.com/gocraft/dbr" do
  command "go get github.com/gocraft/dbr"
end
execute "go get github.com/pkg/errors" do
  command "go get github.com/pkg/errors"
end

