package main

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	database_host := os.Getenv("MYSQL_HOST")
	user_name := os.Getenv("MYSQL_USER")
	database_name := os.Getenv("MYSQL_DATABASE")
	database_password := os.Getenv("MYSQL_PASSWORD")
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", user_name, database_password, database_host, database_name)
	print(dsn)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("データベースへの接続に失敗しました:", err)
	}

	db.AutoMigrate(&Payment{}, &Merchandise{})

	DB = db
}
