/**
 * Canonical Capstone Protocol Projects Data
 * Aligned with ONV-09, ONV-10, and DEC-003.
 */

export interface RealityCheckItem {
  id: string;
  question: string;
  requirement: string;
  category: "product" | "security" | "technical";
}

export interface CapstoneProject {
  id: string;
  slug: string;
  title: string;
  badge: string;
  difficulty: "Beginner-Friendly" | "Intermediate" | "Advanced";
  estimatedTime: string;
  techStack: string;
  isEthereum: boolean;
  problemStatement: string;
  targetUser: string;
  architectureOverview: string;
  stateDiagram: string;
  contracts: {
    name: string;
    description: string;
    code: string;
  }[];
  testingGuidance: string;
  deploymentScript: string;
  realityChecks: RealityCheckItem[];
  sandboxChallengeId?: string;
}

export const CAPSTONE_PROJECTS: Record<string, CapstoneProject> = {
  escrow: {
    id: "escrow",
    slug: "escrow",
    title: "Decentralized Escrow Protocol",
    badge: "Production Protocol",
    difficulty: "Intermediate",
    estimatedTime: "4–6 Jam",
    techStack: "Solidity 0.8.20 / Foundry / OpenZeppelin v5",
    isEthereum: true,
    problemStatement:
      "Transaksi jual-beli barang atau jasa bernilai tinggi di internet sering terancam penipuan jika pembeli harus mentransfer dana terlebih dahulu, atau penjual mengirim barang tanpa jaminan pembayaran. Protokol ini mengunci dana di smart contract terdesentralisasi hingga kedua belah pihak sepakat atau arbiter independen menyelesaikan sengketa.",
    targetUser: "Pembeli dan penjual peer-to-peer tanpa perantara bank terpusat.",
    architectureOverview:
      "Sistem multi-kontrak modular yang memisahkan logika brankas penyimpanan dana (EscrowVault.sol) dengan modul resolusi sengketa berbatas waktu (DisputeResolver.sol). Menggunakan custom errors dan perlindungan ReentrancyGuard.",
    stateDiagram: `[AWAITING_PAYMENT]
       │
       ▼ (buyer deposit ETH)
[AWAITING_DELIVERY] ──── (dispute raised) ────► [IN_DISPUTE]
       │                                            │
       ▼ (buyer confirm delivery)                   ▼ (arbiter resolves)
  [COMPLETED]                               [REFUNDED / RELEASED]`,
    contracts: [
      {
        name: "IEscrow.sol",
        description: "Antarmuka kanonik fungsi escrow dan event tracking.",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEscrow {
    enum State { AwaitingPayment, AwaitingDelivery, Complete, Disputed, Refunded }

    event Deposited(uint256 indexed tradeId, address indexed buyer, uint256 amount);
    event DeliveryConfirmed(uint256 indexed tradeId);
    event DisputeRaised(uint256 indexed tradeId, address indexed raisedBy);
    event DisputeResolved(uint256 indexed tradeId, address indexed recipient, uint256 amount);

    error InvalidState(State current, State expected);
    error Unauthorized();
    error TransferFailed();

    function createTrade(address payable seller, address arbiter) external payable returns (uint256 tradeId);
    function confirmDelivery(uint256 tradeId) external;
    function raiseDispute(uint256 tradeId) external;
    function resolveDispute(uint256 tradeId, bool refundBuyer) external;
}`,
      },
      {
        name: "EscrowCore.sol",
        description: "Kontrak utama pengunci dana berbasis pola Checks-Effects-Interactions (CEI).",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IEscrow} from "./IEscrow.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract EscrowCore is IEscrow, ReentrancyGuard {
    struct Trade {
        address payable buyer;
        address payable seller;
        address arbiter;
        uint256 amount;
        State state;
        uint256 createdAt;
    }

    mapping(uint256 => Trade) public trades;
    uint256 public nextTradeId;

    function createTrade(address payable seller, address arbiter) external payable returns (uint256 tradeId) {
        if (msg.value == 0) revert InvalidState(State.AwaitingPayment, State.AwaitingDelivery);
        tradeId = nextTradeId++;
        trades[tradeId] = Trade({
            buyer: payable(msg.sender),
            seller: seller,
            arbiter: arbiter,
            amount: msg.value,
            state: State.AwaitingDelivery,
            createdAt: block.timestamp
        });
        emit Deposited(tradeId, msg.sender, msg.value);
    }

    function confirmDelivery(uint256 tradeId) external nonReentrant {
        Trade storage t = trades[tradeId];
        if (msg.sender != t.buyer) revert Unauthorized();
        if (t.state != State.AwaitingDelivery) revert InvalidState(t.state, State.AwaitingDelivery);

        t.state = State.Complete;
        uint256 payout = t.amount;
        t.amount = 0;

        (bool sent, ) = t.seller.call{value: payout}("");
        if (!sent) revert TransferFailed();
        emit DeliveryConfirmed(tradeId);
    }

    function raiseDispute(uint256 tradeId) external {
        Trade storage t = trades[tradeId];
        if (msg.sender != t.buyer && msg.sender != t.seller) revert Unauthorized();
        if (t.state != State.AwaitingDelivery) revert InvalidState(t.state, State.AwaitingDelivery);
        t.state = State.Disputed;
        emit DisputeRaised(tradeId, msg.sender);
    }

    function resolveDispute(uint256 tradeId, bool refundBuyer) external nonReentrant {
        Trade storage t = trades[tradeId];
        if (msg.sender != t.arbiter) revert Unauthorized();
        if (t.state != State.Disputed) revert InvalidState(t.state, State.Disputed);

        t.state = refundBuyer ? State.Refunded : State.Complete;
        address payable recipient = refundBuyer ? t.buyer : t.seller;
        uint256 payout = t.amount;
        t.amount = 0;

        (bool sent, ) = recipient.call{value: payout}("");
        if (!sent) revert TransferFailed();
        emit DisputeResolved(tradeId, recipient, payout);
    }
}`,
      },
    ],
    testingGuidance:
      "Tulis unit test Foundry yang mencakup: 1. Pembeli sukses mendepositkan dana, 2. Penjual menerima pembayaran saat pembeli konfirmasi, 3. Pihak ketiga tidak bisa mencairkan dana (Unauthorized revert), 4. Arbiter berhasil merefund pembeli saat dispute, 5. Invariant test: Total saldo kontrak selalu sama dengan akumulasi trade aktif.",
    deploymentScript: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {EscrowCore} from "../src/EscrowCore.sol";

contract DeployEscrow is Script {
    function run() external returns (EscrowCore escrow) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        escrow = new EscrowCore();
        vm.stopBroadcast();
    }
}`,
    realityChecks: [
      {
        id: "rc-1",
        question: "Who needs this?",
        requirement: "Masalah nyata: Menyelesaikan risiko penipuan perdagangan P2P barang/jasa tanpa perantara bank terpusat.",
        category: "product",
      },
      {
        id: "rc-2",
        question: "Why blockchain?",
        requirement: "Smart contract menjamin dana tidak dapat ditarik sepihak oleh pembeli maupun penjual sebelum syarat terpenuhi.",
        category: "product",
      },
      {
        id: "rc-3",
        question: "Multi-Contract Architecture",
        requirement: "Memisahkan antarmuka IEscrow.sol dan implementasi EscrowCore.sol yang mewarisi ReentrancyGuard.",
        category: "technical",
      },
      {
        id: "rc-4",
        question: "Modern Solidity (v0.8.20+)",
        requirement: "Menggunakan deklarasi 'error CustomError()', modifier visibilitas yang tepat, dan pragma ^0.8.20.",
        category: "technical",
      },
      {
        id: "rc-5",
        question: "Audit-Grade Testing (Foundry)",
        requirement: "Test coverage 100% pada fungsi kritis dan menyertakan pengujian revert untuk panggilan tidak berhak.",
        category: "security",
      },
      {
        id: "rc-6",
        question: "Zero High/Critical Vulnerabilities",
        requirement: "Pola Checks-Effects-Interactions (CEI) diterapkan ketat: state diubah sebelum transfer low-level call.",
        category: "security",
      },
      {
        id: "rc-7",
        question: "Live Testnet Deployment",
        requirement: "Dideploy ke Ethereum Sepolia Testnet dan source code terverifikasi publik di Sepolia Etherscan.",
        category: "technical",
      },
      {
        id: "rc-8",
        question: "Comprehensive Documentation",
        requirement: "File README.md memuat diagram arsitektur, panduan build/test Foundry lokal, dan alamat kontrak terverifikasi.",
        category: "technical",
      },
    ],
    sandboxChallengeId: "vault-access",
  },

  amm: {
    id: "amm",
    slug: "amm",
    title: "Automated Liquidity Pool AMM",
    badge: "DeFi Infrastructure",
    difficulty: "Advanced",
    estimatedTime: "8–10 Jam",
    techStack: "Solidity 0.8.20 / Mathematics / Foundry",
    isEthereum: true,
    problemStatement:
      "Pasar keuangan tradisional memerlukan order book terpusat dan pembuat pasar (market maker) institusional untuk menyediakan likuiditas. AMM (Automated Market Maker) memungkinkan pertukaran token otomatis peer-to-contract menggunakan rumus matematis Constant Product (x * y = k) tanpa ketergantungan pada pihak ketiga.",
    targetUser: "Trader token DeFi dan penyedia likuiditas (Liquidity Providers).",
    architectureOverview:
      "Kontrak CPAMM mengelola pasangan dua token ERC-20, menghitung slippage matematis, mencetak dan membakar token LP proporsional, serta memungut fee swap 0.3% untuk mendanai imbal hasil likuiditas.",
    stateDiagram: `[Liquidity Pool (x, y)]
       │
  (User Swaps Δx) ──► Formula: (x + Δx) * (y - Δy) = k
       │
       ▼
  (User Receives Δy Token Out, Pool Collects 0.3% Fee)`,
    contracts: [
      {
        name: "IAMM.sol",
        description: "Antarmuka fungsi pool likuiditas dan swap token.",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IAMM {
    event Swap(address indexed user, address indexed tokenIn, uint256 amountIn, uint256 amountOut);
    event LiquidityAdded(address indexed provider, uint256 amount0, uint256 amount1, uint256 shares);
    event LiquidityRemoved(address indexed provider, uint256 amount0, uint256 amount1, uint256 shares);

    error ZeroAmount();
    error InsufficientLiquidity();
    error SlippageExceeded();

    function swap(address tokenIn, uint256 amountIn) external returns (uint256 amountOut);
    function addLiquidity(uint256 amount0, uint256 amount1) external returns (uint256 shares);
    function removeLiquidity(uint256 shares) external returns (uint256 amount0, uint256 amount1);
}`,
      },
      {
        name: "CPAMM.sol",
        description: "Konstanta Constant Product x * y = k dan pencetakan LP share.",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IAMM} from "./IAMM.sol";

