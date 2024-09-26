package server

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/markbates/goth/gothic"
)

func (s *FiberServer) RegisterFiberRoutes() {
	s.App.Get("/", s.HelloWorldHandler)

	s.App.Get("/health", s.healthHandler)

	s.App.Get("/auth/{provider}/callback", s.getAuthCallbackFunction)

}

func (s *FiberServer) HelloWorldHandler(c *fiber.Ctx) error {
	resp := fiber.Map{
		"message": "Hello World",
	}

	return c.JSON(resp)
}

func (s *FiberServer) healthHandler(c *fiber.Ctx) error {
	return c.JSON(s.db.Health())
}

// the  google oauth route

func (s *FiberServer) getAuthCallbackFunction(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")

	r = r.WithContext(context.WithValue(context.Background(), "provider", provider))

	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		fmt.Fprintln(w, r)
		return
	}

	fmt.Println(user)

	http.Redirect(w, r, "http://localhost:5173", http.StatusFound)
}
