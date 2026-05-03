use anchor_lang::prelude::*;

#[constant]
pub const INSTITUTION_SEED: &str = "institution";

#[constant]
pub const CERTIFICATE_SEED: &str = "certificate";

// Max string lengths
pub const MAX_NAME_LEN: usize        = 100;
pub const MAX_COURSE_LEN: usize      = 100;
pub const MAX_GRADE_LEN: usize       = 20;
pub const MAX_CERT_TYPE_LEN: usize   = 50;
pub const MAX_CERT_ID_LEN: usize     = 30;  // "EDUCHAIN-XXXX-XXXX-XXXX"
pub const MAX_MODE_LEN: usize        = 20;  // "Certificate" or "Achievement"
pub const MAX_DESC_LEN: usize        = 300; // Achievement description
pub const MAX_CATEGORY_LEN: usize    = 50;  // Achievement category
