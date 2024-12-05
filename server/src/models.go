package main

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	UserID        string    `json:"user_id" gorm:"foreignKey:UserID"`
	MerchandiseID uint      `json:"merchandise_id" gorm:"foreignKey:MerchandiseID"`
	Datetime      time.Time `json:"datetime"`
}

type Merchandise struct {
	gorm.Model
	JANCode string `json:"jan_code"`
	Name    string `json:"name"`
	Price   string `json:"price"`
}

func generate_id() string {
	return uuid.NewString()
}

type User struct {
	ID        string `gorm:"primaryKey;type:varchar(255);default:generate_id()"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	Name      string
}
