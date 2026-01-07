package com.example.testrail.controller;

import com.example.testrail.model.TestCase;
import com.example.testrail.model.TestSuite;
import com.example.testrail.repository.TestCaseRepository;
import com.example.testrail.repository.TestSuiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TestCaseController {

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private TestSuiteRepository testSuiteRepository;

    @GetMapping("/suites/{suiteId}/cases")
    public List<TestCase> getCasesBySuite(@PathVariable Long suiteId) {
        return testCaseRepository.findByTestSuiteId(suiteId);
    }

    @PostMapping("/suites/{suiteId}/cases")
    public TestCase createTestCase(@PathVariable Long suiteId, @RequestBody TestCase testCase) {
        TestSuite suite = testSuiteRepository.findById(suiteId)
                .orElseThrow(() -> new RuntimeException("Suite not found"));
        testCase.setTestSuite(suite);
        return testCaseRepository.save(testCase);
    }
}
