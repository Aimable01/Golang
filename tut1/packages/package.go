package main

import (
	"fmt"
	"math"
	"math/rand"
)

func main() {
	fmt.Printf("My favorite number is: %d", rand.Intn(10)) // this will return a random number between (0,10)

	fmt.Println(math.Pi) // all exported names should begin with a capital letter
}
