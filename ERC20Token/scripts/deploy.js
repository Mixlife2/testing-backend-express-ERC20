const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const initialSupply = ethers.parseUnits("1000", 18); // 1000 tokens
    const tokenName = "MyToken";
    const tokenSymbol = "MTK";

    const token = await ERC20Token.deploy(initialSupply, tokenName, tokenSymbol);
    await token.waitForDeployment(); // Cambiamos token.deployed() por token.waitForDeployment()

    console.log("ERC20 Token deployed to:", await token.getAddress()); // Usamos getAddress() para obtener la dirección

    // Cambiar el nombre del token
    const newName = "EddyLoverToken";
    await token.setName(newName);
    console.log("Nombre del token cambiado a:", newName);

    // Verificar el nuevo nombre
    const updatedName = await token.name();
    console.log("Nombre actualizado del token:", updatedName);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
