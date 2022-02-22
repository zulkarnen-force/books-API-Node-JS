# Books API

This API adalah fire.


## BASE API

`http://localhost:3000`



## Get Books

`GET /books`

### Query Params `optional`

`GET /books?sort=values`

| Value | Description |
| --- | ----------- |
| title |sorting books with  title |
| year | sorting books with year |

**Example Response**


```json
{
    "success": true,
    "data": {
        "books": [
            {
                "id": "book-1999lgzvx",
                "title": "REST API with Node JS and PostgreSQL for dummies",
                "authors": [
                    "zulkarnen",
                    "jokowi"
                ],
                "isbn": 1326548,
                "pages": 500,
                "year": 1999,
                "created_at": "22/2/2022 12.18.02",
                "updated_at": "22/2/2022 12.18.02"
            }
        ]
    }
}
```



