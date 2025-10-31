
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Aurea Token (AUREA)
/// @notice Token ERC20 controlado por un único propietario (tú)
contract AureaToken is ERC20, Ownable {
    constructor() ERC20("Aurea Token", "AUREA") Ownable(msg.sender) {
        // ✅ Suministro inicial de 1 millón de tokens (con 18 decimales)
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    /// @notice Permite al propietario acuñar más tokens (solo tú)
    /// @param to Dirección que recibirá los tokens
    /// @param amount Cantidad de tokens completos a acuñar (sin decimales)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }

    /// @notice Bloquea de forma irreversible la capacidad de acuñar más tokens
    /// @dev Una vez ejecutado, nadie podrá llamar a `mint` nunca más
    bool public mintingLocked = false;

    function lockMintingForever() external onlyOwner {
        mintingLocked = true;
    }

    function _mint(address account, uint256 amount) internal override {
        require(!mintingLocked, "Minting permanently locked");
        super._mint(account, amount);
    }
}
