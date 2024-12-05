package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type CheckInfo struct {
	UserID  string `json:"user_id"`
	JANCode string `json:"jan_code"`
}

// 支払い情報を登録
func CreatePayment(c *gin.Context) {
	var input CheckInfo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var merchandise Merchandise
	DB.Where("jan_code = ?", input.JANCode).Order("updated_at asc").First(&merchandise)

	var payment Payment
	payment.MerchandiseID = merchandise.ID
	payment.UserID = input.UserID
	payment.Datetime = time.Now()

	// データベースに保存
	DB.Create(&payment)

	c.JSON(http.StatusCreated, payment)
}

type GetPaymentRes struct {
	User        User        `json:"user"`
	Merchandise Merchandise `json:"merchandise"`
	Datetime    time.Time   `json:"datetime"`
}

// ユーザーの支払い履歴を取得
func GetPayments(c *gin.Context) {
	var user_id = c.Query("user_id")
	var payments []Payment
	if user_id != "" {
		DB.Where("user_id = ?", user_id).Find(&payments)
	} else {
		DB.Find(&payments)
	}
	var response []GetPaymentRes
	for _, v := range payments {
		var user User
		DB.Where("id = ?", v.UserID).First(&user)
		var merchandise Merchandise
		DB.Where("id = ?", v.MerchandiseID).First(&merchandise)
		response = append(response, GetPaymentRes{User: user, Merchandise: merchandise, Datetime: v.Datetime})
	}

	c.JSON(http.StatusOK, response)
}
