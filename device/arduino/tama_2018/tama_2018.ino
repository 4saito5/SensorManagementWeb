/****************************************************************************
  Library County
****************************************************************************/
// 現在時刻取得ライブラリ
#include <NTP.h>
#include <Time.h>
#include <TimeLib.h>

// 通信ライブラリ
#include <ESP8266HTTPClient.h>

// 温度センサー(ADT7410)のテスト
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <SPI.h>
#include <SD.h>

// WiFiライブラリ
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager

// その他ライブラリ
#include "skADT7410.h"
#include "SHT21.h"
#include "Ambient.h"
#include "PCF8574.h"

/****************************************************************************
  Constant definitions
****************************************************************************/

// time_t getNtpTime();
// 2390
int ntp_begin(unsigned int localPort);
// 9 (JST)
// time_t localtime(time_t t, int timeZone);
// ntp.nict.jp
// void setTimeServer(const char* _timeServer);

// 電算サービス社内無線LAN
#define SSID_1 "MyPlace"                 //無線LANアクセス・ポイントのSSID
#define PASS "cmzbzprdmg"              //パスワード

#define SETTING_FILE "Wifi_Setting.txt"   // SD Setting FileName

//プロファイル名：L04DR(赤) 
//SSID： L04D_BBB249C4 
//Securty Key:C3055A69 
//#define SSID "L04D_BBB249C4"                 //無線LANアクセス・ポイントのSSID
//#define PASS "C3055A69"                     //パスワード


//プロファイル名：L04DW(白)
//SSID： L04D_13F35CC7 
//Securty Key:3F216E7E
//#define SSID "L04D_13F35CC7"                //無線LANアクセス・ポイントのSSID
//#define PASS "3F216E7E"                     //パスワード


//#define AmbientChannelID 298                //チャンネルID(整数)
//#define AmbientWriteKey "e3b5b2c1c4b4b6e3"  //ライトキー(16桁の16進数)

//#define AmbientChannelID 299                //チャンネルID(整数)
//#define AmbientWriteKey "56bfd65556c8eaf8"  //ライトキー(16桁の16進数)

#define AmbientChannelID 300                //チャンネルID(整数)
#define AmbientWriteKey "6488b17fb9786f17"  //ライトキー(16桁の16進数)

#define SERVER_HOST "35.229.58.6:5555"     //サーバーのホスト名
//#define SERVER_HOST "192.168.1.20:5555"        //サーバーのホスト名
#define CHANNEL_ID 1                           // チャンネルID

//#define SENDTO "192.168.1.98"               //送信先のIPアドレス
//#define PORT  1024                          //送信ポート番号
#define SLEEP_P 1*60*1000000               // スリープ時間 5分(uint32_t)
#define DEVICE "tmpid_1,"                   // デバイス名(5文字+"_"+番号+",")


#define SENSOR_ADRS     0x48       // デバイスのI2Cアドレス
#define SENSOR_ADRS2    0x49       // でばいすのI2Cアドレス

#define PCF8574A_ADRS   0x3F       // デバイスのI2Cアドレス


//const uint8_t PORT_POWER = 15; // (common with RED_LED)
const uint8_t CS_SD = 15;     // SD Card Chip Select
const uint8_t PORT1A = 4;
const uint8_t PORT1B = 5;
const uint8_t I2C_SDA = PORT1A;
const uint8_t I2C_SCL = PORT1B;

double calc_e(double t);
double calc_rh(double td, double tw);

/** PCF8574 instance */
PCF8574 expander;                   // PCF8574 ライブラリーの生成を行う

SHT21 SHT21;                       // SHT21 センサーライブラリーの生成を行う
skADT7410  Temp(SENSOR_ADRS) ;     // 温度センサーライブラリの生成を行う
//skADT7410  Temp(SENSOR_ADRS2);    // 温度センサー2用ライブラリの生成
Ambient ambient;
WiFiClient client;
//File myFile;


// リクエストパラメータ
char* SERIAL_NO = "test001";
int PORT_NO = 1;

