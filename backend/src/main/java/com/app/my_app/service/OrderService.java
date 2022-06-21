package com.app.my_app.service;

import com.app.my_app.domain.*;
import com.app.my_app.model.OrderDTO;
import com.app.my_app.repos.OrderItemRepository;
import com.app.my_app.repos.OrderRepository;
import com.app.my_app.repos.OrderStatusRepository;
import com.app.my_app.repos.UserRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final UserRepository userRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;



    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private CartItemService cartItemService;

    public OrderService(final OrderRepository orderRepository,
                        final OrderStatusRepository orderStatusRepository,
                        final UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.userRepository = userRepository;
    }

    // Lấy tất cả danh sách order
    public List<Order> findAll() {
        return orderRepository.findAllByUsersId(authService.getCurrentUserId());
    }

    public Order get(final Long id) {
        return orderRepository.findById(id).orElse(null);
    }


    /**
     * Tạo order mới
     *
     * @return Order
     */
    @Transactional
    public Order makeOrder() {
        // Tạo order mới
        Order order = new Order();
        order.setAddress(authService.getCurrentUser().getAddress());
        order.setPhone(authService.getCurrentUser().getPhone());
        order.setUsers(authService.getCurrentUser());
        order.setStatus(orderStatusRepository.findById(1L).orElse(null));
        Long totalPrice = 0L;
        order.setTotal(totalPrice);


        Order updateOrder = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        // Get cart item;
        List<CartItem> cartItems = cartItemService.findAll();

        for (CartItem c : cartItems) {
            OrderItem o = new OrderItem();
            o.setName(c.getProduct().getName());
            o.setPrice(c.getProduct().getPrice());
            o.setQuantity(c.getQuantity());
            o.setOrder(updateOrder);
            o.setProduct(c.getProduct());
            OrderItem orderItemSave = orderItemRepository.save(o);
            orderItems.add(orderItemSave);
            totalPrice += o.getPrice() * o.getQuantity();
        }
        updateOrder.setTotal(totalPrice);
        Set<OrderItem> os = new HashSet<>(orderItems);
        updateOrder.setOrderItems(os);
        // xóa
        cartItemService.deleteAll();

        return orderRepository.save(updateOrder);
    }

    public void update(final Long id, final OrderDTO orderDTO) {
        final Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(orderDTO, order);
        orderRepository.save(order);
    }

    public void delete(final Long id) {
        orderRepository.deleteById(id);
    }


    private Order mapToEntity(final OrderDTO orderDTO, Order order) {
        order = modelMapper.map(orderDTO, Order.class);
        if (orderDTO.getStatus() != null && (order.getStatus() == null || !order.getStatus().getId().equals(orderDTO.getStatus()))) {
            final OrderStatus status = orderStatusRepository.findById(orderDTO.getStatus())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "status not found"));
            order.setStatus(status);
        }
        if (orderDTO.getUsers() != null && (order.getUsers() == null || !order.getUsers().getId().equals(orderDTO.getUsers()))) {
            final User users = userRepository.findById(orderDTO.getUsers())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "users not found"));
            order.setUsers(users);
        }
        return order;
    }

}
