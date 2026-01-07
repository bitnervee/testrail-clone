package com.example.testrail.repository;

import com.example.testrail.model.TestRun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestRunRepository extends JpaRepository<TestRun, Long> {
    List<TestRun> findByProjectId(Long projectId);
}
