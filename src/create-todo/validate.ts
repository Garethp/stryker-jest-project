import { ToDo } from "../types/ToDo";
import {
  DescriptionType,
  FullDescription,
  ShortDescription,
} from "../types/ToDoDescription";

const validateName = ({ name }: Pick<ToDo, "name">): string | void => {
  if (name.length < 3) {
    return "Must have a name of at least 3 characters";
  }

  return;
};

const validatePriority = ({
  priority,
}: Pick<ToDo, "priority">): string | void => {
  if (priority < 1) {
    return "Must have a priority of at least 1";
  }

  if (priority > 100) {
    return "Must not have a priority over 100";
  }

  return;
};

const validateRequests = ({
  requests,
}: Pick<ToDo, "requests">): string | void => {
  if (requests < 1) {
    return "Must have requests of at least 1";
  }

  if (requests > 150) {
    return "Must not have requests over 150";
  }

  return;
};

const validateUsers = ({ users }: Pick<ToDo, "users">): string | void => {
  if (!users?.length) {
    return "Must have at least one user";
  }

  const invalid = users?.find((user) => user.name.length < 3);

  if (invalid) {
    return "User must have at least 3 characters";
  }

  return;
};

const validateShortDescription = (
  description: ShortDescription
): string | void => {
  if (description.description.length < 3) {
    return "Description must have a length of at least 3";
  }
};

const validateFullDescription = (
  description: FullDescription
): string | void => {
  if (description.name.length < 3) {
    return "Description must have a name with at least 3 characters";
  }

  if (description.summary.length < 5) {
    return "Description must have a summary of at least 5 characters";
  }

  if (description.description.length < 10) {
    return "Description must have a length of at least 10 characters";
  }
};

const validateDescriptions = ({
  descriptions,
}: Pick<ToDo, "descriptions">): string | void => {
  if (descriptions.length < 1) {
    return "Must have at least one description";
  }

  for (const description of descriptions) {
    let error;
    if (description.type === DescriptionType.SHORT) {
      error = validateShortDescription(description);
    } else {
      error = validateFullDescription(description);
    }

    if (error) {
      return error;
    }
  }
};

export default (todo: ToDo): string | void => {
  return (
    validateName(todo) ||
    validatePriority(todo) ||
    validateRequests(todo) ||
    validateUsers(todo) ||
    validateDescriptions(todo)
  );
};
