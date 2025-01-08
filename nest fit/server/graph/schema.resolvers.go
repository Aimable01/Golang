package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.60

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/99designs/gqlgen/graphql"
	"github.com/aimable01/nestfit/graph/model"
	"github.com/aimable01/nestfit/internal/auth"
	"github.com/aimable01/nestfit/internal/pkg/jwt"
	"github.com/aimable01/nestfit/internal/pkg/models"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (string, error) {
	var user models.User
	user.Name = input.Name
	user.Username = input.Username
	user.Email = input.Email
	user.Password = input.Password

	// Create the user in the database
	if err := user.Create(); err != nil {
		return "", err
	}

	// Generate a JWT token for the new user
	token, err := jwt.GenerateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, input model.LoginInput) (string, error) {
	var user models.User

	// Authenticate using either username or email
	correct := user.Authenticate(input.UsernameOrEmail, input.Password)
	if !correct {
		return "", &models.WrongCredentialsError{}
	}

	// Generate a JWT token for the authenticated user
	token, err := jwt.GenerateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}

// RefreshToken is the resolver for the refreshToken field.
func (r *mutationResolver) RefreshToken(ctx context.Context, input model.RefreshTokenInput) (string, error) {
	id, err := jwt.ParseToken(input.Token)
	if err != nil {
		return "", fmt.Errorf("access denied")
	}
	token, err := jwt.GenerateToken(id)
	if err != nil {
		return "", err
	}
	return token, nil
}

// UploadProfilePicture is the resolver for the uploadProfilePicture field.
func (r *mutationResolver) UploadProfilePicture(ctx context.Context, file graphql.Upload) (string, error) {
	// Define the allowed file types and size limit
	// allowedExtensions := []string{".jpg", ".jpeg", ".png"}
	maxFileSize := int64(5 * 1024 * 1024) // 5MB

	// Validate file size
	if file.Size > maxFileSize {
		return "", fmt.Errorf("file size exceeds limit of 5MB")
	}

	// // Validate file type
	// ext := filepath.Ext(file.Filename)
	// if !contains(allowedExtensions, ext) {
	// 	return "", fmt.Errorf("unsupported file type: %s", ext)
	// }

	// Create the upload directory
	uploadDir := "uploads/profile_pictures"
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		return "", fmt.Errorf("failed to create upload directory: %w", err)
	}

	// Save the file to the server
	filePath := filepath.Join(uploadDir, file.Filename)
	out, err := os.Create(filePath)
	if err != nil {
		return "", fmt.Errorf("failed to create file: %w", err)
	}
	defer out.Close()

	if _, err = io.Copy(out, file.File); err != nil {
		return "", fmt.Errorf("failed to copy file: %w", err)
	}

	// Retrieve the authenticated user from context
	user := auth.ForContext(ctx)
	if user == nil {
		return "", fmt.Errorf("unauthorized: user not logged in")
	}

	// Update user's profile picture path in the database
	var dbUser models.User
	if err := dbUser.FindByID(user.ID); err != nil {
		return "", fmt.Errorf("user not found: %w", err)
	}

	dbUser.ProfilePicture = filePath
	if err := dbUser.Update(); err != nil {
		return "", fmt.Errorf("failed to update user profile picture: %w", err)
	}

	return "Profile picture uploaded successfully!", nil
}

// Hello is the resolver for the hello field.
func (r *queryResolver) Hello(ctx context.Context) (string, error) {
	user := auth.ForContext(ctx)
	if user == nil {
		return "", fmt.Errorf("unauthorised: user not logged in")
	}

	return fmt.Sprintf("Hello, %v", user.Username), nil
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, username string) (*model.User, error) {
	// First check if the requesting user is authenticated
	contextUser := auth.ForContext(ctx)
	if contextUser == nil {
		return nil, fmt.Errorf("unauthorised: user not logged in")
	}

	// Fetch the user from the database using the username
	var dbUser models.User
	if err := dbUser.FindByUsername(username); err != nil {
		return nil, fmt.Errorf("user not found: %w", err)
	}

	// Map the database user to the GraphQL model
	return &model.User{
		ID:             dbUser.ID.String(),
		Name:           dbUser.Name,
		Username:       dbUser.Username,
		Email:          dbUser.Email,
		ProfilePicture: dbUser.ProfilePicture,
	}, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
