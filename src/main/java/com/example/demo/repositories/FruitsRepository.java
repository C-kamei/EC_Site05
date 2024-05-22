package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Fruit;

@Repository
public interface FruitsRepository extends JpaRepository<Fruit, Integer> {
	public Optional<Fruit> findById(int id);
	public List<Fruit> findByName(String key);
	public List<Fruit> findByNameLike(String key);
}
