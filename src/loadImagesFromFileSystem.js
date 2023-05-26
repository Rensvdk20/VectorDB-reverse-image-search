import weaviate from "weaviate-ts-client";
import fs from "fs/promises";

const client = weaviate.client({
	scheme: "http",
	host: "localhost:8080",
});

const img = await fs.readFile("./img/HogeschoollaanBreda.jpg");

const b64 = Buffer.from(img).toString("base64");

const res = await client.data
	.creator()
	.withClassName("Image")
	.withProperties({ image: b64, text: "Hogeschoollaan Breda" })
	.do();

console.log(res);
