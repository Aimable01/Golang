package jwt

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

var SecretKey []byte

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatalf("JWT_SECRET is not set in .env")
	}

	SecretKey = []byte(secret)
}

func GenerateToken(userID uuid.UUID) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = userID.String()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	tokenString, err := token.SignedString(SecretKey)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		return "", err
	}
	return tokenString, nil
}

func ParseToken(tokenStr string) (uuid.UUID, error) {
	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})
	if err != nil {
		log.Printf("Error parsing token: %v", err)
		return uuid.Nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		idStr, ok := claims["id"].(string)
		if !ok {
			return uuid.Nil, jwt.ErrInvalidKey
		}

		userID, err := uuid.Parse(idStr)
		if err != nil {
			log.Printf("Error parsing ID: %v", err)
			return uuid.Nil, err
		}
		return userID, nil
	}

	return uuid.Nil, jwt.ErrInvalidKey
}
