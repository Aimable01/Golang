package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// initialize database connection
func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env: %v", err)
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatalf("DATABASE_URL is not set in .env")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	DB = db
	log.Println("Database connection established successfully")
}

// close database connection
func CloseDB() error {
	sqlDB, err := DB.DB()
	if err != nil {
		return err
	}

	return sqlDB.Close()
}

// database migrations
func RunMigrations(models ...interface{}) {
	log.Println("Running migrations...")
	err := DB.AutoMigrate(models...)
	if err != nil {
		log.Fatalf("Error during migration: %v", err)
	}
	log.Println("Migrations completed successfully")
}
