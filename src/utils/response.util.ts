import { HttpStatus } from '@nestjs/common';

/**
 * Standard API Response Interface
 */
export interface ApiResponse<T = any> {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    errors?: any[];
}

/**
 * Success response for GET, PUT, PATCH, DELETE (200 OK)
 */
export const setSuccess = <T>(params: { message: string; data?: T }): ApiResponse<T> => {
    return {
        statusCode: HttpStatus.OK,
        success: true,
        message: params.message,
        data: params.data,
    };
};

/**
 * Success response for POST (201 CREATED)
 */
export const setCreateSuccess = <T>(params: { message: string; data?: T }): ApiResponse<T> => {
    return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: params.message,
        data: params.data,
    };
};

/**
 * Bad Request response (400 BAD REQUEST)
 */
export const setBadRequest = (params: { message: string; errors?: any[] }): ApiResponse => {
    return {
        statusCode: HttpStatus.BAD_REQUEST,
        success: false,
        message: params.message,
        errors: params.errors,
    };
};

/**
 * Not Found response (404 NOT FOUND)
 */
export const setNotFound = (params: { message: string }): ApiResponse => {
    return {
        statusCode: HttpStatus.NOT_FOUND,
        success: false,
        message: params.message,
    };
};

/**
 * Unauthorized response (401 UNAUTHORIZED)
 */
export const setUnauthorized = (params?: { message?: string }): ApiResponse => {
    return {
        statusCode: HttpStatus.UNAUTHORIZED,
        success: false,
        message: params?.message || 'Unauthorized access',
    };
};

/**
 * Forbidden response (403 FORBIDDEN)
 */
export const setForbidden = (params?: { message?: string }): ApiResponse => {
    return {
        statusCode: HttpStatus.FORBIDDEN,
        success: false,
        message: params?.message || 'Forbidden',
    };
};

/**
 * Server Error response (500 INTERNAL SERVER ERROR)
 */
export const setServerError = (params?: { message?: string; error?: any }): ApiResponse => {
    return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: params?.message || 'Internal server error',
        error: params?.error?.message || params?.error,
    };
};

/**
 * Validation Error response (422 UNPROCESSABLE ENTITY)
 */
export const setValidationError = (params: { message: string; errors: any[] }): ApiResponse => {
    return {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        success: false,
        message: params.message,
        errors: params.errors,
    };
};
