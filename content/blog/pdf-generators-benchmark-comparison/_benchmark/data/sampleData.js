const generateSampleData = (options = "medium-text") => {
  const [size, type] = options.split("-");

  const baseTitle = "PDF Generation Benchmark Document";
  const baseParagraph =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Boston",
    "Miami",
    "Seattle",
    "Denver",
    "Austin",
    "Portland",
    "Phoenix",
  ];
  const names = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
    "Diana Davis",
    "Frank Miller",
    "Grace Taylor",
    "Henry Clark",
    "Ivy Anderson",
  ];

  const SIZES = {
    small: 10,
    medium: 100,
    large: 1000,
  };

  const getParagraphs = (size) => {
    return Array.from({ length: SIZES[size] }, () => baseParagraph);
  };

  const getTable = (size) => {
    return [
      ["Name", "Age", "City", "Department", "Salary"],
      ...Array.from({ length: SIZES[size] }, (_, i) => [
        names[i % names.length],
        String(25 + (i % 40)),
        cities[i % cities.length],
        `Dept ${(i % 10) + 1}`,
        `$${50000 + i * 1000}`,
      ]),
    ];
  };

  if (type === "table") {
    return {
      title: `${baseTitle} (${size})`,
      content: [],
      table: getTable(size),
    };
  }

  return {
    title: `${baseTitle} (${size})`,
    content: getParagraphs(size),
    table: [],
  };
};

export { generateSampleData };
