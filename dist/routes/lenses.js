var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Router } from "express";
import { Lens } from "../db/models/lens.js";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { User } from "../db/models/user.js";
var router = Router();
// Get all the lenses from the database
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lenses, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Lens.find({})];
            case 1:
                lenses = _a.sent();
                res.status(200).json(lenses);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).send("Server error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get a single lens by ID
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, lens, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Lens.findById(id)];
            case 2:
                lens = _a.sent();
                if (!lens) {
                    return [2 /*return*/, res.status(404).send("Lens not found")];
                }
                res.status(200).json(lens);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).send("Server error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Protected routes
// Create a new lens
router.post("/", validateToken, isAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newLens, existingLens, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                newLens = new Lens(req.body);
                return [4 /*yield*/, Lens.findOne({
                        name: newLens.name,
                        category: newLens.category,
                        index: newLens.index,
                        diameter: newLens.diameter,
                        "sphRange.minus": newLens.sphRange.minus,
                        "sphRange.plus": newLens.sphRange.plus,
                        cylMax: newLens.cylMax,
                        coating: newLens.coating,
                        price: newLens.price,
                    })];
            case 1:
                existingLens = _a.sent();
                if (!existingLens) return [3 /*break*/, 2];
                res.status(400).json({ message: "Lens already exists" });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, newLens.save()];
            case 3:
                _a.sent();
                res.status(201).json(newLens);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).send("Server error");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Update a lens by ID
router.put("/:id", validateToken, isAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lensId, updatedLens, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                lensId = req.params.id;
                return [4 /*yield*/, Lens.findByIdAndUpdate(lensId, req.body, {
                        new: true,
                    })];
            case 1:
                updatedLens = _a.sent();
                res.json(updatedLens);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).send("Server error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete a lens by ID
router.delete("/:id", validateToken, isAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lensId, deletedLens, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                lensId = req.params.id;
                return [4 /*yield*/, Lens.findByIdAndDelete(lensId)];
            case 1:
                deletedLens = _a.sent();
                if (!deletedLens) {
                    return [2 /*return*/, res.status(404).send("Lens not found")];
                }
                res.status(200).json({ message: "Lens deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).send("Server error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Toggle favorite status of a lens for the authenticated user
router.post("/:userId/favorite/:lensId", validateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, lensId_1, user, lens, lensExists, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.params.userId;
                lensId_1 = req.params.lensId;
                return [4 /*yield*/, User.findById(userId)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, Lens.findById(lensId_1)];
            case 2:
                lens = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send("User not found.")];
                }
                lensExists = user.favoritesLens.find(function (e) { return e._id.toString() === lensId_1; });
                if (lensExists) {
                    return [2 /*return*/, res.status(422).send("This Exists!")];
                }
                user.favoritesLens.push(lens);
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                res.status(200).send("Favorite status updated successfully");
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).send("Server error");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Get all favorite lenses for the authenticated user
router.get("/:id/favorites", validateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, User.findById(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send("User not found")];
                }
                res.status(200).json(user.favoritesLens);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error(error_7);
                res.status(500).send("Server error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//remove favorit lens for the authenticated user
router.delete("/:userId/delete-from-favorite/:lensId", validateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, lensId_2, user, lens, lensExists, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.params.userId;
                lensId_2 = req.params.lensId;
                return [4 /*yield*/, User.findById(userId)];
            case 1:
                user = _a.sent();
                console.log(user);
                if (!user) {
                    return [2 /*return*/, res.status(404).send("User not found")];
                }
                return [4 /*yield*/, Lens.findById(lensId_2)];
            case 2:
                lens = _a.sent();
                console.log(lens);
                if (!lens) {
                    return [2 /*return*/, res.status(404).send("Lens not found")];
                }
                lensExists = user.favoritesLens.find(function (e) { return e._id.toString() === lensId_2; });
                if (lensExists) {
                    user.favoritesLens.pull(lensExists);
                }
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).send("Lens removed from favorites successfully")];
            case 4:
                error_8 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_8.message)];
            case 5: return [2 /*return*/];
        }
    });
}); });
export { router as lensesRouter };
