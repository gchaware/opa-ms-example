package httpapi.authz

default allow = false

allow {
  input.method == "POST"
  input.api == "/offer"
  token.payload.Role == "Sales"
}

allow {
  input.method == "PATCH"
  re_match("^/offer/[1-9][0-9][0-9][0-9][0-9]?$", input.api)
  token.payload.Role == "Sales"
}

allow {
  input.method == "GET"
}

allow {
  input.method == "DELETE"
  re_match("^/offer/[1-9][0-9][0-9][0-9][0-9]?$", input.api)
  token.payload.Role == "Sales Admin"
}

token = {"payload": payload} {
  [header, payload, signature] := io.jwt.decode(input.jwt)
}