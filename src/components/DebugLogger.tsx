// DebugLogger.tsx
import { useEffect } from "react";
import { useLocation, useNavigation } from "react-router";

export function DebugLogger() {
  const location = useLocation();
  const navigation = useNavigation();

  // 🔹 Log when the route changes
  useEffect(() => {
    console.log("📍 Route changed:", location.pathname + location.search);
  }, [location]);

  // 🔹 Log navigation lifecycle
  useEffect(() => {
    if (navigation.state !== "idle") {
      console.log("🔄 Navigation started:", navigation);
    } else {
      console.log("✅ Navigation finished");
    }
  }, [navigation]);

  return null; // nothing rendered on screen
}
