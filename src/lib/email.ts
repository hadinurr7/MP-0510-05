export const resetPasswordEmail = (fullname: string, resetUrl: string) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                  <td align="center" style="padding: 0;">
                      <table role="presentation" style="width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                          <tr>
                              <td align="center" style="padding: 20px 0;">
                                  <img src="{{company_logo_url}}" alt="Company Logo" style="max-width: 150px; height: auto;">
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 20px 0;">
                                  <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Reset Your Password</h1>
                                  <p style="margin-bottom: 20px;">Hello ${fullname},</p>
                                  <p style="margin-bottom: 20px;">We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
                                  <p style="margin-bottom: 30px;">To reset your password, click the button below:</p>
                                  <table role="presentation" style="margin: auto;">
                                      <tr>
                                          <td align="center" style="background-color: #007bff; border-radius: 4px;">
                                              <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-weight: bold;">Reset Password</a>
                                          </td>
                                      </tr>
                                  </table>
                                  <p style="margin-top: 30px;">This link will expire in 24 hours. If you need to request a new password reset, please visit our website.</p>
                                  <p style="margin-bottom: 20px;">If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                                  <p style="margin-bottom: 20px; word-break: break-all;"><a href="${resetUrl}" style="color: #007bff;">${resetUrl}</a></p>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 20px 0; border-top: 1px solid #eeeeee; text-align: center; color: #888888; font-size: 14px;">
                                  <p style="margin-bottom: 10px;">This email was sent by Your Company</p>
                                  <p style="margin-bottom: 10px;">123 Your Street, Your City, Your Country</p>
                                  <p style="margin-bottom: 10px;"><a href="#" style="color: #888888;">Unsubscribe from these alerts</a></p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `;
};
