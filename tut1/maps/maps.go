// maps are like struct literals but keys are needed

package main

import "fmt"

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

func main() {
	fmt.Println(m)

	// to create a map
	my_map := make(map[string]int)

	my_map["hello"] = 1
	my_map["world"] = 2

	fmt.Println(my_map)
}
