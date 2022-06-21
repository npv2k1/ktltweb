package com.app.my_app.rest;

import com.app.my_app.domain.CartItem;
import com.app.my_app.model.CartItemDTO;
import com.app.my_app.service.CartItemService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping(value = "/api/cartItems", produces = MediaType.APPLICATION_JSON_VALUE)
public class CartItemResource {

    private final CartItemService cartItemService;

    public CartItemResource(final CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        return ResponseEntity.ok(cartItemService.findAllByUserId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItem(@PathVariable final Long id) {
        return ResponseEntity.ok(cartItemService.get(id));
    }

    // Them 1 san pham vao gio hang
    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<CartItem> createCartItem(@RequestBody @Valid final CartItemDTO cartItemDTO) {
        return new ResponseEntity<>(cartItemService.create(cartItemDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable final Long id,
            @RequestBody @Valid final CartItemDTO cartItemDTO) {
        return ResponseEntity.ok(cartItemService.update(id, cartItemDTO));
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCartItem(@PathVariable final Long id) {
        cartItemService.delete(id);
        return ResponseEntity.noContent().build();
    }



}
