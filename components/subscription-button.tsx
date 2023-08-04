"use client";

import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton: FC<SubscriptionButtonProps> = ({ isPro = false }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      size="sm"
      variant={isPro ? "default" : "premium"}
      disabled={loading}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
