package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func swap(a, b string) (string, string) {
	return b, a
}

// named return values
func namedReturn(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return // this is known as a naked return
}

func main() {
	fmt.Println(add(10, 20))
	fmt.Println(swap("apple", "banana"))
	fmt.Println(namedReturn(30))
}
