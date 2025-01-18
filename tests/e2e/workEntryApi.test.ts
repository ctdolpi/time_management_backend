import request from "supertest";
import app from "@/server";

describe("Work Entry API", () => {
  let token: string;

  beforeAll(async () => {
    // Create a test user and log in to get a token
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    token = res.body.token;
  });

  it("should create a new work entry", async () => {
    const res = await request(app)
      .post("/api/work-entries")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2025-01-10",
        description: "Worked on backend tests",
        duration: 4,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.description).toBe("Worked on backend tests");
  });

  it("should get all work entries for the user", async () => {
    const res = await request(app)
      .get("/api/work-entries")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should fail to create a work entry without authorization", async () => {
    const res = await request(app).post("/api/work-entries").send({
      date: "2025-01-10",
      description: "Unauthorized entry",
      duration: 2,
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Authentication required");
  });
});
