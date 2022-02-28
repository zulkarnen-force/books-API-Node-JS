const responseError = ({res, code=500, status='internal server error', message='error from internal',  detail='', type=""}) => {

    const errorValues = Object.assign({}, 
        code ? {code} : null,
        status ? {status}  : null,
        type ? {type}: null,
        message ? {message}  : null,
        detail ? {detail}: null
    )
  
  
    return res.status(code).json({
      errors: errorValues
    })
  

}


const responseSuccess = ({res, code=200, status='OK', message='success',  detail='', data}) =>  {

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

module.exports = { responseBodyError: responseError, responseSuccess }