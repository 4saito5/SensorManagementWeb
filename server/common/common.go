package common

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/gocraft/dbr"
)

func DbrConnection()(*dbr.Connection, *dbr.Session) {
	conn, _   := dbr.Open("mysql", "iot:@tcp(127.0.0.1:3306)/smw", nil)
	sess      := conn.NewSession(nil)
	return conn, sess
}
