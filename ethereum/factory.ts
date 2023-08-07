import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x0DE7a7bA91E7f0FcbA2d7ba482c898803B4F7874"
);

export default instance;
