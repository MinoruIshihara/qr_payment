package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// データベースに接続
	ConnectDB()

	// Ginルーターを初期化
	router := gin.Default()

	// ルーティングを設定
	router.POST("/check", CreatePayment)
	router.GET("/user/payments", GetPayments)

	// サーバーを起動
	router.Run("0.0.0.0:8080")
}
