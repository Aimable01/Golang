package main

import (
	"fmt"
	"strings"
)

func main() {

	// variables
	conferenceName := "Go Conference"
	const conferenceTickets int = 50
	var remainingTickets uint = 50
	bookings := []string{}

	// print the variable types
	fmt.Printf("Conference tickets is %T, remaining tickets is %T, conference name is %T \n", conferenceTickets, remainingTickets, conferenceName)

	fmt.Printf("Welcome to %v booking application \n",conferenceName)
	fmt.Printf("We have total of %v tickets and %v are still available \n", conferenceTickets, remainingTickets)
	fmt.Println("Get your tickets here to attend")

	// data types

	for {
		var firstName string
		var lastName string
		var email string
		var userTickets uint

		// ask user input
		fmt.Printf("Enter your first name: ")
		fmt.Scan(&firstName)

		fmt.Printf("Enter your last name: ")
		fmt.Scan(&lastName)

		fmt.Printf("Enter your email: ")
		fmt.Scan(&email)

		fmt.Printf("Enter your number of tickets: ")
		fmt.Scan(&userTickets)

		// validate input
		isValidName := len(firstName) >= 2 && len(lastName) >= 2
		isValidEmail := strings.Contains(email, "@")
		isValidTicketNumber := userTickets > 0 && userTickets <= remainingTickets


		// update variables
		if userTickets <= remainingTickets {
			remainingTickets = remainingTickets - userTickets
			bookings = append(bookings, firstName + " " + lastName)


			fmt.Printf("Thank you %v %v for booking %v tickets. You will receive a confirmation email at %v \n", firstName, lastName, userTickets, email)
			fmt.Printf("%v tickets remaining for %v \n", remainingTickets, conferenceName)

			firstNames := []string{}
			for _, booking := range bookings{
				names := strings.Fields(booking)
				firstNames = append(firstNames,names[0])
			} 
			fmt.Println("The first names of bookings are: ", firstNames)

			// check for the remaining tickets
			if remainingTickets == 0 {
				fmt.Println("Our conference is booked out. Come back next year")
				break
			}
			
		} else {
			fmt.Printf("We have only %v tickets remaining, so you can't book %v tickets. \n", remainingTickets, userTickets)
		}		
	}
}