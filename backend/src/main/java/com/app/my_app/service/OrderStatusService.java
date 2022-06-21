package com.app.my_app.service;

import com.app.my_app.domain.OrderStatus;
import com.app.my_app.model.OrderStatusDTO;
import com.app.my_app.repos.OrderStatusRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class OrderStatusService {

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    public OrderStatusService() {}

    public List<OrderStatus> findAll() {
        return orderStatusRepository.findAll();
    }

    public OrderStatus get(final Long id) {
        return orderStatusRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final OrderStatusDTO orderStatusDTO) {
        final OrderStatus orderStatus = new OrderStatus();
        mapToEntity(orderStatusDTO, orderStatus);
        return orderStatusRepository.save(orderStatus).getId();
    }

    public void update(final Long id, final OrderStatusDTO orderStatusDTO) {
        final OrderStatus orderStatus = orderStatusRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(orderStatusDTO, orderStatus);
        orderStatusRepository.save(orderStatus);
    }

    public void delete(final Long id) {
        orderStatusRepository.deleteById(id);
    }


    private OrderStatus mapToEntity(final OrderStatusDTO orderStatusDTO,
                                    final OrderStatus orderStatus) {
        if(orderStatusDTO.getName() != null){
            orderStatus.setName(orderStatusDTO.getName());
        }

        orderStatus.setDescription(orderStatusDTO.getDescription());
        return orderStatus;
    }

}
