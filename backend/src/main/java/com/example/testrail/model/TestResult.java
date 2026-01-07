package com.example.testrail.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status; // PASS, FAIL, BLOCKED, RETEST
    private String comment;
    private LocalDateTime executedDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "test_run_id")
    private TestRun testRun;

    @ManyToOne
    @JoinColumn(name = "test_case_id")
    private TestCase testCase;
}
