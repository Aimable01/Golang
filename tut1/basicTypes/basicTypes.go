package main

import (
	"fmt"
	"math/cmplx"
)

var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(5 + 12i)
)

func main() {
	fmt.Printf("Type: %T, value: %v\n", ToBe, ToBe)
	fmt.Printf("Type: %T, value: %v\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T, value: %v\n", z, z)

	// zero values
	// 0 for numeric values, "" for strings and false for booleans
	var a int
	var b string
	var c bool
	var d float64
	fmt.Printf("%v,%v,%v,%v\n", a, b, c, d)

	// type conversions T(v) --> converts v to the type T
	x := 14.23
	y := float64(x)
	z := uint(y)
	fmt.Println(x, y, z)

	// type inference, a variable's type is inferred from the right side (either type or value it has)
	f := 3     // int
	ff := 3.23 // float64
	fmt.Printf("%T, %T\n", f, ff)
}
