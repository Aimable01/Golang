package main

import (
	"fmt"
	"time"
	"tutorial/booking"
	"tutorial/user"
)

func main() {
	booking.GreetUsers()

	for {
		firstName, lastName, email, userTickets := user.GetUserInput()

		go booking.BookTicket(firstName, lastName, email, userTickets)

		time.Sleep(1 * time.Second)

		if booking.RemainingTickets() == 0 {
			fmt.Println("All tickets are sold out")
			break
		}
	}
}
