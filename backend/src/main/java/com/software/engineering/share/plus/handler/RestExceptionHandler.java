package com.software.engineering.share.plus.handler;

import com.software.engineering.share.plus.exception.EntityAlreadyExistsException;
import com.software.engineering.share.plus.exception.ExceptionDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(EntityAlreadyExistsException.class)
    public ResponseEntity<ExceptionDetails> handleException(Exception e) {
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.CONFLICT.value())
                        .title("Exception")
                        .details(e.getMessage())
                        .developerMessage(e.getClass().getName())
                        .build(),
                HttpStatus.CONFLICT
        );
    }
}
