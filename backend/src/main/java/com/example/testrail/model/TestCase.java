package com.example.testrail.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String type; // e.g., Functional, Regression
    private String priority; // e.g., High, Medium, Low

    @ManyToOne
    @JoinColumn(name = "test_suite_id")
    @JsonIgnore
    private TestSuite testSuite;
}
