import { useState } from "react";
import { useWallet } from "../WalletContext";
import { useIsMobile } from "../landingPage/useIsMobile";

const ISSUE_MODES = ["Certificate", "Achievement"];

const COURSES = [
  "Blockchain Development",
  "Smart Contract Development",
  "Web3 Fundamentals",
  "Decentralized Finance (DeFi)",
  "NFT Development",
  "Solana Program Development",
  "Cryptography Fundamentals",
  "Data Science & Analytics",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud Computing",
  "Software Engineering",
];

const CERT_TYPES = [
  "Course Completion",
  "Professional Certificate",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Honorary Degree",
];

const ACHIEVEMENT_CATEGORIES = [
  "Sports & Athletics",
  "Community Service",
  "Volunteering",
  "Leadership",
  "Competition & Awards",
  "Cultural & Arts",
  "Research & Innovation",
  "Entrepreneurship",
  "Environmental Impact",
  "Humanitarian Work",
  "Other",
];

function generateCertId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `EDUCHAIN-${seg()}-${seg()}-${seg()}`;
}

// ── Live Certificate Preview
function CertificatePreview({ studentName, course, institution, grade, certType, date, certId }) {
  const n  = studentName  || "Student Name";
  const c  = course       || "Course / Achievement";
  const i  = institution  || "Institution";
  const g  = grade        || "-";
  const t  = certType     || "Course Completion";
  const d  = date         || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const id = certId       || "EDUCHAIN-XXXX-XXXX-XXXX";

  return (
    <svg width="100%" viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pBg"     x1="0" y1="0" x2="320" y2="210" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1E1045"/><stop offset="100%" stopColor="#0D0B2A"/></linearGradient>
        <linearGradient id="pHead"   x1="0" y1="0" x2="320" y2="52"  gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#4C1D95"/><stop offset="100%" stopColor="#312E81"/></linearGradient>
        <linearGradient id="pBord"   x1="0" y1="0" x2="320" y2="210" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B5CF6"/><stop offset="50%" stopColor="#6366F1"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient>
        <linearGradient id="pLogo"   x1="14" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#A78BFA"/><stop offset="1" stopColor="#6366F1"/></linearGradient>
        <linearGradient id="pGrad"   x1="0"  y1="0"  x2="40" y2="18" gradientUnits="userSpaceOnUse"><stop stopColor="#7C3AED"/><stop offset="1" stopColor="#6366F1"/></linearGradient>
        <linearGradient id="pBot"    x1="0" y1="192" x2="320" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="#4C1D95"/><stop offset="1" stopColor="#312E81"/></linearGradient>
      </defs>
      <rect width="320" height="210" rx="14" fill="url(#pBg)"/>
      <rect x="0.75" y="0.75" width="318.5" height="208.5" rx="13.5" stroke="url(#pBord)" strokeWidth="1.5"/>
      <path d="M0 14 Q0 0 14 0 H306 Q320 0 320 14 V52 H0 Z" fill="url(#pHead)"/>
      <circle cx="24" cy="26" r="13" fill="url(#pLogo)"/>
      <path d="M19 26l4 4 7-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="42" y="22" fontFamily="'Sora',sans-serif" fontSize="9.5" fontWeight="800" fill="white">EduChain</text>
      <text x="42" y="33" fontFamily="'Sora',sans-serif" fontSize="7"   fill="rgba(196,181,253,0.8)">{t}</text>
      <rect x="240" y="14" width="66" height="18" rx="9" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.45)" strokeWidth="1"/>
      <circle cx="251" cy="23" r="3" fill="#4ADE80"/>
      <text x="257" y="26.5" fontFamily="'Sora',sans-serif" fontSize="7" fontWeight="700" fill="#4ADE80">VERIFIED</text>
      <line x1="16" y1="60" x2="304" y2="60" stroke="rgba(139,92,246,0.25)" strokeWidth="1"/>
      <circle cx="40" cy="98" r="20" fill="rgba(124,58,237,0.3)" stroke="rgba(139,92,246,0.4)" strokeWidth="1"/>
      <circle cx="40" cy="92" r="8"  fill="rgba(255,255,255,0.85)"/>
      <ellipse cx="40" cy="109" rx="13" ry="7" fill="rgba(255,255,255,0.85)"/>
      <text x="70" y="82"  fontFamily="'Sora',sans-serif" fontSize="11.5" fontWeight="800" fill="white">{n.slice(0,22)}{n.length > 22 ? "…" : ""}</text>
      <text x="70" y="95"  fontFamily="'Sora',sans-serif" fontSize="8"    fontWeight="600" fill="#A78BFA">{c.slice(0,28)}{c.length > 28 ? "…" : ""}</text>
      <text x="70" y="107" fontFamily="'Sora',sans-serif" fontSize="7.5"  fill="rgba(255,255,255,0.45)">{i} · {d}</text>
      <rect x="70" y="113" width="36" height="15" rx="7.5" fill="url(#pGrad)"/>
      <text x="88" y="124" fontFamily="'Sora',sans-serif" fontSize="7.5" fontWeight="700" fill="white" textAnchor="middle">Grade {g}</text>
      <circle cx="246" cy="98" r="30" fill="none" stroke="rgba(139,92,246,0.2)"  strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="246" cy="98" r="23" fill="rgba(124,58,237,0.1)" stroke="rgba(139,92,246,0.35)" strokeWidth="1"/>
      <text x="246" y="94"  fontFamily="'Sora',sans-serif" fontSize="6.5" fontWeight="700" fill="rgba(167,139,250,0.9)" textAnchor="middle">OFFICIAL</text>
      <text x="246" y="104" fontFamily="'Sora',sans-serif" fontSize="6.5" fontWeight="700" fill="rgba(167,139,250,0.9)" textAnchor="middle">SEAL</text>
      <circle cx="246" cy="98" r="4" fill="rgba(139,92,246,0.6)"/>
      <line x1="16" y1="142" x2="304" y2="142" stroke="rgba(139,92,246,0.2)" strokeWidth="1"/>
      <text x="16" y="155" fontFamily="'Courier New',monospace" fontSize="6.5" fill="rgba(255,255,255,0.3)">ID: {id}</text>
      <g transform="translate(268,143)">
        {[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]].map((row,r) =>
          row.map((cell,c2) => cell ? <rect key={`${r}-${c2}`} x={c2*3.5} y={r*3.5} width="3" height="3" rx="0.5" fill="rgba(167,139,250,0.7)"/> : null)
        )}
      </g>
      <path d="M0 194 H320 V202 Q320 210 312 210 H8 Q0 210 0 202 Z" fill="url(#pBot)" opacity="0.6"/>
      <text x="160" y="204" fontFamily="'Sora',sans-serif" fontSize="6" fill="rgba(255,255,255,0.35)" textAnchor="middle">Secured on Solana Blockchain · {new Date().getFullYear()}</text>
    </svg>
  );
}

