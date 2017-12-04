/****************************************************************************
  Library County
****************************************************************************/
// 現在時刻取得ライブラリ
#include <NTP.h>
#include <Time.h>
#include <TimeLib.h>

// I2Cライブラリ
#include <Wire.h>

// WiFiライブラリ
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>

// 通信ライブラリ
#include <ESP8266HTTPClient.h>

// 温度センサー(skADT7410のライブラリ
#include "skADT7410.h"

// Ambientライブラリ
#include "Ambient.h"
#define AmbientChannelID 300                //チャンネルID(整数)
#define AmbientWriteKey "6488b17fb9786f17"  //ライトキー(16桁の16進数)

/****************************************************************************

****************************************************************************/
// デバイスのI2Cアドレス
#define SENSOR_ADRS     0x48

// 電算サービス社内無線LAN
#define SSID_1 "MyPlace"               //無線LANアクセス・ポイントのSSID
#define PASS "cmzbzprdmg"              //パスワード

#define SERVER_HOST "192.168.1.20:8080/espServer"      //サーバーのホスト名
#define CHANNEL_ID 1                                   // チャンネルID

// ライブラリの生成を行う
skADT7410  Temp(SENSOR_ADRS) ;
Ambient ambient;
WiFiClient client;

// ローカルタイム取得
int ntp_begin(unsigned int localPort);

// 定数
const uint8_t PORT1A = 4;
const uint8_t PORT1B = 5;
const uint8_t I2C_SDA = PORT1A;
const uint8_t I2C_SCL = PORT1B;

// 決め打ち
char const SERIAL_NO = "test001";
int const PORT_NO = 1;

/****************************************************************************
  setup
****************************************************************************/
void setup() {

    // 変数
    int ans ;
    int waiting=0;                   // アクセスポイント接続待ち用

    // シリアルモニターの設定
    Serial.begin(115200) ;
    Serial.println(""); // 「Example 09」をシリアル出力表示

    Serial.println("CopyRight(C) DSC 2017-08-08"); // シリアル出力表示
    Serial.println(" Ver 0.010  ch 3"); // シリアル出力表示

    // Ｉ２Ｃの初期化
    Wire.begin(I2C_SDA,I2C_SCL);

    // 温度センサーの初期化を行う(16bitの解像度 動作モードはシャットダウン)
    ans = Temp.Begin() ;
    if (ans == 0) Serial.println("Initialization normal") ;
    else {
        Serial.print("Initialization abnormal ans=") ;
        Serial.println(ans) ;
    }

    // 動作モードを"連続測定モード"にする
    Temp.ActionMode(ADT_MODE_CONTINUE) ;

    // WiFi設定
    WiFi.mode(WIFI_STA);                    // 無線LANをSTAモードに設定
    WiFi.begin(SSID_1,PASS);                  // 無線LANアクセスポイントへ接続
    while(WiFi.status() != WL_CONNECTED){   // 接続に成功するまで待つ
      delay(100);                              // 待ち時間処理
      waiting++;                               // 待ち時間カウンタを1加算する
      if(waiting%10==0)Serial.print('.');     // 進捗表示
      if(waiting > 300) delay(30000);          // 300回(30秒)を過ぎたらスリープ
    }
    Serial.println(WiFi.localIP());        // 本機のIPアドレスをシリアル出力

    // タイム設定
    // 2390 はローカルのUDPポート。空いている番号なら何番でもいいです。
    // 時刻あわせ
    while(1) {
        if (ntp_begin(2390) != 0) {
            break;;
        }
    }

    // Ambient 公開チャンネル初期処理
    ambient.begin(AmbientChannelID, AmbientWriteKey, &client);  // Ambient開始
    delay(3000) ;  // 3秒後に開始
}
/****************************************************************************
  loop
****************************************************************************/
void loop() {
    // 変数
    int ans;
    time_t n = now();
    time_t t;

    char value;
    char s[20];
    const char* format = "%04d-%02d-%02d %02d:%02d:%02d";

    // JST
    t = localtime(n, 9);
    sprintf(s, format, year(t), month(t), day(t), hour(t), minute(t), second(t));
    Serial.print("JST : ");
    Serial.println(s);

    // 室内温度
    float fRoom_Temp = 0;

    //温度データ(摂氏温度)をセンサーから読み出す
    ans = Temp.Read(&fRoom_Temp) ;
    if (ans == 0) {
        Serial.print(fRoom_Temp,4) ;
        Serial.write(0xDF) ; // ℃
        Serial.println(" C ") ;
    } else {
        Serial.println("NG") ;
    }

//    dtostrf(fRoom_Temp,5,2,s);          // 温度を文字列に変換
//    ambient.set(1,s);                   // Ambient(データ1)へ温度を送信

//    ambient.send();                     // Ambient送信の終了(実際に送信する)

    // ポート情報を取得する
    value = getPort(SERIAL_NO, PORT_NO);

    delay(5000);
}

/****************************************************************************
  Function group
****************************************************************************/
// ポート情報を取得する
String getPort(char serial_no, int port_no) {
    HTTPClient http;

    char url[128];
    sprintf(url, "http://%s/webapi/score", SERVER_HOST);

    Serial.println(url);
    http.begin(url);

    // POST パラメータ作る
    char params[128];
    sprintf(params, "{\"serial_no\":\"%s\",\"port_no\":\"%d\"}"
      , serial_no
      , port_no
      );
    Serial.println(params);

    // POST リクエストする
    int httpCode = http.POST(params);
    if (httpCode > 0) {
      // HTTP レスポンスコードが返ってくる
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);
    } else {
      // コネクションエラーになるとマイナスが返る
      Serial.println("[HTTP] no connection or no HTTP server.");
    }

    // GET on-offを取得する
    String result = "";

    value = http.

    if (value == on) {
        Serial.printf("The valve is open!!");
        result = http.getPort(params);
    } else {
        Serial.printf("Oh...The valve is closed.");
    }

    http.end();

    return result;
}

/****************************************************************************
  END
****************************************************************************/
