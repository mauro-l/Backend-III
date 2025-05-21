export const limitsDocSchema = {
  type: "object",
  properties: {
    dailyLimit: {
      type: "number",
      description: "Daily limit for the user",
      example: 1000,
    },
    dailyUsage: {
      type: "number",
      description: "Daily usage count for the user",
      example: 420,
    },
    dailyRemaining: {
      type: "number",
      description: "Remaining daily limit for the user",
      example: 580,
    },
    percentageUsed: {
      type: "string",
      description: "Percentage of daily limit used",
      example: "42.00%",
    },
    ipAddress: {
      type: "string",
      description: "IP address of the user",
      eexample: "192.168.1.1",
    },
    ipLimitPerHour: {
      type: "number",
      description: "Limit of requests per hour for the IP address",
      example: 15,
    },
  },
};

export const limitsResSuccess = {
  type: "object",
  properties: {
    dailyLimit: {
      type: "number",
      example: 1000,
    },
    dailyUsage: {
      type: "number",
      example: 420,
    },
    dailyRemaining: {
      type: "number",
      example: 580,
    },
    percentageUsed: {
      type: "string",
      example: "42.00%",
    },
    ipAddress: {
      type: "string",
      eexample: "192.168.1.1",
    },
    ipLimitPerHour: {
      type: "number",
      example: 15,
    },
  },
};
