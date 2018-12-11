const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
    response.end(`apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${process.env.ca}
    server: ${process.env.url}
  name: hosted
contexts:
- context:
    cluster: hosted
    user: octopususer
  name: hosted
current-context: hosted
kind: Config
preferences: {}
users:
- name: octopususer
  user:
    auth-provider:
      config:
        client-id: "get me from lastpass"
        client-secret: "get me from lastpass"
        id-token: ${request.headers["authorization"].substring("Bearer ".length)}
        idp-issuer-url: https://accounts.google.com
      name: oidc`)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})