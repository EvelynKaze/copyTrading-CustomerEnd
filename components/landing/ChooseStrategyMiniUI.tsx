import { TrendingUp, Zap, Shield } from "lucide-react";

export function ChooseStrategyMiniUI() {
  return (
    <div className="backdrop-blur-md relative shadow-inner border border-appGold20 shadow-appGold20 transition-all duration-300 ease-in-out hover:border-appGold100 hover:shadow-appGold100 p-6 rounded-lg max-w-sm mx-auto">
      <p className="absolute z-0 top-0 right-4 font-black text-9xl blur-sm opacity-25">
        2
      </p>
      <h3 className="text-lg font-semibold mb-4">Choose Your Strategy</h3>
      <p className="text-sm dark:text-appGold100 mb-4">
        Select traders to follow or customize your plan.
      </p>
      <div className="space-y-3">
        <div className="flex items-center p-3 border rounded-md hover:bg-appGold20 transition-colors cursor-pointer">
          <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
          <span>Follow Top Traders</span>
        </div>
        <div className="flex items-center p-3 border rounded-md hover:bg-appGold20 transition-colors cursor-pointer">
          <Zap className="w-5 h-5 text-yellow-600 mr-3" />
          <span>AI-Powered Strategy</span>
        </div>
        <div className="flex items-center p-3 border rounded-md hover:bg-appGold20 transition-colors cursor-pointer">
          <Shield className="w-5 h-5 text-green-600 mr-3" />
          <span>Custom Risk Management</span>
        </div>
      </div>
    </div>
  );
}
