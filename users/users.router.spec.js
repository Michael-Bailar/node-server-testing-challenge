const request = require("supertest")

const server = require("../api/server.js")
const db = require("../data/db-config.js")

const testUser = {
    name: "michael test",
    username: "mbtest",
    password: "test"
}

describe("server", () => {
    describe("GET /users/", () => {
        it("should return 200 OK", () => {
            return request(server)
                .get("/api/users/")
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
        
    })

    describe("POST /users/", () => {
        beforeEach(async () => {
            await db("users").truncate()
        })

        it("returns 201 on success", () => {
            return request(server)
                .post("/api/users")
                .send(testUser)
                .then(res => {
                    expect(res.status).toBe(201)
            })
        })

        it('should return a message saying "user created successfully"', function () {
            return request(server)
              .post("/api/users")
              .send(testUser)
              .then(res => {
                expect(res.body.message).toBe("user created successfully");
            });
        });
    })

    describe("DELETE /users/id", () => {
        beforeEach(async () => {
            await db("users").truncate()
        })

        it("returns 200 on success", () => {
            return request(server)
                .post("/api/users")
                .send(testUser)
                .then(res => {
                    return request(server) 
                        .delete("/api/users/1")
                        .then(res => {
                            expect(res.status).toBe(200)
                        })
            })
        })

        it("should return a message saying 'delete successful'", () => {
            return request(server)
                .post("/api/users")
                .send(testUser)
                .then(res => {
                    return request(server) 
                        .delete("/api/users/1")
                        .then(res => {
                            expect(res.body.message).toBe("delete successful")
                        })
            })
        })
    })
})