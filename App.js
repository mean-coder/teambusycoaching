import { useState } from "react";

// ─── Auth Data ───────────────────────────────────────────────────────────────
const USERS = [
  { id: "admin", password: "busy2024", role: "admin", name: "Coach Busy" },
  { id: "client001", password: "1234", role: "client", name: "นาย สมชาย ใจดี", clientId: 1 },
  { id: "client002", password: "1234", role: "client", name: "นาย วิชัย แข็งแกร่ง", clientId: 2 },
  { id: "client003", password: "1234", role: "client", name: "น.ส. สุดา สวยงาม", clientId: 3 },
  { id: "client004", password: "1234", role: "client", name: "นาย กิตติ นักกีฬา", clientId: 4 },
  { id: "client005", password: "1234", role: "client", name: "น.ส. มินตรา ฟิต", clientId: 5 },
];

// ─── Client Programs (per-client) ────────────────────────────────────────────
const CLIENT_PROGRAMS = {
  1: {
    name: "Fat Burn Pro",
    level: "Beginner", weeks: 8, sessions: 3, color: "#FF6B35",
    goal: "ลดไขมัน 5–7 kg ใน 8 สัปดาห์",
    note: "เน้น Cardio + Full Body ความหนักเบา เหมาะสำหรับผู้เริ่มต้น",
    week: 5, progress: 62, change: "-4.2 kg",
    schedule: {
      จันทร์: [{ ex: "Treadmill Incline Walk", sets: 1, reps: "30 min", note: "ความชันสูงสุดที่ทำได้" }, { ex: "Goblet Squat", sets: 3, reps: "15 reps", note: "น้ำหนัก 8–12 kg" }],
      พุธ: [{ ex: "Rowing Machine", sets: 1, reps: "20 min", note: "" }, { ex: "Plank", sets: 3, reps: "45 วินาที", note: "" }, { ex: "Push-up", sets: 3, reps: "12 reps", note: "วางเข่าได้ถ้าต้องการ" }],
      ศุกร์: [{ ex: "HIIT Cycling", sets: 1, reps: "20 min", note: "สลับ 30s เร็ว / 30s ช้า" }, { ex: "Dumbbell Row", sets: 3, reps: "12 reps", note: "" }, { ex: "Leg Raise", sets: 3, reps: "15 reps", note: "" }],
    },
    nutrition: ["Protein: 120–140g/วัน", "Calorie: ขาดดุล ~300 kcal", "น้ำ: 2.5–3 ลิตร/วัน", "หลีกเลี่ยงน้ำตาลหลัง 18.00 น."],
  },
  2: {
    name: "Strength Foundation",
    level: "Intermediate", weeks: 12, sessions: 4, color: "#00C896",
    goal: "เพิ่มความแข็งแกร่ง Squat +20kg, Bench +15kg",
    note: "โปรแกรม Linear Progression เพิ่มน้ำหนักทุกสัปดาห์",
    week: 9, progress: 75, change: "+8 kg squat",
    schedule: {
      จันทร์: [{ ex: "Squat", sets: 4, reps: "5 reps", note: "90% 1RM สัปดาห์นี้ = 90kg" }, { ex: "Romanian Deadlift", sets: 3, reps: "8 reps", note: "70kg" }, { ex: "Leg Press", sets: 3, reps: "12 reps", note: "" }],
      อังคาร: [{ ex: "Bench Press", sets: 4, reps: "5 reps", note: "สัปดาห์นี้ = 75kg" }, { ex: "Barbell Row", sets: 3, reps: "8 reps", note: "60kg" }, { ex: "Dips", sets: 3, reps: "AMRAP", note: "" }],
      พฤหัส: [{ ex: "Deadlift", sets: 3, reps: "5 reps", note: "สัปดาห์นี้ = 110kg" }, { ex: "Front Squat", sets: 3, reps: "6 reps", note: "70kg" }],
      ศุกร์: [{ ex: "OHP", sets: 4, reps: "5 reps", note: "สัปดาห์นี้ = 55kg" }, { ex: "Pull-up (Weighted)", sets: 3, reps: "6 reps", note: "+5kg" }, { ex: "Face Pull", sets: 3, reps: "15 reps", note: "" }],
    },
    nutrition: ["Protein: 160–180g/วัน", "Calorie: เกินดุล +200 kcal", "Creatine: 5g/วัน", "นอนหลับ 7–9 ชั่วโมง"],
  },
  3: {
    name: "Lean Muscle Builder",
    level: "Intermediate", weeks: 10, sessions: 4, color: "#F5A623",
    goal: "ลดไขมันพร้อมรักษากล้ามเนื้อ Recomp",
    note: "สลับ Upper/Lower เน้นปริมาณ Volume สูง",
    week: 3, progress: 30, change: "-1.8 kg",
    schedule: {
      จันทร์: [{ ex: "Incline Dumbbell Press", sets: 4, reps: "10–12 reps", note: "22kg/ข้าง" }, { ex: "Cable Row", sets: 4, reps: "12 reps", note: "" }, { ex: "Lateral Raise", sets: 3, reps: "15 reps", note: "" }],
      อังคาร: [{ ex: "Leg Press", sets: 4, reps: "12 reps", note: "140kg" }, { ex: "Leg Curl", sets: 3, reps: "12 reps", note: "" }, { ex: "Calf Raise", sets: 4, reps: "20 reps", note: "" }],
      พฤหัส: [{ ex: "Pull-up", sets: 4, reps: "8–10 reps", note: "BW" }, { ex: "Dumbbell Shoulder Press", sets: 4, reps: "10 reps", note: "" }, { ex: "Tricep Pushdown", sets: 3, reps: "15 reps", note: "" }],
      ศุกร์: [{ ex: "Barbell Squat", sets: 4, reps: "10 reps", note: "สัปดาห์นี้ = 60kg" }, { ex: "Stiff Leg Deadlift", sets: 3, reps: "12 reps", note: "" }, { ex: "Hip Thrust", sets: 3, reps: "15 reps", note: "" }],
    },
    nutrition: ["Protein: 140–160g/วัน", "Calorie: ขาดดุล ~200 kcal", "กิน Carb ก่อน-หลังเทรน", "งด Alcohol ทั้งโปรแกรม"],
  },
  4: {
    name: "Athletic Performance",
    level: "Advanced", weeks: 16, sessions: 5, color: "#7B5EA7",
    goal: "เพิ่ม Power, Speed และ Sport-Specific Strength",
    note: "โปรแกรม Block Periodization สำหรับนักกีฬา",
    week: 12, progress: 75, change: "PB 3 lifts",
    schedule: {
      จันทร์: [{ ex: "Power Clean", sets: 5, reps: "3 reps", note: "80% 1RM = 80kg" }, { ex: "Back Squat", sets: 5, reps: "5 reps", note: "90kg" }, { ex: "Box Jump", sets: 4, reps: "5 reps", note: "60cm" }],
      อังคาร: [{ ex: "Bench Press", sets: 5, reps: "5 reps", note: "85kg" }, { ex: "Weighted Pull-up", sets: 4, reps: "6 reps", note: "+20kg" }, { ex: "Conditioning Circuit", sets: 3, reps: "5 rounds", note: "" }],
      พุธ: [{ ex: "Active Recovery", sets: 1, reps: "30 min", note: "เดิน / ว่ายน้ำ" }],
      พฤหัส: [{ ex: "Snatch", sets: 5, reps: "2 reps", note: "70% 1RM" }, { ex: "Front Squat", sets: 4, reps: "4 reps", note: "80kg" }, { ex: "Plyometric Lunge", sets: 3, reps: "10 reps", note: "" }],
      ศุกร์: [{ ex: "Deadlift", sets: 5, reps: "3 reps", note: "130kg" }, { ex: "OHP", sets: 4, reps: "5 reps", note: "65kg" }, { ex: "Farmer's Walk", sets: 4, reps: "30m", note: "50kg/ข้าง" }],
    },
    nutrition: ["Protein: 180–200g/วัน", "Calorie: ตามช่วง Block", "Carb Loading วันก่อนแข่ง", "Caffeine: 200mg ก่อนเทรน"],
  },
  5: {
    name: "Fat Burn Pro",
    level: "Beginner", weeks: 8, sessions: 3, color: "#FF6B35",
    goal: "ลดไขมัน 5–7 kg — จบโปรแกรมแล้ว 🎉",
    note: "ทำได้ดีมาก! ลดได้ 7.5 kg ใน 8 สัปดาห์",
    week: 8, progress: 100, change: "-7.5 kg 🎉",
    schedule: {
      จันทร์: [{ ex: "Treadmill Incline Walk", sets: 1, reps: "30 min", note: "Level 10–12" }, { ex: "Goblet Squat", sets: 3, reps: "15 reps", note: "14 kg" }],
      พุธ: [{ ex: "Rowing Machine", sets: 1, reps: "20 min", note: "" }, { ex: "Plank", sets: 3, reps: "60 วินาที", note: "" }],
      ศุกร์: [{ ex: "HIIT Cycling", sets: 1, reps: "20 min", note: "" }, { ex: "Full Body Circuit", sets: 3, reps: "10 reps", note: "" }],
    },
    nutrition: ["โปรแกรมจบแล้ว — ดูแลต่อเนื่อง", "Protein: 120g+/วัน", "รักษา Calorie ไว้ที่ TDEE"],
  },
};

