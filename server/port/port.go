package port

import (
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gocraft/dbr"
	"github.com/labstack/echo"
	// "html"
	// "strconv"
	// "fmt"
)

//引数ポート情報
type (
	portInfo struct {
		serial_no    string `db:"serial_no" json:"serial_no"`	//シリアルNo
		port_no    	 int `db:"port_no" json:"port_no"`				//ポート番号
		value    		 string `db:"value" json:"value"`					//設定値
	}
)

var (
	tablename = "t_port"	//接続ポートテーブル
	seq       = 1
	conn, _   = dbr.Open("mysql", "root:@tcp(127.0.0.1:3306)/smw", nil)
	sess      = conn.NewSession(nil)
)

//ポート情報処理
func portProcessing(c echo.Context) error {
	port := new(portInfo)

	//ポートエラーを拾う
	if err := c.Bind(port); err != nil {
		return err
	}

	//updateSQLを発行する
	sess.Update(tablename).
		SetMap("value = 10").
		Where(
					"serial_no = ? AND
					 port_no = ?"
					,port.serial_no
					,port.port_no
				).
		Exec()
	return c.JSON(http.StatusOK)
}
