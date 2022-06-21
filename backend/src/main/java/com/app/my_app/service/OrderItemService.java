package com.app.my_app.service;

import com.app.my_app.domain.Order;
import com.app.my_app.domain.OrderItem;
import com.app.my_app.model.OrderItemDTO;
import com.app.my_app.repos.OrderItemRepository;
import com.app.my_app.repos.OrderRepository;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    public OrderItemService(final OrderItemRepository orderItemRepository,
            final OrderRepository orderRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    public OrderItem get(final Long id) {
        return orderItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final OrderItemDTO orderItemDTO) {
        final OrderItem orderItem = new OrderItem();
        mapToEntity(orderItemDTO, orderItem);
        return orderItemRepository.save(orderItem).getId();
    }

    public void update(final Long id, final OrderItemDTO orderItemDTO) {
        final OrderItem orderItem = orderItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(orderItemDTO, orderItem);
        orderItemRepository.save(orderItem);
    }

    public void delete(final Long id) {
        orderItemRepository.deleteById(id);
    }


    private OrderItem mapToEntity(final OrderItemDTO orderItemDTO, OrderItem orderItem) {
        orderItem = modelMapper.map(orderItemDTO, OrderItem.class);
        if (orderItemDTO.getOrder() != null && (orderItem.getOrder() == null || !orderItem.getOrder().getId().equals(orderItemDTO.getOrder()))) {
            final Order order = orderRepository.findById(orderItemDTO.getOrder())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "order not found"));
            orderItem.setOrder(order);
        }
        return orderItem;
    }

}
