// maps are like struct literals but keys are needed

package main

import (
	"fmt"

	"strings"

	"golang.org/x/tour/wc"
)

type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

// exercise
func WordCount(s string) map[string]int {
	// split the string into words
	words := strings.Fields(s)

	// create a map to store the word counts
	wordCounts := make(map[string]int)

	// iterate through each word
	for _, word := range words {
		wordCounts[word]++
	}

	return wordCounts
}

func main() {
	fmt.Println(m)

	// to create a map
	my_map := make(map[string]int)

	my_map["hello"] = 1
	my_map["world"] = 2

	fmt.Println(my_map)

	my_map["new"] = 42
	fmt.Println("the new value: ", my_map["new"])

	my_map["new"] = 43
	fmt.Println("the new value: ", my_map["new"])

	delete(my_map, "new")
	fmt.Println("the new value: ", my_map["new"])

	v, ok := my_map["new"]
	fmt.Println("The value: ", v, "Present? ", ok)

	// solve exercise
	wc.Test(WordCount)
}
