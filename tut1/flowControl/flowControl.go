package main

import (
	"fmt"
	"runtime"
)

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
	// for {
	// }

	// if statements
	if sum > 10 {
		fmt.Println("The sum is greater than 10")
	}

	// switch statements
	fmt.Println("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("macOS")
	case "linux":
		fmt.Println("Linux")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}

	// defer statements, they are not executed until the surrounding function returns
	// they are stacked if many, LIFO
	defer fmt.Println("world")

	fmt.Println("hello")
}
