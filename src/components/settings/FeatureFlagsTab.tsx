
import React, { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function FeatureFlagsTab() {
  // Set default values for feature flags when component mounts
  useEffect(() => {
    // Only set if they haven't been set yet
    if (localStorage.getItem("show-usage-features") === null) {
      localStorage.setItem("show-usage-features", "true");
      window.dispatchEvent(new Event("usageFeaturesToggled"));
    }
    
    if (localStorage.getItem("show-boarding-features") === null) {
      localStorage.setItem("show-boarding-features", "true");
      window.dispatchEvent(new Event("boardingFeaturesToggled"));
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Flag</CardTitle>
        <CardDescription>
          Enable or disable specific features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="usageFeatures">Usage Analytics</Label>
            <p className="text-sm text-muted-foreground">
              Enable detailed usage analytics and reporting
            </p>
          </div>
          <Switch
            id="usageFeatures"
            defaultChecked={localStorage.getItem("show-usage-features") !== "false"}
            onCheckedChange={(checked) => {
              localStorage.setItem("show-usage-features", checked.toString());
              window.dispatchEvent(new Event("usageFeaturesToggled"));
            }}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="boardingFeatures">User Boarding</Label>
            <p className="text-sm text-muted-foreground">
              Enable user onboarding and offboarding automation
            </p>
          </div>
          <Switch
            id="boardingFeatures"
            defaultChecked={localStorage.getItem("show-boarding-features") !== "false"}
            onCheckedChange={(checked) => {
              localStorage.setItem("show-boarding-features", checked.toString());
              window.dispatchEvent(new Event("boardingFeaturesToggled"));
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
