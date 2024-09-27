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
	golangDojo.ninja.level = 3
	fmt.Println(golangDojo.ninja.level)
	fmt.Println(wallace.level)

	// make use of pointers and addresses
	type addressDojo struct {
		name  string
		ninja *ninja
	}
	addressed := addressDojo{"Addressed Golang dojo", &wallace}
	fmt.Println(addressed)
	fmt.Println(*addressed.ninja)

	// use the new key word
	jonnyNew := new(ninja)
	fmt.Println(jonnyNew)
	fmt.Println(*jonnyNew)
	jonnyNew.name = "jonny"
	jonnyNew.weapons = []string{"Ninja star2"}
	fmt.Println(*jonnyNew)

	// ninja intern
	intern := ninjaIntern{"intern", 1}
	intern.sayHello()
	intern.sayName()
}

// use of functions
type ninjaIntern struct {
	name  string
	level int
}

func (ninjaIntern) sayHello() {
	fmt.Println("Hello")
}

func (n ninjaIntern) sayName() {
	fmt.Println(n.name)
}
