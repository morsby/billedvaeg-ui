package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/morsby/billedvaeg"
)

func Handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var input billedvaeg.JSONInput
	decoder := json.NewDecoder(strings.NewReader(request.Body))
	err := decoder.Decode(&input)
	if err != nil {
		panic(err)
	}

	doc := billedvaeg.New()
	doc.People = input.People
	positions := make(map[int]*billedvaeg.Position)
	for _, pos := range input.Positions {
		positions[pos.ID] = pos
	}
	doc.Positions = positions

	err = doc.Generate(input.Sort)
	if err != nil {
		panic(err)
	}

	var buf bytes.Buffer
	encoder := base64.NewEncoder(base64.StdEncoding, &buf)

	err = doc.PDF.OutputAndClose(encoder)
	if err != nil {
		panic(err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/pdf"},
		Body:       buf.String(),
	}, nil
}

func main() {
	// Initiate AWS Lambda handler
	lambda.Start(Handler)
}
