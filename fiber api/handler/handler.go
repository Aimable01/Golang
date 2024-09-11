package handler

import (
	"github.com/Aimable01/go_rest_api/database"
	"github.com/Aimable01/go_rest_api/model"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// create a user
func CreateUser(c *fiber.Ctx) error {
	db := database.DB.Db
	user := new(model.User)

	err := c.BodyParser(user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Something's wrong with your input", "data": err})
	}

	err = db.Create(&user).Error
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "couldnot create user", "data": err})
	}

	return c.Status(201).JSON(fiber.Map{"status": "success", "message": "User created", "data": user})
}

// get all users
func GetAllUsers(c *fiber.Ctx) error {
	db := database.DB.Db
	var users []model.User

	db.Find(&users)

	if len(users) == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "err", "message": "users not found", "data": nil})
	}

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Users found", "data": users})
}

// get a single user
func GetSingleUser(c *fiber.Ctx) error {
	db := database.DB.Db
	id := c.Params("id")
	var user model.User

	db.Find(&user, "id = ?", id)

	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"status": "err", "message": "user not found", "data": nil})
	}

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}

// update a user
func UpdateUser(c *fiber.Ctx) error {
	type updateUser struct {
		Username string `json:"username"`
	}

	db := database.DB.Db

	var user model.User

	id := c.Params("id")
	db.Find(&user, "id= ?", id)
	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"status": "err", "message": "user not found", "data": nil})
	}

	var updateUserData updateUser
	err := c.BodyParser(&updateUserData)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "err", "message": "something's wrong with your input", "data": err})
	}

	user.Username = updateUserData.Username
	db.Save(&user)

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}

func DeleteUserById(c *fiber.Ctx) error {
	db := database.DB.Db
	var user model.User

	id := c.Params("id")

	db.Find(&user, "id = ?", id)
	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"status": "err", "message": "user not found", "data": nil})
	}

	err := db.Delete(&user, "id = ?", id).Error
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"status": "err", "message": "failed to delete the user", "data": nil})
	}

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "User deleted"})

}
