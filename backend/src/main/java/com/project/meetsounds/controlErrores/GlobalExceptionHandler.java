package com.project.meetsounds.controlErrores;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.graphql.data.method.annotation.GraphQlExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @GraphQlExceptionHandler(AliasAlreadyExistsException.class)
    public GraphQLError handleAliasAlreadyExistsException(AliasAlreadyExistsException ex) {
        return GraphQLError.newError()
                .message(ex.getMessage())
                .build();
    }

    @GraphQlExceptionHandler(EmailAlreadyExistsException.class)
    public GraphQLError handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
        return GraphQLError.newError()
                .message(ex.getMessage())
                .build();
    }

    @GraphQlExceptionHandler(AliasAndEmailAlreadyExistsException.class)
    public GraphQLError handleAliasAndEmailAlreadyExistsException(AliasAndEmailAlreadyExistsException ex) {
        return GraphQLError.newError()
                .message(ex.getMessage())
                .build();
    }
}
