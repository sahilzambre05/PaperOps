package com.paper.gradechange.controller;

import com.paper.gradechange.dto.GradeChangeRequestDTO;
import com.paper.gradechange.dto.GradeChangeResponseDTO;
import com.paper.gradechange.service.GradeChangeService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grade-change")
@CrossOrigin(origins = "*")
public class GradeChangeController {
    private final GradeChangeService gradeChangeService;
    public GradeChangeController(GradeChangeService gradeChangeService) { this.gradeChangeService = gradeChangeService; }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() { return ResponseEntity.ok(Map.of("status", "UP")); }

    @PostMapping("/predict")
    public ResponseEntity<GradeChangeResponseDTO> predictNextSettings(@Valid @RequestBody GradeChangeRequestDTO requestDTO) {
        return ResponseEntity.ok(gradeChangeService.getPrediction(requestDTO));
    }
}
