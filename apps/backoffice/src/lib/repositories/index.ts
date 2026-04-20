import type { OrderRepository, ProductRepository, CategoryRepository, CustomerRepository, UserRepository } from "./interfaces";

import { mockOrderRepository } from "./mock/orderRepository";
import { mockProductRepository } from "./mock/productRepository";
import { mockCategoryRepository } from "./mock/categoryRepository";
import { mockCustomerRepository } from "./mock/customerRepository";
import { mockUserRepository } from "./mock/userRepository";
import { config } from "../config";

const useMock = config.useMockData;

export const orderRepository: OrderRepository = useMock ? mockOrderRepository : mockOrderRepository;

export const productRepository: ProductRepository = useMock ? mockProductRepository : mockProductRepository;

export const categoryRepository: CategoryRepository = useMock ? mockCategoryRepository : mockCategoryRepository;

export const customerRepository: CustomerRepository = useMock ? mockCustomerRepository : mockCustomerRepository;

export const userRepository: UserRepository = useMock ? mockUserRepository : mockUserRepository;