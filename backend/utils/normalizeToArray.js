// Function to transform objects into one-item arrays

const normalizeToArray = (data) => {
  return Array.isArray(data) ? data : [data];
}

export default normalizeToArray