/****************************************************************************
  SDカード読み込み処理
****************************************************************************/
int InitRead (char *szSSID,char  *szPSW )
{

  // ファイルからネタ読み出し
  char szRead[64];            // データ読み込み Buffer
  char *adr;
  File mySettings;
  int iLen;
  iLen = 0;
  memset( szRead,0x00,sizeof( szRead));
  
	// SD開始
  if (SD.begin(CS_SD)) {
      Serial.println("SD Card initialized.");
      // SDカード有
   } else {
    	Serial.println("SD Card initialize Fail.");
    	// SDカード無
		  return( false );
    }
	
	mySettings = SD.open("Setting.txt");
	if (mySettings) {
  		Serial.print("Setting.txt"); Serial.println(":");
 
  		// read from the file until there's nothing else in it:
  		String ln;
  		while (mySettings.available()) {
    		// ネタ取り込み
    		char wd = mySettings.read(); // btye→char
    		Serial.print(wd);
    		if (wd == '\n' || wd == 0x0d ) {
            // 1行出来た
            adr = strstr( szRead,"ssid=");
            if ( adr != NULL ) {
                //　ssid= 発見
                strcpy( szSSID, adr + 5 );
            }
            adr = strstr(szRead,"pw=");
            if( adr != NULL ) {
              // pw= 発見
              strcpy( szPSW, adr + 3 );
            }
            iLen =0;
            memset( szRead,0x00,sizeof( szRead ));
      			wd = '\0';
    		} else {   
      			szRead[iLen++]= wd;
    		}
     
  		}
  		// close the file:
  		mySettings.close();

	} else {

		// if the file didn't open, print an error:
  		Serial.println("error opening Setting.txt");
  		// Settingが読めなかった旨をTFTへ表示し，動作停止。
  		return( false ); // ?
	}   
}

