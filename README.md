# peermedical-api
Peer Medical - Assessment

### Pre-Requisites
- MongoDB
- NodeJS

### Build and run peermedical-api
1. Clone the repository.
2. Create `.env` file based on `.env.example` file.
3. Install npm dependencies: `$ npm install`.
4. Run! `$ npm run dev`.

### Methods
##### Notes
- To authenticate the user pass the token into a header with name `Authorization`.
- `application/json` and `application/x-www-form-urlencoded` accepted.
### `GET` - `/users`
Get users.
```
curl "http://localhost:3000/users" -H "Authorization: 5CD4ED173E1C95FE763B753A297D5" 
```

### `POST` - `/users`
Create user.
```
curl -XPOST -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' -H "Content-type: application/json" -d '{"name": "Gary Martin", "avatar": "https://scontent.faep9-1.fna.fbcdn.net/v/t31.0-8/18319336_768394413320390_6488937265712347698_o.jpg"}' 'http://localhost:3000/users'
```

### `GET` - `/articles`
Get articles. You can pass an optional query param named `tags` to filter.
```
curl "http://localhost:3000/articles?tags=pop&tags=rock" -H "Authorization: 5CD4ED173E1C95FE763B753A297D5" 
```

### `POST` - `/articles`
Create an article.
```
curl -XPOST -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' -H "Content-type: application/json" -d '{"userId": "5d654ffd5bea091f6c600fb9","title": "Tips to Enhance the Performance of Your React App","text": "Lorem Ipsum","tags": ["accion","pop"]}' 'http://localhost:3000/articles'
```

### `PATCH` - `/articles/:id`
Modify an article.
```
curl -XPATCH -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' -H "Content-type: application/json" -d '{"tags": ["accion","pop"],"userId": "5d654ffd5bea091f6c600fb9","title": "Introduction to Internet of Things","text": "Lorem Ipsum"}' 'http://localhost:3000/articles/5d6551565bea091f6c600fbd' 
```

### `DELETE` - `/articles/:id`
Delete an article.
```
curl -XDELETE -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' -H "Content-type: application/json" 'http://localhost:3000/articles/5d6551565bea091f6c600fbd' 
```