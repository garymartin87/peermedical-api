# peermedical-api
Peer Medical - Assessment

### Pre-Requisites
- MongoDB
- NodeJS

### Build and run peermedical-api
1. Clone the repository.
2. Create `.env` file based on `.env.example` file.
3. Install npm dependencies: `$ npm install`.

### Methods
#####Notes
- To authenticate the user pass the token into a header with name `Authorization`.
- `application/json` and `application/x-www-form-urlencoded` accepted.
### `GET` - `/users`
Get users.
```
curl "http://localhost:3000/users" \
	-H "Authorization: 5CD4ED173E1C95FE763B753A297D5" 
```

### `POST` - `/users`
Create user.
```
curl "http://localhost:3000/users" \
	-X POST \
	-d "{\n\t\"name\": \"Gary Martin\",\n\t\"avatar\": \"https://scontent.faep9-1.fna.fbcdn.net/v/t31.0-8/18319336_768394413320390_6488937265712347698_o.jpg\"\n}" \
	-H "Content-Type: application/json" \
	-H "Authorization: 5CD4ED173E1C95FE763B753A297D5" 
```

### `GET` - `/articles`
Get articles. You can pass an optional query param named `tags` to filter.
```
curl "http://localhost:3000/articles?tags=pop&tags=rock" \
	-H "Authorization: 5CD4ED173E1C95FE763B753A297D5" 
```

### `POST` - `/articles`
Create an article.
```
curl "http://localhost:3000/articles" \
	-X POST \
	-d "{\n  \"userId\": \"5d652dbdba03bf0f498f139c\",\n  \"title\": \"My own article\",\n  \"text\": \"Lorem Ipsum\",\n  \"tags\": [\n    \"rock\",\n    \"pop\"\n  ]\n}" \
	-H "Authorization: 5CD4ED173E1C95FE763B753A297D5" \
	-H "Content-Type: application/json" 
```

### `PATCH` - `/articles/:id`
Modify an article.
```
curl "http://localhost:3000/articles/5d652dd5ba03bf0f498f139e" \
	-X PATCH \
	-d "{\n  \"tags\": [\n    \"accion\",\n    \"pop\",\n    \"dance\"\n  ],\n  \"userId\": \"5d652dc3ba03bf0f498f139d\",\n  \"title\": \"MODIFIED\",\n  \"text\": \"Lorem Ipsum\"\n}" \
	-H "Authorization: 5CD4ED173E1C95FE763B753A297D5" \
	-H "Content-Type: application/json" 
```

### `DELETE` - `/articles/:id`
Delete an article.
```
curl "http://localhost:3000/articles/5d652dd5ba03bf0f498f139e" \
	-X DELETE \
	-H "Authorization: 5CD4ED173E1C95FE763B753A297D5" 
```