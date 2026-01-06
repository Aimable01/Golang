package main

import "fmt"

var c, python, java bool

// variable initializers
var a, b int = 1, 2

func main() {
	var i int
	fmt.Println(i, c, python, java)

	// var initializers
	var c, d = true, "no!" // here the type can be ommitted and the var will take that of the initializr
	fmt.Println(a, b, c, d)

	// short variable declaration (:=)
	// !! only works inside functions, outside a functions only `var` and `func` are used
	short_var := "this is my short var"
	fmt.Println(short_var)
}
