package com.example.testrail.controller;

import com.example.testrail.model.Project;
import com.example.testrail.model.TestSuite;
import com.example.testrail.repository.ProjectRepository;
import com.example.testrail.repository.TestSuiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TestSuiteController {

    @Autowired
    private TestSuiteRepository testSuiteRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/projects/{projectId}/suites")
    public List<TestSuite> getSuitesByProject(@PathVariable Long projectId) {
        return testSuiteRepository.findByProjectId(projectId);
    }

    @PostMapping("/projects/{projectId}/suites")
    public TestSuite createSuite(@PathVariable Long projectId, @RequestBody TestSuite testSuite) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        testSuite.setProject(project);
        return testSuiteRepository.save(testSuite);
    }
}
