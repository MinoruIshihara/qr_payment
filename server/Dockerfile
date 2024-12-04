FROM golang:1.23.2-alpine

COPY ./src /go/src
RUN gofmt /go/src/**.go
WORKDIR /go/src

RUN go install github.com/air-verse/air@latest
RUN go mod tidy
RUN go build

EXPOSE 8080
