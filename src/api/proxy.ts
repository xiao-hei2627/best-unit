// Vite 配置用的代理对象
const viteProxy = {
  "/api": {
    target: "https://fund.bestfulfill.tech/api/sdk",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, ""),
    secure: false,
  },
};

export { viteProxy };
