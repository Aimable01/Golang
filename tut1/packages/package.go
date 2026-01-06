package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Printf("My favorite number is: %d", rand.Intn(10)) // this will return a random number between (0,10)
}
