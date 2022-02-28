const routesAuthor = require('express').Router();
const { DatabaseError } = require('pg');
const AuthorService = require('../services/author.service');

let authorService = new AuthorService();


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


routesAuthor.get('/', async (req, res) => {

    try {
        const authors = await authorService.getAuthors();
        res.status(200).json({
            success: true,
            data: {
                authors
            }
        })
    } catch (err) {
        if (err instanceof DatabaseError) {
            responseError({res, message: err.message})
        }
    }
    

})


routesAuthor.post('/', async (req, res) => {

    try {
        const id = await authorService.addAuthor(req.body);
        

        res.status(201).json({
            success: true, 
            code: 201, 
            status: 'created',
            message: 'author created successfully',
            data: {
                author: {
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



routesAuthor.put('/:id', async (req, res) => {

    try {
        
        const result = await authorService.updateAuthorById(req.params.id, req.body);
    
        responseSuccess({res, code: 201, status: "updated", message: "update author successfully", detail: "detail", data: result })

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



routesAuthor.delete('/:id', async (req, res) => {

    try {
        
        const publisher = await authorService.deleteAuthorById(req.params.id);

        responseSuccess({res, code: 200, status: "deleted", message: "deleted author successfully", detail: `author with name ${publisher.name} success deleted`, data: publisher})

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


routesAuthor.get('/:id', async (req, res) => {
    try {
        const r  = await authorService.authorDetailById(req.params.id);
        responseSuccess({res, code: 200, message: `detail of author with id ${req.params.id}`, data: r})
    } catch (e) {
        console.error(e)
    }
})





module.exports = routesAuthor;