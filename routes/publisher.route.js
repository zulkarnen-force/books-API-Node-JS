const routePublisher = require('express').Router();
const { DatabaseError } = require('pg');
const PublisherService = require('../services/publisher.service');


let publisherService = new PublisherService();


function responseError({res, code=500, status='internal server error', message='error from internal',  detail=''})  {

   
    const errorValues = Object.assign({}, 
        code ? {code} : null,
        status ? {status}  : null,
        message ? {message}  : null,
        detail ? {detail}: null
    )
  
  
    return res.status(code).json({
      errors: errorValues
    })
  

}


function responseSuccess({res, code=200, status='OK', message='success',  detail='', data})  {

    
    console.info({data})

    const successValues = Object.assign({},
        {success: true},
        code ? {code} : null,
        status ? {status}  : null,
        message ? {message}  : null,
        detail ? {detail}: null,
        data ? {data}: null
    )
  
  
    return res.status(code).json(
      successValues
    )
  

}

// routePublisher.get('/', async (req, res) => {

//     try {
//         const books = await publisherService.getBooks();
//         res.status(200).json({
//             success: true,
//             data: {
//                 books
//             }
//         })
//     } catch (err) {
//         if (err instanceof DatabaseError) {
//             responseError({res, message: err.message})
//         }
//     }


// })


const isQuery = (query) =>  {
    const filterArr = ['title', 'year']
    return filterArr.includes(query);
}



routePublisher.get('/', async (req, res) => {

    const sort = req.query.sort;

    if (isQuery(sort)) {

        try {
            const books = await publisherService.getBooksSortBy(sort);
            res.status(200).json({
                success: true,
                data: {
                    books
                }
            })
        } catch (err) {
            if (err instanceof DatabaseError) {
                responseError({res, message: err.message})
            }
        }
        
    } else {
        try {
            const books = await publisherService.getBooks();
            res.status(200).json({
                success: true,
                data: {
                    books
                }
            })
        } catch (err) {
            if (err instanceof DatabaseError) {
                responseError({res, message: err.message})
            }
        }
    }

    
    

        

    



    


})





routePublisher.get('/:bookid', async (req, res) => {

    try {
        const r = await publisherService.getBookById(req.params.bookid);
        res.status(200).json({
            success: true, 
            books: r
        })
    } catch (err) {
        if (err instanceof DatabaseError) {
            responseError({res, message: err.message})
        } else if (err instanceof RangeError) {
            responseError({res, code: 404, status: 'not found', message: err.message})
        }
    }

})





routePublisher.post('/', async (req, res) => {

    try {
        const id = await publisherService.addPublisher(req.body);
        

        res.status(201).json({
            success: true, 
            code: 201, 
            status: 'created',
            message: 'publisher created successfully',
            data: {
                publisher: {
                    id
                }
            }
        })
    } catch (err) {
        if (err instanceof DatabaseError) {
            responseError({res, message: err.message})
        } else if (err instanceof RangeError) {
            responseError({res, code: 404, status: 'not found', message: err.message})
        } else {
            responseError({res, code: 555, status: 'bad backend', message: err.message})
        }
    }

})



routePublisher.put('/:bookid', async (req, res) => {

    try {
        
        const result = await publisherService.updateBookById(req.params.bookid, req.body);
        
        console.info({iniHasil: result})

        responseSuccess({res, code: 201, status: "updated", message: "update book successfull", detail: "detail", data: result })

    } catch (err) {
        if (err instanceof DatabaseError) {
            responseError({res, message: err.message})
        } else if (err instanceof RangeError) {
            responseError({res, code: 404, status: 'not found', message: err.message})
        } else {
            responseError({res, code: 555, status: 'bad backend', message: err.message})
        }
    }


})



routePublisher.delete('/:bookid', async (req, res) => {

    try {
        
        const book = await publisherService.deleteBookById(req.params.bookid);

        responseSuccess({res, code: 200, status: "deleted", message: "deleted book successfully", detail: `book with title ${book.title} success deleted`})

    } catch (err) {
        if (err instanceof DatabaseError) {
            responseError({res, message: err.message})
        } else if (err instanceof RangeError) {
            responseError({res, code: 404, status: 'not found', message: err.message})
        } else {
            responseError({res, code: 500, status: 'bad backend', message: err.message})
        }
    }


})





module.exports = routePublisher;