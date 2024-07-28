const {
  getUserById,
  userLogin,
  updateUser,
  createUser,
  deleteUser
} = require('../BED/controllers/usersController'); // Adjust the path as necessary
const User = require('../BED/models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../BED/models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));


describe('usersController', () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
      User.getUserById.mockResolvedValue(mockUser);
      mockRequest.params.id = '1';
  
      await getUserById(mockRequest, mockResponse);
  
      expect(User.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });
  
    it('should return 404 if user is not found', async () => {
      User.getUserById.mockResolvedValue(null);
      mockRequest.params.id = '1';
  
      await getUserById(mockRequest, mockResponse);
  
      expect(User.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith("User not found");
    });
  });
  
  
  describe('userLogin', () => {
    it('should return a token and id on successful login', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
      User.userLogin.mockResolvedValue(mockUser);
      bcryptjs.compare.mockResolvedValue(true);
      
      const mockToken = 'mock-token';
      jwt.sign.mockReturnValue(mockToken);
  
      mockRequest.body = { username: 'testuser', password: 'password' };
  
      await userLogin(mockRequest, mockResponse);
  
      expect(User.userLogin).toHaveBeenCalledWith('testuser');
      expect(bcryptjs.compare).toHaveBeenCalledWith('password', 'hashedpassword');
      // expect(jwt.sign).toHaveBeenCalledWith(
      //   { id: 1, username: 'testuser' },
      //   'your-secret-key',
      //   { expiresIn: '3600s' }
      // );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      // //expect(mockResponse.json).toHaveBeenCalledWith({
      //   message: "Login successful",
      //   token: mockToken,
      //   id: 1
      // });
    });
  });
  
  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const mockUser = { id: 1, username: 'updateduser', email: 'updated@example.com' };
      User.updateUser.mockResolvedValue(mockUser);
      bcryptjs.hash.mockResolvedValue('new-hashed-password');
      mockRequest.params.id = '1';
      mockRequest.body = { username: 'updateduser', password: 'newpassword', email: 'updated@example.com' };
  
      await updateUser(mockRequest, mockResponse);
  
      // expect(bcryptjs.hash).toHaveBeenCalledWith('newpassword', expect.any(String)); // Check salt
      // //expect(User.updateUser).toHaveBeenCalledWith(1, {
      //   username: 'updateduser',
      //   password: 'new-hashed-password',
      //   email: 'updated@example.com'
      // });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });
  });
  
  
  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
      User.createUser.mockResolvedValue(mockUser);
      bcryptjs.hash.mockResolvedValue('hashedpassword');
      mockRequest.body = { username: 'testuser', email: 'test@example.com', password: 'password' };
    
      await createUser(mockRequest, mockResponse);
    
      // expect(bcryptjs.hash).toHaveBeenCalledWith('password', expect.any(String));
      expect(User.createUser).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword'
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });
    
    it('should return 400 if required fields are missing', async () => {
      mockRequest.body = { username: 'testuser', email: 'test@example.com' };
    
      await createUser(mockRequest, mockResponse);
    
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Missing required fields" });
    });
  });
  

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      User.deleteUser.mockResolvedValue(true);
      mockRequest.params.id = '1';
  
      await deleteUser(mockRequest, mockResponse);
  
      expect(User.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  
    it('should return 404 if user is not found', async () => {
      User.deleteUser.mockResolvedValue(false);
      mockRequest.params.id = '1';
  
      await deleteUser(mockRequest, mockResponse);
  
      expect(User.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith("User not found");
    });
  });
});
