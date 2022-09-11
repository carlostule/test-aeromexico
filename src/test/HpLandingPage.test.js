const axios = require("axios");

test('fetch exists characters', async () => {
  const response = await axios.get("https://hp-server-app.herokuapp.com/posts");
  expect(response.data).toBe(response.data);
});

test('add new character', async () => {
  const newCharacter = {
    id: `test-${Math.floor(Math.random())}-NEW`,
    name: `Test Name ${Math.floor(Math.random())}`,
    species: "human",
    gender: "male",
    house: "Gryffindor",
    dateOfBirth: "00-00-0000",
    yearOfBirth: 1000,
    ancestry: "test-blood",
    eyeColour: "test eye color",
    hairColour: "test hair color",
    wand: {
        wood: "test",
        core: "test",
        length: 11
    },
    patronus: "test patronus",
    hogwartsStudent: true,
    hogwartsStaff: false,
    actor: `Test Name ${Math.floor(Math.random())}`,
    alive: true,
    image: "test/url/testing.png"
  };
  const response = await axios.post("https://hp-server-app.herokuapp.com/posts", newCharacter);
  expect(response.status).toBe(201);
});
