package models

type WrongCredentialsError struct{}

func (m *WrongCredentialsError) Error() string {
	return "Invalid email/username or password"
}
