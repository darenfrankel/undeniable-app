// src/lib/email-template.ts

/**
 * Type definitions for template data
 */
export type TemplateData = {
    name: string;
    claimNumber: string;
    stateOfResidence: string;
    stateOfCare?: string;
  };
  
  /**
   * Determines if additional state text should be included
   * @param stateOfCare The state where care was received
   * @param stateOfResidence The state of residence
   * @returns boolean indicating if additional state text should be included
   */
  function shouldIncludeStateText(stateOfCare: string | undefined, stateOfResidence: string): boolean {
    return Boolean(
      stateOfCare && 
      stateOfCare.trim() !== '' && 
      stateOfCare !== stateOfResidence
    );
  }
  
  /**
   * Generates the body text for an appeal email based on provided data
   * @param data Template data containing user and claim information
   * @returns Formatted email body string
   */
  export function generateEmailBody(data: TemplateData): string {
    // Generate conditional state text only if states are different and valid
    const additionalStateText = shouldIncludeStateText(data.stateOfCare, data.stateOfResidence)
      ? ` and in ${data.stateOfCare} where my care was provided`
      : '';
  
return `To the Claims Review Department,

I am writing to appeal the denial of my insurance claim #${data.claimNumber}. According to my rights under state and federal insurance regulations, I formally request the following information regarding this determination:

1. The complete medical rationale used to determine my treatment was not medically necessary, including:
   * Specific clinical findings that led to this conclusion
   * Any alternative treatments that were considered
   * An explanation of why my treating physician's recommendations were overruled

2. All clinical criteria, guidelines, and evidence-based standards used in making this determination, including:
   * Copies of any internal protocols or review criteria
   * Names and publication dates of any medical literature consulted
   * Any third-party guidelines referenced in the review process

3. The following information about the reviewing physician:
    * Full name and credentials
    * Board certification specialty
    * Current state license number
    * Proof of active medical registration in ${data.stateOfResidence}${additionalStateText}
    * Confirmation that the reviewer has recent clinical experience with my condition

4. Statistical data regarding approval/denial rates for similar claims reviewed by this physician, including:
    * Data from the past 12 months
    * Comparative data for similar cases within your organization

5. Copies of all materials reviewed in making this determination, including:
    * All medical records
    * All correspondence between providers
    * Any internal notes or communications
    * All diagnostic test results
    * Any peer-reviewed literature considered

Under ${data.stateOfResidence} Insurance Code and ERISA regulations, insurance determinations must be made by appropriately qualified healthcare professionals working within their scope of practice. I request written confirmation that these requirements were met in my case, including documentation that the reviewing physician has current clinical experience with my specific medical condition.

Please note that ERISA regulations require you to provide all relevant documents used in making this determination free of charge. I expect a complete response within 30 days as required by federal law. If any of the requested information cannot be provided, please cite the specific regulation that prevents its disclosure.

Additionally, please confirm receipt of this appeal and provide the name and direct contact information of the person handling this review.

Thank you for your prompt attention to this matter.

Sincerely,
${data.name}`;
}
  
  /**
   * Generates subject line for appeal email
   * @param claimNumber The claim number for the appeal
   * @returns Formatted subject string
   */
  export function generateSubjectLine(claimNumber: string): string {
    return `Appeal Request: Claim #${claimNumber}`;
  }