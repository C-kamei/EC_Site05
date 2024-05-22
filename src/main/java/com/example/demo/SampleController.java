package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.data.FruitsDataInterface;
import com.example.demo.data.FruitsDataService;
import com.example.demo.model.Fruit;
import com.example.demo.model.PurchaseRequest;


@RestController
public class SampleController {
	@Autowired
	FruitsDataService service;
	
	@GetMapping("/fruits")
	@CrossOrigin
	public List<? extends FruitsDataInterface> fruits() {
		System.out.println("fruits/index");
		return service.getAll();
	}

	@GetMapping("/fruits/{id}")
	@CrossOrigin
	public FruitsDataInterface fruitById(@PathVariable int id) {
		System.out.println("fruits/findById");
		return service.getById(id);
	}

	

	@PostMapping("/fruits/add")
	@CrossOrigin
	public int add(@RequestBody Fruit fruit) {
		System.out.println("fruits/add(post)");
		return service.add(fruit);
	}

	@PostMapping("/fruits/update")
	@CrossOrigin
	public int update(@RequestBody Fruit fruit) {
		System.out.println("fruits/update(post)");
		return service.add(fruit);
	}

	@PostMapping("/fruits/delete")
	@CrossOrigin
	public void delete(@RequestBody Fruit fruit) {
		System.out.println("fruits/delete(post)");
		service.delete(fruit);
	}
	
	@PostMapping("/fruits/purchase")
	@CrossOrigin
	public String purchase(@RequestBody List<PurchaseRequest> purchaseRequests) {
	    System.out.println("fruits/purchase(post)");
	    return service.purchase(purchaseRequests);
	}


}
