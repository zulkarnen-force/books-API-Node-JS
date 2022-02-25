# Books API

This API adalah fire.


## BASE API

```url
http://localhost:3000
```



## Get Books

```http
GET /books
```

### Query Params `optional`

```http
GET /books?sort=values
```

| Value | Description |
| :---- | :---- |
| title |sorting books by  title |
| year | sorting books by year |


### **Example Response**


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

# Normalisasi


<table>
<tr>
    <th>Book</th><th>Author</th><th>Publisher</th></tr>
<tr><td>

   

| key      | column | type     |
| :---:        |    :---  |          :--- |
| PK      | book_id       |    varchar|
|    | isbn        | varchar     |
|    | pages        | integer     |
|    | year       | integer     |
|   FK | author_id        | varchar     |
|  FK  | publisher_id        | varchar      |


</td><td>


| key      | column | type     |
| :---:        |    :---  |          :--- |
| PK      | author_id       |  varchar  |
|    | name        | varchar    |
|    | created_at        | TEXT       |
|    | updated_at        | TEXT       |


</td><td>


| key      | column | type     |
| :---:        |    :---  |          :--- |
| PK      | publisher_id       |  varchar |
|    | name        | varchar   |
|    | city        | varchar      |
|    | created_at        | TEXT       |
|    | updated_at        | TEXT       |

</td></tr></table>
    
    
 # Challenge
 
 # Get Details of Authors
 
To get details information authors using id of author
    
```http
GET /authors/{id}
```

## Example Request
```http 
GET /authors/AUT-823Br
```

## Example Response

```json
{
    "success": true,
    "code": 200,
    "status": "OK",
    "message": "detail of author with id AUT-823Br",
    "data": {
        "author": {
            "author_id": "AUT-823Br",
            "name": "Andrea Hirata",
            "created_at": "25/2/2022 10.28.52",
            "updated_at": "25/2/2022 10.28.52",
            "countBooks": 3
        },
        "books": [
            {
                "id": "book-2010RhWrR",
                "title": "Laskar Pelangi",
                "pages": 200
            },
            {
                "id": "book-2009JCO8P",
                "title": "Laskar Bulan",
                "pages": 185
            },
            {
                "id": "book-2021KmlTx",
                "title": "Laskar Ksatria",
                "pages": 200
            }
        ]
    }
}
```



 # Get Details of Publishers
 
To get details information Publishers using id of publisher

```http
GET /publisher/{id}
```

## Example Request

```http
GET /publishers/PUB-3h20a
```


## Example Response

```json
{
    "success": true,
    "code": 200,
    "status": "OK",
    "message": "detail of publisher with id PUB-3h20a",
    "data": {
        "publisher": {
            "id": "PUB-3h20a",
            "name": "GM Media",
            "city": "Jakarta",
            "countBooks": 3,
            "books": [
                {
                    "book_id": "book-2010RhWrR",
                    "title": "Laskar Pelangi",
                    "pages": 200,
                    "name": "Andrea Hirata"
                },
                {
                    "book_id": "book-2009JCO8P",
                    "title": "Laskar Bulan",
                    "pages": 185,
                    "name": "Andrea Hirata"
                },
                {
                    "book_id": "book-2021KmlTx",
                    "title": "Laskar Ksatria",
                    "pages": 200,
                    "name": "Andrea Hirata"
                }
            ]
        }
    }
}
```
