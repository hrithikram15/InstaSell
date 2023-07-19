package com.order;

import org.junit.jupiter.api.BeforeEach;
import java.util.ArrayList;


import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import com.order.model.OrderDetail;
import com.order.model.OrderInput;
import com.order.model.OrderProductQuantity;
import com.order.service.OrderServiceImpl;
import com.order.order.OrderController;


@AutoConfigureMockMvc
@SpringBootTest
class OrderInstaSellApplicationTests {

	@Mock
    private OrderServiceImpl orderService;

    @InjectMocks
    private OrderController orderController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testPlaceOrder() {
        // Mock input data
        boolean isSingleProductCheckout = true;
        String userName = "john_doe";
        OrderInput orderInput = new OrderInput();
        orderInput.setFullName("John Doe");
        orderInput.setFullAddress("123 Main St");
        orderInput.setContactNumber("123-456-7890");
        orderInput.setAlternateContactNumber("987-654-3210");
        List<OrderProductQuantity> orderProductQuantityList = Arrays.asList(
                new OrderProductQuantity(1, 2),
                new OrderProductQuantity(2, 3)
        );
        orderInput.setOrderProductQuantityList(orderProductQuantityList);

        // Perform the test
        orderController.placeOrder(isSingleProductCheckout, userName, orderInput);

        // Verify that the service method was called with the correct arguments
        verify(orderService).placeOrder(orderInput, isSingleProductCheckout, userName);
    }

    @Test
    public void testGetOrderDetails() {
        // Mock input data
        String userName = "john_doe";
        List<OrderDetail> expectedOrderDetails = Arrays.asList(
                new OrderDetail(),
                new OrderDetail()
        );

        // Mock the service method to return the expected data
        when(orderService.getOrderDetails(userName)).thenReturn(expectedOrderDetails);

        // Perform the test
        List<OrderDetail> actualOrderDetails = orderController.getOrderDetails(userName);

        // Verify that the service method was called
        verify(orderService).getOrderDetails(userName);

        // Verify that the returned order details match the expected ones
        assertEquals(expectedOrderDetails, actualOrderDetails);
    }

    @Test
    public void testGetAllOrderDetails() {
        // Mock input data
        List<OrderDetail> expectedOrderDetails = Arrays.asList(
                new OrderDetail(),
                new OrderDetail()
        );

        // Mock the service method to return the expected data
        when(orderService.getAllOrderDetails()).thenReturn(expectedOrderDetails);

        // Perform the test
        List<OrderDetail> actualOrderDetails = orderController.getAllOrderDetails();

        // Verify that the service method was called
        verify(orderService).getAllOrderDetails();

        // Verify that the returned order details match the expected ones
        assertEquals(expectedOrderDetails, actualOrderDetails);
    }

    @Test
    public void testGetOrderDetailsById() {
        // Mock input data
        Integer orderId = 1;
        Optional<OrderDetail> expectedOrderDetail = Optional.of(new OrderDetail());

        // Mock the service method to return the expected data
        when(orderService.getOrderDetailsById(orderId)).thenReturn(expectedOrderDetail);

        // Perform the test
        Optional<OrderDetail> actualOrderDetail = orderController.getOrderDetails(orderId);

        // Verify that the service method was called
        verify(orderService).getOrderDetailsById(orderId);

        // Verify that the returned order detail matches the expected one
        assertEquals(expectedOrderDetail, actualOrderDetail);
    }

    @Test
    public void testUpdateOrderDetails() {
        // Mock input data
        Integer orderId = 1;
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrderId(orderId);

        // Mock the service method to return the updated order detail
        when(orderService.cancelOrderDetailsById(orderDetail, orderId)).thenReturn(orderDetail);

        // Perform the test
        OrderDetail updatedOrderDetail = orderController.updateOrderDetails(orderDetail, orderId);

        // Verify that the service method was called
        verify(orderService).cancelOrderDetailsById(orderDetail, orderId);

        // Verify that the returned order detail matches the expected one
        assertEquals(orderDetail, updatedOrderDetail);
    }

}
