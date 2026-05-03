use anchor_lang::prelude::*;
use crate::constants::*;
use crate::error::ErrorCode;
use crate::state::{CertificateAccount, InstitutionAccount};

#[derive(Accounts)]
#[instruction(cert_id: String)]
pub struct IssueCertificate<'info> {
    #[account(
        init,
        payer = authority,
        space = CertificateAccount::LEN,
        seeds = [CERTIFICATE_SEED.as_bytes(), cert_id.as_bytes()],
        bump
    )]
    pub certificate: Account<'info, CertificateAccount>,

    #[account(
        mut,
        seeds = [INSTITUTION_SEED.as_bytes(), authority.key().as_ref()],
        bump = institution.bump,
        has_one = authority @ ErrorCode::Unauthorized,
    )]
    pub institution: Account<'info, InstitutionAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<IssueCertificate>,
    cert_id:          String,
    student_wallet:   Pubkey,
    student_name:     String,
    course:           String,
    grade:            String,
    cert_type:        String,
    mode:             String,
    category:         String,
    description:      String,
) -> Result<()> {
    require!(cert_id.len()     <= MAX_CERT_ID_LEN,   ErrorCode::CertIdTooLong);
    require!(student_name.len()<= MAX_NAME_LEN,       ErrorCode::NameTooLong);
    require!(course.len()      <= MAX_COURSE_LEN,     ErrorCode::CourseTooLong);
    require!(grade.len()       <= MAX_GRADE_LEN,      ErrorCode::GradeTooLong);
    require!(cert_type.len()   <= MAX_CERT_TYPE_LEN,  ErrorCode::CertTypeTooLong);
    require!(mode.len()        <= MAX_MODE_LEN,        ErrorCode::CertTypeTooLong);
    require!(category.len()    <= MAX_CATEGORY_LEN,   ErrorCode::CategoryTooLong);
    require!(description.len() <= MAX_DESC_LEN,       ErrorCode::DescTooLong);
    require!(ctx.accounts.institution.is_active,      ErrorCode::InstitutionNotActive);

    let certificate      = &mut ctx.accounts.certificate;
    let institution      = &mut ctx.accounts.institution;
    let bump             = ctx.bumps.certificate;
    let clock            = Clock::get()?;

    certificate.cert_id          = cert_id.clone();
    certificate.student_wallet   = student_wallet;
    certificate.student_name     = student_name;
    certificate.course           = course;
    certificate.institution      = ctx.accounts.authority.key();
    certificate.institution_name = institution.name.clone();
    certificate.grade            = grade;
    certificate.cert_type        = cert_type;
    certificate.mode             = mode;
    certificate.category         = category;
    certificate.description      = description;
    certificate.date_issued      = clock.unix_timestamp;
    certificate.bump             = bump;

    // Increment institution cert count
    institution.cert_count += 1;

    msg!("Certificate issued: {} to {}", cert_id, certificate.student_name);
    Ok(())
}
