import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

/**
 * Fire-and-forget haptic helpers. Android uses performAndroidHapticsAsync
 * (no VIBRATE permission needed); iOS uses impact/notification generators.
 * Failures (web, simulators, disabled haptics) are silently ignored.
 */

const isAndroid = Platform.OS === "android";
const ignore = () => {};

/** Light tick for selections: quiz option, tab press, toggle. */
export function hapticSelect(): void {
  (isAndroid
    ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Context_Click)
    : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  ).catch(ignore);
}

/** Positive confirmation: correct answer, saved, badge unlocked. */
export function hapticSuccess(): void {
  (isAndroid
    ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Confirm)
    : Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  ).catch(ignore);
}

/** Negative feedback: wrong answer. */
export function hapticError(): void {
  (isAndroid
    ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Reject)
    : Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
  ).catch(ignore);
}

/** Cautionary feedback: destructive confirms, streak at risk. */
export function hapticWarning(): void {
  (isAndroid
    ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Long_Press)
    : Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
  ).catch(ignore);
}
