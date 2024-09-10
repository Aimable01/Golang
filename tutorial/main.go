package main

import (
	"fmt"
	"strings"
)

// variables
var conferenceName = "Go Conference"
var remainingTickets uint = 50
var bookings = []string{}

const conferenceTickets int = 50

func main() {

	greetUsers()

	for {
		// ask user input
		firstName, lastName, email, userTickets := getUserInput()

		// validate input
		isValidName, isValidEmail, isValidTicketNumber := validateUserInput(firstName, lastName, email, userTickets, remainingTickets)

		// update variables
		if isValidName && isValidEmail && isValidTicketNumber {

			// book ticket
			bookTicket(&remainingTickets, userTickets, &bookings, firstName, lastName, email, conferenceName)
			fmt.Println("These are the bookings in main: ", bookings)

			firstNames := getFirstNames()
			fmt.Printf("The first names of bookings are: %v \n", firstNames)

			// check for the remaining tickets
			if remainingTickets == 0 {
				fmt.Println("Our conference is booked out. Come back next year")
				break
			}

		} else {
			if !isValidName {
				fmt.Println("First name or last name you entered is too short")
			}
			if !isValidEmail {
				fmt.Println("Email address you entered does not contain '@' sign")
			}
			if !isValidTicketNumber {
				fmt.Println("The number of tickets you entered here is invalid")
			}
		}
	}
}

func greetUsers() {
	fmt.Printf("Welcome to %v booking application \n", conferenceName)
	fmt.Printf("We have total of %v tickets and %v are still available \n", conferenceTickets, remainingTickets)
	fmt.Println("Get your tickets here to attend")
}

func getFirstNames() []string {
	firstNames := []string{}
	fmt.Println("The bookings in get frist names: ", bookings)
	for _, booking := range bookings {
		names := strings.Fields(booking)
		firstNames = append(firstNames, names[0])
	}

	return firstNames
}

func validateUserInput(firstName string, lastName string, email string, userTickets uint, remainingTickets uint) (bool, bool, bool) {
	isValidName := len(firstName) >= 2 && len(lastName) >= 2
	isValidEmail := strings.Contains(email, "@")
	isValidTicketNumber := userTickets > 0 && userTickets <= remainingTickets

	return isValidName, isValidEmail, isValidTicketNumber
}

func getUserInput() (string, string, string, uint) {
	var firstName string
	var lastName string
	var email string
	var userTickets uint

	fmt.Printf("Enter your first name: ")
	fmt.Scan(&firstName)

	fmt.Printf("Enter your last name: ")
	fmt.Scan(&lastName)

	fmt.Printf("Enter your email: ")
	fmt.Scan(&email)

	fmt.Printf("Enter your number of tickets: ")
	fmt.Scan(&userTickets)

	return firstName, lastName, email, userTickets

}

func bookTicket(remainingTickets *uint, userTickets uint, bookings *[]string, firstName string, lastName string, email string, conferenceName string) {
	*remainingTickets = *remainingTickets - userTickets
	*bookings = append(*bookings, firstName+" "+lastName)

	fmt.Printf("Thank you %v %v for booking %v tickets. You will receive a confirmation email at %v \n", firstName, lastName, userTickets, email)
	fmt.Printf("%v tickets remaining for %v \n", *remainingTickets, conferenceName)
}
