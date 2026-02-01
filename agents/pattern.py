import pandas as pd
import numpy as np

def detect_patterns(df):
    patterns = []
    
    if len(df) < 14:
        return [{"pattern": "Not enough data", "strength": "NONE", "action": "Log at least 14 days"}]
    
    baseline_hrv = df['hrv_rmssd_ms'].median()
    
    # Caffeine
    high_caff = df[df['caffeine_mg'] > 150]
    low_caff = df[df['caffeine_mg'] <= 150]
    if len(high_caff) >= 5 and len(low_caff) >= 5:
        diff = low_caff['hrv_rmssd_ms'].mean() - high_caff['hrv_rmssd_ms'].mean()
        pct = (diff / baseline_hrv) * 100
        if pct > 3:
            patterns.append({
                "pattern": f"High caffeine drops HRV by {pct:.1f}%",
                "strength": "STRONG" if pct > 10 else "MODERATE",
                "action": "Limit caffeine, none after 2pm",
                "correlation": pct
            })
    
    # Alcohol
    alcohol = df[df['alcohol_units'] > 0]
    no_alcohol = df[df['alcohol_units'] == 0]
    if len(alcohol) >= 5 and len(no_alcohol) >= 5:
        diff = no_alcohol['hrv_rmssd_ms'].mean() - alcohol['hrv_rmssd_ms'].mean()
        pct = (diff / baseline_hrv) * 100
        if pct > 3:
            patterns.append({
                "pattern": f"Alcohol drops HRV by {pct:.1f}%",
                "strength": "STRONG" if pct > 8 else "MODERATE",
                "action": "Avoid alcohol before bed",
                "correlation": pct
            })
    
    # Sleep duration
    short = df[df['sleep_duration_hours'] < 6.5]
    good = df[df['sleep_duration_hours'] >= 7]
    if len(short) >= 5 and len(good) >= 5:
        diff = good['hrv_rmssd_ms'].mean() - short['hrv_rmssd_ms'].mean()
        pct = (diff / baseline_hrv) * 100
        if pct > 3:
            patterns.append({
                "pattern": f"Sleep <6.5h drops HRV by {pct:.1f}%",
                "strength": "STRONG" if pct > 10 else "MODERATE",
                "action": "Get 7+ hours of sleep",
                "correlation": pct
            })
    
    # Stress
    high_stress = df[df['stress_score'] > 60]
    low_stress = df[df['stress_score'] <= 40]
    if len(high_stress) >= 5 and len(low_stress) >= 5:
        diff = low_stress['hrv_rmssd_ms'].mean() - high_stress['hrv_rmssd_ms'].mean()
        pct = (diff / baseline_hrv) * 100
        if pct > 3:
            patterns.append({
                "pattern": f"High stress drops HRV by {pct:.1f}%",
                "strength": "STRONG" if pct > 10 else "MODERATE",
                "action": "Add meditation or breathing exercises",
                "correlation": pct
            })
    
    # Screen time
    high_screen = df[df['screen_time_min'] > 180]
    low_screen = df[df['screen_time_min'] <= 120]
    if len(high_screen) >= 5 and len(low_screen) >= 5:
        latency_diff = high_screen['sleep_latency_min'].mean() - low_screen['sleep_latency_min'].mean()
        if latency_diff > 3:
            patterns.append({
                "pattern": f"High screen time adds {latency_diff:.0f}min to fall asleep",
                "strength": "MODERATE",
                "action": "Reduce screens before bed",
                "correlation": latency_diff
            })
    
    patterns.sort(key=lambda x: x.get('correlation', 0), reverse=True)
    
    if not patterns:
        patterns.append({"pattern": "No strong patterns yet", "strength": "NONE", "action": "Keep logging"})
    
    return patterns

if __name__ == "__main__":
    import sys
    file_path = sys.argv[1] if len(sys.argv) > 1 else "wearables_health_6mo_daily.csv"
    df = pd.read_csv(file_path)
    user_df = df[df['user_id'] == 'U0001'].copy()
    print(f"=== PATTERNS (User U0001, {len(user_df)} days) ===\n")
    for i, p in enumerate(detect_patterns(user_df)[:5], 1):
        print(f"{i}. [{p['strength']}] {p['pattern']}")
        print(f"   → {p['action']}\n")
