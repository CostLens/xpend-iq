
import { useState, useEffect } from "react";

export function useSidebarFeatures() {
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-usage-features");
      return savedValue !== "false";
    }
    return true;
  });

  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-boarding-features");
      return savedValue !== "false";
    }
    return true;
  });

  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-negotiation-features");
      return savedValue !== "false";
    }
    return true;
  });

  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-benchmarking-features");
      return savedValue !== "false";
    }
    return true;
  });
  
  const [showComplianceFeatures, setShowComplianceFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-compliance-features");
      return savedValue !== "false";
    }
    return true;
  });

  // Listen for storage changes to update UI accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      const usageValue = localStorage.getItem("show-usage-features");
      const boardingValue = localStorage.getItem("show-boarding-features");
      const negotiationValue = localStorage.getItem("show-negotiation-features");
      const benchmarkingValue = localStorage.getItem("show-benchmarking-features");
      const complianceValue = localStorage.getItem("show-compliance-features");
      
      setShowUsageFeatures(usageValue !== "false");
      setShowBoardingFeatures(boardingValue !== "false");
      setShowNegotiationFeatures(negotiationValue !== "false");
      setShowBenchmarkingFeatures(benchmarkingValue !== "false");
      setShowComplianceFeatures(complianceValue !== "false");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    window.addEventListener('boardingFeaturesToggled', handleStorageChange);
    window.addEventListener('negotiationFeaturesToggled', handleStorageChange);
    window.addEventListener('benchmarkingFeaturesToggled', handleStorageChange);
    window.addEventListener('complianceFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
      window.removeEventListener('boardingFeaturesToggled', handleStorageChange);
      window.removeEventListener('negotiationFeaturesToggled', handleStorageChange);
      window.removeEventListener('benchmarkingFeaturesToggled', handleStorageChange);
      window.removeEventListener('complianceFeaturesToggled', handleStorageChange);
    };
  }, []);

  return {
    showUsageFeatures,
    showBoardingFeatures,
    showNegotiationFeatures,
    showBenchmarkingFeatures,
    showComplianceFeatures
  };
}
