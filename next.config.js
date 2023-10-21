/** @type {import('next').NextConfig} */
const nextConfig = {
  output: {
    // Use the "export" option
    export: {
      // Set the value according to your preferences
      // For example, you can use a specific directory such as 'out'
      directory: "out",
    },
  },
};

module.exports = nextConfig;
