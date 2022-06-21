package com.app.my_app.service;

import com.app.my_app.domain.Category;
import com.app.my_app.model.CategoryDTO;
import com.app.my_app.repos.CategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    public CategoryService() {

    }

    /**
     * Tìm tất cả các Category và trả lại chúng dưới dạng danh sách.
     *
     * @return Danh sách tất cả các Category trong cơ sở dữ liệu.
     */
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    /**
     * Nếu danh mục tồn tại, hãy trả lại nó, nếu không thì ném 404.
     *
     * @param id Id của danh mục được truy xuất.
     * @return Một đối tượng danh mục
     */
    public Category get(final Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    /**
     * Tạo một danh mục mới và lưu nó vào cơ sở dữ liệu.
     *
     * @param categoryDTO Đối tượng DTO được chuyển vào controller
     * @return Id của danh mục mới được tạo.
     */
    public Long create(final CategoryDTO categoryDTO) {
        final Category category = new Category();
        mapToEntity(categoryDTO, category);
        return categoryRepository.save(category).getId();
    }

    /**
     * tìm danh mục theo id, nếu nó không tồn tại, chúng tôi ném 404, nếu không update
     *
     * @param id Id của danh mục cần cập nhật
     * @param categoryDTO Đối tượng DTO sẽ được sử dụng để cập nhật danh mục.
     */
    public void update(final Long id, final CategoryDTO categoryDTO) {
        final Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(categoryDTO, category);

        categoryRepository.save(category);
    }

    /**
     * Delete a category by id.
     *
     * @param id The id of the category to be deleted.
     */
    public void delete(final Long id) {
        categoryRepository.deleteById(id);
    }


    /**
     * Nó nhận một danh mụcDTO và một danh mục, và trả về một danh mục
     *
     * @param categoryDTO Đối tượng DTO mà chúng ta muốn ánh xạ tới một thực thể.
     * @param category Đối tượng danh mục mà chúng tôi muốn ánh xạ DTO tới.
     * @return Một đối tượng danh mục
     */
    private Category mapToEntity(final CategoryDTO categoryDTO, Category category) {
        category = modelMapper.map(categoryDTO, Category.class);
        if(categoryDTO.getCategoryParent()!=null){
            category.setCategoryParent(categoryRepository.findById(categoryDTO.getCategoryParent()).orElse(null));
        }

        return category;
    }

}
