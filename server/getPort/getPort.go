package getPort

import (
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gocraft/dbr"
	"github.com/labstack/echo"
)

//ポート情報
type (
	portInfo struct {
		serial_no    string `db:"serial_no" json:"serial_no"`	//シリアルNo(引数)
		port_no    	 int `db:"port_no" json:"port_no"`				//ポート番号(引数)
		value    		 string `db:"value" json:"value"`					//設定値(戻り値)
	}
)

var (
	tablename = "t_port"	//接続ポートテーブル
	conn, _   = dbr.Open("mysql", "root:@tcp(127.0.0.1:3306)/smw", nil)
	sess      = conn.NewSession(nil)
)

//ポート情報取得
func getport(c echo.Context) error {
	port := new(portInfo)

	//ポートエラーを拾う
	if err := c.Bind(port); err != nil {
		return err
	}

	//接続ポートテーブルのselectSQLを発行する
	sess.Select("value").
		From(tablename).
		Where("serial_no = ? AND port_no = ?", port.serial_no, port.port_no).
		Load(&port.value)
	return c.JSON(http.StatusOK, port.value)
}
