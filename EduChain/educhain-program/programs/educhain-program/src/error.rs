use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Institution name is too long")]
    NameTooLong,

    #[msg("Course name is too long")]
    CourseTooLong,

    #[msg("Grade is too long")]
    GradeTooLong,

    #[msg("Certificate type is too long")]
    CertTypeTooLong,

    #[msg("Certificate ID is too long")]
    CertIdTooLong,

    #[msg("Description is too long")]
    DescTooLong,

    #[msg("Category is too long")]
    CategoryTooLong,

    #[msg("Institution is not active")]
    InstitutionNotActive,

    #[msg("Only the institution authority can issue certificates")]
    Unauthorized,

    #[msg("Certificate already exists")]
    CertificateAlreadyExists,

    #[msg("Institution already registered")]
    InstitutionAlreadyRegistered,
}
