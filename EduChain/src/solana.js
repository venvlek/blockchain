import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import IDL from "./educhain_program.json";

// ── Constants
const PROGRAM_ID       = new PublicKey("AWSgwCaiwUcscBt2vHiyFrCeY8xYX7yypD9naP9wwXMu");
const INSTITUTION_SEED = "institution";
const CERTIFICATE_SEED = "certificate";
const CONNECTION       = new Connection("https://api.devnet.solana.com", "confirmed");

// ── Get Anchor program instance
function getProgram(wallet) {
  const provider = new AnchorProvider(
    CONNECTION,
    wallet,
    {
      commitment: "confirmed",
      preflightCommitment: "confirmed",
      skipPreflight: false,
    }
  );
  return new Program(IDL, provider);
}

// ── Derive PDAs
export async function getInstitutionPDA(authorityPublicKey) {
  const [pda] = await PublicKey.findProgramAddressSync(
    [Buffer.from(INSTITUTION_SEED), authorityPublicKey.toBuffer()],
    PROGRAM_ID
  );
  return pda;
}

export async function getCertificatePDA(certId) {
  const [pda] = await PublicKey.findProgramAddressSync(
    [Buffer.from(CERTIFICATE_SEED), Buffer.from(certId)],
    PROGRAM_ID
  );
  return pda;
}

// ── Register Institution on-chain
export async function registerInstitution(wallet, institutionName) {
  try {
    const program        = getProgram(wallet);
    const institutionPDA = await getInstitutionPDA(wallet.publicKey);

    const tx = await program.methods
      .registerInstitution(institutionName)
      .accounts({
        institution:   institutionPDA,
        authority:     wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc({ skipPreflight: true, commitment: "confirmed" });

    console.log("Institution registered! TX:", tx);
    return { success: true, tx };
  } catch (err) {
    console.error("Register institution failed:", err);
    return { success: false, error: err.message };
  }
}

// ── Issue Certificate on-chain
export async function issueCertificate(wallet, {
  certId,
  studentWallet,
  studentName,
  course,
  grade,
  certType,
  mode,
  category,
  description,
}) {
  try {
    const program        = getProgram(wallet);
    const institutionPDA = await getInstitutionPDA(wallet.publicKey);
    const certificatePDA = await getCertificatePDA(certId);
    const studentPubkey  = new PublicKey(studentWallet);

    const tx = await program.methods
      .issueCertificate(
        certId,
        studentPubkey,
        studentName,
        course,
        grade,
        certType,
        mode,
        category,
        description
      )
      .accounts({
        certificate:   certificatePDA,
        institution:   institutionPDA,
        authority:     wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc({ skipPreflight: true, commitment: "confirmed" });

    console.log("Certificate issued! TX:", tx);
    return { success: true, tx, certId };
  } catch (err) {
    console.error("Issue certificate failed:", err);
    return { success: false, error: err.message };
  }
}

// ── Fetch Certificate from chain (verify) — no wallet needed
export async function fetchCertificate(certId) {
  try {
    const certificatePDA = await getCertificatePDA(certId);

    // Fetch raw account data directly — no wallet needed
    const accountInfo = await CONNECTION.getAccountInfo(certificatePDA);

    if (!accountInfo) {
      return { success: false, error: "Certificate not found on-chain" };
    }

    // Use a dummy wallet for read-only operations
    const dummyWallet = {
      publicKey: PublicKey.default,
      signTransaction:    async (tx) => tx,
      signAllTransactions: async (txs) => txs,
    };

    const provider = new AnchorProvider(CONNECTION, dummyWallet, { commitment: "confirmed" });
    const program  = new Program(IDL, provider);

    const cert = await program.account.certificateAccount.fetch(certificatePDA);

    return {
      success:         true,
      certId:          cert.certId,
      studentName:     cert.studentName,
      studentWallet:   cert.studentWallet.toString(),
      course:          cert.course,
      institution:     cert.institution.toString(),
      institutionName: cert.institutionName,
      grade:           cert.grade,
      type:            cert.certType,
      mode:            cert.mode,
      category:        cert.category,
      description:     cert.description,
      dateIssued:      new Date(cert.dateIssued.toNumber() * 1000).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric"
      }),
      txSignature: certificatePDA.toString(),
    };
  } catch (err) {
    console.error("Fetch certificate failed:", err);
    return { success: false, error: err.message };
  }
}

// ── Fetch Institution from chain
export async function fetchInstitution(authorityPublicKey) {
  try {
    const provider = new AnchorProvider(
      CONNECTION,
      { publicKey: PublicKey.default, signTransaction: async (tx) => tx, signAllTransactions: async (txs) => txs },
      { commitment: "confirmed" }
    );
    const program        = new Program(IDL, provider);
    const institutionPDA = await getInstitutionPDA(new PublicKey(authorityPublicKey));

    const inst = await program.account.institutionAccount.fetch(institutionPDA);

    return {
      success:    true,
      authority:  inst.authority.toString(),
      name:       inst.name,
      isActive:   inst.isActive,
      certCount:  inst.certCount.toNumber(),
    };
  } catch (err) {
    // Institution not registered yet
    return { success: false, error: err.message };
  }
}

// ── Check if institution is already registered
export async function isInstitutionRegistered(authorityPublicKey) {
  const result = await fetchInstitution(authorityPublicKey);
  return result.success;
}

// ── Fetch all certificates issued by an institution
export async function fetchInstitutionCertificates(authorityPublicKey) {
  try {
    const provider = new AnchorProvider(
      CONNECTION,
      { publicKey: PublicKey.default, signTransaction: async (tx) => tx, signAllTransactions: async (txs) => txs },
      { commitment: "confirmed" }
    );
    const program = new Program(IDL, provider);

    // Fetch all certificate accounts where institution = authorityPublicKey
    const certs = await program.account.certificateAccount.all([
      {
        memcmp: {
          offset: 8 + 4 + 30 + 32 + 4 + 100 + 4 + 100 + 32, // offset to institution pubkey
          bytes:  new PublicKey(authorityPublicKey).toBase58(),
        }
      }
    ]);

    return certs.map(c => ({
      certId:          c.account.certId,
      studentName:     c.account.studentName,
      studentWallet:   c.account.studentWallet.toString(),
      course:          c.account.course,
      institutionName: c.account.institutionName,
      grade:           c.account.grade,
      type:            c.account.certType,
      mode:            c.account.mode,
      category:        c.account.category,
      description:     c.account.description,
      dateIssued:      new Date(c.account.dateIssued.toNumber() * 1000).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric"
      }),
    }));
  } catch (err) {
    console.error("Fetch institution certificates failed:", err);
    return [];
  }
}
