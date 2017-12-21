### golangのインストール

package "dirmngr"
package "software-properties-common"

execute "add repository golang" do
#  command "add-apt-repository -y ppa:gophers/archive"
  command "add-apt-repository -y ppa:longsleep/golang-backports"
end
execute "apt update" do
  command "apt update"
end
package "golang-go"

## ファイル転送
#remote_file ".bash_profile" do
#  source "./files/.bash_profile"
#end

## ファイル転送
#remote_file "./dl_package.sh" do
#  mode "775"
#  source "./files/dl_package.sh"
#end
#
#execute ".dl_package.sh" do
#  command ".dl_package.sh"
#end

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