/****************************************************************************
  setup
****************************************************************************/
void setup()
{
     int ans ;
     int waiting=0;                   // アクセスポイント接続待ち用
     bool hasSD;
     char szSSID[32];                    // SSID
     char szPSW[32];                     // PASS WORD
       
      memset(szSSID,0x00,sizeof(szSSID));
      memset(szPSW,0x00,sizeof(szPSW));
//    digitalWrite(PORT_POWER, HIGH);

     // シリアルモニターの設定
     Serial.begin(115200) ;
     Serial.println(""); // 「Example 09」をシリアル出力表示
  
     Serial.println("CopyRight(C) DSC 2017-08-08"); // シリアル出力表示
     Serial.println(" Ver 0.010  ch 3"); // シリアル出力表示

    //Start I2C bus and PCF8574 instance 
    expander.begin(PCF8574A_ADRS);

   Serial.println("expander.begin end "); // シリアル出力表示
    
    // Setup some PCF8574 pins for demo 
    expander.pinMode(0, INPUT_PULLUP);
    expander.pinMode(1, INPUT_PULLUP);
    expander.pinMode(2, INPUT_PULLUP);
    expander.pinMode(3, INPUT_PULLUP);
    expander.pinMode(4, OUTPUT);   
    expander.digitalWrite(4, HIGH); // Turn off led 1    
    expander.pinMode(5, OUTPUT);
    expander.digitalWrite(5, HIGH); // Turn off led 1
    expander.pinMode(6, OUTPUT);
    expander.digitalWrite(6, HIGH); // Turn off led 1
    expander.pinMode(7, OUTPUT);
    expander.digitalWrite(7, HIGH); // Turn off led 1


  //設定ファイル読み込み
  InitRead(szSSID,szPSW);
 
  Serial.print("SSID =[");Serial.print(szSSID);Serial.println("]");
  Serial.print("PSW  =[");Serial.print(szPSW);Serial.println("]");
 

     // Ｉ２Ｃの初期化
   Wire.begin(I2C_SDA,I2C_SCL);

//     Wire.begin() ;                     // マスターとする

    pinMode(CS_SD, INPUT);
      
 
     
     // 温度センサーの初期化を行う(16bitの解像度 動作モードはシャットダウン)
     ans = Temp.Begin() ;
     if (ans == 0) Serial.println("Initialization normal") ;
     else {
          Serial.print("Initialization abnormal ans=") ;
          Serial.println(ans) ;
     }
     // 動作モードを"連続測定モード"にする
     Temp.ActionMode(ADT_MODE_CONTINUE) ;

   
//    // 温度センサー２の初期化を行う(16bitの解像度 動作モードはシャットダウン
//     ans = Temp2.Begin();
//     if ( ans == 0 ) Serial.println("Temp2 Initialization normal");
//     else {
//          Serial.print("Initialization abnormal ans=");
//          Serial.println(ans);
//     }
//    // 動作モードを"連続測定モード"にする
//     Temp2.ActionMode(ADT_MODE_CONTINUE) ;


    // SHT21 初期化
    SHT21.begin();

     WiFi.mode(WIFI_STA);                    // 無線LANをSTAモードに設定
//     WiFi.begin(SSID,PASS);               // 無線LANアクセスポイントへ接続
    WiFi.begin(szSSID,szPSW);
     while(WiFi.status() != WL_CONNECTED){   // 接続に成功するまで待つ
        delay(100);                           // 待ち時間処理
        waiting++;                            // 待ち時間カウンタを1加算する
        if(waiting%10==0)Serial.print('.');  // 進捗表示
        if(waiting > 300) delay(30000);       // 300回(30秒)を過ぎたらスリープ
     }
     Serial.println(WiFi.localIP());         // 本機のIPアドレスをシリアル出力

    // 初期化
    // 2390 はローカルのUDPポート。空いている番号なら何番でもいいです。
    //　時刻あわせ
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
void loop()
{
     int   ans  ;
     int   i;                 // Loop Couter
 //    float temp ;
     float fRoom_Temp = 0;    // 室内温度
     float fWater_Temp = 0;   // 水温
     float fRoom_Hum = 0;     // 室内湿度
     
     float fSum_RoomTemp = 0;     // 室内温度　SUM
     float fSum_WaterTemp = 0;    // 水温　SUM
     float fSum_RoomHum = 0;      // 室内湿度 SUM

     int iCount_RoomTemp = 0;     // 室内温度測定回数
     int iCount_WaterTemp =0;     // 水温測定回数
     int iCount_RoomHum = 0;      // 室内湿度測定回数
     int iRc;

     int value;
     
     WiFiUDP udp;

     time_t n = now();
     time_t t;

     char s[20];
     const char* format = "%04d-%02d-%02d %02d:%02d:%02d";

     // JST
     t = localtime(n, 9);
     sprintf(s, format, year(t), month(t), day(t), hour(t), minute(t), second(t));
     Serial.print("JST : ");
     Serial.println(s);
     
     // 動作モードを"ワンショット測定モード"にする
     //Temp.ActionMode(ADT_MODE_ONESHOT) ;
     //delay(240) ;
  
     for ( i=0; i<60; i++ ) {
        //温度データ(摂氏温度)をセンサーから読み出す
        ans = Temp.Read(&fWater_Temp) ;
        if (ans == 0) {
            iCount_WaterTemp++;
            fSum_WaterTemp = fSum_WaterTemp + fWater_Temp;
            Serial.print(fWater_Temp,4) ;
            Serial.write(0xDF) ; // ℃
            Serial.println(" C ") ;
        } else {
            Serial.println("NG") ;
        }

       //室温の測定
        fRoom_Temp = SHT21.getTemperature();
       
        iCount_RoomTemp++;
        fSum_RoomTemp = fSum_RoomTemp + fRoom_Temp;
        Serial.print("SHT21_Temperature(C): ");
        Serial.print(fRoom_Temp);
        Serial.write(0xDF) ; // ℃
        Serial.print("C ") ;
        
        //室内湿度の測定
        fRoom_Hum = SHT21.getHumidity();
        iCount_RoomHum++;
        fSum_RoomHum = fSum_RoomHum + fRoom_Hum;
        Serial.print("SHT21_Humidity(%RH): ");
        Serial.print(fRoom_Hum);
        Serial.println(" %" );
      
        delay(500);       // 500ms Wait

        // ポート情報を取得する
        value = getPort(SERIAL_NO, PORT_NO);
        Serial.println(value);
        
        Serial.print(" PIN 0 = ");
//        Serial.println((iRc = expander.digitalRead(0)) ? "HIGH" : "LOW"); // Print button pin state
        expander.digitalWrite(4, value); // Turn off led 1
        
        Serial.print(" PIN 1 = ");
        Serial.println((iRc = expander.digitalRead(1)) ? "HIGH" : "LOW"); // Print button pin state
        expander.digitalWrite(5, iRc); // Turn off led 1
        
        Serial.print(" PIN 2 = ");
        Serial.println((iRc = expander.digitalRead(2)) ? "HIGH" : "LOW"); // Print button pin state
        expander.digitalWrite(6, iRc); // Turn off led 1
          
        Serial.print(" PIN 3 = ");
        Serial.println((iRc = expander.digitalRead(3)) ? "HIGH" : "LOW"); // Print button pin state
        expander.digitalWrite(7, iRc); // Turn off led 1
            
 //       Serial.println(expander.read(), DEC); // Read the whole pins input register

      
//        sleep() ;  // １秒後に繰り返す
     }

   fRoom_Temp = fSum_RoomTemp / iCount_RoomTemp;
   fRoom_Hum = fSum_RoomHum / iCount_RoomHum;

    fWater_Temp = fSum_WaterTemp / iCount_WaterTemp;
      

    iCount_RoomTemp = 0;
    iCount_RoomHum = 0;
    iCount_WaterTemp = 0;

    fSum_RoomTemp =0;
    fSum_RoomHum = 0;
    fSum_WaterTemp = 0;


     t = localtime(n, 9);
     sprintf(s, format, year(t), month(t), day(t), hour(t), minute(t), second(t));
     Serial.print("JST : ");
     Serial.println(s);

    Serial.print(fWater_Temp,4) ;
    Serial.write(0xDF) ; // ℃
    Serial.print(" C ") ;

    Serial.print("SHT21_Temperature(C): ");
    Serial.print(fRoom_Temp);
    Serial.write(0xDF) ; // ℃
    Serial.print("C ") ;
    
    Serial.print("SHT21_Humidity(%RH): ");
    Serial.print(fRoom_Hum);
    Serial.println(" %%" );

    
    dtostrf(fRoom_Temp,5,2,s);          // 温度を文字列に変換
    ambient.set(1,s);                   // Ambient(データ1)へ温度を送信
    dtostrf(fRoom_Hum,5,2,s);           // 湿度を文字列に変換
    ambient.set(2,s);                   // Ambient(データ2)へ湿度を送信
    dtostrf(fWater_Temp,5,2,s);         //　水温データを文字列に変換       
    ambient.set(3,s);                   // Ambient(データ3)へ水温を送信
    
    ambient.send();                     // Ambient送信の終了(実際に送信する)
  
  // sleep();

}

/****************************************************************************
  Function group
****************************************************************************/
void sleep(){
    delay(200);                             // 送信待ち時間
    ESP.deepSleep(SLEEP_P,WAKE_RF_DEFAULT); // スリープモードへ移行する
    while(1){                               // 繰り返し処理
        delay(100);                         // 100msの待ち時間処理
    }                                       // 繰り返し中にスリープへ移行
}

double calc_e(double t) {
  return 0.61365 * exp((17.502 * t) / (240.97 + t));
}


// 乾球、湿球温度から　湿度を求める
double calc_rh(double td, double tw) {
  double e_td = calc_e(td);
  double e_tw = calc_e(tw);
  double es = e_tw - 0.000662 * 101.325 * (td - tw);
  double humidity = (es / e_td) * 100.0;
  if (humidity < 0.0) {
    humidity = 0.0;
  } else if (100.0 < humidity) {
    humidity = 100.0;
  }
  return humidity;
}


// ポート情報を取得する
int getPort(char* serial_no, int port_no) {
  HTTPClient http;

  char url[128];
  sprintf(url, "http://%s/getport", SERVER_HOST);

  Serial.println(url);
  http.begin(url);

  // POST パラメータ作る
  char params[128];
  sprintf(params, "{\"serial_no\":\"%s\",\"port_no\":%d}", serial_no, port_no);
  Serial.println(params);

  // ヘッダー情報を設定する
  http.addHeader("Content-Type", "application/json");

  // POST リクエストする
  int httpCode = http.POST(params);
  if (httpCode > 0) {
    // HTTP レスポンスコードが返ってくる
    Serial.printf("[HTTP] POST... code: %d\n", httpCode);
  } else {
    // コネクションエラーになるとマイナスが返る
    Serial.println("[HTTP] no connection or no HTTP server.");
  }

  // 戻り値
  int result;

  String value = http.getString();
  Serial.println(value);
 
  if (value.equals("\"on\"")) {
    Serial.printf("The valve is open!!");
    result = 0;
  } else {
    Serial.printf("Oh...The valve is closed.");
    result = 1;
  }

  http.end();

  return result;
}

/****************************************************************************
  END
****************************************************************************/
