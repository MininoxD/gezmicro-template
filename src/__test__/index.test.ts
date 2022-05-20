import { checkParameters } from '../middlewares/checkParameters'
import { ParamsCreditScore } from '../routes/index'
import { NextFunction, Request, Response } from 'express'
describe('Test function checkParameters', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  const nextFunction: NextFunction = jest.fn()
  beforeEach(() => {
    mockRequest = {
      query: {},
      params: {},
      body: {}
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
  })
  test('El cuerpo Sin argumentos', () => {
    const result = checkParameters({
      type: 'query',
      schema: ParamsCreditScore
    })
    const errorExpect = {
      errors: [
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path: [
            'documentNumber'
          ],
          message: 'El número de documento es requerido'
        },
        {
          code: 'invalid_enum_value',
          options: [
            'DNI',
            'PASAPORTE',
            'CUIT'
          ],
          path: [
            'documentType'
          ],
          message: "Invalid enum value. Expected 'DNI' | 'PASAPORTE' | 'CUIT'"
        }
      ]
    }
    result(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toHaveBeenCalledWith(errorExpect)
  })

  test('Envio solo del DNI', () => {
    mockRequest = {
      query: {
        documentType: 'DNI'
      }
    }
    const errorExpect = {
      errors: [
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path: [
            'documentNumber'
          ],
          message: 'El número de documento es requerido'
        }
      ]
    }
    const result = checkParameters({
      type: 'query',
      schema: ParamsCreditScore
    })
    result(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toHaveBeenCalledWith(errorExpect)
  })

  test('Envio solo del DNI y Numero de DNI', () => {
    mockRequest = {
      query: {
        documentType: 'DNI',
        documentNumber: '12345678'
      }
    }
    const errorExpect = {
      errors: [
        {
          code: 'custom',
          message: 'El genero es requerido cuando el documento es DNI',
          path: [] as String[]
        }
      ]
    }
    const result = checkParameters({
      type: 'query',
      schema: ParamsCreditScore
    })
    result(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toHaveBeenCalledWith(errorExpect)
  })

  test('Enviar Numero de documento con String', () => {
    mockRequest = {
      query: {
        documentType: 'DNI',
        documentNumber: '12345678abv'
      }
    }
    const errorExpect = {
      errors: [
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'nan',
          path: [
            'documentNumber'
          ],
          message: 'El número de documento debe ser un número'
        }
      ]
    }
    const result = checkParameters({
      type: 'query',
      schema: ParamsCreditScore
    })
    result(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toHaveBeenCalledWith(errorExpect)
  })

  test('Enviar el tipo de genero equivocado', () => {
    mockRequest = {
      query: {
        documentType: 'DNI',
        documentNumber: '12345678',
        gender: 'G'
      }
    }
    const errorExpect = {
      errors: [
        {
          code: 'invalid_enum_value',
          options: [
            'F',
            'M'
          ],
          path: [
            'gender'
          ],
          message: "Invalid enum value. Expected 'F' | 'M'"
        }
      ]
    }
    const result = checkParameters({
      type: 'query',
      schema: ParamsCreditScore
    })
    result(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toHaveBeenCalledWith(errorExpect)
  })

  test('Enviar el tipo de documento Equivocado', () => {
    mockRequest = {
      query: {
        documentType: 'DNIa',
        documentNumber: '12345678',
        gender: 'F'
      }
    }
    const errorExpect = {
      errors: [
        {
          code: 'invalid_enum_value',
          options: [
            'DNI',
            'PASAPORTE',
            'CUIT'
          ],
          path: [
            'documentType'
          ],
          message: "Invalid enum value. Expected 'DNI' | 'PASAPORTE' | 'CUIT'"
        }
      ]
    }
    const result = checkParameters({
      type: 'query',
      schema: ParamsCreditScore
    })
    result(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toHaveBeenCalledWith(errorExpect)
  })

  test('Enviar datos completos con DNI', () => {
    mockRequest = {
      query: {
        documentType: 'DNI',
        documentNumber: '12345678',
        gender: 'F'
      }
    }
    const result = checkParameters({
      type: 'query',
      schema: ParamsCreditScore
    })
    result(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(nextFunction).toBeCalledTimes(1)
  })

  test('Enviar datos completos con CUIT', () => {
    mockRequest = {
      query: {
        documentType: 'CUIT',
        documentNumber: '12345678'
      }
    }
    const result = checkParameters({
      type: 'query',
      schema: ParamsCreditScore
    })
    result(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(nextFunction).toBeCalledTimes(1)
  })
})
