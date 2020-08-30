import { ToDo } from "../types/ToDo";
import validate from "./validate";
import { DescriptionType } from "../types/ToDoDescription";

describe("Create ToDo Validation", () => {
  const validToDo: ToDo = {
    name: "Test",
    priority: 1,
    requests: 2,
    users: [{ name: "John" }],
    descriptions: [{ type: DescriptionType.SHORT, description: "Test" }],
  };

  it("should return void for a valid ToDo", () => {
    expect(validate(validToDo)).toBeUndefined();
  });

  it("should validate name length", () => {
    expect(validate({ ...validToDo, name: "Te" })).toBe(
      "Must have a name of at least 3 characters"
    );
    expect(validate({ ...validToDo, name: "Tes" })).toBeUndefined();
  });

  it("should validate priority is between 1 and 100 (inclusive)", () => {
    expect(validate({ ...validToDo, priority: 1 })).toBeUndefined();
    expect(validate({ ...validToDo, priority: 100 })).toBeUndefined();

    expect(validate({ ...validToDo, priority: 0 })).toBe(
      "Must have a priority of at least 1"
    );
    expect(validate({ ...validToDo, priority: 101 })).toBe(
      "Must not have a priority over 100"
    );
  });

  it("should validate requests are between 1 and 150", () => {
    expect(validate({ ...validToDo, requests: 1 })).toBeUndefined();
    expect(validate({ ...validToDo, requests: 150 })).toBeUndefined();

    expect(validate({ ...validToDo, requests: 0 })).toBe(
      "Must have requests of at least 1"
    );
    expect(validate({ ...validToDo, requests: 151 })).toBe(
      "Must not have requests over 150"
    );
  });

  it("should validate users", () => {
    expect(validate({ ...validToDo, users: [] })).toBe(
      "Must have at least one user"
    );

    expect(validate({ ...validToDo, users: [{ name: "Jo" }] })).toBe(
      "User must have at least 3 characters"
    );
    expect(
      validate({ ...validToDo, users: [{ name: "Joh" }] })
    ).toBeUndefined();

    expect(
      validate({ ...validToDo, users: [{ name: "John" }, { name: "Sa" }] })
    ).toBe("User must have at least 3 characters");
    expect(
      validate({ ...validToDo, users: [{ name: "John" }, { name: "Sar" }] })
    ).toBeUndefined();

    expect(
      validate({ ...validToDo, users: [{ name: "John" }, { name: "Sarah" }] })
    ).toBeUndefined();
  });

  it("should validate descriptions", () => {
    expect(validate({ ...validToDo, descriptions: [] })).toBe(
      "Must have at least one description"
    );
  });

  it("should validate short descriptions", () => {
    expect(
      validate({
        ...validToDo,
        descriptions: [{ type: DescriptionType.SHORT, description: "Tes" }],
      })
    ).toBeUndefined();

    expect(
      validate({
        ...validToDo,
        descriptions: [{ type: DescriptionType.SHORT, description: "Te" }],
      })
    ).toBe("Description must have a length of at least 3");

    expect(
      validate({
        ...validToDo,
        descriptions: [
          { type: DescriptionType.SHORT, description: "Test" },
          { type: DescriptionType.SHORT, description: "Te" },
        ],
      })
    ).toBe("Description must have a length of at least 3");
  });

  it("should validate full descriptions", () => {
    expect(
      validate({
        ...validToDo,
        descriptions: [
          {
            type: DescriptionType.FULL,
            name: "Test",
            summary: "Summary",
            description: "Some description here",
          },
        ],
      })
    ).toBeUndefined();

    expect(
      validate({
        ...validToDo,
        descriptions: [
          {
            type: DescriptionType.FULL,
            name: "Te",
            summary: "Summary",
            description: "Some description here",
          },
        ],
      })
    ).toBe("Description must have a name with at least 3 characters");

    expect(
      validate({
        ...validToDo,
        descriptions: [
          {
            type: DescriptionType.FULL,
            name: "Tes",
            summary: "Summary",
            description: "Some description here",
          },
        ],
      })
    ).toBeUndefined();

    expect(
      validate({
        ...validToDo,
        descriptions: [
          {
            type: DescriptionType.FULL,
            name: "Test",
            summary: "x".repeat(4),
            description: "Some description here",
          },
        ],
      })
    ).toBe("Description must have a summary of at least 5 characters");

    expect(
      validate({
        ...validToDo,
        descriptions: [
          {
            type: DescriptionType.FULL,
            name: "Test",
            summary: "x".repeat(5),
            description: "Some description here",
          },
        ],
      })
    ).toBeUndefined();

    expect(
      validate({
        ...validToDo,
        descriptions: [
          {
            type: DescriptionType.FULL,
            name: "Test",
            summary: "Summary",
            description: "x".repeat(9),
          },
        ],
      })
    ).toBe("Description must have a length of at least 10 characters");

    expect(
      validate({
        ...validToDo,
        descriptions: [
          {
            type: DescriptionType.FULL,
            name: "Test",
            summary: "Summary",
            description: "x".repeat(10),
          },
        ],
      })
    ).toBeUndefined();
  });
});
