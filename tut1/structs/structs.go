package main

import "fmt"

// struct defintion
type Vertex struct {
	X int
	Y int
}

// struct literals
var (
	v1 = Vertex{1, 2}  // has type vertex
	v2 = Vertex{X: 1}  // {1,0}
	v3 = Vertex{}      // {0,0}
	p  = &Vertex{1, 2} // has type *Vertex
)

func main() {

	// access members of the struct
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X)

	// pointers to structs
	p := &v
	p.Y = 3
	fmt.Println(v)

	// struct literals
	fmt.Println(v1, p, v2, v3)
}
