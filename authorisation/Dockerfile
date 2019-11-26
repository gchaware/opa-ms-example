FROM golang:1.13.4-alpine3.10 as builder
RUN mkdir /go/src/authorisation
RUN apk add git
RUN go get github.com/gorilla/mux
COPY . /go/src/authorisation
WORKDIR /go/src/authorisation
RUN go build -o /go/bin/authorisation .

FROM alpine:latest
RUN mkdir /authorisation
WORKDIR /authorisation
COPY --from=builder /go/bin/authorisation .
RUN chmod 755 authorisation
CMD ["./authorisation"]