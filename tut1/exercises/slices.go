package main

import "golang.org/x/tour/pic"

func Pic(dx, dy int) [][]uint8 {
	// creat the outer slice of length dy
	result := make([][]uint8, dy)

	// loop through each row
	for y := 0; y < dy; y++ {
		// create the inner slice for each row with length dx
		row := make([]uint8, dx)

		// fill each pixel in the row
		for x := 0; x < dx; x++ {
			value := uint8(x ^ y)

			row[x] = value
		}

		// assign the row to the result
		result[y] = row
	}

	return result
}

func main() {
	pic.Show(Pic)
}
