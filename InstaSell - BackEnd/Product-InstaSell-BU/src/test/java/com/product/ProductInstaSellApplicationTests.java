package com.product;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.product.exception.ProductAlreadyExistsException;
import com.product.exception.ProductNotFoundException;
import com.product.model.Product;
import com.product.service.ProductServiceImpl;
import com.product.controller.ProductController;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@AutoConfigureMockMvc
@SpringBootTest
class ProductInstaSellApplicationTests {

	@Mock
	  private ProductServiceImpl productService;

	  @InjectMocks
	  private ProductController productController;

	  @BeforeEach
	  public void setup() {
	    MockitoAnnotations.openMocks(this);
	  }

	  @Test
	  public void testAddProductHandler() throws ProductAlreadyExistsException {
	    // Arrange
	    Product product = new Product();
	    product.setProductId(1);
	    when(productService.addProduct(any(Product.class))).thenReturn(product);

	    // Act
	    ResponseEntity<?> response = productController.addProductHandler(product);

	    // Assert
	    assertEquals(HttpStatus.CREATED, response.getStatusCode());
	    assertEquals(product, response.getBody());
	  }

	  @Test
	  public void testGetProductByIdHandler() throws ProductNotFoundException {
	    // Arrange
	    int productId = 1;
	    Product product = new Product();
	    product.setProductId(productId);
	    when(productService.getProductById(productId)).thenReturn(product);

	    // Act
	    ResponseEntity<?> response = productController.getProductByIdHandler(productId);

	    // Assert
	    assertEquals(HttpStatus.OK, response.getStatusCode());
	    assertEquals(product, response.getBody());
	  }

	  @Test
	  public void testGetAllProductsHandler() {
	    // Arrange
	    List<Product> productList = new ArrayList<>();
	    productList.add(new Product());
	    when(productService.getAllProducts()).thenReturn(productList);

	    // Act
	    List<Product> result = productController.getAllProductsHandler();

	    // Assert
	    assertEquals(productList, result);
	  }

	  @Test
	  public void testUpdateProductHandler() throws ProductNotFoundException {
	    // Arrange
	    int productId = 1;
	    Product product = new Product();
	    product.setProductId(productId);
	    when(productService.updateProduct(any(Product.class), eq(productId))).thenReturn(product);

	    // Act
	    ResponseEntity<?> response = productController.updateProductHandler(product, productId);

	    // Assert
	    assertEquals(HttpStatus.CREATED, response.getStatusCode());
	    assertEquals(product, response.getBody());
	  }

	  @Test
	  public void testDeleteProductHandler() throws ProductNotFoundException {
	    // Arrange
	    int productId = 1;

	    // Act
	    ResponseEntity<?> response = productController.deleteProductHandler(productId);

	    // Assert
	    assertEquals(HttpStatus.OK, response.getStatusCode());
	    assertEquals("Product Deleted Successfully", response.getBody());
	    verify(productService, times(1)).deleteProduct(productId);
	  }


}
