package main

import "fmt"

func main() {

	// variables
	conferenceName := "Go Conference"
	const conferenceTickets int = 50
	var remainingTickets uint = 50

	// print the variable types
	fmt.Printf("Conference tickets is %T, remaining tickets is %T, conference name is %T \n", conferenceTickets, remainingTickets, conferenceName)

	fmt.Printf("Welcome to %v booking application \n",conferenceName)
	fmt.Printf("We have total of %v tickets and %v are still available \n", conferenceTickets, remainingTickets)
	fmt.Println("Get your tickets here to attend")

	// data types
	var userName string
	var userTickets int
	
	userName = "Tom"
	userTickets = 2
	fmt.Printf("User %v booked %v tickets. \n", userName,userTickets)

}