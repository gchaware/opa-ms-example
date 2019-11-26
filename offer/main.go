package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type offer struct {
	OfferID  string `json:"offerid"`
	Title    string `json:"title"`
	Customer string `json:"customerid"`
	Segment  string `json:"segment"`
	Comments string `json:"comments"`
}

type allOffers = []offer

var offers = allOffers{
	{
		OfferID:  "1000",
		Title:    "New Office in LA",
		Customer: "1",
		Segment:  "LE",
		Comments: "Demo Offer # 1",
	},
}

func createOffer(w http.ResponseWriter, r *http.Request) {
	var newOffer offer
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Invalid Format")
	}
	json.Unmarshal(reqBody, &newOffer)
	newOffer.OfferID = strconv.Itoa(rangeIn(1000, 10000))
	offers = append(offers, newOffer)
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(newOffer)
}
func getAllOffers(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(offers)
}

func getOffer(w http.ResponseWriter, r *http.Request) {
	offerID := mux.Vars(r)["id"]

	for _, singleOffer := range offers {
		if singleOffer.OfferID == offerID {
			json.NewEncoder(w).Encode(singleOffer)
		}
	}
}

func updateOffer(w http.ResponseWriter, r *http.Request) {
	offerID := mux.Vars(r)["id"]
	var updatedOffer offer

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Invalid Format")
	}
	json.Unmarshal(reqBody, &updatedOffer)

	for i, singleOffer := range offers {
		if singleOffer.OfferID == offerID {
			singleOffer.Title = updatedOffer.Title
			singleOffer.Comments = updatedOffer.Comments
			offers = append(offers[:i], singleOffer)
			json.NewEncoder(w).Encode(singleOffer)
		}
	}
}

func deleteOffer(w http.ResponseWriter, r *http.Request) {
	offerID := mux.Vars(r)["id"]
	offerIndex := getIndex(offers, offerID)
	updatedList := make([]offer, 0)
	updatedList = append(updatedList, offers[:offerIndex]...)
	updatedList = append(updatedList, offers[offerIndex+1:]...)
	offers = updatedList
}

func getIndex(offers []offer, offerID string) int {
	for i, singleOffer := range offers {
		if singleOffer.OfferID == offerID {
			return i
		}
	}
	return -1
}

func rangeIn(low, hi int) int {
	return low + rand.Intn(hi-low)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/offer", createOffer).Methods("POST")
	router.HandleFunc("/offers", getAllOffers).Methods("GET")
	router.HandleFunc("/offer/{id}", getOffer).Methods("GET")
	router.HandleFunc("/offer/{id}", updateOffer).Methods("PATCH")
	router.HandleFunc("/offer/{id}", deleteOffer).Methods("DELETE")
	log.Fatal(http.ListenAndServe(":8080", router))
}
