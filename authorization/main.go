package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type opaResult struct {
	Allow bool `json:"allow"`
}
type opaResponse struct {
	DecisionID string    `json:"decision_id"`
	Result     opaResult `json: result`
}

type inputJSONData struct {
	Method string `json:"method"`
	API    string `json:"api"`
	Jwt    string `json:"jwt"`
}

type opaRequest struct {
	Input inputJSONData `json:"input"`
}

func authRequest(w http.ResponseWriter, r *http.Request) {
	var apiEndPoint = r.Header.Get("X-Original-Uri")
	var authHeader = r.Header.Get("Authorization")
	var reqMethod = r.Header.Get("X-Original-METHOD")
	var jwt = strings.Split(authHeader, "Bearer ")[1]

	varInputJSONData := &inputJSONData{API: apiEndPoint, Method: reqMethod, Jwt: jwt}
	varOpaRequest := &opaRequest{Input: *varInputJSONData}
	jsonValue, _ := json.Marshal(varOpaRequest)
	fmt.Println(string(jsonValue))
	response, err := http.Post("http://localhost:8181/v1/data/httpapi/authz", "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		fmt.Printf("OPA request failed with error %s\n", err)
		w.WriteHeader(http.StatusForbidden)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))

		var res = new(opaResponse)
		err = json.Unmarshal(data, &res)
		if err != nil {
			fmt.Println("Error unmarshalling OPA response")
		}
		if !res.Result.Allow {
			w.WriteHeader(http.StatusForbidden)
		} else {
			w.WriteHeader(http.StatusOK)
		}
	}
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/authorize", authRequest).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", router))
}
