package main

// slices are like references to arrays and they are dynamic not fixed size like the arrays
// they don't store any data, they describe a section of an underlying array

import "fmt"

func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s)

	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names)

	a := names[0:1]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)

	// slice literals
	q := []int{1, 2, 3, 4}
	st := []struct {
		a int
		b bool
	}{
		{1, true},
		{2, false},
	}
	fmt.Println(q)
	fmt.Println(st)

	// slice defaults
	fmt.Println(primes[:4])

	// slice length and capacity
	newSlice := []int{2, 3, 5, 7, 11, 12}
	fmt.Println(newSlice)

	// slice the slice to give it zero length
	newSlice = newSlice[:0]
	fmt.Println(newSlice)

	// extend its length
	newSlice = newSlice[:4]
	fmt.Println(newSlice)

	// drop its first two values
	newSlice = newSlice[:2]
	fmt.Println(newSlice)

	// nil slices
	var nilSlice []int
	fmt.Println(nilSlice, len(nilSlice), cap(nilSlice))
	if nilSlice == nil {
		fmt.Println("nil!")
	}
}
