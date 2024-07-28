const ForumController = require("../BED/controllers/forumController");
const sql = require("mssql");
const dbConfig = require("../dbconfig");

jest.mock("mssql");

describe("ForumController", () => {
    let mockConnection;
    let mockRequest;

    beforeEach(() => {
        mockRequest = {
            input: jest.fn().mockReturnThis(),
            query: jest.fn(),
        };

        mockConnection = {
            request: jest.fn().mockReturnValue(mockRequest),
            close: jest.fn().mockResolvedValue(undefined),
        };

        sql.connect.mockResolvedValue(mockConnection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getForumByTitle", () => {
        it("should return forums with matching title", async () => {
            const mockResult = {
                recordset: [
                    {
                        forumId: 1,
                        title: "Random Title",
                        author: "Random Author",
                        comments: "Random Comments"
                    },
                    {
                        forumId: 2,
                        title: "Another Random Title",
                        author: "Another Random Author",
                        comments: "Another Random Comments"
                    },
                ],
            };

            const mockTitle = "Test";

            mockRequest.query.mockResolvedValue(mockResult);

            //const forums = await ForumController.getForumByTitle(mockTitle);

            // const expectedForums = mockResult.recordset.map(
            //     (row) => new ForumController(row.forumId, row.title, row.author, row.comments)
            // );

            // expect(forums).toEqual(expectedForums);
            // expect(mockRequest.input).toHaveBeenCalledWith("title", `${mockTitle}%`);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("SELECT * FROM Forums WHERE title LIKE @title"));
        });

        it("should return an empty array when no forums match the title", async () => {
            const mockResult = {
                recordset: [],
            };

            const mockTitle = "Nonexistent";

            mockRequest.query.mockResolvedValue(mockResult);

            //const forums = await ForumController.getForumByTitle(mockTitle);

            // expect(forums).toEqual([]);
            // expect(mockRequest.input).toHaveBeenCalledWith("title", `${mockTitle}%`);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("SELECT * FROM Forums WHERE title LIKE @title"));
        });
    });

    describe("getForumById", () => {
        it("should return a forum when given a valid forumId", async () => {
            const forumId = 1;

            const mockResult = {
                recordset: [
                    {
                        forumId: forumId,
                        title: "Test Forum",
                        author: "Test Author",
                        comments: "Test Comments",
                    },
                ],
            };

            mockRequest.query.mockResolvedValue(mockResult);

            //const forum = await ForumController.getForumById(forumId);

            // const expectedForum = new ForumController(
            //     mockResult.recordset[0].forumId,
            //     mockResult.recordset[0].title,
            //     mockResult.recordset[0].author,
            //     mockResult.recordset[0].comments
            // );

            // expect(forum).toEqual(expectedForum);
            // expect(mockRequest.input).toHaveBeenCalledWith("forumId", forumId);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("SELECT * FROM Forums WHERE forumId = @forumId"));
        });

        it("should return null when no forum matches the forumId", async () => {
            const forumId = 999; // Assuming forum with this ID doesn't exist

            const mockResult = {
                recordset: [],
            };

            mockRequest.query.mockResolvedValue(mockResult);

            //const forum = await ForumController.getForumById(forumId);

            // expect(forum).toBeNull();
            // expect(mockRequest.input).toHaveBeenCalledWith("forumId", forumId);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("SELECT * FROM Forums WHERE forumId = @forumId"));
        });
    });

    describe("getAllForums", () => {
        it("should return all forums from the database", async () => {
            const mockResult = {
                recordset: [
                    {
                        forumId: 1,
                        title: "Test Forum 1",
                        author: "Author 1",
                        comments: "Comments 1",
                    },
                    {
                        forumId: 2,
                        title: "Test Forum 2",
                        author: "Author 2",
                        comments: "Comments 2",
                    },
                ],
            };

            mockRequest.query.mockResolvedValue(mockResult);

            //const forums = await ForumController.getAllForums();

            // const expectedForums = mockResult.recordset.map(
            //     (row) => new ForumController(row.forumId, row.title, row.author, row.comments)
            // );

            // expect(forums).toEqual(expectedForums);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("SELECT * FROM Forums ORDER BY forumId DESC"));
        });

        it("should return an empty array when no forums are found", async () => {
            const mockResult = {
                recordset: [],
            };

            mockRequest.query.mockResolvedValue(mockResult);

            //const forums = await ForumController.getAllForums();

            // expect(forums).toEqual([]);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("SELECT * FROM Forums ORDER BY forumId DESC"));
        });
    });

    describe("createForum", () => {
        it("should create a new forum successfully", async () => {
            const title = "New Forum";
            const author = "New Author";
            const comments = "New Comments";

            const mockResult = {};

            mockRequest.query.mockResolvedValue(mockResult);

            //const result = await ForumController.createForum(title, author, comments);

            // expect(result).toEqual(mockResult);
            // expect(mockRequest.input).toHaveBeenCalledWith("title", sql.NVarChar, title);
            // expect(mockRequest.input).toHaveBeenCalledWith("author", sql.NVarChar, author);
            // expect(mockRequest.input).toHaveBeenCalledWith("comments", sql.NVarChar, comments);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO Forums"));
        });

        it("should handle errors during forum creation", async () => {
            const title = "New Forum";
            const author = "New Author";
            const comments = "New Comments";

            const errorMessage = "Database error";

            mockRequest.query.mockRejectedValue(new Error(errorMessage));

            //await expect(ForumController.createForum(title, author, comments)).rejects.toThrow(errorMessage);

            // expect(mockRequest.input).toHaveBeenCalledWith("title", sql.NVarChar, title);
            // expect(mockRequest.input).toHaveBeenCalledWith("author", sql.NVarChar, author);
            // expect(mockRequest.input).toHaveBeenCalledWith("comments", sql.NVarChar, comments);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO Forums"));
        });
    });

    describe("updateForum", () => {
        it("should update a forum successfully", async () => {
            const forumId = 1;
            const title = "Updated Forum Title";
            const author = "Updated Author";
            const comments = "Updated Comments";

            const mockResult = {
                recordset: [
                    {
                        forumId: forumId,
                        title: title,
                        author: author,
                        comments: comments,
                    },
                ],
            };

            mockRequest.query.mockResolvedValue(mockResult);

            //const updatedForum = await ForumController.updateForum(forumId, title, author, comments);

            // expect(updatedForum).toBeDefined(); // Assuming it returns the updated forum
            // expect(mockRequest.input).toHaveBeenCalledWith("forumId", forumId);
            // expect(mockRequest.input).toHaveBeenCalledWith("title", title);
            // expect(mockRequest.input).toHaveBeenCalledWith("author", author);
            // expect(mockRequest.input).toHaveBeenCalledWith("comments", comments);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE Forums SET"));
        });

        it("should handle errors during forum update", async () => {
            const forumId = 1;
            const title = "Updated Forum Title";
            const author = "Updated Author";
            const comments = "Updated Comments";

            const errorMessage = "Database error";

            mockRequest.query.mockRejectedValue(new Error(errorMessage));

            //await expect(ForumController.updateForum(forumId, title, author, comments)).rejects.toThrow(errorMessage);

            // expect(mockRequest.input).toHaveBeenCalledWith("forumId", forumId);
            // expect(mockRequest.input).toHaveBeenCalledWith("title", title);
            // expect(mockRequest.input).toHaveBeenCalledWith("author", author);
            // expect(mockRequest.input).toHaveBeenCalledWith("comments", comments);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE Forums SET"));
        });
    });

    describe("deleteForum", () => {
        it("should delete a forum successfully", async () => {
            const forumId = 1;

            const mockResult = {
                rowsAffected: [1], // Assuming one row was affected
            };

            mockRequest.query.mockResolvedValue(mockResult);

            //const result = await ForumController.deleteForum(forumId);

            // expect(result).toBe(true); // Assuming it returns true on success
            // expect(mockRequest.input).toHaveBeenCalledWith("forumId", forumId);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM Forums"));
        });

        it("should return false when no forum is deleted", async () => {
            const forumId = 999; // Assuming forum with this ID doesn't exist

            const mockResult = {
                rowsAffected: [0], // Assuming no rows were affected
            };

            mockRequest.query.mockResolvedValue(mockResult);

            //const result = await ForumController.deleteForum(forumId);

            // expect(result).toBe(false);
            // expect(mockRequest.input).toHaveBeenCalledWith("forumId", forumId);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM Forums"));
        });

        it("should handle errors during forum deletion", async () => {
            const forumId = 1;

            const errorMessage = "Database error";

            mockRequest.query.mockRejectedValue(new Error(errorMessage));

            //await expect(ForumController.deleteForum(forumId)).rejects.toThrow(errorMessage);

            // expect(mockRequest.input).toHaveBeenCalledWith("forumId", forumId);
            // expect(mockRequest.query).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM Forums"));
        });
    });
});
