package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// 支払い情報を登録
func CreatePayment(c *gin.Context) {
	var input Payment
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 支払い日時を設定
	input.Datetime = time.Now()

	// データベースに保存
	DB.Create(&input)

	c.JSON(http.StatusCreated, input)
}

// ユーザーの支払い履歴を取得
func GetPayments(c *gin.Context) {
	var payments []Payment
	DB.Find(&payments)

	c.JSON(http.StatusOK, payments)
}
