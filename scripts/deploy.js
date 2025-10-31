// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");

  // Obtener la cuenta usada para desplegar
  const [deployer] = await hre.ethers.getSigners();
  console.log("📜 Deploying contracts with account:", deployer.address);

  // Mostrar el balance de la cuenta
  const balance = await deployer.getBalance();
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Compilar y desplegar el contrato
  const AureaToken = await hre.ethers.getContractFactory("AureaToken");
  const aureaToken = await AureaToken.deploy();

  console.log("⏳ Waiting for deployment...");
  await aureaToken.waitForDeployment();

  const address = await aureaToken.getAddress();
  console.log("✅ AUREA Token deployed at:", address);

  // Guardar la dirección en un archivo (útil para el workflow)
  const fs = require("fs");
  fs.writeFileSync("deployed-address.txt", address);

  console.log("📝 Contract address saved to deployed-address.txt");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
