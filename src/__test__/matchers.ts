const toIncludeObjects = (received: any, properties: any[]) => {
  let pass = false;
  properties.forEach((property: any) => {
    const match = expect.objectContaining(property);
    if (match.asymmetricMatch(received)) {
      pass = true;
    }
  });
  if (pass) {
    return {
      message: () =>
        `expect ${JSON.stringify(received)} is containing property`,
      pass: true
    };
  }
  return {
    message: () =>
      `expect ${JSON.stringify(received)} is not containing property`,
    pass: false
  };
};

export default toIncludeObjects;
