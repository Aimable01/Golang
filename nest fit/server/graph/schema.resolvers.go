package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.60

import (
	"context"
	"fmt"

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

// Hello is the resolver for the hello field.
func (r *queryResolver) Hello(ctx context.Context) (string, error) {
	user := auth.ForContext(ctx)
	if user == nil {
		return "", fmt.Errorf("unauthorised: user not logged in")
	}

	return fmt.Sprintf("Hello, %v", user.Username), nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
