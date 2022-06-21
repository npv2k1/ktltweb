package com.app.my_app.service;

import com.app.my_app.domain.CartItem;
import com.app.my_app.model.CartItemDTO;
import com.app.my_app.repos.CartItemRepository;
import com.app.my_app.repos.ProductRepository;
import com.app.my_app.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    private AuthService authService;


    @Autowired
    private ProductService productService;

    public CartItemService(final CartItemRepository cartItemRepository,
                           final UserRepository userRepository, final ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }


    public List<CartItem> findAll() {
        return cartItemRepository.findAllByUserId(authService.getCurrentUserId());
    }

    public List<CartItem> findAllByUserId() {
        return cartItemRepository.findAllByUserId(authService.getCurrentUserId());
    }

    /**
     * Nếu mặt hàng trong giỏ hàng tồn tại, hãy trả lại, nếu không, hãy ném 404.
     *
     * @param id Id của mặt hàng giỏ hàng sẽ được truy xuất.
     * @return Một đối tượng CartItem
     */
    public CartItem get(final Long id) {
        return cartItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    /**
     * nếu product đã có trong cart, tăng quantity lên 1, ngược lại tạo một mặt hàng giỏ hàng mới
     *
     * @param cartItemDTO The object that contains the data of the cart item to be created.
     * @return CartItem
     */
    @Transactional
    public CartItem create(final CartItemDTO cartItemDTO) {
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndUserId(cartItemDTO.getProductId(), authService.getCurrentUserId());
        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        } else {
            cartItem = new CartItem();
            cartItem.setQuantity(cartItemDTO.getQuantity());
            cartItem.setProduct(productService.get(cartItemDTO.getProductId()));
            cartItem.setUser(authService.getCurrentUser());
        }
        return cartItemRepository.save(cartItem);
    }


    /**
     * Xóa tất cả các mặt hàng trong giỏ hàng cho người dùng hiện tại.
     */
    public void deleteAll() {
        cartItemRepository.deleteAllByUserId(authService.getCurrentUserId());
    }


    /**
     * Cập nhật mặt hàng giỏ hàng với id đã cho với dữ liệu đã cho.
     *
     * @param id The id of the cart item to be updated.
     * @param cartItemDTO This is the object that contains the data that we want to update.
     * @return A CartItem object
     */
    public CartItem update(Long id, final CartItemDTO cartItemDTO) {
        CartItem cartItem = cartItemRepository.findById(id).orElse(null);
        cartItem.setQuantity(cartItemDTO.getQuantity());
        return cartItemRepository.save(cartItem);
    }

    public void delete(final Long id) {
        cartItemRepository.deleteById(id);
    }


}