const CLIENTS = [
  { id: 1, name: "นาย สมชาย ใจดี", userId: "client001", program: "Fat Burn Pro", week: 5, progress: 62, status: "active", change: "-4.2 kg", color: "#FF6B35" },
  { id: 2, name: "นาย วิชัย แข็งแกร่ง", userId: "client002", program: "Strength Foundation", week: 9, progress: 75, status: "active", change: "+8 kg squat", color: "#00C896" },
  { id: 3, name: "น.ส. สุดา สวยงาม", userId: "client003", program: "Lean Muscle Builder", week: 3, progress: 30, status: "active", change: "-1.8 kg", color: "#F5A623" },
  { id: 4, name: "นาย กิตติ นักกีฬา", userId: "client004", program: "Athletic Performance", week: 12, progress: 75, status: "active", change: "PB 3 lifts", color: "#7B5EA7" },
  { id: 5, name: "น.ส. มินตรา ฟิต", userId: "client005", program: "Fat Burn Pro", week: 8, progress: 100, status: "done", change: "-7.5 kg 🎉", color: "#FF6B35" },
];

const TRAINER = {
  name: "Teambusycoaching",
  title: "Professional Fitness Coaching",
  bio: "ทีมโค้ชมืออาชีพ เชี่ยวชาญด้าน Strength Training, Fat Loss และ Athletic Performance ออกแบบโปรแกรมเฉพาะบุคคลสำหรับทุกระดับ",
  stats: [{ label: "ลูกค้า", value: "120+" }, { label: "ปีประสบการณ์", value: "8" }, { label: "โปรแกรม", value: "45+" }, { label: "Success Rate", value: "94%" }],
  achievements: ["Certified Personal Trainer (NASM-CPT)", "Sports Nutrition Specialist", "Functional Movement Screen (FMS)", "ผู้ฝึกสอนทีมชาติยกน้ำหนัก 2019–2022"],
};

