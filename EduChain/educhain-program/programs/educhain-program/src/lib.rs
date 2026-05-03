pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
use anchor_lang::solana_program::pubkey::Pubkey;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("AWSgwCaiwUcscBt2vHiyFrCeY8xYX7yypD9naP9wwXMu");

#[program]
pub mod educhain_program {
    use super::*;

    /// Register a wallet as an institution on EduChain
    pub fn register_institution(
        ctx: Context<RegisterInstitution>,
        name: String,
    ) -> Result<()> {
        instructions::register_institution::handler(ctx, name)
    }

    /// Issue a certificate or achievement on-chain
    pub fn issue_certificate(
        ctx: Context<IssueCertificate>,
        cert_id:       String,
        student_wallet: Pubkey,
        student_name:  String,
        course:        String,
        grade:         String,
        cert_type:     String,
        mode:          String,
        category:      String,
        description:   String,
    ) -> Result<()> {
        instructions::issue_certificate::handler(
            ctx,
            cert_id,
            student_wallet,
            student_name,
            course,
            grade,
            cert_type,
            mode,
            category,
            description,
        )
    }
}
