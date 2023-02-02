import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';

describe("test create author", () => {

    test("sould be ok", async () => {
        const res = await request(app)
            .post("/api/authors/create")
            .send({ name: "aaa" })
            .expect(response => { console.log(response.body) })
            .expect(500);
    }, 15000);

});