// ─── Shared UI ───────────────────────────────────────────────────────────────
function ProgressBar({ pct, color = "#C8FF00" }) {
  return (
    <div style={{ background: "#2a2a2a", borderRadius: 99, height: 6, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.8s ease" }} />
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [uid, setUid] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = () => {
    setLoading(true);
    setTimeout(() => {
      const user = USERS.find(u => u.id === uid.trim() && u.password === pw.trim());
      if (user) { onLogin(user); }
      else { setErr("Username หรือ Password ไม่ถูกต้อง"); setLoading(false); }
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:wght@400;600;700;900&display=swap" rel="stylesheet" />

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{ fontSize: 42, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, color: "#fff", lineHeight: 1 }}>
            TEAMBUSY
          </div>
          <div style={{ fontSize: 42, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, color: "#C8FF00", lineHeight: 1 }}>
            COACHING
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#444", letterSpacing: 3, textTransform: "uppercase", marginTop: 6 }}>Member Portal</div>
      </div>

      {/* Card */}
      <div style={{ width: "100%", maxWidth: 360, background: "#161616", borderRadius: 20, padding: "32px 28px", border: "1px solid #2a2a2a" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 24 }}>เข้าสู่ระบบ</div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Username</div>
          <input value={uid} onChange={e => { setUid(e.target.value); setErr(""); }}
            placeholder="admin / client001 / client002 ..."
            style={{ width: "100%", background: "#1e1e1e", border: "1px solid #333", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 13, boxSizing: "border-box", outline: "none" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Password</div>
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && handle()}
            placeholder="••••••••"
            style={{ width: "100%", background: "#1e1e1e", border: "1px solid #333", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 13, boxSizing: "border-box", outline: "none" }} />
        </div>

        {err && <div style={{ background: "#2a1515", border: "1px solid #5a2020", borderRadius: 8, padding: "10px 12px", color: "#ff6b6b", fontSize: 12, marginBottom: 16 }}>{err}</div>}

        <button onClick={handle} disabled={loading} style={{
          width: "100%", background: loading ? "#555" : "#C8FF00", color: "#111", border: "none",
          borderRadius: 12, padding: "14px", fontWeight: 900, fontSize: 15,
          fontFamily: "'Kanit', sans-serif", cursor: loading ? "default" : "pointer", letterSpacing: 1
        }}>{loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}</button>

        <div style={{ marginTop: 20, padding: "14px", background: "#1a1a1a", borderRadius: 10, border: "1px solid #222" }}>
          <div style={{ fontSize: 10, color: "#555", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Demo Accounts</div>
          <div style={{ fontSize: 11, color: "#666", lineHeight: 1.8 }}>
            Admin: <span style={{ color: "#C8FF00" }}>admin</span> / busy2024<br />
            ลูกค้า: <span style={{ color: "#C8FF00" }}>client001–005</span> / 1234
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CLIENT: My Program ───────────────────────────────────────────────────────
function ClientProgram({ clientId }) {
  const prog = CLIENT_PROGRAMS[clientId];
  const [openDay, setOpenDay] = useState(null);
  if (!prog) return <div style={{ color: "#666", textAlign: "center", padding: 40 }}>ยังไม่มีโปรแกรม กรุณาติดต่อโค้ช</div>;

  return (
    <div>
      {/* Header Card */}
      <div style={{ background: `linear-gradient(135deg, #111, #1a1a1a)`, borderRadius: 20, padding: "24px 20px", marginBottom: 16, border: `1px solid ${prog.color}44`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${prog.color}22 0%, transparent 70%)` }} />
        <div style={{ fontSize: 10, color: prog.color, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>โปรแกรมของคุณ</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1, marginBottom: 4 }}>{prog.name}</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>{prog.weeks} สัปดาห์ · {prog.sessions}x/สัปดาห์ · {prog.level}</div>
        <div style={{ background: "#1e1e1e", borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: "1px solid #2a2a2a" }}>
          <div style={{ fontSize: 10, color: "#666", marginBottom: 3 }}>🎯 เป้าหมาย</div>
          <div style={{ fontSize: 13, color: "#fff" }}>{prog.goal}</div>
        </div>
        <div style={{ fontSize: 11, color: "#777", fontStyle: "italic", marginBottom: 16 }}>💬 {prog.note}</div>
        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: "#666" }}>สัปดาห์ {prog.week} / {prog.weeks}</span>
          <span style={{ fontSize: 11, color: prog.color, fontWeight: 700 }}>{prog.progress}% · {prog.change}</span>
        </div>
        <ProgressBar pct={prog.progress} color={prog.color} />
      </div>

      {/* Schedule */}
      <div style={{ background: "#161616", borderRadius: 16, padding: "20px", marginBottom: 16, border: "1px solid #2a2a2a" }}>
        <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>📅 ตารางออกกำลังกาย</div>
        {Object.entries(prog.schedule).map(([day, exercises]) => (
          <div key={day} style={{ marginBottom: 10 }}>
            <div onClick={() => setOpenDay(openDay === day ? null : day)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: openDay === day ? "#1e2410" : "#1e1e1e", borderRadius: 10, padding: "12px 14px", cursor: "pointer", border: `1px solid ${openDay === day ? prog.color + "44" : "#2a2a2a"}` }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>วัน{day}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#555" }}>{exercises.length} ท่า</span>
                <span style={{ color: "#444" }}>{openDay === day ? "▲" : "▼"}</span>
              </div>
            </div>
            {openDay === day && (
              <div style={{ background: "#141414", borderRadius: "0 0 10px 10px", border: `1px solid ${prog.color}22`, borderTop: "none", overflow: "hidden" }}>
                {exercises.map((ex, i) => (
                  <div key={i} style={{ padding: "12px 14px", borderBottom: i < exercises.length - 1 ? "1px solid #1e1e1e" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{ex.ex}</div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 11, color: prog.color, fontWeight: 700 }}>{ex.sets > 1 ? `${ex.sets} sets` : ""} {ex.reps}</span>
                      </div>
                    </div>
                    {ex.note && <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>📌 {ex.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nutrition */}
      <div style={{ background: "#161616", borderRadius: 16, padding: "20px", border: "1px solid #2a2a2a" }}>
        <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>🥗 คำแนะนำโภชนาการ</div>
        {prog.nutrition.map((n, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: prog.color, marginTop: 5, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CLIENT PORTAL ────────────────────────────────────────────────────────────
function ClientPortal({ user, onLogout }) {
  const [tab, setTab] = useState("program");
  const client = CLIENTS.find(c => c.id === user.clientId);

  const TABS = [
    { id: "program", label: "โปรแกรม", icon: "📋" },
    { id: "profile", label: "โปรไฟล์", icon: "🏋️" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#fff", fontFamily: "'Kanit', sans-serif", maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:wght@400;600;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a", background: "#0d0d0d", position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
            TEAMBUSY<span style={{ color: "#C8FF00" }}>COACHING</span>
          </div>
          <div style={{ fontSize: 10, color: "#555" }}>ยินดีต้อนรับ, {user.name.split(" ")[1] || user.name}</div>
        </div>
        <button onClick={onLogout} style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 8, padding: "6px 12px", color: "#888", fontSize: 11, cursor: "pointer" }}>ออกจากระบบ</button>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {tab === "program" && <ClientProgram clientId={user.clientId} />}
        {tab === "profile" && <PublicProfileView />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#111", borderTop: "1px solid #1e1e1e", display: "flex", padding: "8px 0 12px" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0" }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 10, color: tab === t.id ? "#C8FF00" : "#444", fontWeight: tab === t.id ? 700 : 400, fontFamily: "'Kanit', sans-serif" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 16, height: 2, background: "#C8FF00", borderRadius: 1 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PUBLIC PROFILE (shared) ─────────────────────────────────────────────────
function PublicProfileView() {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #111 0%, #1a1a1a 50%, #0f1f0a 100%)", borderRadius: 20, padding: "32px 24px", marginBottom: 16, border: "1px solid #2a2a2a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, #C8FF0022 0%, transparent 70%)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #C8FF00, #7BC500)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#111", flexShrink: 0 }}>TB</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>{TRAINER.name}</div>
            <div style={{ fontSize: 11, color: "#C8FF00", marginTop: 2 }}>{TRAINER.title}</div>
          </div>
        </div>
        <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>{TRAINER.bio}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {TRAINER.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#C8FF00", fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#161616", borderRadius: 16, padding: "20px", border: "1px solid #2a2a2a" }}>
        <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Certifications</div>
        {TRAINER.achievements.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C8FF00", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#ccc" }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN PORTAL ─────────────────────────────────────────────────────────────
function AdminPortal({ user, onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);
  const [addingClient, setAddingClient] = useState(false);
  const [clients, setClients] = useState(CLIENTS);
  const [newClient, setNewClient] = useState({ name: "", program: "", weeks: "", sessions: "" });

  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "clients", label: "ลูกค้า", icon: "👥" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#fff", fontFamily: "'Kanit', sans-serif", maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:wght@400;600;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a", background: "#0d0d0d", position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
            TEAMBUSY<span style={{ color: "#C8FF00" }}>COACHING</span>
          </div>
          <div style={{ fontSize: 10, color: "#C8FF00" }}>⚙️ Admin Panel</div>
        </div>
        <button onClick={onLogout} style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 8, padding: "6px 12px", color: "#888", fontSize: 11, cursor: "pointer" }}>ออกจากระบบ</button>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[["ลูกค้าทั้งหมด", clients.length, "#C8FF00"], ["Active", clients.filter(c => c.status === "active").length, "#00C896"], ["จบโปรแกรม", clients.filter(c => c.status === "done").length, "#F5A623"], ["Revenue", "฿48,000", "#7B5EA7"]].map(([l, v, c]) => (
                <div key={l} style={{ background: "#161616", borderRadius: 14, padding: "18px 16px", border: "1px solid #2a2a2a" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: c, fontFamily: "'Bebas Neue', sans-serif" }}>{v}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#161616", borderRadius: 16, padding: "20px", border: "1px solid #2a2a2a" }}>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>Progress ลูกค้าทั้งหมด</div>
              {clients.map((c, i) => (
                <div key={c.id} style={{ marginBottom: i < clients.length - 1 ? 16 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: "#ccc", fontWeight: 600 }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: c.color }}>{c.change}</span>
                  </div>
                  <ProgressBar pct={c.progress} color={c.color} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    <span style={{ fontSize: 10, color: "#444" }}>{c.program}</span>
                    <span style={{ fontSize: 10, color: "#444" }}>Week {c.week} · {c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLIENTS */}
        {tab === "clients" && !selectedClient && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 2 }}>รายชื่อลูกค้า</span>
              <button onClick={() => setAddingClient(true)} style={{ background: "#C8FF00", color: "#111", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>+ เพิ่มลูกค้า</button>
            </div>

            {addingClient && (
              <div style={{ background: "#161616", borderRadius: 14, padding: 18, marginBottom: 16, border: "1px solid #333" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#C8FF00", marginBottom: 14 }}>เพิ่มลูกค้าใหม่</div>
                {[["name", "ชื่อลูกค้า"], ["program", "ชื่อโปรแกรม"], ["weeks", "จำนวนสัปดาห์"], ["sessions", "Sessions/สัปดาห์"]].map(([k, ph]) => (
                  <input key={k} placeholder={ph} value={newClient[k]} onChange={e => setNewClient({ ...newClient, [k]: e.target.value })}
                    style={{ width: "100%", background: "#1e1e1e", border: "1px solid #333", borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 13, marginBottom: 10, boxSizing: "border-box" }} />
                ))}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => {
                    if (!newClient.name) return;
                    setClients([...clients, { id: clients.length + 1, name: newClient.name, program: newClient.program || "-", week: 1, progress: 0, status: "active", change: "เริ่มต้น", color: "#C8FF00" }]);
                    setNewClient({ name: "", program: "", weeks: "", sessions: "" });
                    setAddingClient(false);
                  }} style={{ flex: 1, background: "#C8FF00", color: "#111", border: "none", borderRadius: 8, padding: "10px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>บันทึก</button>
                  <button onClick={() => setAddingClient(false)} style={{ flex: 1, background: "#2a2a2a", color: "#888", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, cursor: "pointer" }}>ยกเลิก</button>
                </div>
              </div>
            )}

            <div style={{ display: "grid", gap: 10 }}>
              {clients.map(c => (
                <div key={c.id} onClick={() => setSelectedClient(c)}
                  style={{ background: "#161616", borderRadius: 14, padding: "16px", border: "1px solid #2a2a2a", cursor: "pointer", borderLeft: `3px solid ${c.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${c.color}, ${c.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#111" }}>{c.name[4] || "?"}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "#555" }}>{c.program} · Week {c.week}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: c.color, fontWeight: 700 }}>{c.change}</div>
                      <div style={{ fontSize: 10, color: c.status === "done" ? "#F5A623" : "#00C896", marginTop: 2 }}>{c.status === "done" ? "✓ จบแล้ว" : "● Active"}</div>
                    </div>
                  </div>
                  <ProgressBar pct={c.progress} color={c.color} />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
                    <span style={{ fontSize: 10, color: "#444" }}>{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLIENT DETAIL (Admin View) */}
        {tab === "clients" && selectedClient && (
          <div>
            <button onClick={() => setSelectedClient(null)} style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 8, padding: "8px 14px", color: "#ccc", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← กลับ</button>
            <div style={{ background: "#161616", borderRadius: 16, padding: "20px", marginBottom: 16, border: `1px solid ${selectedClient.color}44` }}>
              <div style={{ fontSize: 10, color: selectedClient.color, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>ข้อมูลลูกค้า</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Bebas Neue', sans-serif" }}>{selectedClient.name}</div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 14 }}>Login: {selectedClient.userId}</div>
              <ProgressBar pct={selectedClient.progress} color={selectedClient.color} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, marginBottom: 14 }}>
                <span style={{ fontSize: 11, color: "#666" }}>Week {selectedClient.week}</span>
                <span style={{ fontSize: 11, color: selectedClient.color, fontWeight: 700 }}>{selectedClient.progress}% · {selectedClient.change}</span>
              </div>
            </div>
            <ClientProgram clientId={selectedClient.id} />
          </div>
        )}

        {tab === "profile" && <PublicProfileView />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#111", borderTop: "1px solid #1e1e1e", display: "flex", padding: "8px 0 12px" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSelectedClient(null); }} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0" }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 10, color: tab === t.id ? "#C8FF00" : "#444", fontWeight: tab === t.id ? 700 : 400, fontFamily: "'Kanit', sans-serif" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 16, height: 2, background: "#C8FF00", borderRadius: 1 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <LoginScreen onLogin={setUser} />;
  if (user.role === "admin") return <AdminPortal user={user} onLogout={() => setUser(null)} />;
  return <ClientPortal user={user} onLogout={() => setUser(null)} />;
}
