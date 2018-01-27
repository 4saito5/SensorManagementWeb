package getport

import (
	"../common"
	"net/http"
	_ "github.com/go-sql-driver/mysql"
	//"github.com/gocraft/dbr"
	"github.com/labstack/echo"
	"fmt"
)

//ポート情報
type (
	portInfo struct {
		Serial_no    string `db:"serial_no" json:"serial_no"`	//シリアルNo(引数)
		Port_no    	 int `db:"port_no" json:"port_no"`			//ポート番号(引数)
		Value    	 string `db:"value" json:"value"`			//設定値(戻り値)
	}
)

var (
	tablename = "t_port"	//接続ポートテーブル
	conn, sess	= common.DbrConnection()
)

//ポート情報取得
func GetPort(c echo.Context) error {
	port := new(portInfo)

	//ポートエラーを拾う
	if err := c.Bind(port); err != nil {
		return err
	}
	fmt.Println("Serial_no=", port.Serial_no)
	fmt.Println("Port_no=", port.Port_no)

	//接続ポートテーブルのselectSQLを発行する
	_, err := sess.Select("value").
		From(tablename).
		Where("serial_no = ? AND port_no = ?", port.Serial_no, port.Port_no).
		Load(&port.Value)
	if err != nil {
		// fmt.Println("error:", err)
		return err
	}
	fmt.Println("Value=", port.Value)

	// return c.JSON(http.StatusOK, port.Value)
	return c.JSON(http.StatusOK, "\"on")
}
