const routePublisher = require('express').Router();
const { DatabaseError } = require('pg');
const PublisherService = require('../services/publisher.service');
const {validatePublisherPost} = require('../utils/validate-body-request.util')
const {ValidationError} = require('joi');
const { responseBodyError } = require('../utils/body-response.util');


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


const isQuery = (query) =>  {
    const filterArr = ['title', 'year']
    return filterArr.includes(query);
}



routePublisher.get('/', async (req, res) => {

    try {
        const publishers = await publisherService.getPublishers();
        res.status(200).json({
            success: true,
            data: {
                publishers
            }
        })
    } catch (err) {
        if (err instanceof DatabaseError) {
            responseError({res, message: err.message})
        }
    }
    

})


routePublisher.post('/', async (req, res) => {

    try {

        const [validateRes, id] = await Promise.all([validatePublisherPost.validateAsync(req.body), publisherService.addPublisher(req.body)])       

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
        } else if (err instanceof ValidationError) {
            responseBodyError({
                res, code: 400,
                status: 'bad request',
                type: err.name,
                message: err.details[0].message, detail: `replace value ${err.details[0].context.value} with ${err.details[0].type}`  })
        }else {
            responseError({res, code: 555, status: 'bad backend', message: err.message})
        }
    }

})



routePublisher.put('/:id', async (req, res) => {

    try {
        
        const result = await publisherService.updatePublisherById(req.params.id, req.body);
        
        console.info({iniHasil: result})

        responseSuccess({res, code: 201, status: "updated", message: "update publisher successfully", detail: "detail", data: result })

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



routePublisher.delete('/:id', async (req, res) => {

    try {
        
        const publisher = await publisherService.deletePublisherById(req.params.id);

        responseSuccess({res, code: 200, status: "deleted", message: "deleted publisher successfully", detail: `publisher with name ${publisher.name} success deleted`, data: publisher})

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



routePublisher.get('/:id', async (req, res) => {
    try {
        const r  = await publisherService.getDetailsPublisherById(req.params.id);
        responseSuccess({res, code: 200, message: `detail of publisher with id ${req.params.id}`, data: r})
    } catch (e) {
        console.error(e)
    }
})




module.exports = routePublisher;