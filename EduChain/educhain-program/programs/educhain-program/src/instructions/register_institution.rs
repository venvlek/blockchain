use anchor_lang::prelude::*;
use crate::constants::*;
use crate::error::ErrorCode;
use crate::state::InstitutionAccount;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct RegisterInstitution<'info> {
    #[account(
        init,
        payer = authority,
        space = InstitutionAccount::LEN,
        seeds = [INSTITUTION_SEED.as_bytes(), authority.key().as_ref()],
        bump
    )]
    pub institution: Account<'info, InstitutionAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<RegisterInstitution>, name: String) -> Result<()> {
    require!(name.len() <= MAX_NAME_LEN, ErrorCode::NameTooLong);

    let institution = &mut ctx.accounts.institution;
    let bump = ctx.bumps.institution;

    institution.authority   = ctx.accounts.authority.key();
    institution.name        = name;
    institution.is_active   = true;
    institution.cert_count  = 0;
    institution.bump        = bump;

    msg!("Institution registered: {}", institution.name);
    Ok(())
}