contract CPAMM is IAMM, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable token0;
    IERC20 public immutable token1;

    uint256 public reserve0;
    uint256 public reserve1;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(address _token0, address _token1) {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function swap(address tokenIn, uint256 amountIn) external nonReentrant returns (uint256 amountOut) {
        if (amountIn == 0) revert ZeroAmount();
        bool isToken0 = tokenIn == address(token0);
        (IERC20 tIn, IERC20 tOut, uint256 resIn, uint256 resOut) = isToken0
            ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

        tIn.safeTransferFrom(msg.sender, address(this), amountIn);

        // Rumus Constant Product dengan 0.3% fee:
        uint256 amountInWithFee = (amountIn * 997) / 1000;
        amountOut = (resOut * amountInWithFee) / (resIn + amountInWithFee);

        if (amountOut == 0) revert InsufficientLiquidity();

        tOut.safeTransfer(msg.sender, amountOut);

        reserve0 = token0.balanceOf(address(this));
        reserve1 = token1.balanceOf(address(this));

        emit Swap(msg.sender, tokenIn, amountIn, amountOut);
    }
}`,
      },
    ],
    testingGuidance:
      "Tulis pengujian invariant testing di Foundry: 1. Nilai k (reserve0 * reserve1) tidak pernah berkurang setelah swap, 2. Fee 0.3% terakumulasi dengan benar, 3. Pembagian rasio token saat penarikan likuiditas tetap adil.",
    deploymentScript: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {CPAMM} from "../src/CPAMM.sol";

contract DeployAMM is Script {
    function run() external returns (CPAMM amm) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address tokenA = vm.envAddress("TOKEN_A");
        address tokenB = vm.envAddress("TOKEN_B");

        vm.startBroadcast(deployerPrivateKey);
        amm = new CPAMM(tokenA, tokenB);
        vm.stopBroadcast();
    }
}`,
    realityChecks: [
      {
        id: "rc-1",
        question: "Who needs this?",
        requirement: "Trader yang membutuhkan pertukaran likuiditas desentralisasi tanpa manipulasi order book terpusat.",
        category: "product",
      },
      {
        id: "rc-2",
        question: "Why blockchain?",
        requirement: "Pool likuiditas dieksekusi secara otonom oleh kode matematis tanpa campur tangan entitas perantara.",
        category: "product",
      },
      {
        id: "rc-3",
        question: "Multi-Contract Architecture",
        requirement: "Terdiri dari antarmuka IAMM.sol, token penyedia likuiditas, dan kontrak CPAMM core.",
        category: "technical",
      },
      {
        id: "rc-4",
        question: "Modern Solidity (v0.8.20+)",
        requirement: "Pustaka SafeERC20 OpenZeppelin v5, custom errors, dan optimasi pemadatan slot storage.",
        category: "technical",
      },
      {
        id: "rc-5",
        question: "Audit-Grade Testing (Foundry)",
        requirement: "Menyertakan Invariant Testing dan Fuzzing untuk membuktikan properti k = x * y tidak pernah rusak.",
        category: "security",
      },
      {
        id: "rc-6",
        question: "Zero High/Critical Vulnerabilities",
        requirement: "Dilindungi ReentrancyGuard, proteksi slippage, dan penanganan Weird ERC-20 token void return.",
        category: "security",
      },
      {
        id: "rc-7",
        question: "Live Testnet Deployment",
        requirement: "Dideploy ke Sepolia Testnet dengan token pasangan ERC-20 simulasi yang terverifikasi.",
        category: "technical",
      },
      {
        id: "rc-8",
        question: "Comprehensive Documentation",
        requirement: "Dokumentasi matematika swap, panduan Forge test, dan riwayat deployment testnet.",
        category: "technical",
      },
    ],
    sandboxChallengeId: "erc20-balance",
  },
};

export function getCapstoneById(id: string): CapstoneProject | null {
  return CAPSTONE_PROJECTS[id] || null;
}
