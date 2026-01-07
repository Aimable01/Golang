package main

import "fmt"

func main() {
	// go has only the for looping construct
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)

	// the init and post statements are optional
	// here it has become the while
	sum = 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)

	// infinite loop
	for {
	}
}
