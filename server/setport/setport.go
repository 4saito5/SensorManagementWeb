package setport

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
		Port_no    	 int `db:"port_no" json:"port_no"`				//ポート番号(引数)
		Value    		 string `db:"value" json:"value"`					//設定値(引数)
	}
)

var (
	tablename = "t_port"	//接続ポートテーブル
	conn, sess	= common.DbrConnection()
)

//ポート情報更新
func SetPort(c echo.Context) error {
	port := new(portInfo)

	//ポートエラーを拾う
	if err := c.Bind(port); err != nil {
		return err
	}

	//接続ポートテーブルのupdateSQLを発行する
	conn.Exec(`
		UPDATE t_port
		SET value = '?'
		WHERE serial_no = '?'
		  AND port_no = ?` ,
		port.value
		port.Serial_no ,
		port.Port_no ,
	)


	condition := dbr.AndMap{"serial_no": port.Serial_no, "name": port.Port_no}
	fmt.Println(condition)
	// fmt.Println("テスト")
	// result, err := sess.Update("t_port").
	// 	Set("value", port.value).
	// 	Record(user).
	// 	Exec()
		
	return c.JSON(http.StatusOK , "あっぷでーと")
}
