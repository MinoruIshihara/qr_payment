package main

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	UserID      uint      `json:"user_id"`
	Merchandise string    `json:"merchandise"`
	Datetime    time.Time `json:"datetime"`
}
