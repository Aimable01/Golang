package main

import "fmt"

// the are declared with const keyword and cannot be declared with := syntax
const PI = 3.14

func main() {
	const truth = false
	fmt.Println(PI, truth)
}
