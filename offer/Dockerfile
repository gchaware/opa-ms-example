FROM golang:1.13.4-alpine3.10 as builder
RUN mkdir /go/src/offer
RUN apk add git
RUN go get github.com/gorilla/mux
COPY . /go/src/offer
WORKDIR /go/src/offer
RUN go build -o /go/bin/offer .

FROM alpine:latest
RUN mkdir /offer
WORKDIR /offer
COPY --from=builder /go/bin/offer .
RUN chmod 755 offer
CMD ["./offer"]