SET NAMES utf8;
DROP DATABASE IF EXISTS smw;
CREATE DATABASE smw;

CREATE TABLE smw.m_code (
	`name` varchar(3) NOT NULL comment '名称',
	`seq` smallint unsigned NOT NULL comment 'シーケンス番号',
	`value` varchar(255) NULL comment '値',
	PRIMARY KEY(`name`,`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 comment 'コード';
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 0, '無し');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 1, '温度');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 2, '湿度');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 3, '水中温度');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 4, '土壌水分');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 5, '照度');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 6, '気圧');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 7, 'GPS緯度');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 8, 'GPS経度');
INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', 9, 'GPS高度');
--INSERT INTO smw.m_code(name, seq, value) VALUES ('SEN', , '');
INSERT INTO smw.m_code(name, seq, value) VALUES ('MCN', 0, '製造中');
INSERT INTO smw.m_code(name, seq, value) VALUES ('MCN', 1, '利用中');
INSERT INTO smw.m_code(name, seq, value) VALUES ('MCN', 2, '破棄');

CREATE TABLE smw.m_users (
	`email` varchar(255) NOT NULL comment 'メールアドレス',
	`password` varchar(255) NOT NULL comment 'パスワード',
	`name` varchar(255) NOT NULL comment '名前',
	PRIMARY KEY(`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 comment 'ユーザー';
INSERT INTO smw.m_users(email, password, name) VALUES ('test@test', 'testtest', 'テストユーザー');

CREATE TABLE smw.m_machine (
	`serial_no` varchar(255) NOT NULL comment '機器シリアルNo',
	`email` varchar(255) NULL comment 'メールアドレス（現在の持ち主）',
	`status` smallint unsigned NOT NULL default 0 comment '状態',
	PRIMARY KEY(`serial_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 comment '機器';
CREATE TRIGGER smw.before_insert_m_machine
BEFORE INSERT ON smw.m_machine
FOR EACH ROW
    SET new.serial_no = uuid();
INSERT INTO smw.m_machine(serial_no, email) VALUES ('test001', 'test');
INSERT INTO smw.m_machine(email) VALUES ('test');
INSERT INTO smw.m_machine(email) VALUES ('test');
INSERT INTO smw.m_machine(email) VALUES ('test');

CREATE TABLE smw.m_machine_use (
	`serial_no` varchar(255) NOT NULL comment '機器シリアルNo',
	`email` varchar(255) NULL comment 'メールアドレス',
	`place_name` varchar(255) NULL comment '場所名',
	`latitude` float NULL comment '緯度',
	`longitude` float NULL comment '経度',
	`rec_start` date NOT NULL comment '記録開始日',
	`rec_end` date NULL comment '記録終了日',
	`comment` varchar(255) NULL comment 'コメント',
	PRIMARY KEY(`serial_no`,`rec_start`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 comment '機器使用記録';

CREATE TABLE smw.t_sensor (
	`serial_no` varchar(255) NOT NULL comment '機器シリアルNo',
	`sensor_id` smallint unsigned NOT NULL comment 'センサーID',
	`sensor_code` smallint unsigned NULL comment 'センサーコード',
	PRIMARY KEY(`serial_no`,`sensor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 comment '接続センサー';

CREATE TABLE smw.t_records (
	`serial_no` varchar(255) NOT NULL comment '機器シリアルNo',
	`sensor_id` smallint unsigned NOT NULL comment 'センサーID',
	`date_time` datetime NOT NULL comment '日時',
	`value` float NULL comment '測定値',
	PRIMARY KEY(`serial_no`,`sensor_id`,`date_time`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 comment '記録';
