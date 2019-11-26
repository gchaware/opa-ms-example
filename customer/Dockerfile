FROM golang:1.13.4-alpine3.10 as builder
RUN mkdir /go/src/customer
RUN apk add git
RUN go get github.com/gorilla/mux
COPY . /go/src/customer
WORKDIR /go/src/customer
RUN go build -o /go/bin/customer .

FROM alpine:latest
RUN mkdir /customer
WORKDIR /customer
COPY --from=builder /go/bin/customer .
RUN chmod 755 customer
CMD ["./customer"]