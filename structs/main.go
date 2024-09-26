package main

import "fmt"

func main() {

	// ninja struct
	type ninja struct {
		name    string
		weapons []string
		level   uint
	}

	wallace := ninja{name: "Wallace"}
	wallace = ninja{
		name:    "Wallace",
		weapons: []string{"Ninja start"},
		level:   1,
	}

	fmt.Println(wallace)

	// the dojo struct
	type dojo struct {
		name  string
		ninja ninja
	}

	golangDojo := dojo{
		name:  "Golang Dojo",
		ninja: wallace,
	}
	fmt.Println(golangDojo)
}