export default function IssueCertificate() {
  const { publicKey, walletAdapter } = useWallet();
  const isMobile = useIsMobile();
  const institutionName = localStorage.getItem(`educhain_inst_name_${publicKey}`) || "Your Institution";
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const [mode, setMode] = useState("Certificate"); // "Certificate" | "Achievement"
  const [form, setForm] = useState({
    studentWallet: "", studentName: "", course: "",
    customCourse: "", grade: "", certType: "Course Completion",
    // Achievement fields
    achievementTitle: "", achievementCategory: "", achievementDesc: "",
  });
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(null);
  const [errors,   setErrors]   = useState({});
  const [copied,   setCopied]   = useState(false);

  const inp = (field) => ({
    width: "100%", padding: "11px 14px", borderRadius: 10,
    background: "rgba(124,58,237,0.08)",
    border: `1.5px solid ${errors[field] ? "rgba(248,113,113,0.5)" : "rgba(139,92,246,0.22)"}`,
    color: "white", fontSize: 13.5, fontFamily: "inherit", outline: "none",
    transition: "border-color 0.2s",
  });

  const sel = (field) => ({
    ...inp(field), cursor: "pointer", appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A78BFA' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36,
  });

  const lbl = { color: "rgba(148,163,184,0.65)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em", display: "block", marginBottom: 6 };
  const err = { color: "#F87171", fontSize: 12, marginTop: 5 };

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.studentWallet.trim())                e.studentWallet = "Wallet address is required.";
    else if (form.studentWallet.trim().length < 32) e.studentWallet = "Enter a valid Solana wallet address (min 32 chars).";
    if (!form.studentName.trim())                  e.studentName   = "Recipient name is required.";

    if (mode === "Certificate") {
      if (!form.course && !form.customCourse.trim()) e.course = "Please select or enter a course.";
      if (form.course === "Other" && !form.customCourse.trim()) e.course = "Please specify the course name.";
      if (!form.grade.trim()) e.grade = "Grade is required.";
    } else {
      if (!form.achievementTitle.trim())    e.achievementTitle    = "Achievement title is required.";
      if (!form.achievementCategory)        e.achievementCategory = "Please select a category.";
      if (!form.achievementDesc.trim())     e.achievementDesc     = "Please describe the achievement.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleIssue = async () => {
    if (!validate()) return;
    setLoading(true);

    const certId     = generateCertId();
    const courseName = mode === "Certificate"
      ? (form.course === "Other" ? form.customCourse.trim() : form.course)
      : form.achievementTitle.trim();

    try {
      // Call blockchain
      const { issueCertificate } = await import("../solana.js");
      const result = await issueCertificate(walletAdapter, {
        certId,
        studentWallet:  form.studentWallet.trim(),
        studentName:    form.studentName.trim(),
        course:         courseName,
        grade:          mode === "Certificate" ? form.grade.trim() : "—",
        certType:       mode === "Certificate" ? form.certType : "Achievement",
        mode,
        category:       form.achievementCategory,
        description:    form.achievementDesc.trim(),
      });

      if (!result.success) {
        setErrors({ submit: "Transaction failed: " + result.error });
        setLoading(false);
        return;
      }

      const cert = {
        certId,
        mode,
        studentName:         form.studentName.trim(),
        studentWallet:       form.studentWallet.trim(),
        course:              courseName,
        institution:         institutionName,
        grade:               mode === "Certificate" ? form.grade.trim() : "—",
        type:                mode === "Certificate" ? form.certType : "Achievement",
        achievementTitle:    form.achievementTitle.trim(),
        achievementCategory: form.achievementCategory,
        achievementDesc:     form.achievementDesc.trim(),
        dateIssued:          today,
        txSignature:         result.tx,
        issuedBy:            publicKey,
        issuedAt:            Date.now(),
      };

      // Also save to localStorage as cache for faster reads
      const all = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
      all[certId] = cert;
      localStorage.setItem("educhain_certificates", JSON.stringify(all));

      setSuccess(cert);
    } catch (err) {
      setErrors({ submit: "Error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = () => {
    if (!success) return;
    navigator.clipboard.writeText(success.certId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setForm({ studentWallet: "", studentName: "", course: "", customCourse: "", grade: "", certType: "Course Completion", achievementTitle: "", achievementCategory: "", achievementDesc: "" });
    setSuccess(null); setErrors({}); setCopied(false);
  };

  // ── Success screen
  if (success) {
    return (
      <div style={{ padding: isMobile ? "24px 16px" : "32px 36px" }}>
        <div style={{ maxWidth: 520 }}>

          {/* Banner */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderRadius: 14, marginBottom: 28, background: "rgba(74,222,128,0.08)", border: "1.5px solid rgba(74,222,128,0.3)" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p style={{ color: "#4ADE80", fontWeight: 800, fontSize: 15 }}>Certificate Issued Successfully</p>
              <p style={{ color: "rgba(74,222,128,0.65)", fontSize: 12.5 }}>Stored on Solana Devnet · {success.dateIssued}</p>
            </div>
          </div>

          {/* Preview */}
          <div style={{ marginBottom: 20, borderRadius: 16, overflow: "hidden", boxShadow: "0 0 32px rgba(124,58,237,0.3)" }}>
            <CertificatePreview
              studentName={success.studentName} course={success.course}
              institution={success.institution} grade={success.grade}
              certType={success.type} date={success.dateIssued} certId={success.certId}
            />
          </div>

          {/* Certificate ID box */}
          <div style={{ padding: "14px 18px", borderRadius: 12, marginBottom: 16, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 6 }}>CERTIFICATE ID — SHARE WITH THE STUDENT</p>
            <p style={{ color: "white", fontSize: 14, fontFamily: "monospace", fontWeight: 600 }}>{success.certId}</p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row" }}>
            <button onClick={handleReset} style={{
              flex: 1, padding: "13px 0", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #7C3AED, #6366F1)",
              color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit",
              boxShadow: "0 0 22px rgba(124,58,237,0.4)",
            }}>
              Issue Another
            </button>
            <button onClick={handleCopyId} style={{
              flex: 1, padding: "13px 0", borderRadius: 12, cursor: "pointer",
              background: copied ? "rgba(74,222,128,0.12)" : "rgba(124,58,237,0.08)",
              border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(139,92,246,0.25)"}`,
              color: copied ? "#4ADE80" : "#A78BFA",
              fontWeight: 700, fontSize: 14, fontFamily: "inherit",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {copied ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Certificate ID</>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form
  return (
    <div style={{ padding: isMobile ? "24px 16px" : "32px 36px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "white", fontSize: isMobile ? 22 : 26, fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 6 }}>
          {mode === "Certificate" ? "Issue Certificate" : "Issue Achievement"}
        </h1>
        <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5 }}>
          {mode === "Certificate"
            ? "Create and issue a verifiable academic certificate."
            : "Certify a non-academic achievement on the Solana blockchain."}
        </p>
      </div>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 12, padding: 4, width: "fit-content" }}>
        {ISSUE_MODES.map(m => (
          <button key={m} onClick={() => { setMode(m); setErrors({}); }} style={{
            padding: "9px 24px", borderRadius: 9, border: "none", cursor: "pointer",
            background: mode === m ? "linear-gradient(135deg, #7C3AED, #6366F1)" : "transparent",
            color: mode === m ? "white" : "rgba(148,163,184,0.65)",
            fontWeight: mode === m ? 700 : 500, fontSize: 13.5,
            fontFamily: "inherit", transition: "all 0.2s",
            boxShadow: mode === m ? "0 0 14px rgba(124,58,237,0.4)" : "none",
          }}>
            {m}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 32, flexDirection: isMobile ? "column" : "row", alignItems: "flex-start" }}>

        {/* Form */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>

          <div>
            <label style={lbl}>RECIPIENT WALLET ADDRESS</label>
            <input value={form.studentWallet} onChange={e => update("studentWallet", e.target.value)} placeholder="Enter recipient's Solana wallet address" style={inp("studentWallet")}/>
            {errors.studentWallet && <p style={err}>{errors.studentWallet}</p>}
          </div>

          <div>
            <label style={lbl}>RECIPIENT FULL NAME</label>
            <input value={form.studentName} onChange={e => update("studentName", e.target.value)} placeholder="Enter recipient's full name" style={inp("studentName")}/>
            {errors.studentName && <p style={err}>{errors.studentName}</p>}
          </div>

          {/* ── Certificate fields */}
          {mode === "Certificate" && (
            <>
              <div>
                <label style={lbl}>COURSE / PROGRAM</label>
                <select value={form.course} onChange={e => update("course", e.target.value)} style={sel("course")}>
                  <option value="" style={{ background: "#0D0B2A", color: "rgba(148,163,184,0.7)" }}>Select course or program</option>
                  {COURSES.map((c, i) => <option key={i} value={c} style={{ background: "#0D0B2A", color: "white" }}>{c}</option>)}
                  <option value="Other" style={{ background: "#0D0B2A", color: "white" }}>Other (specify below)</option>
                </select>
                {errors.course && <p style={err}>{errors.course}</p>}
              </div>

              {form.course === "Other" && (
                <div>
                  <label style={lbl}>SPECIFY COURSE</label>
                  <input value={form.customCourse} onChange={e => update("customCourse", e.target.value)} placeholder="Enter course name" style={inp("customCourse")}/>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={lbl}>GRADE / SCORE</label>
                  <input value={form.grade} onChange={e => update("grade", e.target.value)} placeholder="e.g. A, B+, 85%" style={inp("grade")}/>
                  {errors.grade && <p style={err}>{errors.grade}</p>}
                </div>
                <div>
                  <label style={lbl}>CERTIFICATE TYPE</label>
                  <select value={form.certType} onChange={e => update("certType", e.target.value)} style={sel("certType")}>
                    {CERT_TYPES.map((t, i) => <option key={i} value={t} style={{ background: "#0D0B2A", color: "white" }}>{t}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ── Achievement fields */}
          {mode === "Achievement" && (
            <>
              <div>
                <label style={lbl}>ACHIEVEMENT TITLE</label>
                <input value={form.achievementTitle} onChange={e => update("achievementTitle", e.target.value)} placeholder="e.g. Gold Medal — 100m Sprint, Best Volunteer 2025" style={inp("achievementTitle")}/>
                {errors.achievementTitle && <p style={err}>{errors.achievementTitle}</p>}
              </div>

              <div>
                <label style={lbl}>CATEGORY</label>
                <select value={form.achievementCategory} onChange={e => update("achievementCategory", e.target.value)} style={sel("achievementCategory")}>
                  <option value="" style={{ background: "#0D0B2A", color: "rgba(148,163,184,0.7)" }}>Select category</option>
                  {ACHIEVEMENT_CATEGORIES.map((c, i) => <option key={i} value={c} style={{ background: "#0D0B2A", color: "white" }}>{c}</option>)}
                </select>
                {errors.achievementCategory && <p style={err}>{errors.achievementCategory}</p>}
              </div>

              <div>
                <label style={lbl}>DESCRIPTION</label>
                <textarea
                  value={form.achievementDesc}
                  onChange={e => update("achievementDesc", e.target.value)}
                  placeholder="Describe what the recipient did to earn this achievement..."
                  rows={3}
                  style={{
                    ...inp("achievementDesc"),
                    resize: "vertical", minHeight: 90, lineHeight: 1.6,
                  }}
                />
                {errors.achievementDesc && <p style={err}>{errors.achievementDesc}</p>}
              </div>
            </>
          )}

          <div>
            <label style={lbl}>ISSUING INSTITUTION</label>
            <div style={{ padding: "11px 14px", borderRadius: 10, background: "rgba(74,222,128,0.06)", border: "1.5px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", flexShrink: 0, display: "inline-block" }}/>
              <span style={{ color: "white", fontSize: 13.5, fontWeight: 600 }}>{institutionName}</span>
            </div>
          </div>

          <button onClick={handleIssue} disabled={loading} style={{
            padding: "14px 0", borderRadius: 12, border: "none",
            cursor: loading ? "wait" : "pointer",
            background: "linear-gradient(135deg, #7C3AED, #6366F1)",
            color: "white", fontWeight: 700, fontSize: 15, fontFamily: "inherit",
            boxShadow: "0 0 28px rgba(124,58,237,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            opacity: loading ? 0.8 : 1, transition: "all 0.2s", marginTop: 8,
          }}>
            {loading ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Issuing on Solana...</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>{mode === "Certificate" ? "Issue Certificate" : "Issue Achievement"}</>
            )}
          </button>
        </div>

        {/* Live preview */}
        {!isMobile && (
          <div style={{ width: 340, flexShrink: 0 }}>
            <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 12 }}>CERTIFICATE PREVIEW</p>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 0 40px rgba(124,58,237,0.25), 0 20px 40px rgba(0,0,0,0.4)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <CertificatePreview
                studentName={form.studentName}
                course={form.course === "Other" ? form.customCourse : form.course}
                institution={institutionName} grade={form.grade}
                certType={form.certType} date={today} certId={null}
              />
            </div>
            <p style={{ color: "rgba(148,163,184,0.4)", fontSize: 11.5, textAlign: "center", marginTop: 10 }}>Updates as you fill the form</p>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
