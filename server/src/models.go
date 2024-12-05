package main

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	UserID      string    `json:"user_id"`
	Merchandise string    `json:"merchandise"`
	Datetime    time.Time `json:"datetime"`
}

type Merchandise struct {
	gorm.Model
	JANCode string `json:"jan_code"`
	Name    string `json:"name"`
	Price   string `json:"price"`
}

type User struct {
	gorm.Model
	ID   string `json:"id"`
	Name string `json:"name"`
}
