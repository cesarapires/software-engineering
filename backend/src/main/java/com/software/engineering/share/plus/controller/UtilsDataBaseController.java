package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.service.CleanDataBaseService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("${api-prefix}/tests")
public class UtilsDataBaseController {

    private final CleanDataBaseService cleanDataBaseService;

    @PostMapping("/reset-database")
    public ResponseEntity<Void> resetDatabase() {
        cleanDataBaseService.cleanDatabase();
        return ResponseEntity.ok().build();
    }
}
