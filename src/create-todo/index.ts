import { APIGatewayEvent } from "aws-lambda";

export const handler = (event: APIGatewayEvent) => {
  if (!event.body) {
    return {
      status: 400,
      error: "Must have a body",
    };
  }

  const body = JSON.parse(event.body);

  return { status: 201 };
};
