### golangのインストール

package "golang-go"

# ファイル転送
remote_file ".bash_profile" do
  source "./files/.bash_profile"
end

# ファイル転送
remote_file "dl_package.sh" do
  mode "775"
  source "dl_package.sh"
end

execute ".dl_package.sh" do
  command ".dl_package.sh"
end
