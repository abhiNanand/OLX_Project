"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist.routes"));
//libraries
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000",
        "https://abhi-olx-app.netlify.app"
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 5000;
if (!process.env.MONGO_URL) {
    console.error("MONGO_URL not defined in .env");
    process.exit(1);
}
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => { console.log(("mongodb connected")); })
    .catch((error) => { console.log("mongodb connection error", error); });
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.use('/account', auth_routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});
app.use('/categories', product_routes_1.default);
app.use('/wishlist', wishlist_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
