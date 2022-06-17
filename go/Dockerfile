FROM golang:1.18-alpine3.16 AS builder

WORKDIR /usr/src/app

COPY . .
RUN go build -v -o /usr/local/bin/app ./app.go

FROM scratch

COPY --from=builder /usr/local/bin/app /

CMD ["/app"]