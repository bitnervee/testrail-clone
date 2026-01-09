package com.example.testrail.controller;

import com.example.testrail.model.Project;
import com.example.testrail.model.TestRun;
import com.example.testrail.repository.ProjectRepository;
import com.example.testrail.repository.TestRunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TestRunController {

    @Autowired
    private TestRunRepository testRunRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/projects/{projectId}/runs")
    public List<TestRun> getRunsByProject(@PathVariable Long projectId) {
        return testRunRepository.findByProjectId(projectId);
    }

    @PostMapping("/projects/{projectId}/runs")
    public TestRun createRun(@PathVariable Long projectId, @RequestBody TestRun testRun) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        testRun.setProject(project);
        testRun.setStatus("Active");
        return testRunRepository.save(testRun);
    }

    @GetMapping("/runs/{runId}")
    public TestRun getRun(@PathVariable Long runId) {
        return testRunRepository.findById(runId).orElseThrow(() -> new RuntimeException("Run not found"));
    }
}
