### 基本的な設定やパッケージのインストール

# timezoneの設定
execute 'set timezone' do
  command 'timedatectl set-timezone Asia/Tokyo'
end

package "curl"

# Install Node.js
execute "Install the NodeSource Node.js" do
  command "curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -"
end
package "nodejs"

# Install Yarn
execute "Yarn apt-key add" do
  command "curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -"
end
execute "Install Yarn" do
  command "echo \"deb https://dl.yarnpkg.com/debian/ stable main\" | sudo tee /etc/apt/sources.list.d/yarn.list"
end
execute "apt update" do
  command "apt update"
end
package "yarn"

package "git"
