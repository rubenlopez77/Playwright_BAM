"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const uxmap_valid_1 = __importDefault(require("./rules/uxmap-valid"));
const test_enforce_pattern_1 = __importDefault(require("./rules/test-enforce-pattern"));
/**
 * 🧩 Plugin BAM-UX
 * Exporta las reglas para ESLint (Flat Config compatible)
 */
exports.rules = {
    "uxmap-valid": uxmap_valid_1.default,
    "test-enforce-pattern": test_enforce_pattern_1.default,
};
