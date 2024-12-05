package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// 商品を登録
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

// 商品の一覧を取得
func GetMerchandise(c *gin.Context) {
	janCode := c.Query("jan_code")
	var merchandise []Merchandise
	if janCode != "" {
		DB.Where("jan_code = ?", janCode).Find(&merchandise)
	} else {
		DB.Find(&merchandise)
	}
	c.JSON(http.StatusOK, merchandise)
}
