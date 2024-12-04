package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// 支払い情報を登録
func CreateMerchandise(c *gin.Context) {
	var input Merchandise
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// データベースに保存
	DB.Create(&input)

	c.JSON(http.StatusCreated, input)
}

// ユーザーの支払い履歴を取得
func GetMerchandise(c *gin.Context) {
	var merchandise []Merchandise
	DB.Find(&merchandise)

	c.JSON(http.StatusOK, merchandise)
}
