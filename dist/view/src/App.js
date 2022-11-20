"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./pages/Home"));
function App() {
    return (<div className="App">
      
      <react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
      <react_router_dom_1.Route path='/' element={<Home_1.default />}></react_router_dom_1.Route>
      </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </div>);
}
exports.default = App;
