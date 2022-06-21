package com.app.my_app.rest;

import com.app.my_app.domain.OrderStatus;
import com.app.my_app.model.OrderStatusDTO;
import com.app.my_app.service.OrderStatusService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping(value = "/api/orderStatuss", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderStatusResource {

    @Autowired
    private OrderStatusService orderStatusService;

    public OrderStatusResource() {

    }

    /**
     * Trả về danh sách các trạng thái của 1 order
     *
     * @return A list of all the order statuses
     */
    @GetMapping
    public ResponseEntity<List<OrderStatus>> getAllOrderStatuss() {
        return ResponseEntity.ok(orderStatusService.findAll());
    }

    /**
     * Trả về trạng thái tường ứng id
     *
     * @param id The id of the order status to be retrieved.
     * @return A ResponseEntity with the OrderStatus object.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderStatus> getOrderStatus(@PathVariable final Long id) {
        return ResponseEntity.ok(orderStatusService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createOrderStatus(
            @RequestBody @Valid final OrderStatusDTO orderStatusDTO) {
        return new ResponseEntity<>(orderStatusService.create(orderStatusDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable final Long id,
            @RequestBody @Valid final OrderStatusDTO orderStatusDTO) {
        orderStatusService.update(id, orderStatusDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderStatus(@PathVariable final Long id) {
        orderStatusService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
