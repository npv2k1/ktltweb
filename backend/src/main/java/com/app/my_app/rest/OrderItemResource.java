package com.app.my_app.rest;

import com.app.my_app.domain.OrderItem;
import com.app.my_app.model.OrderItemDTO;
import com.app.my_app.service.OrderItemService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/orderItems", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderItemResource {

    private final OrderItemService orderItemService;

    public OrderItemResource(final OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    // Lấy danh sách order
    @GetMapping
    public ResponseEntity<List<OrderItem>> getAllOrderItems() {
        return ResponseEntity.ok(orderItemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItem> getOrderItem(@PathVariable final Long id) {
        return ResponseEntity.ok(orderItemService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createOrderItem(
            @RequestBody @Valid final OrderItemDTO orderItemDTO) {
        return new ResponseEntity<>(orderItemService.create(orderItemDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateOrderItem(@PathVariable final Long id,
            @RequestBody @Valid final OrderItemDTO orderItemDTO) {
        orderItemService.update(id, orderItemDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable final Long id) {
        orderItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
