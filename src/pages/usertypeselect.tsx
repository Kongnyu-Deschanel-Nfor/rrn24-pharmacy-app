import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function AccountSelection() {
  const [selected, setSelected] = useState<"finder" | "medical" | null>(null);
 

  const navigate=useNavigate();

  const handleContinue = () => {
    if (selected === "finder") {
      navigate("/register-finder");
    } else if (selected === "medical") {
      navigate("/register-facility");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-6">
        <div>
            <h1 style={{ color:'blue' }} className="text-4xl p-7 font-bold text-center">Welcome to Medifinder</h1>

        </div>
    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-10">
        Choose Your Account Type
      </h3>

      <hr style={{ background:"blue" }} className="w-8 border-b-2 rounded-full mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {[{
          id: "finder",
          title: "Finder",
          description: "Looking for medical facilities? Choose this option to find the best care.",
        }, {
          id: "medical",
          title: "Medical Facility",
          description: "Register your medical facility to connect with patients easily.",
        }].map(({ id, title, description }) => (
          <motion.div
            key={id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={cn(
                "p-8 rounded-3xl cursor-pointer transition-all shadow-md border-2",
                selected === id ? "border-blue-500 shadow-xl bg-white dark:bg-gray-800" : "border-gray-300 dark:border-gray-700"
              )}
              onClick={() => setSelected(id as "finder" | "medical")}
            >
              <CardContent className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-3">{description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Button
        className={cn(
          "mt-10 px-8 py-3 text-lg rounded-xl font-semibold transition-all",
          selected ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
        )}
        disabled={!selected}

        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
}
