use mysql
CREATE USER iot IDENTIFIED by '';
grant all on mysql.* to iot;
grant all on smw.* to iot;
flush privileges;
exit
