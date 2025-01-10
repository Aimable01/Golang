package auth

import (
	"context"
	"net/http"

	database "github.com/aimable01/nestfit/internal/pkg/db/postgres"
	"github.com/aimable01/nestfit/internal/pkg/jwt"
	"github.com/aimable01/nestfit/internal/pkg/models"
)

var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

func Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")

			if header == "" {
				next.ServeHTTP(w, r)
				return
			}

			// Check if the header starts with "Bearer "
			if len(header) < 7 || header[:7] != "Bearer " {
				http.Error(w, "Invalid authorization header format", http.StatusForbidden)
				return
			}

			// Extract the actual token
			tokenStr := header[7:]
			userID, err := jwt.ParseToken(tokenStr)
			if err != nil {
				http.Error(w, "Invalid token", http.StatusForbidden)
				return
			}

			var user models.User
			db := database.DB
			if err := db.First(&user, "id = ?", userID).Error; err != nil {
				http.Error(w, "User not found", http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), userCtxKey, &user)

			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

func ForContext(ctx context.Context) *models.User {
	raw, _ := ctx.Value(userCtxKey).(*models.User)
	return raw
}
