# API Quick Reference

Base URL: `http://localhost:5000`

Auth: `Authorization: Bearer <jwt>`

## Auth
- `POST /api/auth/register` — `{name, email, password}` → `{token, user}`
- `POST /api/auth/login` — `{email, password}` → `{token, user}`

## Profile
- `GET /api/profile` — returns current user
- `PUT /api/profile` — `{name}` → updated profile

## Notes
- `GET /api/notes?q=&tag=&pinned=` — query + filter by tag/pinned
- `POST /api/notes` — `{title, body?, tags?, pinned?}` → note
- `PUT /api/notes/:id` — update body → note
- `DELETE /api/notes/:id` — removes note

## Postman Collection (import this JSON)
Use an environment variable `baseUrl` (default `http://localhost:5000`). Authenticated calls expect `Authorization: Bearer {{token}}`.

```json
{
  "info": {
    "name": "PrimeTrade Notes API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "url": { "raw": "{{baseUrl}}/api/auth/register", "host": ["{{baseUrl}}"], "path": ["api","auth","register"] },
            "body": { "mode": "raw", "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"user@example.com\",\n  \"password\": \"secret123\"\n}" }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "url": { "raw": "{{baseUrl}}/api/auth/login", "host": ["{{baseUrl}}"], "path": ["api","auth","login"] },
            "body": { "mode": "raw", "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"secret123\"\n}" }
          }
        }
      ]
    },
    {
      "name": "Profile",
      "item": [
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "header": [{ "key": "Authorization", "value": "Bearer {{token}}" }],
            "url": { "raw": "{{baseUrl}}/api/profile", "host": ["{{baseUrl}}"], "path": ["api","profile"] }
          }
        },
        {
          "name": "Update Profile",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Authorization", "value": "Bearer {{token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "url": { "raw": "{{baseUrl}}/api/profile", "host": ["{{baseUrl}}"], "path": ["api","profile"] },
            "body": { "mode": "raw", "raw": "{\n  \"name\": \"Updated Name\"\n}" }
          }
        }
      ]
    },
    {
      "name": "Notes",
      "item": [
        {
          "name": "List Notes",
          "request": {
            "method": "GET",
            "header": [{ "key": "Authorization", "value": "Bearer {{token}}" }],
            "url": {
              "raw": "{{baseUrl}}/api/notes?q=&pinned=",
              "host": ["{{baseUrl}}"],
              "path": ["api","notes"],
              "query": [
                { "key": "q", "value": "" },
                { "key": "pinned", "value": "" }
              ]
            }
          }
        },
        {
          "name": "Create Note",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Authorization", "value": "Bearer {{token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "url": { "raw": "{{baseUrl}}/api/notes", "host": ["{{baseUrl}}"], "path": ["api","notes"] },
            "body": { "mode": "raw", "raw": "{\n  \"title\": \"My note\",\n  \"body\": \"details\",\n  \"tags\": [\"work\"],\n  \"pinned\": true\n}" }
          }
        },
        {
          "name": "Update Note",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Authorization", "value": "Bearer {{token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "url": { "raw": "{{baseUrl}}/api/notes/{{noteId}}", "host": ["{{baseUrl}}"], "path": ["api","notes","{{noteId}}"] },
            "body": { "mode": "raw", "raw": "{\n  \"title\": \"Updated\",\n  \"body\": \"more details\",\n  \"tags\": [\"home\"],\n  \"pinned\": false\n}" }
          }
        },
        {
          "name": "Delete Note",
          "request": {
            "method": "DELETE",
            "header": [{ "key": "Authorization", "value": "Bearer {{token}}" }],
            "url": { "raw": "{{baseUrl}}/api/notes/{{noteId}}", "host": ["{{baseUrl}}"], "path": ["api","notes","{{noteId}}"] }
          }
        }
      ]
    }
  ],
  "variable": [
    { "key": "baseUrl", "value": "http://localhost:5000" },
    { "key": "token", "value": "" },
    { "key": "noteId", "value": "" }
  ]
}
```

