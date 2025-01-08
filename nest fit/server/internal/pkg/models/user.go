package models

import (
	"errors"

	database "github.com/aimable01/nestfit/internal/pkg/db/postgres"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID             uuid.UUID `gorm:"type:uuid;primary_key"`
	Name           string    `json:"name"`
	Username       string    `json:"username" gorm:"unique;not null"`
	Email          string    `json:"email" gorm:"unique;not null"`
	Password       string    `json:"password" gorm:"not null"`
	ProfilePicture string    `json:"profilePicture"`
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

// Authenticate checks if the identifier (username or email) and password are correct
func (user *User) Authenticate(usernameOrEmail string, password string) bool {
	var dbUser User

	// Determine whether the identifier is an email or username
	query := database.DB.Where("email = ?", usernameOrEmail).Or("username = ?", usernameOrEmail).First(&dbUser)
	if query.Error != nil {
		return false // Return false if the user is not found
	}

	// Check if the password matches
	if !CheckPasswordHash(password, dbUser.Password) {
		return false
	}

	// Populate the current user with the fetched user details
	user.ID = dbUser.ID
	user.Name = dbUser.Name
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

func (u *User) FindByID(id uuid.UUID) error {
	// Query the database to find the user by ID
	return database.DB.Where("id = ?", id).First(&u).Error
}

func (u *User) Update() error {
	// Update the user record in the database
	return database.DB.Save(&u).Error
}

// FindByUsername fetches a user by their username from the database
func (u *User) FindByUsername(username string) error {
	result := database.DB.Where("username = ?", username).First(&u)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return errors.New("user not found")
	}
	return result.Error
}
