package models

import (
	database "github.com/aimable01/nestfit/internal/pkg/db/postgres"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uuid.UUID `gorm:"type:uuid;primary_key"`
	Username string    `json:"username" gorm:"unique;not null"`
	Email    string    `json:"email" gorm:"unique;not null"`
	Password string    `json:"password" gorm:"not null"`
}

type Users struct {
	Users []User `json:"users"`
}

// Set ID before creating a new user
func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	user.ID = uuid.New()
	return
}

// Create a new user in the database
func (user *User) Create() error {
	// Hash the password before saving
	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword

	// Save the user to the database
	if err := database.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

// Authenticate checks if the username and password are correct
func (user *User) Authenticate() bool {
	var dbUser User
	if err := database.DB.Where("email = ?", user.Email).First(&dbUser).Error; err != nil {
		return false // Return false if the user is not found
	}

	// Check if the password matches
	if !CheckPasswordHash(user.Password, dbUser.Password) {
		return false
	}

	// Populate the current user with the fetched user details
	user.ID = dbUser.ID
	user.Username = dbUser.Username
	user.Email = dbUser.Email
	return true
}

// HashPassword hashes a plain-text password
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPasswordHash compares a plain-text password with a hashed password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
