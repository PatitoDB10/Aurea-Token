const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying from:", deployer.address);

  // Params
  const treasury = process.env.TREASURY_ADDRESS; // e.g., "0xYourTreasury"
  if (!treasury) throw new Error("Set TREASURY_ADDRESS in repo secrets");

  const initialSupply = hre.ethers.parseUnits("1000000000", 18); // 1,000,000,000 AUR
  const burnBps = 50; // 0.50% initial burn (adjust if desired)

  const Aurea = await hre.ethers.getContractFactory("AureaToken");
  const aurea = await Aurea.deploy(treasury, initialSupply, burnBps);
  await aurea.waitForDeployment();

  console.log("✅ Deployed AUREA at:", aurea.target);
  console.log("To verify (optional): npx hardhat verify --network polygonMainnet", aurea.target, treasury, initialSupply.toString(), burnBps);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
