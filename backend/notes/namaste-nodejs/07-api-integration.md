## Questions

1. What is the purpose of the express.json() middleware? It converts incoming JSON payloads into JavaScript objects.
2. Why do we place express.json() inside app.use()? Any middleware passed to `app.use()` applies globally to all routes unless a specific path is provided.
3. What is middleware? It is code you write once and can reuse across multiple routes or requests.
4. When using findOne(), does it return the newest or oldest document? If no conditions are passed, it returns an arbitrary document.
5. What is the difference between PATCH and PUT methods?
6. If you pass parameters not defined in the schema, will it throw an error? No, they are ignored, as seen in the patch API example.
