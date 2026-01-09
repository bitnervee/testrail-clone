package com.example.testrail.controller;

import com.example.testrail.model.TestCase;
import com.example.testrail.model.TestResult;
import com.example.testrail.model.TestRun;
import com.example.testrail.repository.TestCaseRepository;
import com.example.testrail.repository.TestResultRepository;
import com.example.testrail.repository.TestRunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TestResultController {

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private TestRunRepository testRunRepository;

    @Autowired
    private TestCaseRepository testCaseRepository;

    @GetMapping("/runs/{runId}/results")
    public List<TestResult> getResultsByRun(@PathVariable Long runId) {
        return testResultRepository.findByTestRunId(runId);
    }

    // Expects "testCaseId" in the body mainly or we pass it in query.
    // Better: POST /api/runs/{runId}/cases/{caseId}/results
    @PostMapping("/runs/{runId}/cases/{caseId}/results")
    public TestResult addResult(@PathVariable Long runId, @PathVariable Long caseId, @RequestBody TestResult result) {
        TestRun run = testRunRepository.findById(runId).orElseThrow(() -> new RuntimeException("Run not found"));
        TestCase testCase = testCaseRepository.findById(caseId)
                .orElseThrow(() -> new RuntimeException("Case not found"));

        result.setTestRun(run);
        result.setTestCase(testCase);
        return testResultRepository.save(result);
    }
}
