import weaviate from "weaviate-ts-client";
import fs from "fs/promises";

const client = weaviate.client({
	scheme: "http",
	host: "localhost:8080",
});

const test = Buffer.from(
	// Example Avans
	// await fs.readFile("./img/scan/HogeschoollaanBredabuiten.jpg")

	// Example BUAS
	await fs.readFile("./img/scan/BuasBinnen.jpg")
).toString("base64");

const resImage = await client.graphql
	.get()
	.withClassName("Image")
	.withFields(["image"])
	.withNearImage({ image: test })
	.withLimit(2)
	.do();

// Write result to filesystem
const result = resImage.data.Get.Image[0].image;
console.log(resImage.data.Get.Image[0]);
console.log(resImage.data.Get);
await fs.writeFile("./result/result.jpg", result, "base64");
