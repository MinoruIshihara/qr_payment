package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Info struct {
		Count     int `json:"count"`
		Page      int `json:"page"`
		First     int `json:"first"`
		Last      int `json:"last"`
		Hits      int `json:"hits"`
		PageCount int `json:"pageCoun 1 t"`
	} `json:"info"`
	Product []struct {
		CodeNumber     string                 `json:"codeNumber"`
		ItemName       string                 `json:"itemName"`
		ItemModel      string                 `json:"itemModel"`
		BrandName      string                 `json:"brandName"`
		MakerName      string                 `json:"makerName"`
		MakerNameKana  string                 `json:"makerNameKana"`
		ProductDetails map[string]interface{} `json:"ProductDetails"` // 商品詳細をmapで定義
		CodeType       string                 `json:"codeType"`
		ItemUrl        string                 `json:"itemUrl"`
		ItemImageUrl   string                 `json:"itemImageUrl"`
	} `json:"product"`
}

func GetInfoFromJAN(c *gin.Context) {
	app_id := os.Getenv("JAN_API_APP_ID")
	url := fmt.Sprintf("https://api.jancodelookup.com/?appId=%s&query=%s&type=code", app_id, c.Query("code")) // JANコード検索API
	slog.Info(string(url))

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("APIリクエストエラー:", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	defer resp.Body.Close()

	// レスポンスボディをJSONデコード
	response := new(Response)
	byteArray, _ := io.ReadAll(resp.Body)
	if err := json.Unmarshal(byteArray, response); err != nil {
		return
	}

	if len(response.Product) > 0 {
		c.JSON(http.StatusOK, response.Product[0])
	} else {
		c.JSON(http.StatusOK, "{}")
	}
}
