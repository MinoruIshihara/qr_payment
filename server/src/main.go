package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// データベースに接続
	ConnectDB()

	// Ginルーターを初期化
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"http://127.0.0.1:3000",
		},
		// アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
		AllowMethods: []string{
			"POST",
			"GET",
			"OPTIONS",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		// cookieなどの情報を必要とするかどうか
		AllowCredentials: true,
		// preflightリクエストの結果をキャッシュする時間
		MaxAge: 24 * time.Hour,
	}))

	// ルーティングを設定
	router.POST("/check", CreatePayment)
	router.GET("/user/payments", GetPayments)
	router.POST("/register-merchandise", CreateMerchandise)
	router.GET("/merchandises", GetMerchandise)
	router.GET("/get-info-from-jan", GetInfoFromJAN)

	// サーバーを起動
	router.Run("0.0.0.0:8080")
}
