use anchor_lang::prelude::*;
use crate::constants::*;

// ── Institution Account
// PDA: ["institution", authority_pubkey]
#[account]
pub struct InstitutionAccount {
    pub authority:   Pubkey,  // wallet that registered this institution
    pub name:        String,  // "University of Lagos"
    pub is_active:   bool,
    pub cert_count:  u64,     // total certificates issued
    pub bump:        u8,
}

impl InstitutionAccount {
    pub const LEN: usize = 8          // discriminator
        + 32                          // authority pubkey
        + 4 + MAX_NAME_LEN            // name string (4 = length prefix)
        + 1                           // is_active
        + 8                           // cert_count
        + 1;                          // bump
}

// ── Certificate Account
// PDA: ["certificate", cert_id_str]
#[account]
pub struct CertificateAccount {
    pub cert_id:          String,  // "EDUCHAIN-7X9K-2L8M-9P1Q"
    pub student_wallet:   Pubkey,
    pub student_name:     String,
    pub course:           String,  // course name or achievement title
    pub institution:      Pubkey,  // institution authority pubkey
    pub institution_name: String,
    pub grade:            String,  // "A", "B+", "—" for achievements
    pub cert_type:        String,  // "Course Completion", "Achievement", etc.
    pub mode:             String,  // "Certificate" or "Achievement"
    pub category:         String,  // achievement category (empty for certs)
    pub description:      String,  // achievement description (empty for certs)
    pub date_issued:      i64,     // Unix timestamp
    pub bump:             u8,
}

impl CertificateAccount {
    pub const LEN: usize = 8                   // discriminator
        + 4 + MAX_CERT_ID_LEN                  // cert_id
        + 32                                   // student_wallet
        + 4 + MAX_NAME_LEN                     // student_name
        + 4 + MAX_COURSE_LEN                   // course
        + 32                                   // institution pubkey
        + 4 + MAX_NAME_LEN                     // institution_name
        + 4 + MAX_GRADE_LEN                    // grade
        + 4 + MAX_CERT_TYPE_LEN                // cert_type
        + 4 + MAX_MODE_LEN                     // mode
        + 4 + MAX_CATEGORY_LEN                 // category
        + 4 + MAX_DESC_LEN                     // description
        + 8                                    // date_issued
        + 1;                                   // bump
}
