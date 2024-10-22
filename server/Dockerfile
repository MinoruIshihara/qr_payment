FROM golang:1.23.2-alpine

COPY ./src /go/src
RUN gofmt /go/src/**.go
WORKDIR /go/src

RUN go build

EXPOSE 8080
