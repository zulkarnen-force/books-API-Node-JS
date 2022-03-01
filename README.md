# Books API

This API adalah fire 🔥


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
    
    
## Base API

```url
http://localhost:3000
```
    
## Create New Author
To create information of author

```http
POST /authors
```

## Example 

### Request
```json
{
    "name": "Joko Pinurbo"
}
```


### Response

```http
201 Created
```

```json
{
    "success": true,
    "code": 201,
    "status": "created",
    "message": "author created successfully",
    "data": {
        "author": {
            "id": "AUT-JPpoI"
        }
    }
}
```


## Create New Publisher

To create information of Publisher

```http
POST /publishers
```

## Example 

### Request
```json
{
    "name": "Mojok.co",
    "city": "Yogyakarta"  
}
```


### Response

```http
201 Created
```

```json
{
    "success": true,
    "code": 201,
    "status": "created",
    "message": "publisher created successfully",
    "data": {
        "publisher": {
            "id": "PUB-Co5_B"
        }
    }
}
```


## Create New Book

To create information of Publisher

```http
POST /books
```

## Example 

### Request
```json
{
    "title": "Sarapan Pagi Penuh Dusta",
    "isbn":  "9786021318",
    "pages": 140,
    "year": 2004,
    "author_id": "AUT-33Fx5",
    "publisher_id": "PUB-a1azv" 
}
```


### Response

```http
201 Created
```

```json
{
    "success": true,
    "code": 201,
    "status": "created",
    "message": "book created successfully",
    "data": {
        "book": {
            "id": "book-2004c4EWu"
        }
    }
}
```


## Get Authors

To resquest data Authors

```http
GET /authors
```

## Example 

### Response

```http
200 OK
```

```json
{
    "success": true,
    "data": {
        "authors": [
            {
                "author_id": "AUT-PWcNV",
                "name": "Eka Kurniawan",
                "created_at": "25/2/2022 09.31.16",
                "updated_at": "25/2/2022 09.31.16"
            },
            {
                "author_id": "AUT-VTrwP",
                "name": "Jiggzy",
                "created_at": "25/2/2022 09.32.34",
                "updated_at": "25/2/2022 09.32.34"
            },
            {
                "author_id": "AUT-ehqzg",
                "name": "Rintik Sedu",
                "created_at": "25/2/2022 09.32.49",
                "updated_at": "25/2/2022 09.32.49"
            }
        ]
    }
}
```


## Get Publishers

To request data publishers
```http
GET /publishers
```

## Example 

### Response

```http
200 OK
```

```json
{
    "success": true,
    "data": {
        "publishers": [
            {
                "publisher_id": "PUB-a1azv",
                "name": "Mojok",
                "city": "Yogyakarta",
                "created_at": "25/2/2022 08.54.21",
                "updated_at": "25/2/2022 08.54.21"
            },
            {
                "publisher_id": "PUB-3h20a",
                "name": "GM Media",
                "city": "Jakarta",
                "created_at": "25/2/2022 08.54.52",
                "updated_at": "25/2/2022 08.54.52"
            },
            {
                "publisher_id": "PUB-YglBI",
                "name": "BIP",
                "city": "Jakarta",
                "created_at": "25/2/2022 14.20.01",
                "updated_at": "25/2/2022 14.20.01"
            }
        ]
    }
}
```


## Get Books

To request data publishers
```http
GET /publishers
```

## Example 

### Response

```http
200 OK
```

```json
{
    "success": true,
    "data": {
        "books": [
            {
                "id": "book-2020DiGey",
                "title": "Cinta Tak Pernah Tepat Waktu",
                "authorName": "Puthut EA"
            },
            {
                "id": "book-2021KmlTx",
                "title": "Laskar Ksatria",
                "authorName": "Andrea Hirata"
            },
            {
                "id": "book-2009JCO8P",
                "title": "Laskar Bulan",
                "authorName": "Andrea Hirata"
            },
            {
                "id": "book-2010RhWrR",
                "title": "Laskar Pelangi",
                "authorName": "Andrea Hirata"
            }
        ]
    }
}
```

 # Challenge
 
 ## Get Details of Authors
 
To get details information authors using id of author
    
```http
GET /authors/{id}
```

## Example

## Request
```http 
GET /authors/AUT-823Br
```

## Response

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



 ## Get Details of Publishers
 
To get details information Publishers using id of publisher

```http
GET /publisher/{id}
```

## Example

## Request

```http
GET /publishers/PUB-3h20a
```


## Response

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



# Errors Handling

## Not Matches URL


## Example

```http
GET /localhost:3000/penulis
```

## Request
```json
{
    "errors": {
        "code": 404,
        "message": "page not found",
        "detail": "page /penulis not found"
    },
    "links": {
        "base": "http://localhost:3000"
    }
}
```


## Validate Body Request

## Example

```http
POST /books
```

### Request 

```json
{
    "title": 16,
    "isbn":  "9786021318",
    "pages": 140,
    "year": 2004,
    "author_id": "AUT-33Fx5",
    "publisher_id": "PUB-a1azv" 
}
```

### Response 

```json
{
    "errors": {
        "code": 400,
        "status": "bad request",
        "type": "ValidationError",
        "message": "\"title\" must be a string",
        "detail": "replace value 16 with string.base"
    }
}
```



