FROM golang:1.13.4-alpine3.10 as builder
RUN mkdir /go/src/authorization
RUN apk add git
RUN go get github.com/gorilla/mux
COPY . /go/src/authorization
WORKDIR /go/src/authorization
RUN go build -o /go/bin/authorization .

FROM alpine:latest
RUN mkdir /authorization
WORKDIR /authorization
COPY --from=builder /go/bin/authorization .
RUN chmod 755 authorization
CMD ["./authorization"]
