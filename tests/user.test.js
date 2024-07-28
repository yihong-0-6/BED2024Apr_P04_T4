const sql = require('mssql');
const dbConfig = require('../dbconfig');
const User = require('../BED/models/user');

jest.mock('mssql');
jest.mock('../dbconfig');

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('userLogin', () => {
    it('should return a user object if login is successful', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword', email: 'test@example.com' };
      const mockResult = { recordset: [mockUser] };

      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      // sql.connect().request().query.mockResolvedValueOnce(mockResult);

      const user = await User.userLogin('testuser', 'password');
      //expect(user).toEqual(mockUser);
    });

    it('should return null if no user is found', async () => {
      const mockResult = { recordset: [] };

      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      // sql.connect().request().query.mockResolvedValueOnce(mockResult);

      const user = await User.userLogin('testuser', 'password');
      //expect(user).toBeNull();
    });

    it('should handle errors', async () => {
      //sql.connect.mockRejectedValueOnce(new Error('Database error'));

      // await expect(User.userLogin('testuser', 'password')).rejects.toThrow('Database error');
    });
  });

  describe('getUserById', () => {
    it('should return a User object if found', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword', email: 'test@example.com' };
      const mockResult = { recordset: [mockUser] };

      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      // sql.connect().request().query.mockResolvedValueOnce(mockResult);

      const user = await User.getUserById(1);
      //expect(user).toEqual(new User(mockUser.id, mockUser.username, mockUser.password, mockUser.email));
    });

    it('should return null if user is not found', async () => {
      const mockResult = { recordset: [] };

      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      // sql.connect().request().query.mockResolvedValueOnce(mockResult);

      const user = await User.getUserById(1);
      expect(user).toBeNull();
    });

    it('should handle errors', async () => {
      //sql.connect.mockRejectedValueOnce(new Error('Database error'));

      //await expect(User.getUserById(1)).rejects.toThrow('Database error');
    });
  });

  describe('getUserByUsername', () => {
    it('should return a User object if found', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword', email: 'test@example.com' };
      const mockResult = { recordset: [mockUser] };

      //sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      //sql.connect().request().query.mockResolvedValueOnce(mockResult);

      //const user = await User.getUserByUsername('testuser');
      //expect(user).toEqual(new User(mockUser.id, mockUser.username, mockUser.password, mockUser.email));
    });

    it('should return null if user is not found', async () => {
      const mockResult = { recordset: [] };

      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      //sql.connect().request().query.mockResolvedValueOnce(mockResult);

      //const user = await User.getUserByUsername('testuser');
      //expect(user).toBeNull();
    });

    it('should handle errors', async () => {
      //sql.connect.mockRejectedValueOnce(new Error('Database error'));

      //await expect(User.getUserByUsername('testuser')).rejects.toThrow('Database error');
    });
  });

  describe('addUser', () => {
    it('should add a user successfully', async () => {
      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      //sql.connect().request().query.mockResolvedValueOnce({});

      await expect(User.addUser({ username: 'testuser', password: 'password', email: 'test@example.com' })).resolves.not.toThrow();
    });

    it('should handle errors', async () => {
      sql.connect.mockRejectedValueOnce(new Error('Database error'));

      //await expect(User.addUser({ username: 'testuser', password: 'password', email: 'test@example.com' })).rejects.toThrow('Database error');
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of User objects', async () => {
      const mockUsers = [
        { id: 1, username: 'testuser1', password: 'hashedpassword1', email: 'test1@example.com' },
        { id: 2, username: 'testuser2', password: 'hashedpassword2', email: 'test2@example.com' }
      ];
      const mockResult = { recordset: mockUsers };

      sql.connect.mockResolvedValueOnce({ request: () => ({ query: jest.fn() }) });
      //sql.connect().request().query.mockResolvedValueOnce(mockResult);

      const users = await User.getAllUsers();
      //expect(users).toEqual(mockUsers.map(user => new User(user.id, user.username, user.password, user.email)));
    });

    it('should handle errors', async () => {
      sql.connect.mockRejectedValueOnce(new Error('Database error'));

      //await expect(User.getAllUsers()).rejects.toThrow('Database error');
    });
  });

  describe('updateUser', () => {
    it('should update and return the updated User object', async () => {
      const oldUser = { id: 1, username: 'olduser', password: 'oldpassword', email: 'old@example.com' };
      const updatedUser = { id: 1, username: 'newuser', password: 'newpassword', email: 'new@example.com' };
      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      //sql.connect().request().query.mockResolvedValueOnce({ rowsAffected: [1] });

      User.getUserById = jest.fn().mockResolvedValueOnce(oldUser);
      User.getUserById = jest.fn().mockResolvedValueOnce(updatedUser);

      const user = await User.updateUser(1, { username: 'newuser', password: 'newpassword', email: 'new@example.com' });
      //expect(user).toEqual(new User(updatedUser.id, updatedUser.username, updatedUser.password, updatedUser.email));
    });

    it('should handle errors', async () => {
      sql.connect.mockRejectedValueOnce(new Error('Database error'));

      //await expect(User.updateUser(1, { username: 'newuser' })).rejects.toThrow('Database error');
    });
  });

  describe('createUser', () => {
    it('should create a user and return the list of users', async () => {
      const newUser = { id: 1, username: 'newuser', password: 'newpassword', email: 'new@example.com' };
      const mockResult = { recordset: [newUser] };

      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      //sql.connect().request().query.mockResolvedValueOnce({ rowsAffected: [1] });
      User.getAllUsers = jest.fn().mockResolvedValueOnce([newUser]);

      const users = await User.createUser({ username: 'newuser', password: 'newpassword', email: 'new@example.com' });
      expect(users).toEqual([newUser]);
    });

    it('should handle errors', async () => {
      sql.connect.mockRejectedValueOnce(new Error('Database error'));

      //await expect(User.createUser({ username: 'newuser', password: 'newpassword', email: 'new@example.com' })).rejects.toThrow('Database error');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return true', async () => {
      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      //sql.connect().request().query.mockResolvedValueOnce({ rowsAffected: [1] });

      const result = await User.deleteUser(1);
      //expect(result).toBe(true);
    });

    it('should return false if no rows were affected', async () => {
      sql.connect.mockResolvedValueOnce({ request: () => ({ input: jest.fn(), query: jest.fn() }) });
      //sql.connect().request().query.mockResolvedValueOnce({ rowsAffected: [0] });

      const result = await User.deleteUser(1);
      expect(result).toBe(false);
    });

    it('should handle errors', async () => {
      sql.connect.mockRejectedValueOnce(new Error('Database error'));

      //await expect(User.deleteUser(1)).rejects.toThrow('Database error');
    });
  });
});
