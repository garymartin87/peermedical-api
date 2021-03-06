# peermedical-api
Peer Medical - Assessment

### Prerequisites
- Node.js
- MongoDB

### Build and run peermedical-api
1. Clone the repository.
2. Create `.env` file based on `.env.example` file.
3. Install npm dependencies: `$ npm install`.
4. Run! `$ npm run dev`.

### Run tests
Run `$ ./node_modules/mocha/bin/mocha`.

### Methods
##### Headers
- `Authorization`: With the token defined into `.env` file (in the key `API_TOKEN`). 
- `Content-Type`: `application/json` | `application/x-www-form-urlencoded` both are accepted.


### `GET` - `/users`
Get users.

##### Curl example
```
curl -X GET \
    'http://localhost:3000/users' \
    -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' 
```

### `POST` - `/users`
Create user.

##### Body example (`application/json`)
```
{
    "name": "Gary Martin",
    "avatar": "https://scontent.faep9-1.fna.fbcdn.net/v/t31.0-8/18319336_768394413320390_6488937265712347698_o.jpg"
}
```

##### Curl example
```
curl -X POST \
    'http://localhost:3000/users' \
    -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' \
    -H "Content-type: application/json" \
    -d '{
        "name": "Gary Martin", 
        "avatar": "https://scontent.faep9-1.fna.fbcdn.net/v/t31.0-8/18319336_768394413320390_6488937265712347698_o.jpg"
    }'
```

### `GET` - `/articles`
Get articles. You can pass an optional query params (0 or more) named `tags` to filter.

##### Request URL example
`http://localhost:3000/articles?tags=development&tags=express`

##### Curl example
```
curl -X GET \
    'http://localhost:3000/articles?tags=development&tags=express' \
    -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5'
```

### `POST` - `/articles`
Create an article.

##### Body example (`application/json`)
```
{
    "userId": "5d654ffd5bea091f6c600fb9",
    "title": "Tips to Enhance the Performance of Your Express Api",
    "text": "Lorem Ipsum...",
    "tags": ["development","express"]
}
```

##### Curl example
```
curl -X POST \
    'http://localhost:3000/articles' \
    -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' \
    -H 'Content-type: application/json' \
    -d '{
        "userId": "5d6fbdf3ef1a85156a5fc305",
        "title": "Tips to Enhance the Performance of Your Express Api",
        "text": "Lorem Ipsum...",
        "tags": ["development","express"]
    }'
```

### `PATCH` - `/articles/:_id`
Modify an article attributes. All parameters are optional.

##### Body example (`application/json`)
```
{
    "title": "Introduction to Redux",
    "text": "Lorem Ipsum...",
    "tags": ["development","react", "redux"]
}
```

##### Curl example
```
curl -X PATCH \
    'http://localhost:3000/articles/5d6551565bea091f6c600fbd' \
    -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' \
    -H 'Content-type: application/json' \
    -d '{
        "tags": ["development","react", "redux"],
        "title": "Introduction to Redux",
        "text": "Lorem Ipsum..."
    }' 
```

### `PUT` - `/articles/:_id`
Modify an entire article.

##### Body example (`application/json`)
```
{
    "userId": "5d654ffd5bea091f6c600fb9",
    "title": "Introduction to Redux",
    "text": "Lorem Ipsum...",
    "tags": ["development","react", "redux"]
}
```

##### Curl example
```
curl -XPUT \
    'http://localhost:3000/articles/5d6551565bea091f6c600fbd' \
    -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' \
    -H 'Content-type: application/json' \
    -d '{
        "tags": ["development","react", "redux"],
        "userId": "5d654ffd5bea091f6c600fb9",
        "title": "Introduction to Redux","text": "Lorem Ipsum..."
    }' 
```

### `DELETE` - `/articles/:_id`
Delete an article.

##### Curl example
```
curl -X DELETE \
    'http://localhost:3000/articles/5d6fc0d6ef1a85156a5fc310' \
    -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' \
    -H 'Content-type: application/json'  
```