// Import necessary types and modules
import { Request, Response, NextFunction } from "express";
import { beforeEach, describe, jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import authController from "../../src/controllers/auth.controller";
import User from "../../src/models/User.model";

// Mock the User model and jsonwebtoken to isolate tests
jest.mock("../../src/models/User");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  // Declare types for our mock request and response
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  // Set up fresh mocks before each test
  beforeEach(() => {
    // Initialize response object to track status and json response
    responseObject = {
      statusCode: 0,
      json: {},
    };

    // Set up mock request with test data
    mockRequest = {
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
      },
    };

    // Create mock response with status and json methods
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject.json = result;
        return mockResponse;
      }),
    };
  });

  // Test suite for user registration
  describe("registerUser", () => {
    // Test successful user registration
    it("should successfully register a new user", async () => {
      // Mock user data that would be returned from database
      const mockUser = {
        _id: "mockId123",
        name: "Test User",
        email: "test@example.com",
        role: "user",
      };

      // Mock the User.create method to return our mock user
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      // Execute the registration function
      await authController.registerUser(
        mockRequest as Request,
        mockResponse as Response
      );

      // Verify the response status and data
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User created successfully",
        user: mockUser,
      });
    });

    // Test registration error handling
    it("should handle registration errors", async () => {
      // Mock an error that might occur during registration
      const errorMessage = "Email already exists";
      (User.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Execute the registration function
      await registerUser(mockRequest as Request, mockResponse as Response);

      // Verify error response
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: errorMessage,
      });
    });
  });

  // Test suite for user login
  describe("loginUser", () => {
    // Test successful login
    it("should successfully login a user", async () => {
      // Mock user data with password matching function
      const mockUser = {
        _id: "mockId123",
        email: "test@example.com",
        role: "user",
        matchPassword: jest.fn().mockResolvedValue(true),
      };

      // Mock database query and token generation
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken123");

      // Set login credentials in request body
      mockRequest.body = {
        email: "test@example.com",
        password: "password123",
      };

      // Execute login function
      await loginUser(mockRequest as Request, mockResponse as Response);

      // Verify successful login response
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: "mockToken123",
      });
    });

    // Test invalid password scenario
    it("should handle invalid credentials", async () => {
      // Mock user with failed password match
      const mockUser = {
        matchPassword: jest.fn().mockResolvedValue(false),
      };

      // Mock database query to return user
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      // Set login credentials in request body
      mockRequest.body = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      // Execute login function
      await loginUser(mockRequest as Request, mockResponse as Response);

      // Verify error response
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid credentials",
      });
    });

    // Test non-existent user login attempt
    it("should handle non-existent user", async () => {
      // Mock database query to return null (user not found)
      (User.findOne as jest.Mock).mockResolvedValue(null);

      // Set login credentials in request body
      mockRequest.body = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      // Execute login function
      await loginUser(mockRequest as Request, mockResponse as Response);

      // Verify error response
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid credentials",
      });
    });
  });
});
