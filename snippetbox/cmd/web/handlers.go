package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strconv"
)

func home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w,r)
		return
	}

	ts,err := template.ParseFiles("./ui/html/home.page.tmpl")

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	err = ts.Execute(w,nil)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
	
	w.Write([]byte("Hello from snippetbox"))
}

func showSnippet(w http.ResponseWriter, r *http.Request) {
	id,err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil || id < 1 {
		http.NotFound(w,r)
		return
	}

	fmt.Fprintf(w, "Display a specific snippet with ID %v...", id)

}

func createSnippet(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.Header().Set("Allow","POST")
		http.Error(w , "Method not allowed" , http.StatusMethodNotAllowed)
		return
	}

	w.Write([]byte("Create a new snippet.."))
}