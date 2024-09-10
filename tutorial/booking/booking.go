package booking

import "fmt"

type User struct {
	FirstName   string
	LastName    string
	Email       string
	UserTickets uint
}

var remainingTickets uint = 50
var bookings = make(map[string]User)

func GreetUsers() {
	fmt.Println("Welcome to the Go Conference booking system!")
}

func BookTicket(firstName, lastName, email string, userTickets uint) {
	user := User{firstName, lastName, email, userTickets}
	bookings[email] = user
	remainingTickets -= userTickets
	fmt.Printf("Thank you %v %v for booking %v tickets. You will receive a confirmation email at %v \n", firstName, lastName, userTickets, email)
}

func RemainingTickets() uint {
	return remainingTickets
}
