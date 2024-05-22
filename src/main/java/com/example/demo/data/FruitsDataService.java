package com.example.demo.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Fruit;
import com.example.demo.model.PurchaseRequest;
import com.example.demo.repositories.FruitsRepository;

@Service
public class FruitsDataService {
	@Autowired
	private FruitsRepository repository;
	
	public List<? extends FruitsDataInterface> getAll() {
		System.out.println("Service:getAll");
		return repository.findAll();
	}
	
	public FruitsDataInterface getById(int id) {
		System.out.println("Service:getById id[" + id + "]");
		return repository.findById(id).orElse(null);
	}
	
	public List<? extends FruitsDataInterface> findByNameLike(String find) {
		System.out.println("Service:getByNameLike find[" + find + "]");
		return repository.findByNameLike("%" + find + "%");
	}
	
	/**
	 * 
	 * @param item
	 * @return 保存されたエンティティのID、成功しない場合0
	 */
	public int add(FruitsDataInterface item) {
		System.out.println("Service:add [" + item + "]");
		if (item instanceof Fruit) {
			Fruit savedItem = repository.saveAndFlush((Fruit)item);
			return savedItem.getId();
		}
		return 0;
	}
	
	public void delete(FruitsDataInterface item) {
		System.out.println("Service:delete[" + item + "]");
		if (item instanceof Fruit) {
			repository.delete((Fruit) item);
		}
	}
	
	public String purchase(int id, int quantity) {
        System.out.println("Service:purchase id[" + id + "] quantity[" + quantity + "]");
        Fruit fruit = repository.findById(id).orElse(null);
        if (fruit == null) {
            return "Fruit not found";
        }
        if (fruit.getStock() < quantity) {
            return "Not enough stock";
        }
        fruit.setStock(fruit.getStock() - quantity);
        repository.saveAndFlush(fruit);
        return "Purchase successful";
    }
	
	public String purchase(List<PurchaseRequest> purchaseRequests) {
        StringBuilder result = new StringBuilder();
        for (PurchaseRequest request : purchaseRequests) {
            Fruit fruit = repository.findById(request.getId()).orElse(null);
            if (fruit == null) {
                result.append("Fruit with ID ").append(request.getId()).append(" not found. ");
                continue;
            }
            if (fruit.getStock() < request.getQuantity()) {
                result.append("Not enough stock for ").append(fruit.getName()).append(". ");
                continue;
            }
            fruit.setStock(fruit.getStock() - request.getQuantity());
            repository.saveAndFlush(fruit);
            result.append("Purchased ").append(request.getQuantity()).append(" of ").append(fruit.getName()).append(". ");
        }
        return result.toString();
    }
}
