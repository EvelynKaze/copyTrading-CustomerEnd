import { UserPlus } from "lucide-react";

export function SignUpMiniUI() {
  return (
    <div className="backdrop-blur-md relative shadow-inner border border-appDarkCard dark:border-appGold20 hover:border-appGold100 transition-all duration-300 ease-in-out hover:shadow-appGold100 shadow-appGold20 p-6 rounded-lg max-w-sm mx-auto">
      <p className="absolute z-0 top-0 right-4 font-black text-9xl blur-sm opacity-25">
        1
      </p>
      <div className="relative z-10">
        <div className="flex items-center justify-center w-12 h-12 bg-appDarkCard rounded-full mb-4">
          <UserPlus className="w-6 h-6 text-appGold200" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
        <p className="text-sm dark:text-appGold100 mb-4">
          Create your account in just minutes.
        </p>
        <div className="space-y-1">
          <div className="w-full px-3 appearance-none py-2 dark:text-appGold20 border rounded-md">
            Email
          </div>
          <div className="w-full px-3 appearance-none py-2 dark:text-appGold20 border rounded-md">
            Password
          </div>
          <button className="w-full bg-appDarkCard text-white py-2 rounded-md transition-colors">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
